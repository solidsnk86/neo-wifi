import { Footer, Navbar } from "../components";
import { Translator } from "../components/AiAssistant/Translator";

export default function TrasnlatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center p-2 font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
        <section className="md:max-w-4xl md:min-w-[896px] my-24">
          <Translator />
        </section>
      </main>
      <Footer />
    </>
  );
}
