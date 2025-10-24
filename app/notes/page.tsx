import AppSidebar from '@/components/App-Sidebar';
import Editor from '@/components/Editor';
import ModeToggle from '@/components/ModeToggle';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='flex flex-col flex-1'>
                <header className="flex h-10 w-full border border-gray-400 shrink-0 items-center gap-2 border-b px-4 bg-background text-foreground">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <h1 className="text-lg font-medium">Notes</h1>
                    <div className='ml-auto mr-3'>
                        <ModeToggle />
                    </div>
                </header>
                <Editor />
            </main>
        </SidebarProvider>
    )
}