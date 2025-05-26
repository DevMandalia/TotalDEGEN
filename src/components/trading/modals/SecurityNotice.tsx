// src/components/trading/modals/SecurityNotice.tsx
import { Shield } from "lucide-react";

export const SecurityNotice = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-3">
      <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-gray-300">
        Your API keys are encrypted and stored securely. We never store your secret keys in plain text.
      </p>
    </div>
  );
};
