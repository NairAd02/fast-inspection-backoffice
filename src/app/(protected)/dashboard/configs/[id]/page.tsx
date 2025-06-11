import ConfigManagementContainer from "@/sections/configs/config-management/config-management-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ConfigManagementPage({ params }: Props) {
  const id = (await params).id;
  return (
    <>
      <ConfigManagementContainer version={id} />
    </>
  );
}
