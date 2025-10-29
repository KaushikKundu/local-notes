'use client'

import { useState, useEffect, useCallback } from 'react';
import { 
  Note, 
  deleteNote as dbDeleteNote, 
  getAllNotes,
  updateNote as dbUpdateNote,
  createNote as dbAddNote  
} from '../lib/db';
import { useNotesStore } from '../lib/store';

export function useNotes() {
 const notes = useNotesStore((state) => state.notes);
  const currentNoteId = useNotesStore((state) => state.currentNoteId);
  const isLoading = useNotesStore((state) => state.isLoading);
  const setNotes = useNotesStore((state) => state.setNotes);
  const setCurrentNoteId = useNotesStore((state) => state.setCurrentNoteId);
  const setIsLoading = useNotesStore((state) => state.setIsLoading);

  useEffect(() => {
    loadNotes();
  }, []);
useEffect(() => {
  console.log(notes)
},[currentNoteId])
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
      await dbAddNote(note); 
      const curNotes = useNotesStore.getState().notes;
      setNotes([...curNotes, note]);
      console.log(notes)
      return note.id;
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  }, []);
 
  const updateNote = useCallback(async (id: string, updates: Partial<Note>) => {
    try {
      await dbUpdateNote(id, updates);  
      const curNotes = useNotesStore.getState().notes;
      setNotes(curNotes.map((note) => note.id === id ? {...note, ...updates} : note));
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  }, [setNotes]);

  const deleteNote = useCallback(async (id: string) => {
    try {
      await dbDeleteNote(id);  
      const curNotes = useNotesStore.getState().notes;
      const curId = useNotesStore.getState().currentNoteId;
      setNotes(curNotes.filter((note) => note.id !== id));
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
    updateNote
  };
}