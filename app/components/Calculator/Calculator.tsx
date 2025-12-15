"use client";

import { useState } from "react";
import CharacterCounter from "../CharacterCounter/CharacterCounter";
import NumberInputForm from "../NumberInputForm/NumberInputForm";
import SumDisplay from "../SumDisplay/SumDisplay";
import Tabs from "../Tabs/Tabs";

export default function Calculator() {
  const [number, setNumber] = useState<string>("");
  const [sum, setSum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"numbers" | "characters">("numbers");

  const handleAdd = () => {
    const value = parseFloat(number);
    if (!Number.isNaN(value)) {
      setSum((prev) => prev + value);
      setNumber("");
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 text-center">
        Number Adder & Text Tools
      </h1>

      <Tabs
        tabs={[
          { id: "numbers", label: "Numbers" },
          { id: "characters", label: "Characters" },
        ]}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as "numbers" | "characters")}
      />

      {activeTab === "numbers" ? (
        <div className="flex w-full items-center gap-4">
          <NumberInputForm value={number} onChange={setNumber} onAdd={handleAdd} />
          <SumDisplay sum={sum} />
        </div>
      ) : (
        <CharacterCounter />
      )}
    </div>
  );
}

