'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Menubar } from './MenuBar'
import { useEditorStore } from '@/lib/use-editor-store'
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'
import { TaskList, TaskItem } from '@tiptap/extension-list'
import Heading from '@tiptap/extension-heading'
const Editor = () => {
    const { setEditor } = useEditorStore();

    const editor = useEditor({
        extensions: [
            StarterKit, 
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Heading.configure({ levels: [1, 2, 3 ],
            }),
            TextStyle,
            FontFamily,
        ],
        content: '<p>Start Writing..🌎️</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-0 focus:outline-none py-4 px-10 min-h-screen',
            }
        },
        immediatelyRender: false,
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },
        onTransaction({ editor }) {
            setEditor(editor);
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onFocus({ editor }) {
            setEditor(editor);
        },
    })

    return (
        <div className='size-full py-2 overflow-x-auto border border-gray-300  min-h-screen'>
            <Menubar />
            <div className='min-w-max text-foreground'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default Editor;