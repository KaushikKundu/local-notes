import {create} from 'zustand'
import {Editor} from '@tiptap/react'
import { Note } from './db';

interface EditorState {
    editor: Editor | null;
    setEditor: (editor:Editor | null) => void;
}
export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({editor}),
}))

interface NotesState {
  notes: Note[];
  currentNoteId: string | null;
  isLoading: boolean;
  setNotes: (notes: Note[]) => void;
  setCurrentNoteId: (id: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    setNotes: (notes) => set({notes}),
    currentNoteId: null,
    setCurrentNoteId: (currentNoteId) => set({currentNoteId}),
    isLoading: true,
    setIsLoading: (isLoading) => set({isLoading}),
}))