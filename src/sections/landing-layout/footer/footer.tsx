import { Building2Icon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2Icon className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">InspectPro</span>
            </div>
            <p className="text-gray-400">
              La plataforma más completa para la gestión de inspecciones de
              edificaciones y proyectos de construcción.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integraciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Estado del Sistema
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Seguridad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 InspectPro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
