-- Migration number: 0001 	 2025-03-13
-- Hospital Price Transparency Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS saved_searches;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS drug_prices;
DROP TABLE IF EXISTS negotiated_rates;
DROP TABLE IF EXISTS payer_plans;
DROP TABLE IF EXISTS procedure_prices;
DROP TABLE IF EXISTS procedure_codes;
DROP TABLE IF EXISTS pricing_files;
DROP TABLE IF EXISTS hospitals;

-- Hospitals table
CREATE TABLE hospitals (
    hospital_id TEXT PRIMARY KEY,  -- CCN (CMS Certification Number)
    legal_name TEXT NOT NULL,
    common_name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    latitude REAL,
    longitude REAL,
    website_url TEXT,
    phone TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- PricingFiles table
CREATE TABLE pricing_files (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_format TEXT,  -- CSV, JSON, XML, etc.
    file_size INTEGER,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active',  -- active, archived, error
    notes TEXT,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

-- ProcedureCodes table
CREATE TABLE procedure_codes (
    code_id TEXT PRIMARY KEY,
    code_type TEXT NOT NULL,  -- CPT, HCPCS, DRG, etc.
    description TEXT NOT NULL,
    category TEXT,
    subcategory TEXT
);

-- ProcedurePrices table
CREATE TABLE procedure_prices (
    price_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id TEXT NOT NULL,
    code_id TEXT NOT NULL,
    setting TEXT,  -- inpatient, outpatient, both
    gross_charge REAL CHECK (gross_charge IS NULL OR gross_charge >= 0),
    discounted_cash_price REAL CHECK (discounted_cash_price IS NULL OR discounted_cash_price >= 0),
    min_negotiated_charge REAL CHECK (min_negotiated_charge IS NULL OR min_negotiated_charge >= 0),
    max_negotiated_charge REAL CHECK (max_negotiated_charge IS NULL OR max_negotiated_charge >= 0),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
    FOREIGN KEY (code_id) REFERENCES procedure_codes(code_id),
    CHECK (min_negotiated_charge IS NULL OR max_negotiated_charge IS NULL OR min_negotiated_charge <= max_negotiated_charge)
);

-- PayerPlans table
CREATE TABLE payer_plans (
    plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    payer_name TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    plan_type TEXT  -- HMO, PPO, EPO, etc.
);

-- NegotiatedRates table
CREATE TABLE negotiated_rates (
    rate_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id TEXT NOT NULL,
    code_id TEXT NOT NULL,
    plan_id INTEGER NOT NULL,
    negotiated_rate REAL CHECK (negotiated_rate IS NULL OR negotiated_rate >= 0),
    negotiated_percentage REAL,
    negotiated_algorithm TEXT,
    additional_notes TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
    FOREIGN KEY (code_id) REFERENCES procedure_codes(code_id),
    FOREIGN KEY (plan_id) REFERENCES payer_plans(plan_id)
);

-- DrugPrices table
CREATE TABLE drug_prices (
    drug_price_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id TEXT NOT NULL,
    ndc_code TEXT NOT NULL,
    drug_name TEXT NOT NULL,
    description TEXT,
    unit_of_measurement TEXT,
    type_of_measurement TEXT,
    gross_charge REAL CHECK (gross_charge IS NULL OR gross_charge >= 0),
    discounted_cash_price REAL CHECK (discounted_cash_price IS NULL OR discounted_cash_price >= 0),
    min_negotiated_charge REAL CHECK (min_negotiated_charge IS NULL OR min_negotiated_charge >= 0),
    max_negotiated_charge REAL CHECK (max_negotiated_charge IS NULL OR max_negotiated_charge >= 0),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

-- Users table
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    zip_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- SavedSearches table
CREATE TABLE saved_searches (
    search_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    procedure_code TEXT NOT NULL,
    location TEXT NOT NULL,
    radius INTEGER DEFAULT 50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Indexes

-- Hospital location indexes
CREATE INDEX idx_hospitals_location ON hospitals(state, city, zip_code);
CREATE INDEX idx_hospitals_zip ON hospitals(zip_code);
CREATE INDEX idx_hospitals_name ON hospitals(legal_name);

-- Procedure codes indexes
CREATE INDEX idx_procedure_codes_type ON procedure_codes(code_type, code_id);
CREATE INDEX idx_procedure_codes_category ON procedure_codes(category, subcategory);

-- Compound index for the most common query pattern
CREATE INDEX idx_procedure_prices_hospital_code ON procedure_prices(hospital_id, code_id);
CREATE INDEX idx_procedure_prices_code ON procedure_prices(code_id);
CREATE INDEX idx_procedure_prices_setting ON procedure_prices(setting);

-- Negotiated rates indexes
CREATE INDEX idx_negotiated_rates_hospital_code ON negotiated_rates(hospital_id, code_id);
CREATE INDEX idx_negotiated_rates_plan ON negotiated_rates(plan_id);

-- Drug prices indexes
CREATE INDEX idx_drug_prices_hospital ON drug_prices(hospital_id);
CREATE INDEX idx_drug_prices_ndc ON drug_prices(ndc_code);

-- Payer plans index
CREATE INDEX idx_payer_plans_name ON payer_plans(payer_name);

-- User indexes
CREATE INDEX idx_saved_searches_user ON saved_searches(user_id);
