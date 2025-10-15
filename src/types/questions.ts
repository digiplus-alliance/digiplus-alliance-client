// Grid column and row types for grid-based questions
export interface GridColumn {
  id: string;
  text: string;
  value?: string;
}

export interface GridRow {
  id: string;
  text: string;
}

// Option type for questions with options
export interface QuestionOption {
  id: string;
  text: string;
  value?: string;
}

// Comprehensive Question interface covering all possible question types
export interface Question {
  type?: string;
  question?: string;
  description?: string;
  placeholder?: string;
  options?: QuestionOption[];
  is_required?: boolean;
  step?: number;
  module_ref?: string;
  
  // Grid-based question properties
  grid_columns?: GridColumn[];
  grid_rows?: GridRow[];
  
  // Selection constraints
  min_selections?: number;
  max_selections?: number;
  
  // Character constraints
  min_characters?: number;
  max_characters?: number;
  
  // File upload properties
  acceptedFileTypes?: string[];
  max_file_size?: number; // in MB
  max_files?: number;
  upload_instruction?: string;
  
  // Any additional properties that might be added in the future
  [key: string]: any;
}
