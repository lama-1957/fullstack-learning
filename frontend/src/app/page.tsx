'use client';

import { useState, useEffect } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const API = 'http://localhost:3000/notes';

  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
    } else {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
    }
    
    setTitle('');
    setContent('');
    setEditingId(null);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  return (
    <main className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          📝 Notes App
        </h1>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700"
          >
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-2">{note.title}</h2>
              <p className="text-gray-300 mb-4">{note.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}