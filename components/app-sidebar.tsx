"use client"

import * as React from "react"
import {
  AudioWaveform,
} from "lucide-react"

import { Plus } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useNotes } from "@/hooks/use-notes"
import { Collapsible } from "./ui/collapsible"

const data = {
  user: {
    name: "Kaushik",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {notes} = useNotes();
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
        <Button variant="ghost" className="ml-auto bg-primary/10 hover:bg-sidebar-primary/80 rounded-md size-6" onClick={() => {}}>
          <Plus size={3} />
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {notes.map((item) => (
          <Collapsible
            key={item.title}
            content={item.title}
            asChild
            className="group/collapsible"
          >
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
