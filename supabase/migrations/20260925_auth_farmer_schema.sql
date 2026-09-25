-- ==============================================================================
-- BKIN (Bharat Krishi Intelligence Network)
-- Farmer Account, Multi-Farm, History, & Row-Level Security (RLS) Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked directly to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    farmer_id TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    full_name TEXT,
    state TEXT,
    district TEXT,
    village TEXT,
    language TEXT DEFAULT 'en' CHECK (language IN ('en', 'hi')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. FARMS TABLE (Multi-farm parcel management)
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    village TEXT,
    total_area_acres NUMERIC(6, 2) NOT NULL DEFAULT 1.0,
    soil_type TEXT DEFAULT 'Alluvial',
    primary_crop TEXT DEFAULT 'Wheat',
    sowing_date DATE,
    irrigation_type TEXT DEFAULT 'Canal + Borewell',
    is_active BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CROPS HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    variety TEXT,
    season TEXT,
    sowing_date DATE,
    harvest_date DATE,
    yield_quintal NUMERIC(8, 2),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'harvested', 'failed', 'planned')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. SOIL RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.soil_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_date DATE NOT NULL DEFAULT CURRENT_DATE,
    ph_level NUMERIC(4, 2),
    nitrogen_kg_ha NUMERIC(6, 2),
    phosphorus_kg_ha NUMERIC(6, 2),
    potassium_kg_ha NUMERIC(6, 2),
    organic_carbon_pct NUMERIC(4, 2),
    moisture_pct NUMERIC(5, 2),
    health_status TEXT DEFAULT 'Optimal',
    recommendations TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. DISEASE & PEST RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.disease_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    disease_name TEXT NOT NULL,
    confidence_score NUMERIC(5, 2) NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'moderate', 'high', 'critical')),
    image_url TEXT,
    symptoms TEXT,
    treatment TEXT,
    scanned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. WEATHER HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.weather_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    temperature_c NUMERIC(5, 2),
    humidity_pct NUMERIC(5, 2),
    rainfall_mm NUMERIC(6, 2),
    wind_speed_kmh NUMERIC(5, 2),
    alert_title TEXT
);

-- 7. AI ASSISTANT (ASK KRISHI) HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.ai_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. ACTIVITY TIMELINE LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('farm', 'crop', 'soil', 'disease', 'weather', 'account', 'ai')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures each farmer can ONLY read, insert, update, and delete their own data
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_history ENABLE ROW LEVEL SECURITY;

-- Profiles: users can select, update their own profile, insert on signup
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Farms
CREATE POLICY "Users can manage own farms" ON public.farms FOR ALL USING (auth.uid() = user_id);

-- Crops
CREATE POLICY "Users can manage own crops" ON public.crops FOR ALL USING (auth.uid() = user_id);

-- Soil Records
CREATE POLICY "Users can manage own soil records" ON public.soil_records FOR ALL USING (auth.uid() = user_id);

-- Disease Records
CREATE POLICY "Users can manage own disease records" ON public.disease_records FOR ALL USING (auth.uid() = user_id);

-- Weather History
CREATE POLICY "Users can manage own weather history" ON public.weather_history FOR ALL USING (auth.uid() = user_id);

-- AI History
CREATE POLICY "Users can manage own AI history" ON public.ai_history FOR ALL USING (auth.uid() = user_id);

-- Activity History
CREATE POLICY "Users can manage own activity history" ON public.activity_history FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC TIMESTAMP TRIGGERS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_farm_updated
    BEFORE UPDATE ON public.farms
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON public.farms(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON public.crops(farm_id);
CREATE INDEX IF NOT EXISTS idx_soil_records_farm_id ON public.soil_records(farm_id);
CREATE INDEX IF NOT EXISTS idx_disease_records_user_id ON public.disease_records(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_history_user_id ON public.activity_history(user_id);
