import { openDB, DBSchema, IDBPDatabase } from "idb";
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  parentId: string | null;
  deleted: boolean;
  synced: boolean;
}
interface NotesDB extends DBSchema {
    notes: {
        key: string;
        value: Note;
        indexes: {
            "by-updatedAt": number;
            "by-deleted": number;
            "by-parent": string ;
        };
    };
    syncQueue: {
        key: number;
        value: {
            noteId: string;
            action: "create" | "update" | "delete";
            timestamp: number;
            data: Partial<Note>;
        };
        autoIncrement: true;
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
            notesStore.createIndex("by-deleted", "deleted");
            notesStore.createIndex("by-parent", "parentId");
            db.createObjectStore('syncQueue', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    });
    return dbInstance;
}
export async function createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' >) {
    const db = await getDb();
    const now = Date.now();
    const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now
    }
    await db.put('notes', newNote);
    console.log("note created", newNote.id)
    // await db.addToSyncQueue(newNote.id, 'create', { ...newNote });
    return newNote;
}
export async function updateNote(id: string, updates: Partial<Note>){
    const db = await getDb();
    const note = await db.get('notes', id);
    console.log(id)
    if(!note) {
        throw new Error("Note not found");
    }
    const updatedNote = {
        ...note,
        ...updates,
        updatedAt: Date.now() 
    };
    await db.put('notes', updatedNote);
    // await db.addToSyncQueue(updatedNote.id, 'update', updates);
    return updatedNote;
}
export async function deleteNote(id: string){
    const db = await getDb();
    await updateNote(id, { deleted: true });
    // await db.addToSyncQueue(id, 'delete', {});
}
export async function getAllNotes() {
    const db = await getDb();
    const notes = await db.getAllFromIndex('notes', 'by-updatedAt');
    return notes.filter(n => !n.deleted).reverse();
}
export async function getNoteById(id: string) {
    const db = await getDb();
    return await db.get('notes', id);
}
export async function addToSyncQueue(noteId:string, action: "create" | "update" | "delete", data: Partial<Note>) {
    const db = await getDb();
    const queueItem = {
        noteId,
        action,
        timestamp: Date.now(),
        data
    }
    await db.add('syncQueue', queueItem);
}