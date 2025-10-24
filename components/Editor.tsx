'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Menubar} from './MenuBar'
const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-0 focus:outline-none py-4 px-10 min-h-[400px]',
            }
        },
        immediatelyRender: false,
    })

    return (
        <div className='size-full py-2 overflow-x-auto border border-gray-300  min-h-screen'>
            <Menubar />
            <div className='min-w-max text-black'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default Editor;