import { useState, useEffect } from 'react'
import './App.css'
import { apiService, transformHouseholdData } from './services/api'
import BasicHouseholdInfoForm from './components/forms/BasicHouseholdInfoForm';
import FamilyMembersForm from './components/forms/FamilyMembersForm';
import MigrantWorkerForm from './components/forms/MigrantWorkerForm';
import LandHouseInfoForm from './components/forms/LandHouseInfoForm';
import PhysicalStructureForm from './components/forms/PhysicalStructureForm';
import ElectricalFacilitiesForm from './components/forms/ElectricalFacilitiesForm';
import SanitationFacilitiesForm from './components/forms/SanitationFacilitiesForm';
import WaterSourceForm from './components/forms/WaterSourceForm';
import WasteManagementForm from './components/forms/WasteManagementForm';
import HealthConditionsForm from './components/forms/HealthConditionsForm';
import EducationDetailsForm from './components/forms/EducationDetailsForm';
import EmploymentDetailsForm from './components/forms/EmploymentDetailsForm';
import EntitlementsForm from './components/forms/EntitlementsForm';
import NutritionAccessForm from './components/forms/NutritionAccessForm';
import TransportationForm from './components/forms/TransportationForm';
import SHGParticipationForm from './components/forms/SHGParticipationForm';
import LoansDebtsForm from './components/forms/LoansDebtsForm';
import BalasabhaParticipationForm from './components/forms/BalasabhaParticipationForm';
import ChildGroupsForm from './components/forms/ChildGroupsForm';
import AgriculturalLandForm from './components/forms/AgriculturalLandForm';
import CultivationModeForm from './components/forms/CultivationModeForm';
import TraditionalFarmingForm from './components/forms/TraditionalFarmingForm';
import LivestockDetailsForm from './components/forms/LivestockDetailsForm';
import FoodConsumptionForm from './components/forms/FoodConsumptionForm';
import CashCropsForm from './components/forms/CashCropsForm';
import ForestResourcesForm from './components/forms/ForestResourcesForm';
import SocialIssuesForm from './components/forms/SocialIssuesForm';
import WageEmploymentForm from './components/forms/WageEmploymentForm';
import LivelihoodOpportunitiesForm from './components/forms/LivelihoodOpportunitiesForm';
import ArtsSportsForm from './components/forms/ArtsSportsForm';
import PublicInstitutionsForm from './components/forms/PublicInstitutionsForm';
import PhoneConnectivityForm from './components/forms/PhoneConnectivityForm';
import AdditionalInfoForm from './components/forms/AdditionalInfoForm';

// EXACT SRS COMPLIANT TYPES FOR PWA DATA COLLECTION
interface HouseholdData {
  // SRS Section 1: Basic Household Information
  headName: string;
  address: string;
  postOffice: string;
  colonyName: string;
  category: string;
  microPlanNumber: string;
  gramaPanchayat: string;
  wardNumber: string;
  houseNumber: string;
  familyMembersCount: number;
  
  // SRS Section 2: Family Members
  members: FamilyMember[];
  
  // SRS Section 3: Migrant Workers
  migrantWorkers: MigrantWorker[];
  
  // SRS Section 4: Land and House
  landAssets: LandAsset[];
  govtSchemeHouses: GovtSchemeHouse[];
  
  // SRS Section 5: Physical Structure
  housingDetails: HousingDetail;
  
  // SRS Section 6: Electrical and Lighting
  electricalFacilities: ElectricalFacility;
  
  // SRS Section 7: Sanitation and Bathroom
  sanitationFacilities: SanitationFacility;
  
  // SRS Section 8: Water Source
  waterSources: WaterSource;
  
  // SRS Section 9: Waste Management
  wasteManagement: WasteManagement;
  
  // SRS Section 10: Health Conditions
  healthConditions: HealthCondition[];
  
  // SRS Section 11: Education
  educationDetails: EducationDetail[];
  
  // SRS Section 12: Employment
  employmentDetails: EmploymentDetail[];
  
  // SRS Section 13: Entitlements
  entitlements: Entitlement;
  
  // SRS Section 14: Nutrition Access
  nutritionAccess: NutritionAccess;
  
  // SRS Section 15: Transportation
  transportation: TransportationFacility;
  
  // SRS Section 16: SHG Participation
  shgParticipation: SHGParticipation[];
  
  // SRS Section 17: Loans and Debts
  loansDebts: LoanDebt[];
  
  // SRS Section 18: Balasabha
  balasabhaParticipation: BalasabhaParticipation;
  
  // SRS Section 19: Child Groups
  childGroups: ChildGroup[];
  
  // SRS Section 20: Agricultural Land
  agriculturalLand: AgriculturalLand;
  
  // SRS Section 21: Cultivation Mode
  cultivationMode: CultivationMode;
  
  // SRS Section 22: Traditional Farming
  traditionalFarming: TraditionalFarming;
  
  // SRS Section 23: Livestock
  livestockDetails: LivestockDetail[];
  
  // SRS Section 24: Food Consumption
  foodConsumption: FoodConsumption[];
  
  // SRS Section 25: Cash Crops
  cashCrops: CashCrop[];
  
  // SRS Section 26: Forest Resources
  forestResources: ForestResource[];
  
  // SRS Section 27: Social Issues
  socialIssues: SocialIssue[];
  
  // SRS Section 28: Wage Employment
  wageEmployment: WageEmployment;
  
  // SRS Section 29: Livelihood Opportunities
  livelihoodOpportunities: LivelihoodOpportunity[];
  
  // SRS Section 30: Arts and Sports
  artsSports: ArtsSport[];
  
  // SRS Section 31: Public Institutions
  publicInstitutions: PublicInstitution[];
  
  // SRS Section 32: Phone Connectivity
  phoneConnectivity: PhoneConnectivity;
  
  // SRS Section 33: Additional Information
  additionalInfo: AdditionalInfo;
  [key: string]: any;
}

interface FamilyMember {
  name: string;
  relationship: string;
  gender: string;
  age: number;
  educationLevel: string;
  vocationalKnowledge: string;
  occupationSector: string;
  maritalStatus: string;
  hasBankAccount: boolean;
  hasAadhaar: boolean;
  pension: string;
  additionalDetails: string;
}

interface MigrantWorker {
  name: string;
  place: string;
  workSector: string;
  skillsExpertise: string;
  employmentDuration: number;
  additionalDetails: string;
}

interface LandAsset {
  landType: string;
  ownershipType: string;
  area: number;
  documentationType: string;
}

interface GovtSchemeHouse {
  ownerName: string;
  scheme: string;
  allottedBy: string;
  area: number;
  yearBuilt: number;
  sanctionedAmount: number;
  installments: number;
  amountReceived: number;
  balanceAmount: number;
}

interface HousingDetail {
  completionStatus: string;
  ageOfHouse: number;
  currentCondition: string;
  roofMaterial: string;
  roofCondition: string;
  roofBudget: number;
  wallMaterial: string;
  wallCondition: string;
  wallBudget: number;
  floorMaterial: string;
  floorNeedsRepair: boolean;
  floorBudget: number;
  doorCondition: string;
  goodDoorsCount: number;
  windowCondition: string;
  goodWindowsCount: number;
  doorWindowBudget: number;
  kitchenVentilation: string;
  kitchenAppliances: string[];
  kitchenBudget: number;
}

interface ElectricalFacility {
  isElectrified: boolean;
  hasConnection: boolean;
  wiringComplete: string;
  wiringSafe: string;
  cookingFuel: string;
  stoveType: string;
  bulbsCount: number;
  bulbTypes: string[];
  hasSolar: boolean;
  solarUsage: string;
  solarCondition: string;
  additionalComments: string;
  estimatedBudget: number;
}

interface SanitationFacility {
  hasToilet: boolean;
  hasBathroom: boolean;
  allUseToilet: boolean;
  usesPublicToilet: boolean;
  satisfiedWithPublic: boolean;
  publicToiletQuality: string;
  distanceToWater: number;
  toiletTankType: string;
  toiletClosetType: string;
  toiletRoofMaterial: string;
  toiletWallType: string;
  toiletDoorType: string;
  toiletFloorType: string;
  waterAvailability: string;
  additionalNotes: string;
  estimatedBudget: number;
}

interface WaterSource {
  hasConservation: boolean;
  conservationMethods: string;
  hasStorageTank: boolean;
  sourceType: string;
  ownership: string;
  availability: string;
  quality: string;
  collectionMethod: string;
  additionalRemarks: string;
  estimatedBudget: number;
}

interface WasteManagement {
  solidWasteFacility: string;
  liquidWasteFacility: string;
  wastewaterHandling: string;
  additionalRemarks: string;
  estimatedBudget: number;
}

interface HealthCondition {
  memberName: string;
  healthCondition: string;
  placeOfTreatment: string;
  additionalDetails: string;
  estimatedBudget: number;
}

interface EducationDetail {
  studentName: string;
  classGrade: string;
  schoolInstitution: string;
  issuesFaced: string;
  additionalRemarks: string;
  estimatedBudget: number;
  isDropout: boolean;
  dropoutAge: number;
  lastClass: string;
  dropoutYear: number;
  dropoutReason: string;
  reentryBudget: number;
}

interface EmploymentDetail {
  memberName: string;
  age: number;
  employmentExchange: string;
  registeredPSC: boolean;
  dwms: string;
  additionalDetails: string;
}

interface Entitlement {
  landOwnershipDocument: boolean;
  rationCardAvailable: boolean;
  rationCardType: string;
  healthInsurance: boolean;
  employeeCard: boolean;
  homelessSupportScheme: boolean;
  remarks: string;
}

interface NutritionAccess {
  sourceOfSupport: string;
  rationShopReceiving: boolean;
  rationItems: NutritionItem[];
  anganwadiReceiving: boolean;
  anganwadiItems: NutritionItem[];
  tribalDeptReceiving: boolean;
  tribalDeptItems: NutritionItem[];
  vathilPadiReceiving: boolean;
  vathilPadiItems: NutritionItem[];
}

interface NutritionItem {
  name: string;
  quantity: number;
  unit: string;
}

interface TransportationFacility {
  accessPathType: string;
  distanceToMainRoad: number;
  pathCondition: string;
  vehicleOwned: string;
  additionalNotes: string;
}

interface SHGParticipation {
  memberName: string;
  groupName: string;
  yearsMembership: number;
  additionalDetails: string;
}

interface LoanDebt {
  source: string;
  purpose: string;
  yearTaken: number;
  totalAmount: number;
  interestRate: number;
  repaymentFrequency: string;
  monthlyRepayment: number;
  outstandingBalance: number;
  additionalRemarks: string;
}

interface BalasabhaParticipation {
  hasChildrenMembers: boolean;
  childrenCount: number;
}

interface ChildGroup {
  organizationName: string;
  childParticipants: string;
  roleActivity: string;
  additionalNotes: string;
}

interface AgriculturalLand {
  landType: string;
  totalCultivatedArea: number;
  unusedArea: number;
  highWaterArea: number;
  mediumWaterArea: number;
  irrigationSources: string[];
  additionalRemarks: string;
}

interface CultivationMode {
  preferredMethod: string;
}

interface TraditionalFarming {
  practicesTraditional: boolean;
  traditionalCropDetails: string;
  lastPracticedSeason: string;
  interestResume: boolean;
  resumeMode: string;
  additionalSupport: string;
  revivalBudget: number;
}

interface LivestockDetail {
  animalCategory: string;
  animalCount: number;
  breedType: string;
  estimatedIncome: number;
  additionalSupport: string;
  interestTraining: boolean;
}

interface FoodConsumption {
  foodItem: string;
  monthlyQuantity: number;
  unit: string;
  producedAtHome: boolean;
  sourceLocation: string;
}

interface CashCrop {
  cropName: string;
  number: number;
  olderThan3Years: boolean;
  annualIncome: number;
  additionalDetails: string;
}

interface ForestResource {
  productName: string;
  collectionDays: number;
  quantityKg: number;
  sellingPricePerKg: number;
  sellingPlace: string;
}

interface SocialIssue {
  issueType: string;
  details: string;
}

interface WageEmployment {
  workdays202324: number;
  distanceToJob: number;
  paymentMode: string;
  workAvailability: string;
  workAreaSector: string;
}

interface LivelihoodOpportunity {
  memberName: string;
  age: number;
  workSkillInterest: string;
  supportRequired: string;
  expectedIncome: number;
}

interface ArtsSport {
  memberName: string;
  age: number;
  areaOfInterest: string;
  additionalDetails: string;
}

interface PublicInstitution {
  institutionName: string;
  distanceFromHome: number;
  servicesAvailed: string[];
  supportReceived: string;
  satisfactionLevel: number;
}

interface PhoneConnectivity {
  hasPhone: boolean;
  mobileNumbers: string;
  landlineNumber: string;
}

interface AdditionalInfo {
  benefitsReceived: string;
  additionalRemarks: string;
  surveyComments: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    phone_number: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  // Initialize comprehensive SRS-compliant data structure
  const [householdData, setHouseholdData] = useState<HouseholdData>({
    // Section 1: Basic Household Information
    headName: '',
    address: '',
    postOffice: '',
    colonyName: '',
    category: '',
    microPlanNumber: '',
    gramaPanchayat: '',
    wardNumber: '',
    houseNumber: '',
    familyMembersCount: 0,
    
    // Section 2: Family Members
    members: [],
    
    // Section 3: Migrant Workers
    migrantWorkers: [],
    
    // Section 4: Land and House
    landAssets: [],
    govtSchemeHouses: [],
    
    // Section 5: Physical Structure
    housingDetails: {
      completionStatus: '',
      ageOfHouse: 0,
      currentCondition: '',
      roofMaterial: '',
      roofCondition: '',
      roofBudget: 0,
      wallMaterial: '',
      wallCondition: '',
      wallBudget: 0,
      floorMaterial: '',
      floorNeedsRepair: false,
      floorBudget: 0,
      doorCondition: '',
      goodDoorsCount: 0,
      windowCondition: '',
      goodWindowsCount: 0,
      doorWindowBudget: 0,
      kitchenVentilation: '',
      kitchenAppliances: [],
      kitchenBudget: 0
    },
    
    // Section 6: Electrical and Lighting
    electricalFacilities: {
      isElectrified: false,
      hasConnection: false,
      wiringComplete: '',
      wiringSafe: '',
      cookingFuel: '',
      stoveType: '',
      bulbsCount: 0,
      bulbTypes: [],
      hasSolar: false,
      solarUsage: '',
      solarCondition: '',
      additionalComments: '',
      estimatedBudget: 0
    },
    
    // Section 7: Sanitation and Bathroom
    sanitationFacilities: {
      hasToilet: false,
      hasBathroom: false,
      allUseToilet: false,
      usesPublicToilet: false,
      satisfiedWithPublic: false,
      publicToiletQuality: '',
      distanceToWater: 0,
      toiletTankType: '',
      toiletClosetType: '',
      toiletRoofMaterial: '',
      toiletWallType: '',
      toiletDoorType: '',
      toiletFloorType: '',
      waterAvailability: '',
      additionalNotes: '',
      estimatedBudget: 0
    },
    
    // Section 8: Water Source
    waterSources: {
      hasConservation: false,
      conservationMethods: '',
      hasStorageTank: false,
      sourceType: '',
      ownership: '',
      availability: '',
      quality: '',
      collectionMethod: '',
      additionalRemarks: '',
      estimatedBudget: 0
    },
    
    // Section 9: Waste Management
    wasteManagement: {
      solidWasteFacility: '',
      liquidWasteFacility: '',
      wastewaterHandling: '',
      additionalRemarks: '',
      estimatedBudget: 0
    },
    
    // Section 10: Health Conditions
    healthConditions: [],
    
    // Section 11: Education
    educationDetails: [],
    
    // Section 12: Employment
    employmentDetails: [],
    
    // Section 13: Entitlements
    entitlements: {
      landOwnershipDocument: false,
      rationCardAvailable: false,
      rationCardType: '',
      healthInsurance: false,
      employeeCard: false,
      homelessSupportScheme: false,
      remarks: ''
    },
    
    // Section 14: Nutrition Access
    nutritionAccess: {
      sourceOfSupport: '',
      rationShopReceiving: false,
      rationItems: [],
      anganwadiReceiving: false,
      anganwadiItems: [],
      tribalDeptReceiving: false,
      tribalDeptItems: [],
      vathilPadiReceiving: false,
      vathilPadiItems: []
    },
    
    // Section 15: Transportation
    transportation: {
      accessPathType: '',
      distanceToMainRoad: 0,
      pathCondition: '',
      vehicleOwned: '',
      additionalNotes: ''
    },
    
    // Section 16: SHG Participation
    shgParticipation: [],
    
    // Section 17: Loans and Debts
    loansDebts: [],
    
    // Section 18: Balasabha
    balasabhaParticipation: {
      hasChildrenMembers: false,
      childrenCount: 0
    },
    
    // Section 19: Child Groups
    childGroups: [],
    
    // Section 20: Agricultural Land
    agriculturalLand: {
      landType: '',
      totalCultivatedArea: 0,
      unusedArea: 0,
      highWaterArea: 0,
      mediumWaterArea: 0,
      irrigationSources: [],
      additionalRemarks: ''
    },
    
    // Section 21: Cultivation Mode
    cultivationMode: {
      preferredMethod: ''
    },
    
    // Section 22: Traditional Farming
    traditionalFarming: {
      practicesTraditional: false,
      traditionalCropDetails: '',
      lastPracticedSeason: '',
      interestResume: false,
      resumeMode: '',
      additionalSupport: '',
      revivalBudget: 0
    },
    
    // Section 23: Livestock
    livestockDetails: [],
    
    // Section 24: Food Consumption
    foodConsumption: [],
    
    // Section 25: Cash Crops
    cashCrops: [],
    
    // Section 26: Forest Resources
    forestResources: [],
    
    // Section 27: Social Issues
    socialIssues: [],
    
    // Section 28: Wage Employment
    wageEmployment: {
      workdays202324: 0,
      distanceToJob: 0,
      paymentMode: '',
      workAvailability: '',
      workAreaSector: ''
    },
    
    // Section 29: Livelihood Opportunities
    livelihoodOpportunities: [],
    
    // Section 30: Arts and Sports
    artsSports: [],
    
    // Section 31: Public Institutions
    publicInstitutions: [],
    
    // Section 32: Phone Connectivity
    phoneConnectivity: {
      hasPhone: false,
      mobileNumbers: '',
      landlineNumber: ''
    },
    
    // Section 33: Additional Information
    additionalInfo: {
      benefitsReceived: '',
      additionalRemarks: '',
      surveyComments: ''
    }
  });

  const [newMember, setNewMember] = useState<FamilyMember>({
    name: '',
    relationship: '',
    gender: '',
    age: 0,
    educationLevel: '',
    vocationalKnowledge: '',
    occupationSector: '',
    maritalStatus: '',
    hasBankAccount: false,
    hasAadhaar: false,
    pension: '',
    additionalDetails: ''
  });

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check if user is already authenticated
    if (apiService.isAuthenticated()) {
      setIsLoggedIn(true);
      console.log('User already authenticated');
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setHouseholdData((prev: HouseholdData) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setHouseholdData((prev: HouseholdData) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      setHouseholdData((prev: HouseholdData) => ({
        ...prev,
        members: [...prev.members, { ...newMember }]
      }));
      setNewMember({
        name: '',
        relationship: '',
        gender: '',
        age: 0,
        educationLevel: '',
        vocationalKnowledge: '',
        occupationSector: '',
        maritalStatus: '',
        hasBankAccount: false,
        hasAadhaar: false,
        pension: '',
        additionalDetails: ''
      });
    }
  };

  const saveData = async () => {
    try {
      setSyncStatus('syncing');
      
      // Always save to local storage first (offline capability)
      const dataToSave = JSON.parse(JSON.stringify(householdData)); // Deep clone to avoid reference issues
      localStorage.setItem('thunai_household_data', JSON.stringify(dataToSave));
      console.log('Data saved to local storage successfully');
      
      // Only attempt backend sync if online AND authenticated
      if (isOnline && apiService.isAuthenticated()) {
        try {
          // Transform PWA data to backend format using the helper function
          const backendData = transformHouseholdData(householdData);
          
          // Additional sanitization to prevent JSON parsing errors
          const sanitizedBackendData = JSON.parse(JSON.stringify(backendData));
          
          console.log('Transformed data for backend:', JSON.stringify(sanitizedBackendData, null, 2));
          
          // Send to backend API
          const response = await apiService.createHousehold(sanitizedBackendData);
          
          if (response.success) {
            console.log('Data synced to backend successfully:', response.data);
            setSyncStatus('synced');
            setLastSyncTime(new Date().toISOString());
            
            // Clear local data after successful sync
            localStorage.removeItem('thunai_household_data');
            
            // Show success message
            alert('Data saved and synced successfully!');
          } else {
            console.error('Backend sync failed:', response.error);
            setSyncStatus('error');
            alert(`Sync failed: ${response.error}. Data saved locally.`);
          }
        } catch (syncError) {
          console.error('Backend sync error:', syncError);
          setSyncStatus('error');
          alert('Sync error. Data saved locally.');
        }
      } else {
        console.log('Offline or not authenticated - data saved locally only');
        setSyncStatus('offline');
        alert('Data saved locally. Will sync when online and authenticated.');
      }
    } catch (error) {
      console.error('Save data error:', error);
      setSyncStatus('error');
      alert('Error saving data. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      setLoginError('');
      const response = await apiService.login(loginCredentials);
      
      if (response.success) {
        setIsLoggedIn(true);
        setShowLogin(false);
        console.log('Login successful');
        
        // Auto-sync local data to backend
        await syncLocalDataToBackend();
      } else {
        setLoginError(response.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const syncLocalDataToBackend = async () => {
    try {
      const localData = localStorage.getItem('thunai_household_data');
      if (localData && isOnline && apiService.isAuthenticated()) {
        const parsedData = JSON.parse(localData);
        console.log('Syncing local data:', parsedData);
        
        const backendData = transformHouseholdData(parsedData);
        
        // Additional sanitization to prevent JSON parsing errors
        const sanitizedBackendData = JSON.parse(JSON.stringify(backendData));
        
        console.log('Transformed local data for backend:', JSON.stringify(sanitizedBackendData, null, 2));
        
        const response = await apiService.createHousehold(sanitizedBackendData);
        if (response.success) {
          console.log('Local data synced to backend successfully');
          // Clear local data after successful sync
          localStorage.removeItem('thunai_household_data');
          setSyncStatus('synced');
          setLastSyncTime(new Date().toISOString());
          alert('Local data synced successfully!');
        } else {
          console.warn('Failed to sync local data:', response.error);
          setSyncStatus('error');
          alert(`Sync failed: ${response.error}`);
        }
      } else {
        console.log('No local data to sync or not online/authenticated');
        setSyncStatus('offline');
      }
    } catch (error) {
      console.error('Sync local data error:', error);
      setSyncStatus('error');
      alert('Error syncing local data.');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setIsLoggedIn(false);
    console.log('Logged out');
  };

  const formSteps = [
    { label: 'Basic Household Information', component: <BasicHouseholdInfoForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Family Member Details', component: <FamilyMembersForm householdData={householdData} setHouseholdData={setHouseholdData} /> },
    { label: 'Migrant Worker Details', component: <MigrantWorkerForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Land and House Information', component: <LandHouseInfoForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Physical Structure Details', component: <PhysicalStructureForm householdData={householdData} onChange={handleNestedInputChange} /> },
    { label: 'Electrical and Lighting Facilities', component: <ElectricalFacilitiesForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Sanitation and Bathroom Facilities', component: <SanitationFacilitiesForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Water Source and Management', component: <WaterSourceForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Waste Management', component: <WasteManagementForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Health Conditions', component: <HealthConditionsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Education Information', component: <EducationDetailsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Employment and Registration', component: <EmploymentDetailsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Entitlements and Identity Documents', component: <EntitlementsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Nutrition Access', component: <NutritionAccessForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Transportation Facilities', component: <TransportationForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'SHG Participation', component: <SHGParticipationForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Loans and Debts', component: <LoansDebtsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Balasabha Participation', component: <BalasabhaParticipationForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Child-Focused Groups', component: <ChildGroupsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Agricultural Land & Irrigation', component: <AgriculturalLandForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Preferred Cultivation Mode', component: <CultivationModeForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Traditional Farming', component: <TraditionalFarmingForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Livestock and Poultry', component: <LivestockDetailsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Food Consumption', component: <FoodConsumptionForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Cash Crops', component: <CashCropsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Forest Resource Collection', component: <ForestResourcesForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Social Issues', component: <SocialIssuesForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Wage Employment Schemes', component: <WageEmploymentForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'New Livelihood Opportunities', component: <LivelihoodOpportunitiesForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Arts and Sports Interest', component: <ArtsSportsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Public Institutions Access', component: <PublicInstitutionsForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Phone Connectivity', component: <PhoneConnectivityForm householdData={householdData} onChange={handleInputChange} /> },
    { label: 'Additional Information', component: <AdditionalInfoForm householdData={householdData} onChange={handleInputChange} /> },
  ];

  const renderCurrentStep = () => formSteps[currentStep - 1].component;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSteps = formSteps.length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>THUNAI Data Collection</h1>
          <p>Together for Holistic Upliftment and Nurturing Attappady Inclusively</p>
        </div>
        
        <div className="status-bar">
          <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
          {syncStatus !== 'idle' && (
            <div className={`sync-status ${syncStatus}`}>
              {syncStatus === 'syncing' && '🔄 Syncing...'}
              {syncStatus === 'success' && '✅ Synced'}
              {syncStatus === 'error' && '❌ Sync Failed'}
            </div>
          )}
          
          {/* Login/Logout Section */}
          <div className="auth-section">
            {!isLoggedIn ? (
              <button 
                onClick={() => setShowLogin(!showLogin)} 
                className="login-btn"
              >
                🔐 Login to Sync
              </button>
            ) : (
              <div className="logged-in">
                <span>✅ Logged In</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Login Modal */}
        {showLogin && (
          <div className="login-modal">
            <div className="login-content">
              <h3>🔐 Login to Sync Data</h3>
              <p>Enter your credentials to sync local data to the backend</p>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={loginCredentials.phone_number}
                  onChange={(e) => setLoginCredentials(prev => ({
                    ...prev,
                    phone_number: e.target.value
                  }))}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  placeholder="Enter password"
                />
              </div>
              
              {loginError && (
                <div className="error-message">
                  {loginError}
                </div>
              )}
              
              <div className="login-buttons">
                <button onClick={handleLogin} className="login-submit-btn">
                  Login
                </button>
                <button onClick={() => setShowLogin(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
              
              <div className="login-help">
                <p><strong>Test Credentials:</strong></p>
                <p>Phone: <code>1234567890</code></p>
                <p>Password: <code>admin123</code></p>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <div className="step-indicator">
          Step {currentStep} of {totalSteps}
        </div>

        {renderCurrentStep()}

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button onClick={prevStep} className="nav-btn prev">
              ← Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button onClick={nextStep} className="nav-btn next">
              Next →
            </button>
          ) : (
            <button 
              onClick={!isLoggedIn ? () => setShowLogin(true) : saveData} 
              className={`nav-btn save ${!isLoggedIn ? 'auth-required' : ''}`}
            >
              {!isLoggedIn ? '🔐 Login Required to Save' : '💾 Save Data'}
            </button>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 THUNAI - District Administration Palakkad | Progressive Web App</p>
      </footer>
    </div>
  );
}

export default App
