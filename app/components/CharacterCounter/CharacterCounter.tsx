"use client";

import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState<string>("");
  const characterCount = text.length;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Character Counter
      </h1>

      <div className="flex w-full flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="min-h-[200px] w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 resize-none"
        />
        <div className="rounded-lg bg-zinc-100 px-4 py-3 text-center dark:bg-zinc-800">
          <span className="text-lg font-semibold text-black dark:text-zinc-50">
            Characters: {characterCount}
          </span>
        </div>
      </div>
    </div>
  );
}

