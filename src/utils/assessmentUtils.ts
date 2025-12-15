import type {
  AssessmentByIdData,
  AssessmentQuestion,
} from "@/app/api/assessments";

/**
 * The data structure for a single step containing multiple questions.
 */
export interface IGroupedStep {
  step: number;
  questions: AssessmentQuestion[];
}

/**
 * The data structure for a module containing multiple steps.
 */
export interface IGroupedModule {
  moduleId: string;
  moduleName: string;
  steps: IGroupedStep[];
}

/**
 * Groups questions from an assessment by module and then by step.
 * @param assessmentData The assessment data object from your API.
 * @returns An array of modules, each containing steps with their corresponding questions.
 */
export function groupQuestionsByModuleAndStep(
  assessmentData: AssessmentByIdData
): IGroupedModule[] {
  if (!assessmentData || !assessmentData.questions || !assessmentData.modules) {
    return [];
  }

  const { questions, modules, assessment } = assessmentData;

  // Use a Map for efficient grouping: ModuleID -> StepNumber -> Questions[]
  const groupedData = new Map<string, Map<number, AssessmentQuestion[]>>();

  // Use the first module as default for questions without module_id
  const defaultModuleId = modules.length > 0 ? modules[0]._id : "default";

  // Populate the map
  for (const question of questions) {
    // If question doesn't have module_id, assign it to the first module
    const moduleId = question.module_id || defaultModuleId;

    if (!moduleId) {
      console.warn("Question skipped - no module available:", question._id);
      continue;
    }

    if (!groupedData.has(moduleId)) {
      groupedData.set(moduleId, new Map<number, AssessmentQuestion[]>());
    }
    const moduleGroup = groupedData.get(moduleId)!;

    if (!moduleGroup.has(question.step)) {
      moduleGroup.set(question.step, []);
    }
    const stepGroup = moduleGroup.get(question.step)!;
    stepGroup.push(question);
  }

  // Convert the map to the final array structure, ordered by the assessment's modules array
  const result: IGroupedModule[] = [];
  for (const moduleInfo of modules) {
    const moduleQuestions = groupedData.get(moduleInfo._id);

    if (moduleQuestions) {
      const steps: IGroupedStep[] = [];
      // Sort steps by step number and convert to the desired object structure
      const sortedStepNumbers = Array.from(moduleQuestions.keys()).sort(
        (a, b) => a - b
      );

      for (const stepNumber of sortedStepNumbers) {
        steps.push({
          step: stepNumber,
          questions: moduleQuestions.get(stepNumber)!,
        });
      }

      if (steps.length > 0) {
        result.push({
          moduleId: moduleInfo._id,
          moduleName: moduleInfo.title,
          steps: steps,
        });
      }
    }
  }

  return result;
}

export function groupApplicationQuestionsByModuleAndStep(
  assessmentData: AssessmentByIdData
): IGroupedModule[] {
  if (!assessmentData || !assessmentData.questions || !assessmentData.modules) {
    return [];
  }

  const { questions, modules, assessment } = assessmentData;
  // console.log("Questions", questions);
  // console.log("Modules", modules);
  // console.log("Assessment", assessment);

  // Use a Map for efficient grouping: ModuleID -> StepNumber -> Questions[]
  const groupedData = new Map<string, Map<number, AssessmentQuestion[]>>();

  let i: number = 0;
  // Populate the map
  for (const question of questions) {
    if (!question.module_ref) continue;

    const question_module_id = `${question.module_ref}_${i++}`;

    if (!groupedData.has(question.module_ref)) {
      groupedData.set(
        question.module_ref,
        new Map<number, AssessmentQuestion[]>()
      );
    }
    const moduleGroup = groupedData.get(question.module_ref)!;

    if (!moduleGroup.has(question.step)) {
      moduleGroup.set(question.step, []);
    }
    const stepGroup = moduleGroup.get(question.step)!;
    stepGroup.push(question);
  }

  // console.log("Grouped Data", groupedData);
  // console.log(
  //   "Available module_ref keys in questions:",
  //   Array.from(groupedData.keys())
  // );
  // console.log(
  //   "Modules in assessment:",
  //   modules.map((m) => ({ temp_id: m.temp_id, title: m.title }))
  // );

  // Convert the map to the final array structure, ordered by the assessment's modules array
  const result: IGroupedModule[] = [];

  // If there's a mismatch, we'll collect all questions regardless
  const allGroupedDataKeys = Array.from(groupedData.keys());

  for (const moduleInfo of modules) {
    // Try matching by temp_id first, then by title
    let moduleQuestions = moduleInfo.title
      ? groupedData.get(moduleInfo.title)
      : undefined;
    if (!moduleQuestions && moduleInfo.title) {
      moduleQuestions = groupedData.get(moduleInfo.title);
    }

    // console.log(`Trying to match module:`, {
    //   temp_id: moduleInfo.temp_id,
    //   title: moduleInfo.title,
    //   foundQuestions: !!moduleQuestions,
    // });

    if (moduleQuestions) {
      const steps: IGroupedStep[] = [];
      // Sort steps by step number and convert to the desired object structure
      const sortedStepNumbers = Array.from(moduleQuestions.keys()).sort(
        (a, b) => a - b
      );

      for (const stepNumber of sortedStepNumbers) {
        steps.push({
          step: stepNumber,
          questions: moduleQuestions.get(stepNumber)!,
        });
      }

      if (steps.length > 0) {
        result.push({
          moduleId: moduleInfo.temp_id || moduleInfo.title,
          moduleName: moduleInfo.title,
          steps: steps,
        });
      }
    }
  }

  // If no questions were matched but we have questions, assign them to the first module as fallback
  if (
    result.length === 0 &&
    allGroupedDataKeys.length > 0 &&
    modules.length > 0
  ) {
    console.warn(
      "No module match found. Using fallback: assigning all questions to first module"
    );
    const firstModule = modules[0];
    const allSteps: IGroupedStep[] = [];

    // Collect all questions from all module_refs
    for (const moduleRef of allGroupedDataKeys) {
      const questions = groupedData.get(moduleRef);
      if (questions) {
        const sortedStepNumbers = Array.from(questions.keys()).sort(
          (a, b) => a - b
        );
        for (const stepNumber of sortedStepNumbers) {
          allSteps.push({
            step: stepNumber,
            questions: questions.get(stepNumber)!,
          });
        }
      }
    }

    if (allSteps.length > 0) {
      result.push({
        moduleId: firstModule.temp_id || firstModule.title,
        moduleName: firstModule.title,
        steps: allSteps,
      });
    }
  }

  // console.log("Final grouped result:", result);
  return result;
}
