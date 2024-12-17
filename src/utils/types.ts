export type ValidationType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'object'
  | 'array'
  | 'undefined';

export interface ReferenceRule {
  model: string; // The model name of the referenced entity
  field?: string; // Optional field to match against, defaults to 'id'
}

export interface ValidationRule {
  field: string; // The field to validate
  type: ValidationType; // The expected data type
  unique?: boolean; // Validate uniqueness
  required?: boolean; // Validate existence
  reference?: ReferenceRule; // Validate against another entity
  enum?: any[]; // Validate against an enum of allowed values
}