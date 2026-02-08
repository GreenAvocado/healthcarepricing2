-- Migration number: 0002   Seed data for testing
-- This file should NOT be run in production. Use the /api/import endpoint instead.

INSERT OR IGNORE INTO hospitals (hospital_id, legal_name, common_name, address, city, state, zip_code, latitude, longitude) VALUES
('NYP001', 'New York-Presbyterian Hospital', 'NY Presbyterian', '525 E 68th St', 'New York', 'NY', '10065', 40.7648, -73.9538),
('MSM001', 'Mount Sinai Medical Center', 'Mount Sinai', '1 Gustave L. Levy Pl', 'New York', 'NY', '10029', 40.7900, -73.9526),
('NYU001', 'NYU Langone Hospitals', 'NYU Langone', '550 1st Avenue', 'New York', 'NY', '10016', 40.7421, -73.9740),
('MSK001', 'Memorial Sloan Kettering Cancer Center', 'Memorial Sloan Kettering', '1275 York Ave', 'New York', 'NY', '10065', 40.7645, -73.9565),
('LHH001', 'Lenox Hill Hospital', 'Lenox Hill', '100 E 77th St', 'New York', 'NY', '10075', 40.7738, -73.9594),
('CED001', 'Cedars-Sinai Medical Center', 'Cedars-Sinai', '8700 Beverly Blvd', 'Los Angeles', 'CA', '90048', 34.0753, -118.3804),
('UCLA01', 'UCLA Medical Center', 'UCLA Health', '757 Westwood Plaza', 'Los Angeles', 'CA', '90095', 34.0661, -118.4469),
('MGH001', 'Massachusetts General Hospital', 'Mass General', '55 Fruit St', 'Boston', 'MA', '02114', 42.3632, -71.0686),
('BWH001', 'Brigham and Womens Hospital', 'Brigham', '75 Francis St', 'Boston', 'MA', '02115', 42.3366, -71.1068),
('HUP001', 'Hospital of the University of Pennsylvania', 'Penn Medicine', '3400 Spruce St', 'Philadelphia', 'PA', '19104', 39.9494, -75.1932);

INSERT OR IGNORE INTO procedure_codes (code_id, code_type, description, category) VALUES
('70551', 'CPT', 'MRI - Brain without contrast', 'Diagnostic Imaging'),
('70552', 'CPT', 'MRI - Brain with contrast', 'Diagnostic Imaging'),
('72141', 'CPT', 'MRI - Cervical spine without contrast', 'Diagnostic Imaging'),
('72148', 'CPT', 'MRI - Lumbar spine without contrast', 'Diagnostic Imaging'),
('73721', 'CPT', 'MRI - Knee without contrast', 'Diagnostic Imaging'),
('70450', 'CPT', 'CT Scan - Head/brain without contrast', 'Diagnostic Imaging'),
('74177', 'CPT', 'CT Scan - Abdomen and pelvis with contrast', 'Diagnostic Imaging'),
('71046', 'CPT', 'X-Ray - Chest, 2 views', 'Diagnostic Imaging'),
('76700', 'CPT', 'Ultrasound - Abdomen complete', 'Diagnostic Imaging'),
('80053', 'CPT', 'Blood Test - Comprehensive metabolic panel', 'Laboratory'),
('85025', 'CPT', 'Blood Test - Complete blood count (CBC)', 'Laboratory'),
('99213', 'CPT', 'Office visit - Established patient, moderate complexity', 'Evaluation & Management'),
('99214', 'CPT', 'Office visit - Established patient, high complexity', 'Evaluation & Management'),
('45378', 'CPT', 'Colonoscopy - Diagnostic', 'Surgery'),
('59400', 'CPT', 'Routine obstetric care including delivery', 'Obstetrics'),
('97110', 'CPT', 'Therapeutic exercises', 'Physical Therapy'),
('470', 'DRG', 'Major joint replacement or reattachment of lower extremity', 'Inpatient');

-- Generate realistic price data for each hospital-procedure pair
-- Prices are based on typical US hospital charge ranges

-- NYP001 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('NYP001', '70551', 'Outpatient', 3850, 1925, 770, 2695),
('NYP001', '70552', 'Outpatient', 4200, 2100, 840, 2940),
('NYP001', '72141', 'Outpatient', 3600, 1800, 720, 2520),
('NYP001', '72148', 'Outpatient', 3700, 1850, 740, 2590),
('NYP001', '73721', 'Outpatient', 3400, 1700, 680, 2380),
('NYP001', '70450', 'Outpatient', 2800, 1400, 560, 1960),
('NYP001', '74177', 'Outpatient', 4500, 2250, 900, 3150),
('NYP001', '71046', 'Outpatient', 450, 225, 90, 315),
('NYP001', '76700', 'Outpatient', 1200, 600, 240, 840),
('NYP001', '80053', 'Outpatient', 320, 160, 64, 224),
('NYP001', '85025', 'Outpatient', 180, 90, 36, 126),
('NYP001', '99213', 'Outpatient', 350, 175, 70, 245),
('NYP001', '99214', 'Outpatient', 500, 250, 100, 350),
('NYP001', '45378', 'Outpatient', 5200, 2600, 1040, 3640),
('NYP001', '59400', 'Inpatient', 18500, 9250, 3700, 12950),
('NYP001', '97110', 'Outpatient', 180, 90, 36, 126),
('NYP001', '470', 'Inpatient', 52000, 26000, 10400, 36400);

-- MSM001 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('MSM001', '70551', 'Outpatient', 4100, 2050, 820, 2870),
('MSM001', '70552', 'Outpatient', 4500, 2250, 900, 3150),
('MSM001', '72141', 'Outpatient', 3800, 1900, 760, 2660),
('MSM001', '72148', 'Outpatient', 3900, 1950, 780, 2730),
('MSM001', '73721', 'Outpatient', 3600, 1800, 720, 2520),
('MSM001', '70450', 'Outpatient', 3000, 1500, 600, 2100),
('MSM001', '74177', 'Outpatient', 4800, 2400, 960, 3360),
('MSM001', '71046', 'Outpatient', 500, 250, 100, 350),
('MSM001', '76700', 'Outpatient', 1350, 675, 270, 945),
('MSM001', '80053', 'Outpatient', 350, 175, 70, 245),
('MSM001', '85025', 'Outpatient', 200, 100, 40, 140),
('MSM001', '99213', 'Outpatient', 380, 190, 76, 266),
('MSM001', '99214', 'Outpatient', 540, 270, 108, 378),
('MSM001', '45378', 'Outpatient', 5500, 2750, 1100, 3850),
('MSM001', '59400', 'Inpatient', 19500, 9750, 3900, 13650),
('MSM001', '97110', 'Outpatient', 200, 100, 40, 140),
('MSM001', '470', 'Inpatient', 55000, 27500, 11000, 38500);

-- NYU001 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('NYU001', '70551', 'Outpatient', 3500, 1750, 700, 2450),
('NYU001', '70552', 'Outpatient', 3900, 1950, 780, 2730),
('NYU001', '72141', 'Outpatient', 3300, 1650, 660, 2310),
('NYU001', '72148', 'Outpatient', 3400, 1700, 680, 2380),
('NYU001', '73721', 'Outpatient', 3100, 1550, 620, 2170),
('NYU001', '70450', 'Outpatient', 2600, 1300, 520, 1820),
('NYU001', '74177', 'Outpatient', 4200, 2100, 840, 2940),
('NYU001', '71046', 'Outpatient', 400, 200, 80, 280),
('NYU001', '76700', 'Outpatient', 1100, 550, 220, 770),
('NYU001', '80053', 'Outpatient', 290, 145, 58, 203),
('NYU001', '85025', 'Outpatient', 160, 80, 32, 112),
('NYU001', '99213', 'Outpatient', 320, 160, 64, 224),
('NYU001', '99214', 'Outpatient', 460, 230, 92, 322),
('NYU001', '45378', 'Outpatient', 4800, 2400, 960, 3360),
('NYU001', '59400', 'Inpatient', 17000, 8500, 3400, 11900),
('NYU001', '97110', 'Outpatient', 165, 83, 33, 116),
('NYU001', '470', 'Inpatient', 48000, 24000, 9600, 33600);

-- MSK001 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('MSK001', '70551', 'Outpatient', 4500, 2250, 900, 3150),
('MSK001', '70552', 'Outpatient', 4900, 2450, 980, 3430),
('MSK001', '72141', 'Outpatient', 4200, 2100, 840, 2940),
('MSK001', '72148', 'Outpatient', 4300, 2150, 860, 3010),
('MSK001', '73721', 'Outpatient', 4000, 2000, 800, 2800),
('MSK001', '70450', 'Outpatient', 3400, 1700, 680, 2380),
('MSK001', '74177', 'Outpatient', 5200, 2600, 1040, 3640),
('MSK001', '71046', 'Outpatient', 550, 275, 110, 385),
('MSK001', '76700', 'Outpatient', 1500, 750, 300, 1050),
('MSK001', '80053', 'Outpatient', 400, 200, 80, 280),
('MSK001', '85025', 'Outpatient', 220, 110, 44, 154),
('MSK001', '99213', 'Outpatient', 420, 210, 84, 294),
('MSK001', '99214', 'Outpatient', 600, 300, 120, 420),
('MSK001', '45378', 'Outpatient', 6000, 3000, 1200, 4200),
('MSK001', '59400', 'Inpatient', 21000, 10500, 4200, 14700),
('MSK001', '97110', 'Outpatient', 220, 110, 44, 154),
('MSK001', '470', 'Inpatient', 60000, 30000, 12000, 42000);

-- LHH001 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('LHH001', '70551', 'Outpatient', 3200, 1600, 640, 2240),
('LHH001', '70552', 'Outpatient', 3500, 1750, 700, 2450),
('LHH001', '72141', 'Outpatient', 3000, 1500, 600, 2100),
('LHH001', '72148', 'Outpatient', 3100, 1550, 620, 2170),
('LHH001', '73721', 'Outpatient', 2900, 1450, 580, 2030),
('LHH001', '70450', 'Outpatient', 2400, 1200, 480, 1680),
('LHH001', '74177', 'Outpatient', 3800, 1900, 760, 2660),
('LHH001', '71046', 'Outpatient', 380, 190, 76, 266),
('LHH001', '76700', 'Outpatient', 980, 490, 196, 686),
('LHH001', '80053', 'Outpatient', 270, 135, 54, 189),
('LHH001', '85025', 'Outpatient', 150, 75, 30, 105),
('LHH001', '99213', 'Outpatient', 300, 150, 60, 210),
('LHH001', '99214', 'Outpatient', 430, 215, 86, 301),
('LHH001', '45378', 'Outpatient', 4500, 2250, 900, 3150),
('LHH001', '59400', 'Inpatient', 16000, 8000, 3200, 11200),
('LHH001', '97110', 'Outpatient', 150, 75, 30, 105),
('LHH001', '470', 'Inpatient', 45000, 22500, 9000, 31500);

-- CED001 prices (Cedars-Sinai)
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('CED001', '70551', 'Outpatient', 4000, 2000, 800, 2800),
('CED001', '73721', 'Outpatient', 3500, 1750, 700, 2450),
('CED001', '70450', 'Outpatient', 2900, 1450, 580, 2030),
('CED001', '74177', 'Outpatient', 4600, 2300, 920, 3220),
('CED001', '80053', 'Outpatient', 310, 155, 62, 217),
('CED001', '99213', 'Outpatient', 360, 180, 72, 252),
('CED001', '45378', 'Outpatient', 5300, 2650, 1060, 3710),
('CED001', '470', 'Inpatient', 54000, 27000, 10800, 37800);

-- UCLA01 prices
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('UCLA01', '70551', 'Outpatient', 3700, 1850, 740, 2590),
('UCLA01', '73721', 'Outpatient', 3200, 1600, 640, 2240),
('UCLA01', '70450', 'Outpatient', 2700, 1350, 540, 1890),
('UCLA01', '74177', 'Outpatient', 4300, 2150, 860, 3010),
('UCLA01', '80053', 'Outpatient', 280, 140, 56, 196),
('UCLA01', '99213', 'Outpatient', 330, 165, 66, 231),
('UCLA01', '45378', 'Outpatient', 4900, 2450, 980, 3430),
('UCLA01', '470', 'Inpatient', 50000, 25000, 10000, 35000);

-- MGH001 prices (Mass General)
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('MGH001', '70551', 'Outpatient', 3900, 1950, 780, 2730),
('MGH001', '73721', 'Outpatient', 3400, 1700, 680, 2380),
('MGH001', '70450', 'Outpatient', 2850, 1425, 570, 1995),
('MGH001', '74177', 'Outpatient', 4400, 2200, 880, 3080),
('MGH001', '80053', 'Outpatient', 340, 170, 68, 238),
('MGH001', '99213', 'Outpatient', 370, 185, 74, 259),
('MGH001', '45378', 'Outpatient', 5400, 2700, 1080, 3780),
('MGH001', '470', 'Inpatient', 53000, 26500, 10600, 37100);

-- BWH001 prices (Brigham)
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('BWH001', '70551', 'Outpatient', 3750, 1875, 750, 2625),
('BWH001', '73721', 'Outpatient', 3250, 1625, 650, 2275),
('BWH001', '70450', 'Outpatient', 2750, 1375, 550, 1925),
('BWH001', '74177', 'Outpatient', 4350, 2175, 870, 3045),
('BWH001', '80053', 'Outpatient', 330, 165, 66, 231),
('BWH001', '99213', 'Outpatient', 355, 178, 71, 249),
('BWH001', '45378', 'Outpatient', 5100, 2550, 1020, 3570),
('BWH001', '470', 'Inpatient', 51000, 25500, 10200, 35700);

-- HUP001 prices (Penn Medicine)
INSERT OR IGNORE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge) VALUES
('HUP001', '70551', 'Outpatient', 3650, 1825, 730, 2555),
('HUP001', '73721', 'Outpatient', 3150, 1575, 630, 2205),
('HUP001', '70450', 'Outpatient', 2650, 1325, 530, 1855),
('HUP001', '74177', 'Outpatient', 4100, 2050, 820, 2870),
('HUP001', '80053', 'Outpatient', 300, 150, 60, 210),
('HUP001', '99213', 'Outpatient', 340, 170, 68, 238),
('HUP001', '45378', 'Outpatient', 4700, 2350, 940, 3290),
('HUP001', '470', 'Inpatient', 49000, 24500, 9800, 34300);

-- Sample payer plans
INSERT OR IGNORE INTO payer_plans (payer_name, plan_name, plan_type) VALUES
('UnitedHealthcare', 'Choice Plus', 'PPO'),
('Aetna', 'Open Access', 'HMO'),
('Blue Cross Blue Shield', 'Blue PPO', 'PPO'),
('Cigna', 'Open Access Plus', 'PPO'),
('Humana', 'Gold Plus', 'HMO');
