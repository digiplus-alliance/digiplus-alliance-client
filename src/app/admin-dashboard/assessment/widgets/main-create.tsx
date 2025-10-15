import { useState, useEffect } from "react";
import WelcomePageQuestion from "../../assessment/widgets/welcome-screen";
import AddModule from "../../assessment/widgets/add-module";
import QuestionScreen from "../../assessment/widgets/question-screen";
import { FormTypeProvider } from "@/store/form-store";


export default function MainCreate({type}: {type ?: 'assessment' | 'application'}) {
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
            <QuestionScreen 
              navigateBack={() => navigateToModule({ step: "module" })} 
            />
          </div>
        );
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <FormTypeProvider formType={type || "assessment"}>
      {renderComponent()}
    </FormTypeProvider>
  );
}
