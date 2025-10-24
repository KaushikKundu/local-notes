'use client'
import { Bold, Italic, Underline } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Menubar} from './MenuBar'
const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-0 focus:outline-none p-4',
            }
        },
        immediatelyRender: false,
    })

    return (
        <div className='size-full p-4 overflow-x-auto border border-gray-300  min-h-screen m-2'>
            <Menubar />
            <div className='min-w-max flex justify-center text-black bg-white'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default Editor;