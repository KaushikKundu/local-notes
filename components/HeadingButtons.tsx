import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { type Level } from "@tiptap/extension-heading"

export const HeadingButtons = () => {
    const { editor } = useEditorStore();
    const headings = [
        { label: "Normal", value: 0 },
        { label: "Heading 1", value: 1 },
        { label: "Heading 2", value: 2 },
        { label: "Heading 3", value: 3 },
    ]
    const getCurrentHeading = () => {
        if(!editor) return "Normal";
        for(let level = 0; level < 4; level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`;
            }
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3">
                    <span className="text-sm">{getCurrentHeading() || "Normal"}</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    headings.map(({ value, label }) => (
                        <DropdownMenuItem key={value} onClick={() => {
                            if(value == 0){
                                editor?.chain().focus().setParagraph().run();
                            }else {
                                editor?.chain().focus().toggleHeading({level: value as Level}).run();
                            }
                        }}
                        >
                            {label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}