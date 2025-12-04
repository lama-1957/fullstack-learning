'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch(() => setError('Could not connect to backend'));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 Full Stack App
        </h1>
        
        <div className="text-xl text-gray-200 mb-6">
          {error ? (
            <span className="text-red-400">{error}</span>
          ) : (
            <span className="text-green-400">{message}</span>
          )}
        </div>

        <div className="text-sm text-gray-400">
          <p>Frontend: Next.js 14 + React + Tailwind</p>
          <p>Backend: NestJS + TypeScript</p>
        </div>
      </div>
    </main>
  );
}