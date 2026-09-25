'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { auth as firebaseAuth } from '@/firebase-config';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { generateFarmerId } from '@/lib/auth/farmerId';
import {
  FarmerProfile,
  FarmerFarm,
  CropHistoryRecord,
  SoilHistoryRecord,
  DiseaseHistoryRecord,
  WeatherHistoryRecord,
  AiChatHistoryRecord,
  ActivityLogRecord,
} from '@/types';

interface AuthUser {
  id: string;
  phone: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: FarmerProfile | null;
  farms: FarmerFarm[];
  activeFarm: FarmerFarm | null;
  crops: CropHistoryRecord[];
  soilRecords: SoilHistoryRecord[];
  diseaseRecords: DiseaseHistoryRecord[];
  weatherHistory: WeatherHistoryRecord[];
  aiHistory: AiChatHistoryRecord[];
  activityLogs: ActivityLogRecord[];
  isLoading: boolean;
  isDevMode: boolean;
  // Auth methods
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, token: string) => Promise<{ success: boolean; isNewUser: boolean; error?: string }>;
  loginWithFirebaseSession: (uid: string, phone: string) => Promise<{ success: boolean; isNewUser: boolean }>;
  signOut: () => Promise<void>;
  // Profile & Farm management
  updateProfile: (data: Partial<FarmerProfile>) => Promise<boolean>;
  addFarm: (farm: Omit<FarmerFarm, 'id' | 'userId' | 'createdAt' | 'isActive'>) => Promise<FarmerFarm>;
  updateFarm: (id: string, data: Partial<FarmerFarm>) => Promise<boolean>;
  deleteFarm: (id: string) => Promise<boolean>;
  setActiveFarmId: (id: string) => void;
  // History & Logging
  addCropRecord: (record: Omit<CropHistoryRecord, 'id'>) => void;
  addSoilRecord: (record: Omit<SoilHistoryRecord, 'id'>) => void;
  addDiseaseRecord: (record: Omit<DiseaseHistoryRecord, 'id' | 'scannedAt'>) => void;
  addAiHistory: (query: string, response: string, category?: string) => void;
  logActivity: (title: string, description: string, category: ActivityLogRecord['category']) => void;
  exportAccountData: () => string;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: 'bkin_auth_user',
  PROFILE: 'bkin_farmer_profile',
  FARMS: 'bkin_farmer_farms',
  ACTIVE_FARM_ID: 'bkin_active_farm_id',
  CROPS: 'bkin_crops_history',
  SOIL: 'bkin_soil_records',
  DISEASE: 'bkin_disease_records',
  WEATHER: 'bkin_weather_history',
  AI: 'bkin_ai_history',
  ACTIVITY: 'bkin_activity_logs',
};

// Seed initial demo data for a rich initial experience
function createInitialSeedData(userId: string, farmerId: string, phone: string) {
  const initialProfile: FarmerProfile = {
    id: userId,
    farmerId,
    phone,
    fullName: 'Sardar Gurpreet Singh',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Gill Kalan',
    language: 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const initialFarms: FarmerFarm[] = [
    {
      id: 'farm-1',
      userId,
      name: 'Gill North Parcel (Wheat)',
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Gill Kalan',
      totalAreaAcres: 4.5,
      soilType: 'Alluvial',
      primaryCrop: 'Wheat (HD-2967)',
      sowingDate: '2025-11-12',
      irrigationType: 'Canal + Solar Borewell',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'farm-2',
      userId,
      name: 'South Canal Plot (Mustard)',
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Gill Kalan',
      totalAreaAcres: 2.0,
      soilType: 'Loamy',
      primaryCrop: 'Mustard (Pusa Bold)',
      sowingDate: '2025-10-25',
      irrigationType: 'Drip System',
      isActive: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const initialCrops: CropHistoryRecord[] = [
    {
      id: 'crop-1',
      farmId: 'farm-1',
      cropName: 'Wheat (HD-2967)',
      variety: 'HD-2967 High Yield',
      season: 'Rabi 2025-26',
      sowingDate: '2025-11-12',
      status: 'active',
      notes: 'Tillering stage on track. Second nitrogen top dressing scheduled.',
    },
    {
      id: 'crop-2',
      farmId: 'farm-1',
      cropName: 'Paddy (PR-126)',
      variety: 'PR-126 Short Duration',
      season: 'Kharif 2025',
      sowingDate: '2025-06-20',
      harvestDate: '2025-10-15',
      yieldQuintal: 118,
      status: 'harvested',
      notes: 'Bumper harvest. Minimal stem borer damage recorded.',
    },
  ];

  const initialSoil: SoilHistoryRecord[] = [
    {
      id: 'soil-1',
      farmId: 'farm-1',
      testDate: '2026-01-15',
      phLevel: 7.2,
      nitrogenKgHa: 280,
      phosphorusKgHa: 22,
      potassiumKgHa: 310,
      organicCarbonPct: 0.65,
      moisturePct: 32.5,
      healthStatus: 'Good / Balanced',
      recommendations: 'Apply zinc sulfate 25kg/ha; maintain soil organic carbon.',
    },
  ];

  const initialDisease: DiseaseHistoryRecord[] = [
    {
      id: 'dis-1',
      farmId: 'farm-1',
      cropName: 'Wheat',
      diseaseName: 'Yellow Rust Early Warning',
      confidenceScore: 84,
      severity: 'moderate',
      symptoms: 'Mild chlorotic streaks detected on lower leaf foliage.',
      treatment: 'Apply Propiconazole 25% EC @ 1ml/L as preventive spray.',
      scannedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ];

  const initialWeather: WeatherHistoryRecord[] = [
    {
      id: 'w-1',
      farmId: 'farm-1',
      recordedAt: new Date().toISOString(),
      temperatureC: 22.4,
      humidityPct: 68,
      rainfallMm: 0,
      windSpeedKmh: 11,
      alertTitle: 'Optimal spraying window today',
    },
  ];

  const initialAi: AiChatHistoryRecord[] = [
    {
      id: 'ai-1',
      farmId: 'farm-1',
      query: 'When should I apply the second dose of Urea for my HD-2967 wheat?',
      response: 'Apply second dose of Urea (45-50 kg/acre) during first node/jointing stage, ideally right after irrigation.',
      category: 'fertilizer',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
  ];

  const initialActivity: ActivityLogRecord[] = [
    {
      id: 'act-1',
      farmId: 'farm-1',
      title: 'Farmer Account Created',
      description: `Permanent Farmer ID assigned: ${farmerId}`,
      category: 'account',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'act-2',
      farmId: 'farm-1',
      title: 'Farm Parcels Initialized',
      description: 'Gill North Parcel (4.5 Acres) designated as primary monitoring plot.',
      category: 'farm',
      createdAt: new Date().toISOString(),
    },
  ];

  return {
    initialProfile,
    initialFarms,
    initialCrops,
    initialSoil,
    initialDisease,
    initialWeather,
    initialAi,
    initialActivity,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [farms, setFarms] = useState<FarmerFarm[]>([]);
  const [activeFarmId, setActiveFarmIdState] = useState<string | null>(null);
  const [crops, setCrops] = useState<CropHistoryRecord[]>([]);
  const [soilRecords, setSoilRecords] = useState<SoilHistoryRecord[]>([]);
  const [diseaseRecords, setDiseaseRecords] = useState<DiseaseHistoryRecord[]>([]);
  const [weatherHistory, setWeatherHistory] = useState<WeatherHistoryRecord[]>([]);
  const [aiHistory, setAiHistory] = useState<AiChatHistoryRecord[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseBrowserClient();
  const isDevMode = false;

  // Initialize from storage or Supabase session
  useEffect(() => {
    async function initAuth() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const uid = session.user.id;
            const phone = session.user.phone || '';
            setUser({ id: uid, phone });

            // Fetch profile
            const { data: dbProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', uid)
              .single();

            if (dbProfile) {
              setProfile({
                id: dbProfile.id,
                farmerId: dbProfile.farmer_id,
                phone: dbProfile.phone,
                fullName: dbProfile.full_name,
                state: dbProfile.state,
                district: dbProfile.district,
                village: dbProfile.village,
                language: dbProfile.language || 'en',
                createdAt: dbProfile.created_at,
                updatedAt: dbProfile.updated_at,
              });
            }

            // Fetch farms
            const { data: dbFarms } = await supabase
              .from('farms')
              .select('*')
              .eq('user_id', uid)
              .order('created_at', { ascending: true });

            if (dbFarms && dbFarms.length > 0) {
              const mappedFarms: FarmerFarm[] = dbFarms.map((f) => ({
                id: f.id,
                userId: f.user_id,
                name: f.name,
                state: f.state,
                district: f.district,
                village: f.village,
                totalAreaAcres: Number(f.total_area_acres),
                soilType: f.soil_type,
                primaryCrop: f.primary_crop,
                sowingDate: f.sowing_date,
                irrigationType: f.irrigation_type,
                isActive: f.is_active,
                createdAt: f.created_at,
              }));
              setFarms(mappedFarms);
              const active = mappedFarms.find((f) => f.isActive) || mappedFarms[0];
              setActiveFarmIdState(active.id);
            }
          }
        } else {
          // Dev / LocalStorage fallback
          const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
            if (storedProfile) setProfile(JSON.parse(storedProfile));

            const storedFarms = localStorage.getItem(STORAGE_KEYS.FARMS);
            if (storedFarms) {
              const parsedFarms = JSON.parse(storedFarms);
              setFarms(parsedFarms);
              const savedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_FARM_ID);
              if (savedActiveId && parsedFarms.some((f: FarmerFarm) => f.id === savedActiveId)) {
                setActiveFarmIdState(savedActiveId);
              } else if (parsedFarms.length > 0) {
                setActiveFarmIdState(parsedFarms[0].id);
              }
            }

            const storedCrops = localStorage.getItem(STORAGE_KEYS.CROPS);
            if (storedCrops) setCrops(JSON.parse(storedCrops));

            const storedSoil = localStorage.getItem(STORAGE_KEYS.SOIL);
            if (storedSoil) setSoilRecords(JSON.parse(storedSoil));

            const storedDisease = localStorage.getItem(STORAGE_KEYS.DISEASE);
            if (storedDisease) setDiseaseRecords(JSON.parse(storedDisease));

            const storedWeather = localStorage.getItem(STORAGE_KEYS.WEATHER);
            if (storedWeather) setWeatherHistory(JSON.parse(storedWeather));

            const storedAi = localStorage.getItem(STORAGE_KEYS.AI);
            if (storedAi) setAiHistory(JSON.parse(storedAi));

            const storedActivity = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
            if (storedActivity) setActivityLogs(JSON.parse(storedActivity));
          }
        }
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, [isDevMode]);

  // Sync state to LocalStorage for persistence in dev/offline mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.FARMS, JSON.stringify(farms));
  }, [farms]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (activeFarmId) localStorage.setItem(STORAGE_KEYS.ACTIVE_FARM_ID, activeFarmId);
  }, [activeFarmId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SOIL, JSON.stringify(soilRecords));
  }, [soilRecords]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DISEASE, JSON.stringify(diseaseRecords));
  }, [diseaseRecords]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.WEATHER, JSON.stringify(weatherHistory));
  }, [weatherHistory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.AI, JSON.stringify(aiHistory));
  }, [aiHistory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Login with Firebase session after verification
  const loginWithFirebaseSession = async (uid: string, phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const authUser: AuthUser = { id: uid, phone: cleanPhone };
    setUser(authUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));

    const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    let isNew = false;

    if (!storedProfile) {
      isNew = true;
      const fid = generateFarmerId();
      const seed = createInitialSeedData(uid, fid, cleanPhone);
      setProfile(seed.initialProfile);
      setFarms(seed.initialFarms);
      setActiveFarmIdState(seed.initialFarms[0].id);
      setCrops(seed.initialCrops);
      setSoilRecords(seed.initialSoil);
      setDiseaseRecords(seed.initialDisease);
      setWeatherHistory(seed.initialWeather);
      setAiHistory(seed.initialAi);
      setActivityLogs(seed.initialActivity);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(seed.initialProfile));
      localStorage.setItem(STORAGE_KEYS.FARMS, JSON.stringify(seed.initialFarms));
    } else {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
      } catch {
        // Fallback if parsing failed
      }
    }

    return { success: true, isNewUser: isNew };
  };

  // Send OTP
  const sendOtp = async (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: `+91${cleanPhone}`,
        });
        if (error) {
          return { success: false, message: error.message };
        }
        return { success: true, message: `OTP sent successfully to +91 ${cleanPhone}` };
      } catch (err: any) {
        return { success: false, message: err.message || 'Failed to dispatch OTP' };
      }
    }

    return {
      success: true,
      message: `OTP dispatch initiated for +91 ${cleanPhone}`,
    };
  };

  // Verify OTP
  const verifyOtp = async (phone: string, token: string) => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const cleanToken = token.trim();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: `+91${cleanPhone}`,
          token: cleanToken,
          type: 'sms',
        });

        if (error || !data.user) {
          return { success: false, isNewUser: false, error: error?.message || 'Invalid or expired OTP' };
        }

        return await loginWithFirebaseSession(data.user.id, cleanPhone);
      } catch (err: any) {
        return { success: false, isNewUser: false, error: err.message || 'OTP verification failed' };
      }
    }

    return {
      success: false,
      isNewUser: false,
      error: 'OTP verification is handled securely via Firebase Phone Authentication.',
    };
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      console.warn('Firebase signout error:', err);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout error:', err);
      }
    }

    setUser(null);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_FARM_ID);
    if (typeof document !== 'undefined') {
      document.cookie = 'bkin_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  // Update Profile
  const updateProfile = async (data: Partial<FarmerProfile>): Promise<boolean> => {
    if (!profile) return false;
    const updated: FarmerProfile = {
      ...profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    setProfile(updated);

    if (isSupabaseConfigured && supabase && user) {
      await supabase
        .from('profiles')
        .update({
          full_name: updated.fullName,
          state: updated.state,
          district: updated.district,
          village: updated.village,
          language: updated.language,
          updated_at: updated.updatedAt,
        })
        .eq('id', user.id);
    }

    logActivity('Profile Updated', 'Farmer contact and regional details were updated.', 'account');
    return true;
  };

  // Add Farm
  const addFarm = async (farmData: Omit<FarmerFarm, 'id' | 'userId' | 'createdAt' | 'isActive'>): Promise<FarmerFarm> => {
    const newFarm: FarmerFarm = {
      id: `farm-${Date.now()}`,
      userId: user?.id || 'demo-user',
      ...farmData,
      isActive: farms.length === 0,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase && user) {
      const { data } = await supabase
        .from('farms')
        .insert({
          user_id: user.id,
          name: newFarm.name,
          state: newFarm.state,
          district: newFarm.district,
          village: newFarm.village,
          total_area_acres: newFarm.totalAreaAcres,
          soil_type: newFarm.soilType,
          primary_crop: newFarm.primaryCrop,
          sowing_date: newFarm.sowingDate,
          irrigation_type: newFarm.irrigationType,
          is_active: newFarm.isActive,
        })
        .select()
        .single();

      if (data) {
        newFarm.id = data.id;
      }
    }

    setFarms((prev) => [...prev, newFarm]);
    if (farms.length === 0 || newFarm.isActive) {
      setActiveFarmIdState(newFarm.id);
    }

    logActivity('New Farm Added', `Parcel '${newFarm.name}' (${newFarm.totalAreaAcres} Acres) registered.`, 'farm');
    return newFarm;
  };

  // Update Farm
  const updateFarm = async (id: string, data: Partial<FarmerFarm>): Promise<boolean> => {
    setFarms((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...data } : f))
    );

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('farms')
        .update({
          name: data.name,
          state: data.state,
          district: data.district,
          village: data.village,
          total_area_acres: data.totalAreaAcres,
          soil_type: data.soilType,
          primary_crop: data.primaryCrop,
          sowing_date: data.sowingDate,
          irrigation_type: data.irrigationType,
        })
        .eq('id', id);
    }

    logActivity('Farm Details Updated', `Farm configuration updated for parcel ${id}`, 'farm');
    return true;
  };

  // Delete Farm
  const deleteFarm = async (id: string): Promise<boolean> => {
    setFarms((prev) => prev.filter((f) => f.id !== id));
    if (activeFarmId === id) {
      const remaining = farms.filter((f) => f.id !== id);
      setActiveFarmIdState(remaining.length > 0 ? remaining[0].id : null);
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('farms').delete().eq('id', id);
    }

    logActivity('Farm Parcel Removed', `Farm parcel ${id} was deleted from active records.`, 'farm');
    return true;
  };

  // Set Active Farm
  const setActiveFarmId = (id: string) => {
    setActiveFarmIdState(id);
    setFarms((prev) =>
      prev.map((f) => ({
        ...f,
        isActive: f.id === id,
      }))
    );
  };

  // History & Logging Helpers
  const addCropRecord = (record: Omit<CropHistoryRecord, 'id'>) => {
    const newRecord: CropHistoryRecord = { ...record, id: `crop-${Date.now()}` };
    setCrops((prev) => [newRecord, ...prev]);
    logActivity('Crop Cycle Logged', `Logged ${newRecord.cropName} (${newRecord.season})`, 'crop');
  };

  const addSoilRecord = (record: Omit<SoilHistoryRecord, 'id'>) => {
    const newRecord: SoilHistoryRecord = { ...record, id: `soil-${Date.now()}` };
    setSoilRecords((prev) => [newRecord, ...prev]);
    logActivity('Soil Test Added', `New soil test recorded: pH ${newRecord.phLevel}`, 'soil');
  };

  const addDiseaseRecord = (record: Omit<DiseaseHistoryRecord, 'id' | 'scannedAt'>) => {
    const newRecord: DiseaseHistoryRecord = {
      ...record,
      id: `dis-${Date.now()}`,
      scannedAt: new Date().toISOString(),
    };
    setDiseaseRecords((prev) => [newRecord, ...prev]);
    logActivity('Crop Health Scan', `Detected ${newRecord.diseaseName} (${newRecord.severity} risk)`, 'disease');
  };

  const addAiHistory = (query: string, response: string, category: string = 'advisory') => {
    const newAi: AiChatHistoryRecord = {
      id: `ai-${Date.now()}`,
      farmId: activeFarmId || undefined,
      query,
      response,
      category,
      createdAt: new Date().toISOString(),
    };
    setAiHistory((prev) => [newAi, ...prev]);
  };

  const logActivity = (title: string, description: string, category: ActivityLogRecord['category']) => {
    const newLog: ActivityLogRecord = {
      id: `act-${Date.now()}`,
      farmId: activeFarmId || undefined,
      title,
      description,
      category,
      createdAt: new Date().toISOString(),
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]); // keep latest 50
  };

  // Export Account Data as JSON
  const exportAccountData = (): string => {
    const data = {
      exportDate: new Date().toISOString(),
      profile,
      farms,
      crops,
      soilRecords,
      diseaseRecords,
      weatherHistory,
      aiHistory,
      activityLogs,
    };
    return JSON.stringify(data, null, 2);
  };

  // Delete Account
  const deleteAccount = async (): Promise<boolean> => {
    if (isSupabaseConfigured && supabase && user) {
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.signOut();
    }
    // Clear all storage
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    setUser(null);
    setProfile(null);
    setFarms([]);
    setCrops([]);
    setSoilRecords([]);
    setDiseaseRecords([]);
    setWeatherHistory([]);
    setAiHistory([]);
    setActivityLogs([]);
    setActiveFarmIdState(null);
    return true;
  };

  const activeFarm = farms.find((f) => f.id === activeFarmId) || farms[0] || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        farms,
        activeFarm,
        crops,
        soilRecords,
        diseaseRecords,
        weatherHistory,
        aiHistory,
        activityLogs,
        isLoading,
        isDevMode,
        sendOtp,
        verifyOtp,
        loginWithFirebaseSession,
        signOut,
        updateProfile,
        addFarm,
        updateFarm,
        deleteFarm,
        setActiveFarmId,
        addCropRecord,
        addSoilRecord,
        addDiseaseRecord,
        addAiHistory,
        logActivity,
        exportAccountData,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
