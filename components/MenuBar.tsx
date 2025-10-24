import { ToolbarButton } from "./ToolbarButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { ChevronDown, Undo, Redo, Italic, Underline, List, ListOrdered, Link, Image } from "lucide-react"

export const Menubar = () => {
    return (
        <div className="w-fit max-w-4xl mx-auto mt-2 border border-gray-100 shadow-lg rounded-lg bg-gray-100 flex items-center justify-center p-1.5 space-x-1">
            <ToolbarButton icon={Undo} onClick={() => { }} label="Undo" />
            <ToolbarButton icon={Redo} onClick={() => { }} label="Redo" />

            <Separator orientation="vertical" className="h-6 mx-1" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-3">
                        <span className="text-sm">Normal</span>
                        <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Heading 1</DropdownMenuItem>
                    <DropdownMenuItem>Heading 2</DropdownMenuItem>
                    <DropdownMenuItem>Heading 3</DropdownMenuItem>
                    <DropdownMenuItem>Normal</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 mx-1" />
            <ToolbarButton
                icon={Italic}
                isActive={true}
                onClick={() => { }}
                label="Italic"
            />
            <ToolbarButton
                icon={Underline}
                isActive={false}
                onClick={() => { }}
                label="Underline"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />
            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Lists */}
            <ToolbarButton icon={List} onClick={() => { }} label="Bullet List" />
            <ToolbarButton icon={ListOrdered} onClick={() => { }} label="Numbered List" />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Insert */}
            <ToolbarButton icon={Link} onClick={() => { }} label="Insert Link" />
            <ToolbarButton icon={Image} onClick={() => { }} label="Insert Image" />
        </div>
    )
}