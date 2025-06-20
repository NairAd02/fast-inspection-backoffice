import React, { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function InfoCard({ title, description, icon }: Props) {
  return (
    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <span className="text-sm font-medium text-emerald-600">{title}</span>
      </div>
      <p className="text-emerald-900 font-semibold text-sm">{description}</p>
    </div>
  );
}
