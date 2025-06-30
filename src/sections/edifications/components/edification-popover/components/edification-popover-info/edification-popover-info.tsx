import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  value: number;
  badge: {
    label: string;
    color: string;
  };
}

export default function EdificationPopoverInfo({ title, value, badge }: Props) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{value.toFixed(1)}</span>
        <Badge color={badge.color} className="text-xs">
          {badge.label}
        </Badge>
      </div>
    </div>
  );
}
