import React, { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SectionContainer({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="bg-gray-100 rounded-lg flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
