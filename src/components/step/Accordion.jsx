import Step from "./Step";
import { useStore } from "../../context/useStore";
import "./Step.css"
export default function Accordion() {
  const { steps, activeStep, setStep } = useStore();

  return (
    <div className="accordion">
      {steps.map((step) => (
        <Step
          key={step.id}
          step={step}
          isOpen={activeStep === step.id}
          onToggle={() => setStep(activeStep === step.id ? null : step.id)}
        />
      ))}
    </div>
  );
}
