import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Props {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TooltipContainer({
  children,
  content,
  className,
  onClick,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger className={className} onClick={onClick}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
