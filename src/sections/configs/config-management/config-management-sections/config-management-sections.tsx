"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { TabsContainer, TabsType } from "@/components/ui/tabs-panel/tabs-panel";
import React from "react";

interface Props {
  tabs: TabsType[];
}

export default function ConfigManagementSections({ tabs }: Props) {
  return (
    <Card>
      <CardContent className="p-4">
        <TabsPanelProvider initialTab={tabs[0].value}>
          <TabsContainer tabs={tabs} />
        </TabsPanelProvider>
      </CardContent>
    </Card>
  );
}
