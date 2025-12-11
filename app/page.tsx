"use client";

import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState<string>("");
  const [sum, setSum] = useState<number>(0);

  const handleAdd = () => {
    const num = parseFloat(number);
    if (!isNaN(num)) {
      setSum((prevSum) => prevSum + num);
      setNumber("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Number Calculator
          </h1>
          
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 flex items-center gap-3">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a number"
                className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="min-w-[100px] px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center">
              <span className="text-lg font-semibold text-black dark:text-zinc-50">
                Sum: {sum}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
