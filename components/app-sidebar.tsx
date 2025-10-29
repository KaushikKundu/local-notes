"use client"

import { useNotes } from "@/hooks/use-notes"
import { AudioWaveform, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"

const data = {
  user: {
    name: "Kaushik",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { notes, addNote, setCurrentNoteId, currentNoteId } = useNotes();
  
  console.log('🏠 AppSidebar render - currentNoteId:', currentNoteId);
  console.log('🏠 AppSidebar render - notes count:', notes.length);
  
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
    
    console.log('➕ Creating new note:', newNote.id);
    addNote(newNote);
    setCurrentNoteId(newNote.id);
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <AudioWaveform className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-lg leading-normal">
            <span className="truncate font-medium">LocalNotes</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>All Notes</span>
            <SidebarGroupAction title="Add Project" onClick={handleButton}>
              <Plus /> <span className="sr-only">Add Note</span>
            </SidebarGroupAction>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map((note) => (
                <SidebarMenuItem key={note.id}>
                  <SidebarMenuButton 
                    onClick={() => {
                      console.log('📝 Note clicked:', note.id);
                      setCurrentNoteId(note.id);
                    }}
                    className={currentNoteId === note.id ? 'bg-accent' : ''}
                  >
                    <span>{note.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

