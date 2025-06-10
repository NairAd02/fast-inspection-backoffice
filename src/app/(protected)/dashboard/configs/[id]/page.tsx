import { getConfigById } from "@/lib/services/configs";
import ConfigManagementContainer from "@/sections/configs/config-management/config-management-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ConfigManagementPage({ params }: Props) {
  const id = (await params).id;
  const { response, error } = await getConfigById(id);
  if (!response || error) throw new Error("Error fetching config");
  const config = response;
  return (
    <>
      <ConfigManagementContainer version={id} />
    </>
  );
}
