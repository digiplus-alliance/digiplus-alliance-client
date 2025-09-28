'use client';

import { useState } from 'react';
import { useGetAvailableAssessments, useGetAssessmentById, useSubmitAssessment } from '@/app/api/assessments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

/**
 * Test component to verify assessment API integration
 * This component tests:
 * 1. Fetching available assessments
 * 2. Fetching assessment details by ID
 * 3. Submitting assessment responses
 */
export function AssessmentTest() {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const { data: availableAssessments, isLoading: loadingAssessments, error: assessmentsError } = useGetAvailableAssessments();
  const { data: assessmentData, isLoading: loadingAssessment, error: assessmentError } = useGetAssessmentById(
    selectedAssessmentId || '',
    !!selectedAssessmentId
  );
  const submitAssessment = useSubmitAssessment();

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testAvailableAssessments = () => {
    if (loadingAssessments) {
      addTestResult('⏳ Loading available assessments...');
      return;
    }
    
    if (assessmentsError) {
      addTestResult(`❌ Error loading assessments: ${String(assessmentsError)}`);
      return;
    }
    
    if (availableAssessments && availableAssessments.length > 0) {
      addTestResult(`✅ Successfully loaded ${availableAssessments.length} assessments`);
      availableAssessments.forEach((assessment, index) => {
        addTestResult(`   ${index + 1}. ${assessment.title} (ID: ${assessment._id})`);
      });
    } else {
      addTestResult('⚠️ No assessments available');
    }
  };

  const testAssessmentDetails = () => {
    if (!selectedAssessmentId) {
      addTestResult('❌ No assessment selected for details test');
      return;
    }

    if (loadingAssessment) {
      addTestResult('⏳ Loading assessment details...');
      return;
    }

    if (assessmentError) {
      addTestResult(`❌ Error loading assessment details: ${String(assessmentError)}`);
      return;
    }

    if (assessmentData) {
      const { assessment, modules, questions } = assessmentData;
      addTestResult(`✅ Successfully loaded assessment details:`);
      addTestResult(`   Title: ${assessment.title}`);
      addTestResult(`   Modules: ${modules.length}`);
      addTestResult(`   Questions: ${questions.length}`);
      
      // Test question types
      const questionTypes = [...new Set(questions.map(q => q.type))];
      addTestResult(`   Question types: ${questionTypes.join(', ')}`);
    }
  };

  const testSubmission = async () => {
    if (!selectedAssessmentId) {
      addTestResult('❌ No assessment selected for submission test');
      return;
    }

    if (!assessmentData) {
      addTestResult('❌ No assessment data available for submission test');
      return;
    }

    try {
      addTestResult('⏳ Testing assessment submission...');
      
      // Create mock responses for all questions
      const mockResponses: Record<string, any> = {};
      assessmentData.questions.forEach((question, index) => {
        switch (question.type) {
          case 'multiple_choice':
            mockResponses[question._id] = question.options[0]?._id || 'test-option';
            break;
          case 'checkbox':
            mockResponses[question._id] = [question.options[0]?._id || 'test-option'];
            break;
          case 'short_text':
          case 'long_text':
            mockResponses[question._id] = `Test response for question ${index + 1}`;
            break;
          case 'dropdown':
            mockResponses[question._id] = question.options[0]?._id || 'test-option';
            break;
          case 'multiple_choice_grid':
            const gridResponse: Record<string, string> = {};
            question.grid_rows.forEach(row => {
              gridResponse[row._id] = question.grid_columns[0]?._id || 'test-column';
            });
            mockResponses[question._id] = gridResponse;
            break;
          default:
            // For welcome_screen and module_title, no response needed
            break;
        }
      });

      await submitAssessment.mutateAsync({
        assessment_id: selectedAssessmentId,
        user_id: 'test-user-id', // This would normally come from auth
        responses: mockResponses,
      });

      addTestResult('✅ Assessment submission test completed successfully');
    } catch (error) {
      addTestResult(`❌ Assessment submission test failed: ${String(error)}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assessment API Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={testAvailableAssessments} disabled={loadingAssessments}>
              {loadingAssessments && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Available Assessments
            </Button>
            
            <Button 
              onClick={testAssessmentDetails} 
              disabled={!selectedAssessmentId || loadingAssessment}
            >
              {loadingAssessment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Assessment Details
            </Button>
            
            <Button 
              onClick={testSubmission} 
              disabled={!selectedAssessmentId || !assessmentData || submitAssessment.isPending}
            >
              {submitAssessment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Submission
            </Button>
            
            <Button onClick={clearResults} variant="outline">
              Clear Results
            </Button>
          </div>

          {availableAssessments && availableAssessments.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Assessment for Testing:</label>
              <select 
                value={selectedAssessmentId || ''} 
                onChange={(e) => setSelectedAssessmentId(e.target.value || null)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select an assessment...</option>
                {availableAssessments.map((assessment) => (
                  <option key={assessment._id} value={assessment._id}>
                    {assessment.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No test results yet. Click a test button to begin.</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
