'use client';

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed up successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">Easy Economy Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full max-w-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full max-w-md"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex space-x-4">
        <button onClick={handleSignup} className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
        <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded">
          Log In
        </button>
      </div>
    </div>
  );
}