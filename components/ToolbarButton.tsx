import { Button } from "./ui/button"

interface ToolbarButtonProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick: () => void;
    isActive?: boolean;
}
export const ToolbarButton = ({icon:Icon,label,onClick,isActive}:ToolbarButtonProps) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      className="h-8 w-8 p-0 cursor-pointer"
      title={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
