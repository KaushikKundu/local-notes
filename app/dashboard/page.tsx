"use client"
import { AppSidebar } from "@/components/app-sidebar"
import Editor from "@/components/Editor"
import { useEffect, useRef, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useNotes } from "@/hooks/use-notes"

export default function Page() {
  const { currentNoteId, notes, updateNote } = useNotes();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentNote = notes.find(n => n.id === currentNoteId);
  const title = currentNote?.title;
  console.log("note id:", currentNoteId)

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setEditTitle(title || 'New Note');
  };

  const handleTitleSave = async () => {
    if (currentNoteId && editTitle.trim()) {
      console.log(currentNoteId)
      await updateNote(currentNoteId, { title: editTitle.trim() });
    }else{
      console.log("save")
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {isEditingTitle ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-b border-gray-400 outline-none px-1"
                      />
                    ) : (
                      <BreadcrumbPage
                        onClick={handleTitleClick}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {title || "New Note"}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <Editor />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
