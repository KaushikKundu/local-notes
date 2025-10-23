// app/test-db/page.tsx
'use client';

import { useState } from 'react';
import * as db from '@/lib/db';

export default function TestDBPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const log = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const runTests = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      // Test 1: Create
      log('🧪 Creating note...');
      const note = await db.createNote({
        title: 'Test Note',
        content: 'Testing content',
        tags: ['test'],
        parentId: null,
        deleted: false,
        synced: false,
      });
      log(`✅ Created note: ${note.id}`);
      
      // Test 2: Get All
      log('🧪 Getting all notes...');
      const all = await db.getAllNotes();
      log(`✅ Found ${all.length} notes`);
      
      // Test 3: Update
      log('🧪 Updating note...');
      await db.updateNote(note.id, { title: 'Updated Title' });
      log('✅ Note updated');
      
      // Test 4: Get by ID
      log('🧪 Getting note by ID...');
      const found = await db.getNoteById(note.id);
      log(`✅ Found: ${found?.title}`);
      
      // Test 5: Delete
      log('🧪 Deleting note...');
      await db.deleteNote(note.id);
      log('✅ Note deleted');
      
      // Test 6: Verify
      log('🧪 Verifying deletion...');
      const after = await db.getAllNotes();
      log(`✅ Notes remaining: ${after.length}`);
      
      log('🎉 All tests passed!');
      
    } catch (error) {
      log(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearDB = async () => {
    try {
      const all = await db.getAllNotes();
      for (const note of all) {
        await db.deleteNote(note.id);
      }
      log('🗑️ Database cleared');
    } catch (error) {
      log(`❌ Clear failed: ${error}`);
    }
  };

  const viewDB = async () => {
    try {
      const all = await db.getAllNotes();
      log(`📊 Total notes: ${all.length}`);
      all.forEach((note, i) => {
        log(`  ${i + 1}. ${note.title} (${note.id})`);
      });
    } catch (error) {
      log(`❌ View failed: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Database Test Page</h1>
      
      <div className="flex gap-3 mb-6">
        <button
          onClick={runTests}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run All Tests'}
        </button>
        
        <button
          onClick={viewDB}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Database
        </button>
        
        <button
          onClick={clearDB}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Database
        </button>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-gray-500">Click "Run All Tests" to start...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))
        )}
      </div>
    </div>
  );
}