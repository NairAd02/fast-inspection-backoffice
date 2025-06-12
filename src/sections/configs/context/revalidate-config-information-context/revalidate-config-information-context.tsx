"use client";
import React, { createContext } from "react";
import useRevalidateConfigInformation from "./hooks/use-revalidate-config-information";

interface Props {
  revalidateConfigInformation: () => Promise<void>;
}

const defaultProps: Props = {
  revalidateConfigInformation: () => {
    throw new Error("revalidateConfigInformation no está definido.");
  },
};

export const RevalidateConfigInformationContext =
  createContext<Props>(defaultProps);

export function RevalidateConfigInformationProvider({
  children,
  configVersion,
}: {
  children: React.ReactNode;
  configVersion: string;
}) {
  const { revalidateConfigInformation } = useRevalidateConfigInformation({
    configVersion,
  });

  return (
    <RevalidateConfigInformationContext.Provider
      value={{
        revalidateConfigInformation,
      }}
    >
      {children}
    </RevalidateConfigInformationContext.Provider>
  );
}
