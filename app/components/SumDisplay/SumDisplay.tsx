type SumDisplayProps = {
  sum: number;
};

export default function SumDisplay({ sum }: SumDisplayProps) {
  return (
    <div className="min-w-[100px] rounded-lg bg-zinc-100 px-4 py-3 text-center dark:bg-zinc-800">
      <span className="text-lg font-semibold text-black dark:text-zinc-50">
        Product: {sum}
      </span>
    </div>
  );
}

