import { useState } from "react";
import WelcomePageQuestion from "../widgets/welcome-screen";
import AddModule from "../widgets/add-module";
import QuestionScreen from "../widgets/question-screen";

export default function CurrentAssessment() {
  const [activePage, setActivePage] = useState<
    "welcome" | "module" | "question" | "summary"
  >("welcome");

  const navigateToModule = ({
    step,
  }: {
    step: "welcome" | "module" | "question" | "summary";
  }) => {
    setActivePage(step);
  };

  const renderComponent = () => {
    switch (activePage) {
      case "welcome":
        return (
          <div className="my-16">
            <WelcomePageQuestion
              onSubmit={() => navigateToModule({ step: "module" })}
            />
          </div>
        );
      case "module":
        return (
          <div className="my-16">
            <AddModule
              navigateBack={() => navigateToModule({ step: "welcome" })}
              navigateNext={() => navigateToModule({ step: "question" })}
            />
          </div>
        );
      case "question":
        return (
          <div>
            <QuestionScreen />
          </div>
        );
      default:
        return <div>Select a page</div>;
    }
  };

  return <div>{renderComponent()}</div>;
}
