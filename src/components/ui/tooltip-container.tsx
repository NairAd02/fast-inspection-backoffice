import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Props {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export default function TooltipContainer({
  children,
  content,
  className,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className={className}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
