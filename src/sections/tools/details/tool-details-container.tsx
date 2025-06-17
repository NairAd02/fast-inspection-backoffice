import { Separator } from "@/components/ui/separator";
import { ToolDetails } from "@/lib/types/tools";
import ToolDetailsHeader from "./tool-details-header/tool-details-header";
import ToolDetailsStatistics from "./tool-details-statistics/tool-details-statistics";
import ToolDetailsImportanceDistribution from "./tool-details-importance-distribution/tool-details-importance-distribution";
import ToolDetailsFields from "./tool-details-fields/tool-details-fields";

interface Props {
  tool: ToolDetails;
}

export default function ToolDetailsContainer({ tool }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Header Section */}
      <ToolDetailsHeader tool={tool} />

      <Separator />

      {/* Statistics Section */}
      <ToolDetailsStatistics tool={tool} />

      {/* Importance Distribution */}
      <ToolDetailsImportanceDistribution tool={tool} />

      <Separator />

      {/* Fields Section */}
      <ToolDetailsFields tool={tool} />
    </div>
  );
}
