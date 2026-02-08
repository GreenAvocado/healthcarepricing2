// Database schema types for TypeScript

export interface Hospital {
  hospital_id: string;
  legal_name: string;
  common_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  website_url?: string;
  phone?: string;
  last_updated?: Date;
}

export interface PricingFile {
  file_id?: number;
  hospital_id: string;
  file_url: string;
  file_format?: string;
  file_size?: number;
  last_updated?: Date;
  status?: string;
  notes?: string;
}

export interface ProcedureCode {
  code_id: string;
  code_type: string;
  description: string;
  category?: string;
  subcategory?: string;
}

export interface ProcedurePrice {
  price_id?: number;
  hospital_id: string;
  code_id: string;
  setting?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
  last_updated?: Date;
}

export interface PayerPlan {
  plan_id?: number;
  payer_name: string;
  plan_name: string;
  plan_type?: string;
}

export interface NegotiatedRate {
  rate_id?: number;
  hospital_id: string;
  code_id: string;
  plan_id: number;
  negotiated_rate?: number;
  negotiated_percentage?: number;
  negotiated_algorithm?: string;
  additional_notes?: string;
  last_updated?: Date;
}

export interface DrugPrice {
  drug_price_id?: number;
  hospital_id: string;
  ndc_code: string;
  drug_name: string;
  description?: string;
  unit_of_measurement?: string;
  type_of_measurement?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
  last_updated?: Date;
}

export interface User {
  user_id?: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  zip_code?: string;
  created_at?: Date;
  last_login?: Date;
}

export interface SavedSearch {
  search_id?: number;
  user_id: number;
  procedure_code: string;
  location: string;
  radius?: number;
  created_at?: Date;
}
