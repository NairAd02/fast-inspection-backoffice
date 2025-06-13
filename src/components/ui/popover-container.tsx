import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Props {
  children: ReactNode;
  trigger: ReactNode;
}

export default function PopoverContainer({ children, trigger }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="">{children}</PopoverContent>
    </Popover>
  );
}
