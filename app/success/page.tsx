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

  const handleDeposit = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }),
      });

      const data = await response.json();
      console.log('Stripe response:', data); // log the response for debugging

      if (data.url) {
        localStorage.setItem('wallet', String(balance + 1000));
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