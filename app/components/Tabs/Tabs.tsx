"use client";

type TabOption = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
};

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex w-full justify-center gap-3">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";
import Calculator from "../Calculator/Calculator";
import CharacterCounter from "../CharacterCounter/CharacterCounter";

type Tab = "calculator" | "characterCounter";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<Tab>("calculator");

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8">
      <div className="flex gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        <button
          onClick={() => setActiveTab("calculator")}
          className={`rounded-md px-6 py-2 font-medium transition-colors ${
            activeTab === "calculator"
              ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab("characterCounter")}
          className={`rounded-md px-6 py-2 font-medium transition-colors ${
            activeTab === "characterCounter"
              ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          Character Counter
        </button>
      </div>

      <div className="w-full">
        {activeTab === "calculator" && <Calculator />}
        {activeTab === "characterCounter" && <CharacterCounter />}
      </div>
    </div>
  );
}

