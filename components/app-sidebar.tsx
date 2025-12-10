"use client"

import * as React from "react"
import { useNotes } from "@/hooks/use-notes"
import { Plus, Trash2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { notes, addNote, setCurrentNoteId, currentNoteId, deleteNote } = useNotes();
  const [noteToDelete, setNoteToDelete] = React.useState<string | null>(null);

  const handleButton = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      tags: [],
      parentId: null,
      deleted: false,
      synced: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    addNote(newNote);
    setCurrentNoteId(newNote.id);

  }

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <NotebookPen className="size-4" />
          </div> */}
          <div className="grid flex-1 text-left text-lg leading-normal">
            <span className="truncate font-mono text-foreground">OwnSpace</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel >
            All Notes
            <SidebarGroupAction title="Add Project" onClick={() => handleButton()}>
              <Plus /> <span className="sr-only">Add Note</span>
            </SidebarGroupAction>
          </SidebarGroupLabel>
          <SidebarMenu>
            {notes.map((note) => (
              <SidebarMenuItem key={note.id}>
                <SidebarMenuButton
                  onClick={() => {
                    setCurrentNoteId(note.id);
                  }}
                  className={currentNoteId === note.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-accent-foreground'}
                >
                  <span>{note.title}</span>
                </SidebarMenuButton>
                <SidebarMenuAction
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents opening the note
                    setNoteToDelete(note.id);
                  }}
                  showOnHover
                  title="Delete Note"
                >
                  <Trash2 /> <span className="sr-only">Delete</span>
                </SidebarMenuAction>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <AlertDialog open={!!noteToDelete} onOpenChange={() => setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (noteToDelete) {
                  deleteNote(noteToDelete);
                  setNoteToDelete(null);
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  )
}
