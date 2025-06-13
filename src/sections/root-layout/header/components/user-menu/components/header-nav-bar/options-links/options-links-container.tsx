"use client";
import PopoverContainer from "@/components/ui/popover-container";
import { useBreakpoint } from "@/hooks/screen/use-breakpoint";
import React from "react";
import OptionsLinks from "./options-links";
import { AlignJustifyIcon } from "lucide-react";

export default function OptionsLinksContainer() {
  const breakpoint = useBreakpoint();
  return breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md" ? (
    <PopoverContainer trigger={<AlignJustifyIcon />}>
      <OptionsLinks />
    </PopoverContainer>
  ) : (
    <OptionsLinks />
  );
}
