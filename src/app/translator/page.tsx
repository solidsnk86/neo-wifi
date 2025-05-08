import { Navbar } from "../components";
import { Translator } from "../components/AiAssistant/Translator";

export default function TrasnlatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center p-2">
        <section className="md:max-w-4xl md:min-w-[896px] my-24">
          <Translator />
        </section>
      </main>
    </>
  );
}
