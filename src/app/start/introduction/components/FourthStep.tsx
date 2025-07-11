import { Star } from "lucide-react";
import { stepsMap } from "../constants";
import { StepCard } from "./StepCard";

export const FourthStep = () => {
  return stepsMap
    .filter((step) => step.id === 4)
    .map((step) => (
      <StepCard
        key={step.id}
        paragraph={step.paragraph}
        url={step.url}
        info={step.info}
        note={
          <article className="flex flex-col gap-3 items-center border rounded-md relative border-l-[6px] border-l-green-400 dark:border-l-green-400 p-2 border-zinc-200/70 dark:border-zinc-800 bg-[#FFFFFF] dark:bg-zinc-800/50">
            <div>
            <header className="flex gap-1 items-center">
              <Star className="fill-yellow-300 stroke-none" />
              <h3 className="font-semibold text-xl">Nota</h3>
            </header>
              <p className="p-1">
                Por el momento solamente se permiten configurar dos tipos de
                modelos de routers TP-LINK:{" "}
                <code className="text-sm mx-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-[--green]">
                  TL-WR841ND - TL-WR841HP
                </code>
              </p>
            </div>
          </article>
        }
      />
    ));
};
