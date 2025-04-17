'use client';

export default function CancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 gap-4">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled ❌</h1>

      <p className="text-lg text-gray-700">
        Your payment was not completed.
      </p>

      <a
        href="/"
        className="text-blue-600 underline"
      >
        Back to Dashboard
      </a>
    </main>
  );
}
