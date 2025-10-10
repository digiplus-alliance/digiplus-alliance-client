'use client';
import { useState, useMemo, Fragment } from 'react';
import { MultipleChoiceQuestion } from '../Assessments/MultipleChoiceQuestion';
import { CheckboxQuestion } from '../Assessments/CheckboxQuestion';
import { TextQuestion } from '../Assessments/TextQuestion';
import { DropdownQuestion } from '../Assessments/DropdownQuestion';
import { GridQuestion } from '../Assessments/GridQuestion';
import { useSubmitAssessment } from '@/app/api/assessments';
import { useAuthStore } from '@/store/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { groupQuestionsByModuleAndStep, IGroupedModule } from '@/utils/assessmentUtils';
import { type AssessmentSubmissionResponse } from '@/types/assessment';

// Import types from the assessment types file
import type { AssessmentQuestion } from '@/types/assessment';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetApplicationBySlug } from '@/app/api/assessments/useGetApplicationFormBySlug';

export default function UserApplicationForm() {
  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0);
  // New state for module and step navigation
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);

  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set());
  const [allAssessmentsCompleted, setAllAssessmentsCompleted] = useState(false);
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validateResponseData, setValidateResponseData] = useState<any>(null);
  const [validatingResponse, setValidatingResponse] = useState(false);

  const router = useRouter();

  const { suggestedServices, setSuggestedServices } = useAuthStore();

  const currentApplicationSlug = 'application-for-digiplus-alliance-services-1';

  // const {
  //   data: applicationData,
  //   isLoading,
  //   error,
  // } = useGetAssessmentById(currentApplicationSlug || '68dec54109ae0fe9fd7c43cb', !!currentApplicationSlug);

  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetApplicationBySlug(currentApplicationSlug, !!currentApplicationSlug);

  console.log(applicationData);

  const submitAssessment = useSubmitAssessment();
  const [assessmentResult, setAssessmentResult] = useState<AssessmentSubmissionResponse | null>(null);

  // Group questions by module and step
  const groupedModules: IGroupedModule[] = useMemo(
    () => (applicationData ? groupQuestionsByModuleAndStep(applicationData as any) : []),
    [applicationData]
  );

  console.log(groupedModules);

  // Show error state for available assessments
  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p className="text-red-600 mb-4">Error loading application form</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state for current assessment or if grouping is in progress
  if (isLoading || (applicationData && groupedModules.length === 0)) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading application form...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!applicationData || groupedModules.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p>Assessment not found.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get current module, step, and questions
  const currentModule = groupedModules[currentModuleIndex];
  const currentStepData = currentModule.steps[currentStepIndex];
  const currentQuestions = currentStepData.questions;
  const totalStepsInModule = currentModule.steps.length;

  const isLastStepInModule = currentStepIndex === totalStepsInModule - 1;
  const isLastModule = currentModuleIndex === groupedModules.length - 1;
  const isLastStepOverall = isLastStepInModule && isLastModule;

  // Transform API data to match component interfaces
  const transformOptions = (options: any[]) => options.map((opt) => ({ ...opt, id: opt._id, _id: opt.id }));
  const transformGridColumns = (columns: any[]) => columns.map((col) => ({ ...col, id: col.id }));
  const transformGridRows = (rows: any[]) => rows.map((row) => ({ ...row, id: row.id }));

  // A helper to handle single or multiple question responses for a step
  const handleNext = async (stepResponses: Record<string, any>) => {
    const updatedResponses = { ...responses, ...stepResponses };
    setResponses(updatedResponses);

    if (isLastStepInModule) {
      if (isLastModule) {
        // This is the last step of the last module of the current assessment
        await submitAndProceed(updatedResponses);
      } else {
        // Move to the first step of the next module
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentStepIndex(0);
      }
    } else {
      // Go to the next step in the current module
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const submitAndProceed = async (finalResponses: Record<string, any>) => {
    // This function is called only at the end of an assessment.
    // It submits the responses and decides whether to show results or move to the next assessment.
    if (isLastStepOverall) {
      // Submit the current assessment
      try {
        if (!user?._id) {
          throw new Error('User not authenticated');
        }

        setIsSubmitting(true);

        const response = await submitAssessment.mutateAsync({
          assessment_id: currentApplicationSlug!,
          user_id: user._id, // Make sure user is defined
          responses: finalResponses,
        });

        setAssessmentResult(response);

        // Mark current assessment as completed
        const newCompletedAssessments = new Set(completedAssessments);
        newCompletedAssessments.add(currentApplicationSlug!);
        setCompletedAssessments(newCompletedAssessments);

        setAllAssessmentsCompleted(true);
      } catch (error) {
        toast.error('Failed to submit assessment');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Reset responses for the next assessment
      setResponses({});
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      // Go to the previous step in the current module
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (currentModuleIndex > 0) {
      // Go to the last step of the previous module
      const prevModule = groupedModules[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentStepIndex(prevModule.steps.length - 1);
    }
  };

  // Progress calculation across all assessments
  const totalApplicationForm = 1;
  const progressInCurrentAssessment =
    (currentModuleIndex + currentStepIndex / totalStepsInModule) / groupedModules.length;
  const overallProgress = ((currentAssessmentIndex + progressInCurrentAssessment) / totalApplicationForm) * 100;

  // This component will now render all questions for the current step
  const renderCurrentStep = () => {
    // For all other question types, group them in a card
    // Note: This assumes your individual question components can be composed this way.
    // You might need to adjust them to remove their own "Next/Back" buttons and layout,
    // and instead rely on a shared set of controls.
    // For this example, I'll keep them as they are, but ideally, you'd refactor them.
    return (
      <Card className={cn('', !showAssessment && 'bg-transparent border-none shadow-none drop-shadow-none ')}>
        <CardContent
          className={cn('p-6 md:p-8', !showAssessment && 'bg-transparent border-none shadow-none drop-shadow-none ')}
        >
          {showAssessment && (
            <>
              <p className="text-[#227C9D] text-sm font-medium text-center">module {currentModuleIndex + 1}</p>
              <h1 className="text-2xl font-bold text-[#227C9D] text-center mb-4">{currentModule.moduleName}</h1>
            </>
          )}
          {currentQuestions.map((currentQuestion: AssessmentQuestion, index) => {
            const findResponse =
              validateResponseData &&
              validateResponseData?.results?.find((resp: any) => resp.field === currentQuestion._id && !resp.isValid);
            return (
              <div key={currentQuestion._id} className="mb-6 last:mb-0">
                {renderQuestion(currentQuestion, index)}
                {findResponse && findResponse?.errors[0] && (
                  <p className=" text-red-600 text-sm mt-1.5">{findResponse.errors[0].message}</p>
                )}
              </div>
            );
          })}

          {showAssessment && (
            <>
              {/* Shared Navigation for the step */}
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentModuleIndex === 0 && currentStepIndex === 0}
                  className=" bg-transparent cursor-pointer py-4 border-[#227C9D]"
                >
                  Back
                </Button>
                <Button
                  onClick={async () => {
                    const stepResponses = currentQuestions.reduce((acc: any, q: any) => {
                      acc[q._id] = responses[q._id] || null; // Use existing response or null
                      return acc;
                    }, {} as Record<string, any>);

                    const fields = currentQuestions.map((question) => {
                      return {
                        questionIdentifier: question._id,
                        value: responses[question._id] || null,
                      };
                    });

                    setValidatingResponse(true);

                    await fetch('/api/assessments/validate', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        formId: '68dec54109ae0fe9fd7c43cb',
                        formType: 'assessment',
                        fields,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (!data.isValid) {
                          setValidateResponseData(data);
                          toast.error('Please confirm your answers before proceeding.');
                          return;
                        } else {
                          const checkIfAnyIsNull = Object.values(stepResponses).some((value) => value === null);

                          if (checkIfAnyIsNull) {
                            toast.error('Error validating response, please confirm your answers before proceeding.');
                            return;
                          }
                          handleNext(stepResponses);
                        }
                      })
                      .catch((err) => toast.error(err.message || 'Something went wrong'))
                      .finally(() => {
                        setValidatingResponse(false);
                      });
                  }}
                  disabled={isSubmitting}
                  className=" cursor-pointer py-4"
                >
                  {isLastStepOverall
                    ? isSubmitting
                      ? 'Submitting Assessment...'
                      : validatingResponse
                      ? 'Validating Response...'
                      : 'Submit Assessment'
                    : isSubmitting
                    ? 'Submitting...'
                    : validatingResponse
                    ? 'Validating Response...'
                    : 'Next'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderQuestion = (currentQuestion: AssessmentQuestion, index: number) => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            module={currentModule.moduleName}
            title={currentQuestion.question}
            description={currentQuestion.description}
            instruction={currentQuestion.instruction}
            options={transformOptions(currentQuestion.options || [])}
            // currentStep={currentStepIndex + 1}
            value={responses[currentQuestion._id] || ''}
            onChange={(res) => {
              setResponses((prev) => ({ ...prev, [currentQuestion._id]: res }));
            }}
            index={index}
          />
        );
      case 'checkbox':
        return (
          <CheckboxQuestion
            module={currentModule.moduleName}
            title={currentQuestion.question}
            description={currentQuestion.description}
            instruction={currentQuestion.instruction}
            options={transformOptions(currentQuestion.options || [])}
            minSelections={currentQuestion.min_selections}
            maxSelections={currentQuestion.max_selections}
            // currentStep={currentStepIndex + 1}
            value={responses[currentQuestion._id] || []}
            onChange={(res) => setResponses((prev) => ({ ...prev, [currentQuestion._id]: res }))}
            index={index}
          />
        );
      case 'short_text':
      case 'long_text':
        return (
          <TextQuestion
            module={currentModule.moduleName}
            title={currentQuestion.question}
            description={currentQuestion.description}
            instruction={currentQuestion.instruction}
            placeholder={currentQuestion.placeholder}
            type={currentQuestion.type}
            maxLength={currentQuestion.max_length}
            minLength={currentQuestion.min_length}
            rows={currentQuestion.rows}
            isRequired={currentQuestion.is_required}
            // currentStep={currentStepIndex + 1}
            value={responses[currentQuestion._id] || ''}
            onChange={(res) => setResponses((prev) => ({ ...prev, [currentQuestion._id]: res }))}
            index={index}
          />
        );
      case 'dropdown':
        return (
          <DropdownQuestion
            module={currentModule.moduleName}
            title={currentQuestion.question}
            description={currentQuestion.description}
            placeholder={currentQuestion.placeholder}
            options={transformOptions(currentQuestion.options || [])}
            isRequired={currentQuestion.is_required}
            // currentStep={currentStepIndex + 1}
            value={responses[currentQuestion._id] || ''}
            onChange={(res) => setResponses((prev) => ({ ...prev, [currentQuestion._id]: res }))}
            index={index}
          />
        );
      case 'multiple_choice_grid':
        return (
          <GridQuestion
            module={currentModule.moduleName}
            title={currentQuestion.question}
            description={currentQuestion.description}
            instruction={currentQuestion.instruction}
            columns={transformGridColumns(currentQuestion.grid_columns || [])}
            rows={transformGridRows(currentQuestion.grid_rows || [])}
            isRequired={currentQuestion.is_required}
            // currentStep={currentStepIndex + 1}
            value={responses[currentQuestion._id] || {}}
            onChange={(res) => setResponses((prev) => ({ ...prev, [currentQuestion._id]: res }))}
            index={index}
          />
        );
      default:
        return <div key={currentQuestion._id}>Unsupported question type: {currentQuestion.type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-4xl mx-auto">{renderCurrentStep()}</div>
    </div>
  );
}
