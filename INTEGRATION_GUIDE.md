# THUNAI Integration Guide

## 🚀 Complete Integration Setup

This guide shows how to run the THUNAI backend, PWA, and Dashboard together with proper SRS schema compliance.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- All dependencies installed in each project

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/API    ┌─────────────────┐
│   THUNAI PWA    │ ──────────────► │   Backend API   │
│   (Port 5173)   │                │   (Port 4000)   │
└─────────────────┘                └─────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                ┌─────────────────┐
│ THUNAI Dashboard│ ──────────────► │  PostgreSQL DB  │
│  (Port 3000)    │                │                 │
└─────────────────┘                └─────────────────┘
```

## 🔧 Setup Instructions

### 1. Backend Setup (Port 4000)

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

**Expected Output:**
```
THUNAI backend running on port 4000
```

### 2. PWA Setup (Port 5173)

```bash
cd pwa
npm install
npm run dev
```

**Environment Configuration:**
Create `pwa/.env` file:
```env
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=THUNAI PWA
VITE_APP_VERSION=1.0.0
```

### 3. Dashboard Setup (Port 3000)

```bash
cd dashboard
npm install
npm run dev
```

**Environment Configuration:**
Create `dashboard/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=THUNAI Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🔗 API Integration Points

### Backend Endpoints (Port 4000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/households` | GET/POST | Household CRUD |
| `/api/members` | GET/POST | Member CRUD |
| `/api/education-details` | GET/POST | Education CRUD |
| `/api/employment-details` | GET/POST | Employment CRUD |
| `/api/housing-details` | GET/POST | Housing CRUD |
| `/api/sanitation` | GET/POST | Sanitation CRUD |
| `/api/dashboard/stats` | GET | Dashboard statistics |
| `/api/auth/login` | POST | User authentication |

### PWA Integration

- **API Service**: `pwa/src/services/api.ts`
- **Data Transformation**: Uses `transformHouseholdData()` function
- **Offline Support**: Local storage fallback
- **SRS Compliance**: All 33 sections mapped correctly

### Dashboard Integration

- **API Service**: `dashboard/src/services/api.ts`
- **Real-time Data**: Fetches from backend APIs
- **Statistics**: Uses `/api/dashboard/stats` endpoint
- **Reports**: Uses `/api/dashboard/reports` endpoint

## 📊 SRS Schema Compliance

### Complete Data Mapping

The integration ensures all 33 SRS sections are properly mapped:

1. **Basic Household Information** ✅
2. **Family Member Details** ✅
3. **Migrant Worker Details** ✅
4. **Land and House Information** ✅
5. **Physical Structure Details** ✅
6. **Electrical and Lighting** ✅
7. **Sanitation and Bathroom** ✅
8. **Water Source and Management** ✅
9. **Waste Management** ✅
10. **Health Conditions** ✅
11. **Education Information** ✅
12. **Employment and Registration** ✅
13. **Entitlements and Identity Documents** ✅
14. **Nutrition Access** ✅
15. **Transportation Facilities** ✅
16. **SHG Participation** ✅
17. **Loans and Debts** ✅
18. **Balasabha Participation** ✅
19. **Child-Focused Groups** ✅
20. **Agricultural Land & Irrigation** ✅
21. **Preferred Cultivation Mode** ✅
22. **Traditional Farming** ✅
23. **Livestock and Poultry** ✅
24. **Food Consumption** ✅
25. **Cash Crops** ✅
26. **Forest Resource Collection** ✅
27. **Social Issues** ✅
28. **Wage Employment Schemes** ✅
29. **New Livelihood Opportunities** ✅
30. **Arts and Sports Interest** ✅
31. **Public Institutions Access** ✅
32. **Phone Connectivity** ✅
33. **Additional Information** ✅

## 🧪 Testing Integration

### 1. Backend Health Check

```bash
curl http://localhost:4000/
```

**Expected Response:**
```json
{
  "message": "THUNAI Backend API is running! 🚀",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "endpoints": {
    "auth": "/api/auth",
    "users": "/api/users",
    "households": "/api/households",
    "members": "/api/members",
    "education": "/api/education-details",
    "employment": "/api/employment-details",
    "housing": "/api/housing-details",
    "sanitation": "/api/sanitation",
    "locations": "/api/locations",
    "roles": "/api/roles",
    "dashboard": "/api/dashboard"
  }
}
```

### 2. PWA Data Submission

1. Open PWA at `http://localhost:5173`
2. Fill out household form
3. Submit data
4. Check backend logs for successful save

### 3. Dashboard Data View

1. Open Dashboard at `http://localhost:3000`
2. Navigate to Data View tab
3. Verify household data appears
4. Check statistics in Overview tab

## 🔒 Security Features

- **JWT Authentication**: All protected routes require valid tokens
- **CORS Configuration**: Properly configured for cross-origin requests
- **Input Validation**: All data validated before database storage
- **Audit Logging**: All API calls logged for compliance

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is enabled
   - Check frontend URLs match backend configuration

2. **Database Connection**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`

3. **Port Conflicts**
   - Backend: 4000
   - Dashboard: 3000
   - PWA: 5173

4. **TypeScript Errors**
   - Run `npx tsc --noEmit` in each project
   - Ensure all dependencies are installed

### Debug Commands

```bash
# Check backend status
curl http://localhost:4000/

# Check database connection
cd backend && npx prisma db push

# Check TypeScript compilation
cd backend && npx tsc --noEmit
cd pwa && npx tsc --noEmit
cd dashboard && npx tsc --noEmit
```

## 📈 Performance Optimization

- **Database Indexing**: Proper indexes on frequently queried fields
- **API Caching**: Implement Redis for frequently accessed data
- **Frontend Optimization**: Lazy loading and code splitting
- **Offline Support**: PWA works without internet connection

## 🎯 Next Steps

1. **User Authentication**: Implement login/logout flows
2. **Data Export**: Add CSV/Excel export functionality
3. **Real-time Updates**: Implement WebSocket for live data
4. **Mobile App**: Consider React Native for native mobile app
5. **Analytics**: Add usage analytics and reporting

## 📞 Support

For technical support or questions about the integration:

1. Check the logs in each application
2. Verify all environment variables are set
3. Ensure all services are running on correct ports
4. Test individual components before full integration

---

**THUNAI Integration Complete! 🎉**

All three components are now properly integrated with full SRS schema compliance and zero TypeScript errors. 