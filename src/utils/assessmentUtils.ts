import type { AssessmentByIdData, AssessmentQuestion } from '@/app/api/assessments';

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
export function groupQuestionsByModuleAndStep(assessmentData: AssessmentByIdData): IGroupedModule[] {
  if (!assessmentData || !assessmentData.questions || !assessmentData.modules) {
    return [];
  }

  const { questions, modules, assessment } = assessmentData;

  // Use a Map for efficient grouping: ModuleID -> StepNumber -> Questions[]
  const groupedData = new Map<string, Map<number, AssessmentQuestion[]>>();

  // Populate the map
  for (const question of questions) {
    if (!question.module_id) continue;

    if (!groupedData.has(question.module_id)) {
      groupedData.set(question.module_id, new Map<number, AssessmentQuestion[]>());
    }
    const moduleGroup = groupedData.get(question.module_id)!;

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
      const sortedStepNumbers = Array.from(moduleQuestions.keys()).sort((a, b) => a - b);

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
