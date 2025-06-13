import React from "react";

export default function OptionsLinks() {
  return (
    <div className="flex items-center gap-6">
      <a
        href="#features"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Características
      </a>
      <a
        href="#process"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Proceso
      </a>
      <a
        href="#pricing"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Precios
      </a>
    </div>
  );
}
