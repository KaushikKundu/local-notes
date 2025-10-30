'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Menubar } from './MenuBar'
import { useEditorStore } from '@/lib/store'
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'
import { TaskList, TaskItem } from '@tiptap/extension-list'
import Image from '@tiptap/extension-image'
import { useNotes } from '@/hooks/use-notes'
import { useEffect } from 'react'

const Editor = () => {
    const { setEditor } = useEditorStore();
    const { notes, currentNoteId, updateNote } = useNotes();
    const currentNote = notes.find(n => n.id === currentNoteId);
    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            Image,
            TaskItem.configure({
                nested: true,
            }),
            TextStyle,
            FontFamily,
        ],
        content: currentNote?.content || '<p>Start Writing..🌎️</p>',
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
            if (currentNoteId) {
                const html = editor.getHTML();
                updateNote(currentNoteId, { content: html });
            }
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
    useEffect(() => {
        if (editor && currentNote) {
            const currentContent = editor.getHTML();
            const newContent = currentNote.content || '<p>Start Writing..🌎️</p>';

            if (currentContent !== newContent) {
                console.log('Content different, updating editor');
                editor.commands.setContent(newContent);
            } else {
                console.log('Content same, not updating');
            }
        } else {
            console.log('Editor or currentNote not ready:', { editor: !!editor, currentNote: !!currentNote });
        }
    }, [currentNoteId]);
    if (!currentNoteId) {
        return (
            <div className="flex items-center justify-center h-full text-foreground text-xl">
                Select a note to start editing
            </div>
        );
    }
    return (
        <div className='size-full py-2 overflow-x-auto  min-h-screen'>
            <Menubar />
            <div className='min-w-max text-foreground'>
                {!currentNoteId ? (
                    <div className="flex items-center justify-center h-full text-xl">
                        Select a note to start editing
                    </div>
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
        </div>
    );
}

export default Editor;