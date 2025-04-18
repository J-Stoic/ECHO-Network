'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WithdrawPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('wallet');
    if (stored) setBalance(parseInt(stored));
  }, []);

  const handleWithdraw = () => {
    const parsed = parseFloat(amount);
    const withdrawAmount = Math.round(parsed * 100);

    if (isNaN(parsed) || parsed <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (withdrawAmount > balance) {
      alert('You cannot withdraw more than your balance.');
      return;
    }

    setLoading(true);
    const newBalance = balance - withdrawAmount;
    localStorage.setItem('wallet', String(newBalance));
    setBalance(newBalance);
    setAmount('');
    alert(`$${parsed.toFixed(2)} withdrawn.`);
    setLoading(false);

    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">Withdraw Funds</h1>

        <p className="text-lg">
          Current Balance: <span className="font-bold">${(balance / 100).toFixed(2)}</span>
        </p>

        <input
          type="number"
          placeholder="Enter amount to withdraw ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </div>
    </main>
  );
}