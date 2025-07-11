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
      />
    ));
};
