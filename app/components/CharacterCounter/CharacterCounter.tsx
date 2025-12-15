"use client";

import { useMemo, useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const characterCount = useMemo(() => text.length, [text]);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-8 tracking-tight text-black dark:text-zinc-50">
          Character Counter
        </h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
          {characterCount} chars
        </span>
      </div>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type or paste your text here"
        className="min-h-[140px] w-full resize-y rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />

      <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
        <span className="text-base font-medium text-black dark:text-zinc-50">Characters</span>
        <span className="text-lg font-semibold text-black dark:text-zinc-50">
          {characterCount}
        </span>
      </div>
    </div>
  );
}
