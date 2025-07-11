import { stepsMap } from "../constants";
import { StepCard } from "./StepCard";

export const FifthStep = () => {
  return stepsMap
    .filter((step) => step.id === 5)
    .map((step) => (
      <StepCard
        key={step.id}
        paragraph={step.paragraph}
        url={step.url}
        info={step.info}
      />
    ));
};
