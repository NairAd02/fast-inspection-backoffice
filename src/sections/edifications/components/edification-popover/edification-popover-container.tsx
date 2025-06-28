"use client";

import type React from "react";
import useEdification from "../../hooks/use-edification";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import EdificationPopover from "./edification-popover";

interface EdificationPopoverProps {
  edificationId: string;
}

export default function EdificationPopoverContainer({
  edificationId,
}: EdificationPopoverProps) {
  const { edification, loading, error, fetchEdification } = useEdification({
    id: edificationId,
  });

  return (
    <div>
      {!loading ? (
        edification && !error ? (
          <EdificationPopover edification={edification} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchEdification}
          />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
