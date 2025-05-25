
import ConditionRow from "./ConditionRow";
import { Condition } from "../types";

interface ConditionsListProps {
  conditions: Condition[];
  onRemoveCondition: (id: string) => void;
  onUpdateCondition: (id: string, field: string, value: string) => void;
  onToggleParenthesis: (id: string, type: 'open' | 'close') => void;
  onAddCondition: (connector: string) => void;
  assetSearchOpen: boolean;
  setAssetSearchOpen: (open: boolean) => void;
  assetSearchTerm: string;
  setAssetSearchTerm: (term: string) => void;
}

const ConditionsList = ({
  conditions,
  onRemoveCondition,
  onUpdateCondition,
  onToggleParenthesis,
  onAddCondition,
  assetSearchOpen,
  setAssetSearchOpen,
  assetSearchTerm,
  setAssetSearchTerm
}: ConditionsListProps) => {
  return (
    <div className="w-full max-w-4xl space-y-4 mb-12">
      {conditions.map((condition, index) => (
        <ConditionRow
          key={condition.id}
          condition={condition}
          index={index}
          totalConditions={conditions.length}
          onRemove={onRemoveCondition}
          onUpdate={onUpdateCondition}
          onToggleParenthesis={onToggleParenthesis}
          onAddCondition={onAddCondition}
          assetSearchOpen={assetSearchOpen}
          setAssetSearchOpen={setAssetSearchOpen}
          assetSearchTerm={assetSearchTerm}
          setAssetSearchTerm={setAssetSearchTerm}
        />
      ))}
    </div>
  );
};

export default ConditionsList;
