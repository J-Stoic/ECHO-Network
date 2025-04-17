'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('wallet');
    if (stored) {
      const newBalance = parseInt(stored);
      setBalance(newBalance);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 gap-4">
      <h1 className="text-3xl font-bold text-green-600">Deposit Successful 🎉</h1>

      <p className="text-lg">
        Your new wallet balance is: <span className="font-bold">${(balance / 100).toFixed(2)}</span>
      </p>

      <a
        href="/"
        className="text-blue-600 underline"
      >
        Go back to dashboard
      </a>
    </main>
  );
}