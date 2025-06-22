"use client";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { TabsContainer, TabsType } from "@/components/ui/tabs-panel/tabs-panel";
import React from "react";

interface Props {
  tabs: TabsType[];
}

export default function ChartTabs({ tabs }: Props) {
  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <TabsContainer tabs={tabs} />
    </TabsPanelProvider>
  );
}
