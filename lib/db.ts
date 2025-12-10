import { openDB, DBSchema, IDBPDatabase } from "idb";
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
interface NotesDB extends DBSchema {
    notes: {
        key: string;
        value: Note;
        indexes: {
            "by-updatedAt": number;
        };
    };
}

export let dbInstance : IDBPDatabase<NotesDB> | null = null;

export async function getDb() {
    if(dbInstance) {
        return dbInstance;
    }
    dbInstance = await openDB<NotesDB>("notes-db", 1, {
        upgrade(db){
            const notesStore = db.createObjectStore("notes", { keyPath: "id" });
            notesStore.createIndex("by-updatedAt", "updatedAt");
        }
    });
    return dbInstance;
}
export async function createNote(note: Note) {
    const db = await getDb();
    await db.put('notes', note);
    return note;
}
export async function updateNote(id: string, updates: Partial<Note>){
    const db = await getDb();
    const note = await db.get('notes', id);
    if(!note) {
        throw new Error("Note not found");
    }
    const updatedNote = {
        ...note,
        ...updates,
        updatedAt: Date.now() 
    };
    await db.put('notes', updatedNote);
    return updatedNote;
}
export async function deleteNote(id: string){
    const db = await getDb();
    await db.delete('notes', id);
}
export async function getAllNotes() {
    const db = await getDb();
    const tx = db.transaction('notes','readonly');
    const store = tx.objectStore('notes');
    const notes = await store.getAll();
    return notes;
}
export async function getNoteById(id: string) {
    const db = await getDb();
    return await db.get('notes', id);
}
