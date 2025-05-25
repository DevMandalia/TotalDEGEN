
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConditions } from "./conditional/hooks/useConditions";
import { useActions } from "./conditional/hooks/useActions";
import { useAssetSearch } from "./conditional/hooks/useAssetSearch";
import WorkflowDiamond from "./conditional/components/WorkflowDiamond";
import ConditionsList from "./conditional/components/ConditionsList";
import ActionsList from "./conditional/components/ActionsList";
import VisibilityDropdown from "./conditional/components/VisibilityDropdown";

const ConditionalTrading = () => {
  const {
    entryConditions,
    addCondition,
    removeCondition,
    updateCondition,
    toggleParenthesis
  } = useConditions();

  const {
    trueActions,
    falseActions,
    addAction
  } = useActions();

  const {
    assetSearchOpen,
    setAssetSearchOpen,
    assetSearchTerm,
    setAssetSearchTerm
  } = useAssetSearch();

  return (
    <Card className="backdrop-blur-md bg-white/5 border border-white/20 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Conditional Ordering
        </h3>
        <VisibilityDropdown />
      </div>

      {/* Workflow Layout */}
      <div className="flex flex-col items-center mb-8">
        <WorkflowDiamond />

        <ConditionsList
          conditions={entryConditions}
          onRemoveCondition={removeCondition}
          onUpdateCondition={updateCondition}
          onToggleParenthesis={toggleParenthesis}
          onAddCondition={addCondition}
          assetSearchOpen={assetSearchOpen}
          setAssetSearchOpen={setAssetSearchOpen}
          assetSearchTerm={assetSearchTerm}
          setAssetSearchTerm={setAssetSearchTerm}
        />

        <ActionsList
          trueActions={trueActions}
          falseActions={falseActions}
          onAddAction={addAction}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button className="backdrop-blur-md bg-gradient-to-r from-orange-600/80 to-orange-700/80 hover:from-orange-700/80 hover:to-orange-800/80 border border-white/20">
          Place Strategy
        </Button>
        <Button className="backdrop-blur-md bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80 border border-white/20">
          Save Strategy
        </Button>
        <Button className="backdrop-blur-md bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-700/80 hover:to-green-800/80 border border-white/20">
          Set Alerts
        </Button>
      </div>
    </Card>
  );
};

export default ConditionalTrading;
