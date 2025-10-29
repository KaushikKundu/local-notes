import { ToolbarButton } from "./ToolbarButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Card } from "./ui/card"
import { ChevronDown, Undo, Redo, Italic, Underline, List, ListOrdered, Link, Image, Bold, LucideIcon, SpellCheck, BoldIcon, LucideListTodo, ImageDown } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { useCallback, useState } from "react"
import { HeadingButtons } from "./HeadingButtons"
const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const [font, setFont] = useState<string>("Font");
    const fonts = [
        { label: "Sans Serif", value: "sans-serif" },
        { label: "Serif", value: "serif" },
        { label: "Monospace", value: "monospace" },
        { label: "Cursive", value: "cursive" },
        { label: "Fantasy", value: "fantasy" },
        { label: "Inter", value: "Inter, sans-serif" },
        { label: "Comic Sans", value: "'Comic Sans MS', cursive, sans-serif" },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3">
                    <span className="text-sm">{font}</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    fonts.map((font) => (
                        <DropdownMenuItem key={font.value} onClick={() => { editor?.chain().focus().setFontFamily(font.value).run(); setFont(font.label) }}>
                            {font.label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const Menubar = () => {
    const { editor } = useEditorStore();
    const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                { icon: Undo, onClick: () => editor?.chain().focus().undo().run(), label: "Undo" },
                { icon: Redo, onClick: () => editor?.chain().focus().redo().run(), label: "Redo" },
                {
                    icon: SpellCheck, onClick: () => {
                        const cur = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", cur === "true" ? "false" : "true");
                    }, label: "Toggle Spellcheck"
                }
            ],
            [
                { icon: BoldIcon, onClick: () => editor?.chain().focus().toggleBold().run(), label: "Bold", isActive: editor?.isActive("bold") || false },
                { icon: Italic, onClick: () => editor?.chain().focus().toggleItalic().run(), label: "Italic", isActive: editor?.isActive("italic") || false },
                { icon: Underline, onClick: () => editor?.chain().focus().toggleUnderline().run(), label: "Underline", isActive: editor?.isActive("underline") || false },
            ],
            [
                { icon: ListOrdered, onClick: () => editor?.chain().focus().toggleOrderedList().run(), label: "Ordered List", isActive: editor?.isActive("orderedList") },
                { icon: List, onClick: () => editor?.chain().focus().toggleBulletList().run(), label: "Bullet List", isActive: editor?.isActive("bulletList") },
                { icon: LucideListTodo, onClick: () => editor?.chain().focus().toggleTaskList().run(), label: "List Todo", isActive: editor?.isActive("taskList") },
            ]
        ]
    return (
        <div className="w-fit max-w-4xl mx-auto mt-2 rounded-lg flex bg-accent items-center justify-center p-1 space-x-1">
            {
                sections[0].map((item, index) => (
                    <ToolbarButton key={index} {...item} />
                ))
            }

            <Separator orientation="vertical" className="h-6 mx-1" />
            <HeadingButtons />

            <Separator orientation="vertical" className="h-6 mx-1" />
            {
                sections[1].map((item, index) => (
                    <ToolbarButton key={index} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 mx-1" />
            {
                sections[2].map((item, index) => (
                    <ToolbarButton key={index} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 mx-1" />
            <FontFamilyButton />
            <ToolbarButton icon={ImageDown} onClick={addImage}/>
            <Separator orientation="vertical" className="h-6 mx-1" />

        </div>
    )
}