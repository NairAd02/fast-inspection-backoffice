import { Separator } from "@/components/ui/separator";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import DeteriorationTypeDetailsHeader from "./deterioration-type-details-header/deterioration-type-details-header";
import DeteriorationTypeDetailsMainStatistics from "./deterioration-type-details-main-statistics/deterioration-type-details-main-statistics";
import DeteriorationTypeDetailsAffectedFields from "./deterioration-type-details-affected-fields/deterioration-type-details-affected-fields";
import DeteriorationTypeDetailsDefinedFields from "./deterioration-type-details-defined-fields/deterioration-type-details-defined-fields";
import DeteriorationTypeCauses from "./deterioration-type-causes/deterioration-type-causes";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeDetailsContainer({
  deteriorationType,
}: Props) {
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      {/* Header Section */}
      <DeteriorationTypeDetailsHeader deteriorationType={deteriorationType} />

      <Separator />

      {/* Main Statistics */}
      <DeteriorationTypeDetailsMainStatistics
        deteriorationType={deteriorationType}
      />

      <Separator />

      {/* Affected Fields */}
      <DeteriorationTypeDetailsAffectedFields
        deteriorationType={deteriorationType}
      />

      <Separator className="my-6" />

      {/* Defined Fields */}
      <DeteriorationTypeDetailsDefinedFields
        deteriorationType={deteriorationType}
      />

      <Separator className="my-6" />

      {/* Causes */}
      <DeteriorationTypeCauses deteriorationType={deteriorationType} />
    </div>
  );
}
