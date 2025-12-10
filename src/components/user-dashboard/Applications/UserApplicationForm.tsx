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
import { groupApplicationQuestionsByModuleAndStep, IGroupedModule } from '@/utils/assessmentUtils';
// Import types from the assessment types file
import type { AssessmentQuestion } from '@/types/assessment';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetApplicationBySlug } from '@/app/api/assessments/useGetApplicationFormBySlug';
import { useGetAvailableApplications } from '@/app/api/assessments/useGetAvailableApplication';
import { useCreateApplication } from '@/app/api/user';
import ApplicationSuccessModal from './ApplicationSuccessModal';

interface WelcomeDatas {
  setWelcomeData: (data: { welcome_description: string; welcome_instruction: string; welcome_title: string }) => void;
}
export default function UserApplicationForm(props: WelcomeDatas) {
  const { setWelcomeData } = props;
  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0);
  // New state for module and step navigation
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set());
  const [allAssessmentsCompleted, setAllAssessmentsCompleted] = useState(false);
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validateResponseData, setValidateResponseData] = useState<any>(null);
  const [validatingResponse, setValidatingResponse] = useState(false);

  const router = useRouter();
  const { selectedService } = useAuthStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get available applications
  const {
    data: availableApplications,
    isLoading: loadingApplications,
    error: applicationsError,
  } = useGetAvailableApplications();

  // Get the current application slug from the first available application
  const currentApplicationSlug = availableApplications?.[0]?.id || null;

  // const {
  //   data: applicationData,
  //   isLoading,
  //   error,
  // } = useGetAssessmentById(currentApplicationSlug || '68dec54109ae0fe9fd7c43cb', !!currentApplicationSlug);

  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetApplicationBySlug(currentApplicationSlug || '', !!currentApplicationSlug);

  // const submitAssessment = useSubmitAssessment();

  const { mutate: createApplication, isPending } = useCreateApplication(currentApplicationSlug || '');

  // Group questions by module and step
  const groupedModules: IGroupedModule[] = useMemo(() => {
    if (applicationData) {
      setWelcomeData({
        welcome_description: applicationData.welcome_description,
        welcome_instruction: applicationData.welcome_instruction,
        welcome_title: applicationData.welcome_title,
      });
      return groupApplicationQuestionsByModuleAndStep(applicationData as any);
    }
    return [];
  }, [applicationData]);

  // Show loading state for available applications
  if (loadingApplications) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading available applications...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state for available applications
  if (applicationsError) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p className="text-red-600 mb-4">Error loading available applications</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if no applications available
  if (!availableApplications || availableApplications.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p>No applications available at this time.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state for application form data
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
        await submitAndProceed({ responses: updatedResponses, service: selectedService as string });
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

  const submitAndProceed = async (payload: { responses: any; service: string }) => {
    // This function is called only at the end of an assessment.
    // It submits the responses and decides whether to show results or move to the next assessment.
    if (isLastStepOverall) {
      // Submit the current assessment
      try {
        if (!user?._id) {
          throw new Error('User not authenticated');
        }

        setIsSubmitting(true);

        createApplication(payload, {
          onSuccess: () => {
            setShowSuccessModal(true);
            setResponses({});
            toast.success('Application submitted successfully');
          },
          onError: (error) => {
            console.error('Application submission failed:', error);
            toast.error('Application submission failed');
          },
        });

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
      <Card className={cn('bg-transparent border-none shadow-none drop-shadow-none pt-0 ')}>
        <CardContent className={cn('', 'bg-transparent p-0 shadow-none drop-shadow-none border-none ')}>
          {currentQuestions.map((currentQuestion: AssessmentQuestion, index) => {
            const findResponse =
              validateResponseData &&
              validateResponseData?.results?.find(
                (resp: any) => resp.field === currentQuestion.data_key && !resp.isValid
              );
            console.log('findResponse', findResponse);
            return (
              <div key={currentQuestion.data_key} className="mb-6 last:mb-0">
                {renderQuestion(currentQuestion, index + 1)}
                {findResponse && findResponse?.errors[0] && (
                  <p className=" text-red-600 text-sm mt-1.5">{findResponse.errors[0].message}</p>
                )}
              </div>
            );
          })}

          {
            <>
              {/* Shared Navigation for the step */}
              <div className="mt-8 flex justify-between">
                <Button
                  className="w-full h-12 bg-[#FF5C5C] mt-6 hover:bg-[#FF4444] text-black hover:text-white  rounded-lg"
                  onClick={async () => {
                    const stepResponses = currentQuestions.reduce((acc: any, q: any) => {
                      acc[q.data_key] = responses[q.data_key] || null; // Use existing response or null
                      return acc;
                    }, {} as Record<string, any>);

                    const fields = currentQuestions.map((question) => {
                      return {
                        questionIdentifier: question.data_key,
                        value: responses[question.data_key || question._id] || null,
                      };
                    });

                    setValidatingResponse(true);

                    await fetch('/api/assessments/validate', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        formId: applicationData._id,
                        formType: 'application',
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
                >
                  {isLastStepOverall ? (
                    isSubmitting ? (
                      'Submitting Application...'
                    ) : validatingResponse ? (
                      <p className=" flex items-center justify-center pt-3">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      </p>
                    ) : (
                      'Submit Application'
                    )
                  ) : isSubmitting ? (
                    'Submitting...'
                  ) : validatingResponse ? (
                    <p className=" flex items-center justify-center pt-3">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    </p>
                  ) : (
                    'Next'
                  )}
                </Button>
              </div>
            </>
          }
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
            value={responses[currentQuestion.data_key || currentQuestion._id] || ''}
            onChange={(res) => {
              setResponses((prev) => ({ ...prev, [currentQuestion.data_key || currentQuestion._id]: res }));
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
            value={responses[currentQuestion.data_key || currentQuestion._id] || []}
            onChange={(res) =>
              setResponses((prev) => ({ ...prev, [currentQuestion.data_key || currentQuestion._id]: res }))
            }
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
            value={responses[currentQuestion.data_key || currentQuestion._id] || ''}
            onChange={(res) =>
              setResponses((prev) => ({ ...prev, [currentQuestion.data_key || currentQuestion._id]: res }))
            }
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
            value={responses[currentQuestion.data_key || currentQuestion._id] || ''}
            onChange={(res) =>
              setResponses((prev) => ({ ...prev, [currentQuestion.data_key || currentQuestion._id]: res }))
            }
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
            value={responses[currentQuestion.data_key || currentQuestion._id] || {}}
            onChange={(res) =>
              setResponses((prev) => ({ ...prev, [currentQuestion.data_key || currentQuestion._id]: res }))
            }
            index={index}
          />
        );
      default:
        return (
          <div key={currentQuestion.data_key || currentQuestion._id}>
            Unsupported question type: {currentQuestion.type}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className=" w-full">{renderCurrentStep()}</div>
      <ApplicationSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}
