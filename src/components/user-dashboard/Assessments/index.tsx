'use client';
import { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { ModuleTitleScreen } from './ModuleTitleScreen';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { CheckboxQuestion } from './CheckboxQuestion';
import { TextQuestion } from './TextQuestion';
import { DropdownQuestion } from './DropdownQuestion';
import { GridQuestion } from './GridQuestion';
import { AssessmentResults } from './AssessmentResults';
import { useGetAvailableAssessments, useGetAssessmentById } from '@/app/api/assessments';
import { useAuthStore } from '@/store/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AssessmentOption {
  id: string;
  text: string;
  value?: number;
  points?: number;
  points_description?: string;
}

interface GridColumn {
  id: string;
  text: string;
  value?: number;
  points?: number;
  points_description?: string;
}

interface GridRow {
  id: string;
  text: string;
  weight?: number;
}

interface AssessmentQuestion {
  type:
    | 'welcome_screen'
    | 'module_title'
    | 'multiple_choice'
    | 'checkbox'
    | 'short_text'
    | 'long_text'
    | 'dropdown'
    | 'multiple_choice_grid';
  question: string;
  welcome_title?: string;
  welcome_message?: string;
  button_text?: string;
  module_title?: string;
  module_description?: string;
  description?: string;
  instruction?: string;
  placeholder?: string;
  options?: AssessmentOption[];
  grid_columns?: GridColumn[];
  grid_rows?: GridRow[];
  max_length?: number;
  min_length?: number;
  rows?: number;
  min_selections?: number;
  max_selections?: number;
  is_required?: boolean;
  step: number;
  module_ref: string;
  max_points?: number;
  scoring_categories?: string[];
}

interface AssessmentModule {
  temp_id: string;
  title: string;
  description?: string;
  order: number;
  max_points?: number;
}

interface Assessment {
  title: string;
  description?: string;
  instruction?: string;
  modules: AssessmentModule[];
  questions: AssessmentQuestion[];
  is_active?: boolean;
}

// Mock assessment data matching the provided format
const mockAssessment: Assessment = {
  title: 'Digital Maturity Assessment',
  description: 'Comprehensive evaluation with personalized service suggestions',
  instruction: 'Answer all questions to receive personalized service recommendations',
  modules: [
    {
      temp_id: 'intro-module',
      title: 'Introduction',
      description: 'Welcome and overview',
      order: 1,
    },
    {
      temp_id: 'skills-module',
      title: 'Digital Skills Assessment',
      description: 'Evaluate current capabilities',
      order: 2,
      max_points: 25,
    },
    {
      temp_id: 'tools-module',
      title: 'Current Tools Usage',
      description: 'Assess existing digital infrastructure',
      order: 3,
      max_points: 30,
    },
    {
      temp_id: 'business-module',
      title: 'Business Information',
      description: 'Company details and context',
      order: 4,
    },
  ],
  questions: [
    {
      type: 'welcome_screen',
      question: 'Assessment Welcome',
      welcome_title: 'Digital Maturity Assessment',
      welcome_message:
        'Welcome! This assessment will help us understand your current digital capabilities and provide personalized recommendations. It takes about 10-15 minutes to complete.',
      button_text: 'Begin Assessment',
      step: 1,
      module_ref: 'intro-module',
    },
    {
      type: 'module_title',
      question: 'Module Introduction',
      module_title: 'Digital Skills Assessment',
      module_description: 'In this section, we will evaluate your familiarity with digital tools and technologies.',
      step: 2,
      module_ref: 'skills-module',
    },
    {
      type: 'multiple_choice',
      question: 'What best describes your current level of digital tool usage?',
      description: 'Select the option that most accurately reflects your situation',
      instruction: 'Choose only one option',
      options: [
        {
          id: 'opt-1',
          text: 'Minimal - Basic email and web browsing',
          points: 2,
        },
        {
          id: 'opt-2',
          text: 'Basic - Office applications and simple online tools',
          points: 4,
        },
        {
          id: 'opt-3',
          text: 'Intermediate - Multiple digital tools for business',
          points: 6,
        },
        {
          id: 'opt-4',
          text: 'Advanced - Integrated digital solutions',
          points: 8,
        },
        {
          id: 'opt-5',
          text: 'Expert - Leading digital transformation',
          points: 10,
        },
      ],
      is_required: true,
      step: 3,
      module_ref: 'skills-module',
    },
    {
      type: 'checkbox',
      question: 'Which digital tools do you currently use in your business?',
      description: 'Select all tools that you actively use',
      instruction: 'You can select multiple options',
      options: [
        {
          id: 'opt-1',
          text: 'Email marketing tools (Mailchimp, Constant Contact)',
          points: 2,
        },
        {
          id: 'opt-2',
          text: 'Social media management (Hootsuite, Buffer)',
          points: 2,
        },
        {
          id: 'opt-3',
          text: 'Customer relationship management (CRM)',
          points: 3,
        },
        {
          id: 'opt-4',
          text: 'E-commerce platforms (Shopify, WooCommerce)',
          points: 3,
        },
        {
          id: 'opt-5',
          text: 'Accounting software (QuickBooks, Xero)',
          points: 2,
        },
        {
          id: 'opt-6',
          text: 'Project management tools (Trello, Asana)',
          points: 2,
        },
      ],
      min_selections: 1,
      max_selections: 6,
      is_required: true,
      step: 4,
      module_ref: 'tools-module',
    },
    {
      type: 'short_text',
      question: 'What is the name of your business?',
      description: 'Please enter your business or organization name',
      placeholder: 'e.g., ABC Marketing Solutions',
      max_length: 100,
      min_length: 2,
      is_required: true,
      step: 5,
      module_ref: 'business-module',
    },
    {
      type: 'dropdown',
      question: 'What industry does your business primarily operate in?',
      description: 'Select the industry that best matches your business',
      placeholder: 'Select your industry',
      options: [
        {
          id: 'opt-1',
          text: 'Technology & Software',
          value: 1,
        },
        {
          id: 'opt-2',
          text: 'Healthcare & Medical',
          value: 2,
        },
        {
          id: 'opt-3',
          text: 'Education & Training',
          value: 3,
        },
        {
          id: 'opt-4',
          text: 'Finance & Banking',
          value: 4,
        },
        {
          id: 'opt-5',
          text: 'Manufacturing',
          value: 5,
        },
        {
          id: 'opt-6',
          text: 'Retail & E-commerce',
          value: 6,
        },
        {
          id: 'opt-7',
          text: 'Professional Services',
          value: 7,
        },
        {
          id: 'opt-8',
          text: 'Other',
          value: 8,
        },
      ],
      is_required: true,
      step: 6,
      module_ref: 'business-module',
    },
    {
      type: 'multiple_choice_grid',
      question: 'For each business area below, how would you rate your current digital maturity?',
      description: 'Rate each area based on your current digital adoption and effectiveness',
      instruction: 'Select one option for each row',
      grid_columns: [
        {
          id: 'col-1',
          text: 'Not Digitized',
          points: 1,
        },
        {
          id: 'col-2',
          text: 'Basic Digital Tools',
          points: 2,
        },
        {
          id: 'col-3',
          text: 'Integrated Systems',
          points: 3,
        },
        {
          id: 'col-4',
          text: 'Advanced Analytics',
          points: 4,
        },
        {
          id: 'col-5',
          text: 'AI-Powered Optimization',
          points: 5,
        },
      ],
      grid_rows: [
        {
          id: 'row-1',
          text: 'Customer relationship management',
        },
        {
          id: 'row-2',
          text: 'Sales and marketing processes',
        },
        {
          id: 'row-3',
          text: 'Financial management and reporting',
        },
        {
          id: 'row-4',
          text: 'Inventory and supply chain management',
        },
      ],
      is_required: true,
      step: 7,
      module_ref: 'tools-module',
    },
  ],
  is_active: true,
};

export default function Assessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [assessment] = useState<Assessment>(mockAssessment);

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const totalSteps = assessment.questions.length;
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;

  const handleNext = (response: any) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.step]: response,
    }));

    if (isLastQuestion) {
      setCurrentQuestionIndex(totalSteps); // Show results
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (currentQuestionIndex >= totalSteps) {
    return (
      <AssessmentResults
        score={20}
        maxScore={45}
        level="Beginner"
        onSuggestions={() => {}}
        onRestart={() => {
          setCurrentQuestionIndex(0);
          setResponses({});
        }}
      />
    );
  }

  const currentModule = assessment.modules.find((m) => m.temp_id === currentQuestion.module_ref);

  if (currentQuestion.type === 'welcome_screen') {
    return (
      <WelcomeScreen
        title={currentQuestion.welcome_title || assessment.title}
        message={currentQuestion.welcome_message || ''}
        buttonText={currentQuestion.button_text || 'Begin Assessment'}
        onStart={() => handleNext(null)}
      />
    );
  }

  if (currentQuestion.type === 'module_title') {
    return (
      <ModuleTitleScreen
        module={currentModule?.title || ''}
        title={currentQuestion.module_title || ''}
        description={currentQuestion.module_description || ''}
        onBack={currentQuestionIndex > 0 ? handleBack : undefined}
        onContinue={() => handleNext(null)}
        showBackButton={currentQuestionIndex > 0}
      />
    );
  }

  if (currentQuestion.type === 'multiple_choice') {
    return (
      <MultipleChoiceQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description}
        instruction={currentQuestion.instruction}
        options={currentQuestion.options || []}
        currentStep={currentQuestion.step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        selectedOption={responses[currentQuestion.step] || ''}
      />
    );
  }

  if (currentQuestion.type === 'checkbox') {
    return (
      <CheckboxQuestion
        module={currentModule?.title || ''}
        title={currentQuestion.question}
        description={currentQuestion.description}
        instruction={currentQuestion.instruction}
        options={currentQuestion.options || []}
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
        instruction={currentQuestion.instruction}
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
        options={currentQuestion.options || []}
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
        columns={currentQuestion.grid_columns || []}
        rows={currentQuestion.grid_rows || []}
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
