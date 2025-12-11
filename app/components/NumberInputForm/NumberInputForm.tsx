import type { KeyboardEvent } from "react";

type NumberInputFormProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function NumberInputForm({
  value,
  onChange,
  onAdd,
}: NumberInputFormProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="flex flex-1 items-center gap-3">
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a number"
        className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add
      </button>
    </div>
  );
}

