import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button"


interface ToolbarButtonProps {
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
}
export const ToolbarButton = ({icon:Icon,onClick,isActive}:ToolbarButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className="size-8 p-0 cursor-pointer"
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
