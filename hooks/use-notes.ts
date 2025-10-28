'use client'

import { useState, useEffect, useCallback } from 'react';
import { 
  Note, 
  deleteNote as dbDeleteNote, 
  getAllNotes,
  createNote as dbAddNote  
} from '../lib/db';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const allNotes = await getAllNotes();
      setNotes(allNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = useCallback(async (note: Note) => {
    try {
      await dbAddNote(note);  // Use the renamed import
      setNotes((prev) => [...prev, note]);
      return note.id;
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  }, []);


  const deleteNote = useCallback(async (id: string) => {
    try {
      await dbDeleteNote(id);  
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (currentNoteId === id) {
        setCurrentNoteId(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  }, [currentNoteId]);

  return {
    notes,
    currentNoteId,
    setCurrentNoteId,
    isLoading,
    addNote,
    deleteNote,
  };
}