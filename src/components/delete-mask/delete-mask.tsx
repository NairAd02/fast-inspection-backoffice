"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  onDelete?: () => void;
  deleteButtonClassName?: string;
  deleteIconClassName?: string;
  children: React.ReactNode;
}

export function DeleteMask({
  onDelete,
  deleteButtonClassName = "",
  deleteIconClassName = "",
  children,
}: Props) {
  return (
    <div className="relative">
      {children}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-[-8px] -top-[-10px] h-6 w-6 rounded-full bg-primary text-destructive-foreground hover:bg-destructive/90",
            deleteButtonClassName
          )}
          onClick={onDelete}
          type="button"
        >
          <X className={cn("h-4 w-4 text-white", deleteIconClassName)} />
        </Button>
      )}
    </div>
  );
}
