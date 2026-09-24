# Bharat Krishi Intelligence Network (BKIN)

> **From Data to Decisions — Smarter Farming for Every Indian Farmer.**
>
> **Complex agricultural data in. Simple, local and actionable farming intelligence out.**

---

## 🌾 Overview

**Bharat Krishi Intelligence Network (BKIN)** is a production-ready, open digital agriculture public infrastructure platform built for India's 140+ million farming households.

Smallholder farmers across India frequently face climate uncertainty, erratic monsoons, and devastating pest attacks, while valuable telemetry from satellites (ISRO/Copernicus), weather radars (IMD), soil testing labs, and agricultural universities remains fragmented and difficult to access.

BKIN acts as an **Agricultural Intelligence Layer** that fuses:
- 🛰️ **Satellite Multi-Spectral Telemetry** (10m Sentinel-2 & Resourcesat NDVI/NDWI/EVI)
- 🌦️ **Agro-Meteorological Radar Forecasts** (Precipitation probability, wind drift, dew points)
- 🧪 **Digital Soil Health Cards** (NPK, pH, electrical conductivity, organic carbon %)
- 🌾 **Crop Growth Stage Phenology** (Days after sowing, GDD thermal accumulation)
- 🐛 **Epidemiological Pest & Disease Surveillance** (State sentinel light/pheromone traps)
- 👨‍🌾 **Farmer Ground Truth Observations**

And converts them into **simple, localized, and explainable recommendations**:
> 🌱 **Crop Health: Good**
>
> Your crop vegetation is currently healthy, but the northern section of the field is showing slightly lower vegetation activity.
>
> **Possible reason:** moisture variation.
>
> **Recommended action:** inspect that area during your next field visit.
>
> **Confidence:** High (92%)
>
> **Data used:** Satellite + Soil Moisture + Weather Radar

---

## 🚀 Key Features

1. **My Farm Dashboard (`/my-farm`)**:
   Full farm profile manager with simulated Punjab demo farm (2.4 acres Wheat, 38 DAS) and multi-factor 78/100 Composite Health Index.
2. **AI Crop Doctor (`/crop-doctor`)**:
   Multimodal diagnostic engine with 1-click sample cases, leaf lesion pattern recognition, environmental correlation, and human-in-the-loop expert review workflow.
3. **Satellite Crop Monitor (`/satellite-monitor`)**:
   Interactive multi-spectral viewer (True Color, NDVI, NDWI, Crop Health, Moisture) with field boundary polygon, 38-day historical timeline scrubber, and northern parcel anomaly alert.
4. **Weather Intelligence (`/weather`)**:
   7-day agricultural impact forecasts (e.g. "Delay irrigation 36h", "High wind drift warning for spraying").
5. **Soil Health Profiling (`/soil-health`)**:
   Interactive gauges for N, P, K, pH, Organic Carbon %, EC, and moisture, accompanied by mandatory *"Why this recommendation?"* rationales.
6. **Climate Smart Farming (`/climate-smart`)**:
   Neutral comparative multi-scenario modeling (Water demand, Climate risk, Soil impact, Economics) without biased best/worst tags.
7. **Regenerative Agriculture (`/regenerative-ag`)**:
   Step-by-step transition matrix: *Current Practice → Possible Improvement → Expected Agricultural Benefit* and carbon sequestration metrics.
8. **Disease & Pest Knowledge Library (`/disease-library`)**:
   Searchable database with scientific names (e.g. *Nilaparvata lugens*), ETL thresholds, and 3-prong Integrated Pest Management (IPM).
9. **Early Warning Center (`/early-warnings`)**:
   Multi-hazard dashboard strictly distinguishing **"⚠️ Forecast"** from **"🔴 Confirmed Observation"**.
10. **Today's Actionable Advisory (`/todays-advisory`)**:
    Farmer-first feed answering *"What should I do today?"* with full Explainable AI telemetry breakdown.
11. **Federated India Network (`/india-network`)**:
    Interactive India map linking autonomous state nodes (Punjab, Haryana, UP, Maharashtra, Karnataka, Bihar) preserving state data sovereignty.
12. **State & Officer Dashboards (`/state-dashboard`, `/officer-dashboard`)**:
    District surveillance command center with regional outbreak hotspots and automated SMS/WhatsApp broadcast tools.
13. **Open Agriculture APIs (`/open-apis`)**:
    Developer portal with interactive Swagger-style sandbox testing for `/api/v1/weather`, `/api/v1/soil`, `/api/v1/satellite`, `/api/v1/advisory`.
14. **Multilingual & Voice AI ("Ask Krishi AI")**:
    Accessible across **12 Indian Languages** (English, Hindi, Punjabi, Bengali, Marathi, Gujarati, Telugu, Tamil, Kannada, Malayalam, Odia, Assamese) with voice recognition and audio speech playback.
15. **Offline-First PWA**:
    Built-in service worker caching recent advisories with instant online/offline synchronization detection.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts
- **Built-in REST API**: Standardized JSON endpoints under `/src/app/api/v1/...` (Vercel & Netlify deployable with zero setup)
- **Standalone Backend**: Python 3.11 + FastAPI microservice in `/backend`
- **PWA & Offline**: Web App Manifest, Service Worker (`sw.js`), LocalStorage cache
- **Containerization**: Docker, Docker Compose

---

## 💻 Quick Start & Development

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Installation & Run

```bash
# Clone or navigate to the project directory
cd scratch/bkin

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🐳 Docker Deployment

```bash
# Build and launch both Frontend and FastAPI Backend
docker-compose up --build
```
- Frontend: http://localhost:3000
- FastAPI Backend & Swagger Docs: http://localhost:8000/docs

---

## 📄 License & Public Good Charter
Released under the Digital Public Good Open License for Indian Agriculture.
