import { Navbar } from "@/app/components";

export default async function Page() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <Navbar />
      <h1 className="text-center text-3xl font-semibold items-center">
        Página en construcción!
      </h1>
    </main>
  );
}
