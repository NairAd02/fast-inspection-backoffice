import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InspectionDetails } from "@/lib/types/inspections";
import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import Image from "next/image";

// Estilos para el PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#1a365d",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "semibold",
    color: "#2c5282",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#4299e1",
  },
  tableHeader: {
    backgroundColor: "#ebf8ff",
    padding: 5,
    borderWidth: 1,
    borderColor: "#bee3f8",
  },
  tableRow: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#bee3f8",
  },
  criticalityHigh: {
    color: "#e53e3e",
    fontWeight: "bold",
  },
  criticalityMedium: {
    color: "#dd6b20",
    fontWeight: "bold",
  },
  criticalityLow: {
    color: "#38a169",
    fontWeight: "bold",
  },
});

interface Props {
  inspection: InspectionDetails;
}

// Función auxiliar para contar ítems por nivel de criticidad
const countCriticalItems = (
  inspection: InspectionDetails,
  min: number,
  max: number | null
) => {
  let count = 0;

  // Criticidad global
  if (max !== null) {
    if (
      inspection.indiceCriticidad >= min &&
      inspection.indiceCriticidad <= max
    )
      count++;
  } else {
    if (inspection.indiceCriticidad >= min) count++;
  }

  // Sistemas
  inspection.sistemas.forEach((sistema) => {
    if (max !== null) {
      if (sistema.indiceCriticidad >= min && sistema.indiceCriticidad <= max)
        count++;
    } else {
      if (sistema.indiceCriticidad >= min) count++;
    }

    // Subsistemas
    sistema.subsistemas.forEach((subsistema) => {
      if (max !== null) {
        if (
          subsistema.indiceCriticidad >= min &&
          subsistema.indiceCriticidad <= max
        )
          count++;
      } else {
        if (subsistema.indiceCriticidad >= min) count++;
      }

      // Materiales
      subsistema.materiales.forEach((material) => {
        if (max !== null) {
          if (
            material.indiceCriticidad >= min &&
            material.indiceCriticidad <= max
          )
            count++;
        } else {
          if (material.indiceCriticidad >= min) count++;
        }

        // Tipos de deterioro
        material.tiposDeterioros.forEach((tipo) => {
          if (max !== null) {
            if (
              tipo.indiceCriticidad.valor >= min &&
              tipo.indiceCriticidad.valor <= max
            )
              count++;
          } else {
            if (tipo.indiceCriticidad.valor >= min) count++;
          }
        });
      });
    });
  });

  return count;
};

// Componente para vista previa en la aplicación (Tailwind CSS)
const InspectionReportPreview = ({ inspection }: Props) => {
  const getCriticalityClass = (value: number) => {
    if (value >= 7) return "text-red-600 font-bold";
    if (value >= 4) return "text-orange-500 font-bold";
    return "text-green-600 font-bold";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Encabezado del reporte */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-900">
          Reporte de Inspección
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">ID Inspección</p>
            <p className="font-semibold">{inspection._id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Inicio</p>
            <p className="font-semibold">
              {new Date(inspection.fechaInicio).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Versión Configuración</p>
            <p className="font-semibold">{inspection.configVersion}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Índice de Criticidad Global</p>
          <p
            className={`text-xl ${getCriticalityClass(
              inspection.indiceCriticidad
            )}`}
          >
            {inspection.indiceCriticidad}
          </p>
        </div>
      </div>

      {/* Resumen general */}
      <div className="mb-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">
          Resumen General
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Total Sistemas</p>
            <p className="text-2xl font-bold">{inspection.sistemas.length}</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Total Deterioros</p>
            <p className="text-2xl font-bold">{inspection.cantDeterioros}</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Subsistemas Inspeccionados</p>
            <p className="text-2xl font-bold">
              {inspection.sistemas.reduce(
                (acc, sistema) => acc + sistema.subsistemas.length,
                0
              )}
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Materiales Evaluados</p>
            <p className="text-2xl font-bold">
              {inspection.sistemas.reduce(
                (acc, sistema) =>
                  acc +
                  sistema.subsistemas.reduce(
                    (acc2, subsistema) => acc2 + subsistema.materiales.length,
                    0
                  ),
                0
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Detalle por sistemas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Detalle por Sistemas
        </h2>
        {inspection.sistemas.map((sistema) => (
          <div
            key={sistema._id}
            className="mb-6 border rounded-lg overflow-hidden"
          >
            <div className="bg-blue-100 p-3 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{sistema.nombre}</h3>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Herramienta:</span>
                  <span className="font-medium">
                    {sistema.herramienta.nombre}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <span className="text-sm mr-2">Índice Criticidad:</span>
                  <span
                    className={getCriticalityClass(sistema.indiceCriticidad)}
                  >
                    {sistema.indiceCriticidad}
                  </span>
                </div>
                <div>
                  <span className="text-sm mr-2">Deterioros:</span>
                  <span className="font-medium">{sistema.cantDeterioros}</span>
                </div>
              </div>
            </div>

            {/* Subsistemas */}
            <div className="p-3">
              {sistema.subsistemas.map((subsistema) => (
                <div
                  key={subsistema._id}
                  className="mb-4 border rounded-md p-3 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{subsistema.nombre}</h4>
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-sm mr-1">Criticidad:</span>
                        <span
                          className={getCriticalityClass(
                            subsistema.indiceCriticidad
                          )}
                        >
                          {subsistema.indiceCriticidad}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm mr-1">Deterioros:</span>
                        <span>{subsistema.cantDeterioros}</span>
                      </div>
                    </div>
                  </div>

                  {/* Materiales */}
                  <div className="ml-4">
                    {subsistema.materiales.map((material) => (
                      <div
                        key={material._id}
                        className="mb-3 border-l-2 border-blue-200 pl-3"
                      >
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{material.nombre}</h5>
                          <div className="flex space-x-3 text-sm">
                            <span
                              className={getCriticalityClass(
                                material.indiceCriticidad
                              )}
                            >
                              Criticidad: {material.indiceCriticidad}
                            </span>
                            <span>Deterioros: {material.cantDeterioros}</span>
                          </div>
                        </div>

                        {/* Tipos de deterioro */}
                        <div className="ml-4 mt-2">
                          {material.tiposDeterioros.map((tipoDeterioro) => (
                            <div key={tipoDeterioro._id} className="mb-2">
                              <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                <div>
                                  <span className="font-medium">
                                    {tipoDeterioro.nombre}
                                  </span>
                                  <span className="text-sm ml-2">
                                    (Detectabilidad:{" "}
                                    {tipoDeterioro.detectabilidad})
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <span className="text-sm">
                                    Criticidad:{" "}
                                    {tipoDeterioro.indiceCriticidad.valor}
                                  </span>
                                  <span className="text-sm">
                                    Deterioros: {tipoDeterioro.cantDeterioros}
                                  </span>
                                </div>
                              </div>

                              {/* Campos afectados */}
                              <div className="ml-4 mt-1">
                                <p className="text-sm font-medium">
                                  Campos Afectados:
                                </p>
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                  {tipoDeterioro.camposAfectados.map(
                                    (campo) => (
                                      <div
                                        key={campo._id}
                                        className="text-xs bg-blue-50 p-1 rounded"
                                      >
                                        {campo.nombre} (Nivel:{" "}
                                        {campo.nivelImportancia})
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              {/* Deterioros específicos */}
                              <div className="ml-4 mt-2">
                                <p className="text-sm font-medium">
                                  Deterioros Registrados:
                                </p>
                                {tipoDeterioro.deterioros.map((deterioro) => (
                                  <div
                                    key={deterioro._id}
                                    className="border rounded p-2 mt-1"
                                  >
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        {deterioro.codigo}
                                      </span>
                                    </div>
                                    <div className="mt-1 grid grid-cols-2 gap-2">
                                      {deterioro.camposDefinidos.map(
                                        (campo) => (
                                          <div
                                            key={campo._id}
                                            className="text-sm"
                                          >
                                            <span className="font-medium">
                                              {campo.nombre}:
                                            </span>
                                            {campo.tipo ===
                                            DefinedFieldTypes.IMAGE ? (
                                              <div className="mt-1">
                                                <Image
                                                  src={campo.valor}
                                                  alt={campo.nombre}
                                                  className="h-20 object-contain border rounded"
                                                  width={800}
                                                  height={800}
                                                />
                                              </div>
                                            ) : (
                                              <span className="ml-1">
                                                {campo.valor}
                                              </span>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de criticidad */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">
          Análisis de Criticidad
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">
              Ítems con criticidad alta (≥7)
            </p>
            <p className="text-2xl font-bold text-red-600">
              {countCriticalItems(inspection, 7, null)}
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">
              Ítems con criticidad media (4-6)
            </p>
            <p className="text-2xl font-bold text-orange-500">
              {countCriticalItems(inspection, 4, 6)}
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">
              Ítems con criticidad baja (≤3)
            </p>
            <p className="text-2xl font-bold text-green-600">
              {countCriticalItems(inspection, 0, 3)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el PDF
const InspectionReportPDF = ({ inspection }: Props) => {
  const getCriticalityStyle = (value: number) => {
    if (value >= 7) return pdfStyles.criticalityHigh;
    if (value >= 4) return pdfStyles.criticalityMedium;
    return pdfStyles.criticalityLow;
  };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Encabezado del PDF */}
        <View style={{ marginBottom: 15 }}>
          <Text style={pdfStyles.header}>Reporte de Inspección</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "33%" }}>
              <Text>ID Inspección: {inspection._id}</Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text>
                Fecha: {new Date(inspection.fechaInicio).toLocaleDateString()}
              </Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text>Versión: {inspection.configVersion}</Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text>Índice de Criticidad Global: </Text>
            <Text style={getCriticalityStyle(inspection.indiceCriticidad)}>
              {inspection.indiceCriticidad}
            </Text>
          </View>
        </View>

        {/* Resumen general en PDF */}
        <View style={{ ...pdfStyles.section, marginBottom: 20 }}>
          <Text style={pdfStyles.subheader}>Resumen General</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>Sistemas: {inspection.sistemas.length}</Text>
            </View>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>Deterioros: {inspection.cantDeterioros}</Text>
            </View>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>
                Subsistemas:
                {inspection.sistemas.reduce(
                  (acc, sistema) => acc + sistema.subsistemas.length,
                  0
                )}
              </Text>
            </View>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>
                Materiales:
                {inspection.sistemas.reduce(
                  (acc, sistema) =>
                    acc +
                    sistema.subsistemas.reduce(
                      (acc2, subsistema) => acc2 + subsistema.materiales.length,
                      0
                    ),
                  0
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Detalle por sistemas en PDF */}
        <Text style={pdfStyles.subheader}>Detalle por Sistemas</Text>
        {inspection.sistemas.map((sistema) => (
          <View key={sistema._id} style={{ marginBottom: 15 }}>
            <View style={{ backgroundColor: "#ebf8ff", padding: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "semibold" }}>{sistema.nombre}</Text>
                <Text>Herramienta: {sistema.herramienta.nombre}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text>
                  Criticidad:
                  <Text style={getCriticalityStyle(sistema.indiceCriticidad)}>
                    {sistema.indiceCriticidad}
                  </Text>
                </Text>
                <Text>Deterioros: {sistema.cantDeterioros}</Text>
              </View>
            </View>

            {/* Subsistemas en PDF */}
            <View style={{ padding: 8 }}>
              {sistema.subsistemas.map((subsistema) => (
                <View key={subsistema._id} style={{ marginBottom: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "medium" }}>
                      {subsistema.nombre}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ marginRight: 10 }}>
                        Criticidad:
                        <Text
                          style={getCriticalityStyle(
                            subsistema.indiceCriticidad
                          )}
                        >
                          {subsistema.indiceCriticidad}
                        </Text>
                      </Text>
                      <Text>Deterioros: {subsistema.cantDeterioros}</Text>
                    </View>
                  </View>

                  {/* Materiales en PDF */}
                  <View style={{ marginLeft: 10, marginTop: 5 }}>
                    {subsistema.materiales.map((material) => (
                      <View key={material._id} style={{ marginBottom: 8 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>{material.nombre}</Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginRight: 5 }}>
                              Criticidad:
                              <Text
                                style={getCriticalityStyle(
                                  material.indiceCriticidad
                                )}
                              >
                                {material.indiceCriticidad}
                              </Text>
                            </Text>
                            <Text>Deterioros: {material.cantDeterioros}</Text>
                          </View>
                        </View>

                        {/* Tipos de deterioro en PDF */}
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                          {material.tiposDeterioros.map((tipoDeterioro) => (
                            <View
                              key={tipoDeterioro._id}
                              style={{ marginBottom: 8 }}
                            >
                              <View
                                style={{
                                  backgroundColor: "#f0f0f0",
                                  padding: 5,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text>
                                    {tipoDeterioro.nombre}
                                    <Text style={{ fontSize: 10 }}>
                                      (Detectabilidad:{" "}
                                      {tipoDeterioro.detectabilidad})
                                    </Text>
                                  </Text>
                                  <View style={{ flexDirection: "row" }}>
                                    <Text style={{ marginRight: 5 }}>
                                      Criticidad:{" "}
                                      {tipoDeterioro.indiceCriticidad.valor}
                                    </Text>
                                    <Text>
                                      Deterioros: {tipoDeterioro.cantDeterioros}
                                    </Text>
                                  </View>
                                </View>
                              </View>

                              {/* Deterioros específicos en PDF */}
                              <View style={{ marginLeft: 10, marginTop: 5 }}>
                                {tipoDeterioro.deterioros.map((deterioro) => (
                                  <View
                                    key={deterioro._id}
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Text style={{ fontSize: 10 }}>
                                      {deterioro.codigo}
                                    </Text>
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {deterioro.camposDefinidos.map(
                                        (campo) => (
                                          <View
                                            key={campo._id}
                                            style={{ width: "50%", padding: 2 }}
                                          >
                                            <Text style={{ fontSize: 10 }}>
                                              {campo.nombre}:{" "}
                                              {campo.tipo !==
                                              DefinedFieldTypes.IMAGE
                                                ? campo.valor
                                                : "(Imagen)"}
                                            </Text>
                                          </View>
                                        )
                                      )}
                                    </View>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Resumen de criticidad en PDF */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subheader}>Análisis de Criticidad</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "33%", padding: 5 }}>
              <Text>Alta (≥7): </Text>
              <Text style={pdfStyles.criticalityHigh}>
                {countCriticalItems(inspection, 7, null)}
              </Text>
            </View>
            <View style={{ width: "33%", padding: 5 }}>
              <Text>Media (4-6): </Text>
              <Text style={pdfStyles.criticalityMedium}>
                {countCriticalItems(inspection, 4, 6)}
              </Text>
            </View>
            <View style={{ width: "33%", padding: 5 }}>
              <Text>Baja (≤3): </Text>
              <Text style={pdfStyles.criticalityLow}>
                {countCriticalItems(inspection, 0, 3)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export { InspectionReportPreview, InspectionReportPDF };
