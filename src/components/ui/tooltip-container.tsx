import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Props {
  children: ReactNode;
  content: ReactNode;
}

export default function TooltipContainer({ children, content }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
