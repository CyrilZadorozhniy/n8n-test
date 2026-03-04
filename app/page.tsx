import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold mb-8">n8n Test</h1>
        <div className="flex flex-col gap-4">
          <Link
            href="/step1"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Step 1 - Agents Panel
          </Link>
          <Link
            href="/chat-constructor"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Chat Constructor (Sunbeam)
          </Link>
        </div>
      </main>
    </div>
  );
}
