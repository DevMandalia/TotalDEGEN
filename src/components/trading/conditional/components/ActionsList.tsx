
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Action } from "../types";
import ActionRow from "./ActionRow";
import OrderModal from "./OrderModal";

interface ActionsListProps {
  trueActions: Action[];
  falseActions: Action[];
  onAddAction: (actionType: 'true' | 'false') => void;
  onUpdateAction: (id: string, field: string, value: string) => void;
  onRemoveAction: (id: string) => void;
}

const ActionsList = ({ trueActions, falseActions, onAddAction, onUpdateAction, onRemoveAction }: ActionsListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState<'true' | 'false'>('true');
  const [editingActionId, setEditingActionId] = useState<string | null>(null);

  const handleAddAction = (actionType: 'true' | 'false') => {
    setModalActionType(actionType);
    setEditingActionId(null);
    setModalOpen(true);
  };

  const handleEditAction = (actionId: string, actionType: 'true' | 'false') => {
    setModalActionType(actionType);
    setEditingActionId(actionId);
    setModalOpen(true);
  };

  const handleSaveAction = (actionData: Omit<Action, 'id'>) => {
    if (editingActionId) {
      // Update existing action
      Object.entries(actionData).forEach(([field, value]) => {
        onUpdateAction(editingActionId, field, value);
      });
    } else {
      // Create new action
      onAddAction(modalActionType);
      // Get the newly created action ID and update it
      const actions = modalActionType === 'true' ? trueActions : falseActions;
      const newActionId = (Date.now()).toString();
      setTimeout(() => {
        Object.entries(actionData).forEach(([field, value]) => {
          onUpdateAction(newActionId, field, value);
        });
      }, 0);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full flex justify-between items-start max-w-6xl">
      {/* FALSE Actions - Left Side */}
      <div className="flex flex-col items-center">
        {/* Connecting Line from IF to Actions Rectangle */}
        <div className="w-0.5 h-16 bg-gradient-to-b from-red-400 to-transparent mb-4"></div>
        
        {/* Actions to Execute Rectangle */}
        <div className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/50 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-bold text-red-200 text-center">Actions to Execute</h4>
        </div>
        
        {/* FALSE Action Rows */}
        <div className="space-y-3 w-80">
          {falseActions.map((action) => (
            <ActionRow
              key={action.id}
              action={action}
              onRemove={onRemoveAction}
              onEdit={() => handleEditAction(action.id, 'false')}
              actionType="false"
            />
          ))}
          
          <div className="flex justify-center">
            <Button
              onClick={() => handleAddAction('false')}
              disabled={falseActions.length >= 4}
              className="backdrop-blur-sm bg-gradient-to-r from-red-500/30 to-rose-500/30 border border-red-400/50 text-red-200 hover:bg-gradient-to-r hover:from-red-500/50 hover:to-rose-500/50 hover:border-red-400/80 hover:text-red-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 hover:shadow-red-500/40 w-10 h-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* TRUE Actions - Right Side */}
      <div className="flex flex-col items-center">
        {/* Connecting Line from IF to Actions Rectangle */}
        <div className="w-0.5 h-16 bg-gradient-to-b from-green-400 to-transparent mb-4"></div>
        
        {/* Actions to Execute Rectangle */}
        <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-bold text-green-200 text-center">Actions to Execute</h4>
        </div>
        
        {/* TRUE Action Rows */}
        <div className="space-y-3 w-80">
          {trueActions.map((action) => (
            <ActionRow
              key={action.id}
              action={action}
              onRemove={onRemoveAction}
              onEdit={() => handleEditAction(action.id, 'true')}
              actionType="true"
            />
          ))}
          
          <div className="flex justify-center">
            <Button
              onClick={() => handleAddAction('true')}
              disabled={trueActions.length >= 4}
              className="backdrop-blur-sm bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 text-green-200 hover:bg-gradient-to-r hover:from-green-500/50 hover:to-emerald-500/50 hover:border-green-400/80 hover:text-green-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40 w-10 h-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAction}
        actionType={modalActionType}
      />
    </div>
  );
};

export default ActionsList;
