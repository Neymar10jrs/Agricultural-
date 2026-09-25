'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { demoWeatherObservation } from '@/data/demoFarm';
import { WeatherDayForecast } from '@/types';
import { ZoomEarthSatelliteMap } from '@/components/maps/ZoomEarthSatelliteMap';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';


export default function WeatherPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';
  const [weatherData] = useState(demoWeatherObservation);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay = weatherData.forecast7Days[selectedDayIndex];

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/weather/weather-radar.svg"
        theme="weather"
        label={isHi ? 'आईएमडी कृषि-मौसम नेटवर्क' : 'IMD AGRO-METEOROLOGICAL NETWORK'}

        heading={
          <span className="text-gradient-satellite">{dict.weather.title}</span>
        }
        description={dict.weather.subtitle}
        showDemoBadge={true}
        stats={[
          { value: `${activeDay?.tempMaxC ?? weatherData.currentTempC}°C`, label: isHi ? 'अधिकतम तापमान' : 'Max Temp' },
          { value: `${weatherData.humidityPercent}%`, label: isHi ? 'आर्द्रता' : 'Humidity' },
          { value: `${weatherData.windSpeedKmh} km/h`, label: isHi ? 'हवा गति' : 'Wind Speed' },
          { value: activeDay?.condition || 'Optimal', label: isHi ? 'मौसम' : 'Condition' },
        ]}

      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Extreme Weather Active Alerts (Section 15) */}
      {weatherData.alerts.length > 0 && (

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Active Meteorological Advisory Alerts:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-950 pl-2">
            {weatherData.alerts.map((alert, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Current Real-Time Conditions Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Current Farm Micro-Climate
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-black">{weatherData.currentTempC}°C</span>
            <span className="text-sm text-emerald-200 font-medium">Feels like {weatherData.feelsLikeC}°C</span>
          </div>
          <p className="text-xs text-slate-300">
            Partly cloudy skies with increasing cloud cover from North-West. High humidity favorable for disease incubation.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              Rain Probability
            </div>
            <div className="text-xl font-bold mt-1 text-white">{weatherData.rainProbabilityPercent}%</div>
            <div className="text-[10px] text-amber-300 font-medium">Rain Expected</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              Humidity
            </div>
            <div className="text-xl font-bold mt-1 text-white">{weatherData.humidityPercent}%</div>
            <div className="text-[10px] text-slate-300">Dew point: {weatherData.dewPointC}°C</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              Wind Speed
            </div>
            <div className="text-xl font-bold mt-1 text-white">{weatherData.windSpeedKmh} km/h</div>
            <div className="text-[10px] text-slate-300">{weatherData.windDirection}</div>
          </div>
        </div>
      </div>

      {/* 7-Day Agricultural Impact Forecast Carousel / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            7-Day Forecast & Farm Operational Impact
          </h3>
          <span className="text-xs text-slate-500">Click a day to inspect operational suitability</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData.forecast7Days.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border-white/10 hover:border-emerald-400/40 hover:bg-[rgba(10,20,15,0.28)] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{day.dayName}</span>
                  <span className="text-[10px] text-slate-400">{day.date}</span>
                </div>

                <div className="my-2.5 text-center">
                  <div className="text-base font-extrabold text-slate-900">
                    {day.tempMaxC}° <span className="text-xs font-normal text-slate-500">/ {day.tempMinC}°</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{day.condition}</div>
                  {day.rainfallMm > 0 && (
                    <div className="text-[10px] font-bold text-blue-600 mt-1">
                      {day.rainfallMm} mm ({day.rainProbabilityPercent}%)
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-center">
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      day.sprayingCondition === 'Optimal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : day.sprayingCondition === 'Caution'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Spray: {day.sprayingCondition}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Deep-Dive Agricultural Impact Translation (Section 15 Core Requirement) */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Selected Day Operational Advisory
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {activeDay.dayName} ({activeDay.date}) — Field Advisory
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Spraying Suitability:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeDay.sprayingCondition === 'Optimal'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : activeDay.sprayingCondition === 'Caution'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {activeDay.sprayingCondition}
            </span>
          </div>
        </div>

        {/* Agricultural Impact Card */}
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Agricultural Impact Translation:
          </div>
          <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
            {activeDay.agriculturalImpact}
          </p>
        </div>

        {/* 3 Action Pillars: Rainfall, Temperature, Wind */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-blue-600" />
              Irrigation Guidance:
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeDay.rainfallMm > 5
                ? 'Rainfall probability is high. Delay irrigation to conserve tubewell power and prevent root rot.'
                : 'No significant rainfall predicted. Scheduled irrigation can proceed as per soil moisture status.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-600" />
              Temperature & Evapotranspiration:
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Max {activeDay.tempMaxC}°C / Min {activeDay.tempMinC}°C. Normal range for wheat tillering. No heatwave or frost alert.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-slate-600" />
              Spraying & Drift Risk:
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Wind at {activeDay.windSpeedKmh} km/h ({activeDay.windDirection}).{' '}
              {activeDay.windSpeedKmh > 15
                ? 'High drift risk. Avoid fine droplet foliar sprays.'
                : 'Calm winds. Safe for boom sprayer operations.'}
            </p>
          </div>
        </div>
      </div>

      {/* Live Zoom.Earth Satellite & Storm Radar Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Live Real-Time Earth Telemetry
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Interactive Satellite Cloud & Storm Radar (Zoom.Earth Stream)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Focal Point: 12.7°N, 82.8°E (Bay of Bengal / Indian Subcontinent)
          </span>
        </div>

        <ZoomEarthSatelliteMap initialLat={12.7} initialLon={82.8} initialZoom={4} />
      </div>

      </div> {/* end inner content div */}
    </div>
  );
}
