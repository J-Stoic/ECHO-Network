'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wallet');
    if (stored) setBalance(parseInt(stored));
  }, []);

  const handleDeposit = async () => {
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const newBalance = balance + Math.round(parsed * 100);
    if (newBalance < 0) {
      alert('Deposit amount results in a negative balance.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(parsed * 100) }),
      });

      const data = await response.json();
      console.log('Stripe response:', data);

      if (data.url) {
        localStorage.setItem('wallet', String(newBalance));
        window.location.assign(data.url);
      } else {
        console.error('No URL returned from Stripe API');
        alert('Failed to redirect to checkout.');
      }
    } catch (err) {
      console.error('Deposit error:', err);
      alert('Something went wrong during deposit.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">ECHO Economics</h1>

        <p className="text-lg">
          Wallet Balance: <span className="font-bold">${(balance / 100).toFixed(2)}</span>
        </p>

        <input
          type="number"
          placeholder="Enter amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleDeposit}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Redirecting...' : `Add $${amount || '0'} to Wallet`}
        </button>
      </div>
    </main>
  );
}