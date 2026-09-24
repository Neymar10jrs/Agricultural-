"""
Bharat Krishi Intelligence Network (BKIN)
Standalone FastAPI Backend Microservice
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any

app = FastAPI(
    title="Bharat Krishi Intelligence Network (BKIN) API",
    description="Open Agriculture Intelligence Public Good API for India",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz", tags=["System"])
def health_check():
    return {"status": "healthy", "service": "bkin-backend", "version": "1.0.0"}

@app.get("/api/v1/weather", tags=["Weather"])
def get_weather(state: str = "Punjab", district: str = "Ludhiana"):
    return {
        "status": "success",
        "state": state,
        "district": district,
        "telemetry_source": "IMD-Agromet-Radar",
        "current": {
            "temp_c": 22.4,
            "feels_like_c": 23.1,
            "humidity_percent": 68,
            "wind_speed_kmh": 14,
            "rain_prob_percent": 78,
            "spraying_suitability": "Caution"
        },
        "forecast_summary": "12.5mm rain likely within 24 hours.",
        "operational_advice": "Delay scheduled tubewell irrigation for 36-48 hours."
    }

@app.get("/api/v1/soil", tags=["Soil"])
def get_soil(farm_id: str = "farm-pb-ldh-042"):
    return {
        "status": "success",
        "farm_id": farm_id,
        "soil_type": "Alluvial Loam",
        "ph": 7.2,
        "nitrogen_kg_ha": 195,
        "phosphorus_kg_ha": 24,
        "potassium_kg_ha": 280,
        "organic_carbon_percent": 0.46,
        "recommendation": "Apply split top-dressing of 45kg/acre Urea post-rainfall."
    }

@app.get("/api/v1/satellite", tags=["Satellite"])
def get_satellite(farm_id: str = "farm-pb-ldh-042"):
    return {
        "status": "success",
        "farm_id": farm_id,
        "satellite": "Sentinel-2 Multi-spectral",
        "acquisition_date": "2026-09-16",
        "cloud_cover_percent": 2.1,
        "ndvi_mean": 0.68,
        "ndwi_mean": 0.22,
        "anomalies": [
            {
                "zone": "North-Eastern parcel (0.35 acres)",
                "ndvi": 0.51,
                "note": "Localized vegetative stress detected."
            }
        ]
    }

@app.get("/api/v1/advisory", tags=["Advisory"])
def get_advisory(farm_id: str = "farm-pb-ldh-042"):
    return {
        "status": "success",
        "farm_id": farm_id,
        "advisories": [
            {
                "title": "Delay Tubewell Irrigation for 36–48 Hours",
                "urgency": "Immediate",
                "recommendation": "Postpone scheduled irrigation cycle.",
                "why": "Western disturbance brings 12.5mm rain with 78% probability in 24h.",
                "evidence": "Radar precipitation spike + soil moisture at 32.5%.",
                "confidence": "High (92%)",
                "data_sources": ["Weather", "Soil", "Crop Stage"]
            },
            {
                "title": "Inspect Northern Field Section for Localized Stress",
                "urgency": "Within 48h",
                "recommendation": "Conduct walking inspection of 0.35-acre north-eastern parcel.",
                "why": "Sentinel-2 NDVI shows localized dip (0.51 vs 0.68 avg).",
                "confidence": "Medium (78%)",
                "data_sources": ["Satellite", "Soil"]
            }
        ]
    }

@app.get("/api/v1/states", tags=["Federation"])
def get_states():
    return {
        "status": "success",
        "protocol": "BKIN-Federated-Gateway-v1.0",
        "nodes": ["Punjab", "Haryana", "Uttar Pradesh", "Maharashtra", "Karnataka", "Bihar", "Gujarat", "Madhya Pradesh"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
