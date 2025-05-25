
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const VisibilityDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 font-bold transition-all duration-300 text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-md bg-gray-900/90 border border-white/20 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-white mb-3">Visible Parameters</h4>
          {/* Visible parameters toggle will be rendered here */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityDropdown;
