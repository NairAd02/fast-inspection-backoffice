"use client";
import { Button } from "@/components/ui/button";
import { InspectionDetails } from "@/lib/types/inspections";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { InspectionReportPDF } from "../reports/inspection-report";

interface Props {
  inspection: InspectionDetails;
}

export default function ReportGenerationSection({ inspection }: Props) {
  const handleGeneratePDF = async () => {
    const blob = await pdf(
      <InspectionReportPDF inspection={inspection} />
    ).toBlob();
    saveAs(blob, `reporte-inspeccion-${inspection._id}.pdf`);
  };
  return (
    <div>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleGeneratePDF}
      >
        <DownloadIcon className="h-4 w-4" />
        Exportar Reporte
      </Button>
    </div>
  );
}
