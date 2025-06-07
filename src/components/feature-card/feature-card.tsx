import React, { ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ClipboardCheckIcon } from "lucide-react";

interface Props {
  icon?: ReactNode;
  title: string;
  desciption: string;
}

export default function FeatureCard({ title, desciption, icon }: Props) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          {icon ? (
            icon
          ) : (
            <ClipboardCheckIcon className="h-6 w-6 text-blue-600" />
          )}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desciption}</CardDescription>
      </CardHeader>
    </Card>
  );
}
