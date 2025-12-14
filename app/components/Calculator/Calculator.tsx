"use client";

import { useState } from "react";
import NumberInputForm from "../NumberInputForm/NumberInputForm";
import SumDisplay from "../SumDisplay/SumDisplay";

export default function Calculator() {
  const [number, setNumber] = useState<string>("");
  const [sum, setSum] = useState<number>(0);

  const handleAdd = () => {
    const value = parseFloat(number);
    if (!Number.isNaN(value)) {
      setSum((prev) => prev + value);
      setNumber("");
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Number Calculator
      </h1>

      <div className="flex w-full items-center gap-4">
        <NumberInputForm value={number} onChange={setNumber} onAdd={handleAdd} />
        <SumDisplay sum={sum} />
      </div>
    </div>
  );
}

