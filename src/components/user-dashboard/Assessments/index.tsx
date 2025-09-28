'use client';
import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { ModuleTitleScreen } from './ModuleTitleScreen';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { CheckboxQuestion } from './CheckboxQuestion';
import { TextQuestion } from './TextQuestion';
import { DropdownQuestion } from './DropdownQuestion';
import { GridQuestion } from './GridQuestion';
import { AssessmentResults } from './AssessmentResults';
import { useGetAvailableAssessments, useGetAssessmentById, useSubmitAssessment } from '@/app/api/assessments';
import { useAuthStore } from '@/store/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Import types from the assessment types file
import type { Assessment } from '@/types/assessment';

export default function Assessment() {
  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set());
  const [allAssessmentsCompleted, setAllAssessmentsCompleted] = useState(false);
  const { user } = useAuthStore();

  const {
    data: availableAssessments,
    isLoading: loadingAssessments,
    error: assessmentsError,
  } = useGetAvailableAssessments();

  const currentAssessmentId = availableAssessments?.[currentAssessmentIndex]?._id || null;

  const {
    data: assessmentData,
    isLoading,
    error,
  } = useGetAssessmentById(currentAssessmentId || '', !!currentAssessmentId);

  const submitAssessment = useSubmitAssessment();

  // Show loading state for available assessments
  if (loadingAssessments) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading available assessments...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state for available assessments
  if (assessmentsError) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p className="text-red-600 mb-4">Error loading assessments: {String(assessmentsError)}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if no assessments available
  if (!availableAssessments || availableAssessments.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p>No assessments available at this time.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show all assessments completed screen
  if (allAssessmentsCompleted) {
    return (
      <AssessmentResults
        score={20}
        maxScore={45}
        level="Beginner"
        onSuggestions={() => {}}
        onRestart={() => {
          setCurrentAssessmentIndex(0);
          setCurrentQuestionIndex(0);
          setResponses({});
          setCompletedAssessments(new Set());
          setAllAssessmentsCompleted(false);
        }}
      />
    );
  }

  // Show loading state for current assessment
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading assessment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-12 text-center">
            <p className="text-red-600 mb-4">Error loading assessment: {String(error)}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assessmentData) {
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

  const { assessment, modules, questions } = assessmentData;
  const currentQuestion = questions[currentQuestionIndex];
  const totalSteps = questions.length;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Transform API data to match component interfaces
  const transformOptions = (options: any[]) => options.map((opt) => ({ ...opt, id: opt._id }));

  const transformGridColumns = (columns: any[]) => columns.map((col) => ({ ...col, id: col._id }));

  const transformGridRows = (rows: any[]) => rows.map((row) => ({ ...row, id: row._id }));

  const handleNext = async (response: any) => {
    const updatedResponses = {
      ...responses,
      [currentQuestion._id]: response,
    };

    setResponses(updatedResponses);

    if (isLastQuestion) {
      // Submit the current assessment
      try {
        if (!user?._id) {
          throw new Error('User not authenticated');
        }

        await submitAssessment.mutateAsync({
          assessment_id: currentAssessmentId!,
          user_id: user._id,
          responses: updatedResponses,
        });

        // Mark current assessment as completed
        const newCompletedAssessments = new Set(completedAssessments);
        newCompletedAssessments.add(currentAssessmentId!);
        setCompletedAssessments(newCompletedAssessments);

        // Check if this was the last assessment
        if (currentAssessmentIndex === (availableAssessments?.length || 0) - 1) {
          // All assessments completed
          setAllAssessmentsCompleted(true);
        } else {
          // Move to next assessment
          setCurrentAssessmentIndex((prev) => prev + 1);
          setCurrentQuestionIndex(0);
          setResponses({});
        }
      } catch (error) {
        console.error('Failed to submit assessment:', error);
        // Still move to next assessment even if submission fails
        if (currentAssessmentIndex === (availableAssessments?.length || 0) - 1) {
          setAllAssessmentsCompleted(true);
        } else {
          setCurrentAssessmentIndex((prev) => prev + 1);
          setCurrentQuestionIndex(0);
          setResponses({});
        }
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentModule = modules.find((m) => m._id === currentQuestion.module_id);

  // Progress calculation across all assessments
  const totalAssessments = availableAssessments?.length || 1;
  const overallProgress = ((currentAssessmentIndex + (currentQuestionIndex + 1) / totalSteps) / totalAssessments) * 100;

  // Progress bar component
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${overallProgress}%` }}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>
          Assessment {currentAssessmentIndex + 1} of {totalAssessments} - Question {currentQuestionIndex + 1} of{' '}
          {totalSteps}
        </span>
        <span>{Math.round(overallProgress)}% Complete</span>
      </div>
    </div>
  );

  // Assessment header component
  const AssessmentHeader = () => (
    <div className="bg-white border-b border-gray-200 p-4 mb-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800">{assessment.title}</h2>
        {assessment.description && <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>}
      </div>
    </div>
  );

  if (currentQuestion.type === 'welcome_screen') {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-6">
          <ProgressBar />
        </div>
        <WelcomeScreen
          title={currentQuestion.welcome_title || assessment.title}
          message={currentQuestion.welcome_message || assessment.description || ''}
          buttonText={currentQuestion.button_text || 'Begin Assessment'}
          onStart={() => handleNext(null)}
        />
      </div>
    );
  }

  if (currentQuestion.type === 'module_title') {
    return (
      <div>
        <AssessmentHeader />
        <div className="max-w-4xl mx-auto px-6">
          <ProgressBar />
        </div>
        <ModuleTitleScreen
          module={currentModule?.title || ''}
          title={currentQuestion.module_title || ''}
          description={currentQuestion.module_description || ''}
          onBack={currentQuestionIndex > 0 ? handleBack : undefined}
          onContinue={() => handleNext(null)}
          showBackButton={currentQuestionIndex > 0}
        />
      </div>
    );
  }

  if (currentQuestion.type === 'multiple_choice') {
    return (
      <div>
        {/* <AssessmentHeader /> */}
        <div className="min-h-screen bg-muted/30 p-6">
          <div className="max-w-4xl mx-auto">
            {/* <ProgressBar /> */}
            <MultipleChoiceQuestion
              module={assessment.title || currentModule?.title || ''}
              title={currentQuestion.question}
              description={currentQuestion.description || assessment.description}
              instruction={currentQuestion.instruction || assessment.instruction}
              options={transformOptions(currentQuestion.options || [])}
              currentStep={currentQuestion.step}
              totalSteps={totalSteps}
              onBack={handleBack}
              onNext={handleNext}
              selectedOption={responses[currentQuestion.step] || ''}
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestion.type === 'checkbox') {
    return (
      <CheckboxQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description || assessment.description}
        instruction={currentQuestion.instruction || assessment.instruction}
        options={transformOptions(currentQuestion.options || [])}
        minSelections={currentQuestion.min_selections}
        maxSelections={currentQuestion.max_selections}
        currentStep={currentQuestion.step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        selectedOptions={responses[currentQuestion.step] || []}
      />
    );
  }

  if (currentQuestion.type === 'short_text' || currentQuestion.type === 'long_text') {
    return (
      <TextQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description}
        instruction={currentQuestion.instruction || assessment.instruction}
        placeholder={currentQuestion.placeholder}
        type={currentQuestion.type}
        maxLength={currentQuestion.max_length}
        minLength={currentQuestion.min_length}
        rows={currentQuestion.rows}
        isRequired={currentQuestion.is_required}
        currentStep={currentQuestion.step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        value={responses[currentQuestion.step] || ''}
      />
    );
  }

  if (currentQuestion.type === 'dropdown') {
    return (
      <DropdownQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description}
        placeholder={currentQuestion.placeholder}
        options={transformOptions(currentQuestion.options || [])}
        isRequired={currentQuestion.is_required}
        currentStep={currentQuestion.step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        selectedValue={responses[currentQuestion.step] || ''}
      />
    );
  }

  if (currentQuestion.type === 'multiple_choice_grid') {
    return (
      <GridQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description}
        instruction={currentQuestion.instruction}
        columns={transformGridColumns(currentQuestion.grid_columns || [])}
        rows={transformGridRows(currentQuestion.grid_rows || [])}
        isRequired={currentQuestion.is_required}
        currentStep={currentQuestion.step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        responses={responses[currentQuestion.step] || {}}
      />
    );
  }

  return null;
}
