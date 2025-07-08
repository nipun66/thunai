
'use client';
import * as React from 'react';

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HouseholdDetailView from '../components/HouseholdDetailView';
import { dashboardApiService } from '../services/api';

// User roles based on SRS specifications
const userRoles: UserRole[] = [
  {
    id: 'enumerator',
    name: 'Kudumbashree Enumerator',
    accessLevel: 'Hamlet Level',
    capabilities: ['Add/edit family & family member data', 'Offline data collection', 'Sync when online']
  },
  {
    id: 'anganwadi',
    name: 'Anganwadi Worker',
    accessLevel: 'Single Hamlet (View-only)',
    capabilities: ['View family/family member data', 'Read-only access']
  },
  {
    id: 'st_promoter',
    name: 'ST Promoter',
    accessLevel: 'Single Hamlet (View-only)',
    capabilities: ['View family/family member data', 'Read-only access']
  },
  {
    id: 'asha_worker',
    name: 'ASHA Worker',
    accessLevel: 'Single Hamlet (View-only)',
    capabilities: ['View family/family member data', 'Read-only access']
  },
  {
    id: 'panchayath',
    name: 'Panchayath Officer',
    accessLevel: 'Entire Panchayath',
    capabilities: ['View, search data across all hamlets', 'Generate reports', 'Download reports', 'Monitor data completeness']
  },
  {
    id: 'district',
    name: 'District/Block Officers',
    accessLevel: 'Block-wide access',
    capabilities: ['Full data access', 'Search', 'Report generation', 'Exports', 'Monitor hamlet/panchayath coverage']
  }
];

// Types based on EXACT SRS schema and backend database structure
interface UserRole {
  id: string;
  name: string;
  accessLevel: string;
  capabilities: string[];
}

interface DashboardStats {
  totalHouseholds: number;
  totalMembers: number;
  completedSurveys: number;
  pendingSurveys: number;
  hamletsCovered: number;
  panchayatsCovered: number;
  categoryDistribution: Array<{ category: string; count: number }>;
  recentActivity: number;
  lastUpdated: string;
}

// Authentication interface
interface LoginCredentials {
  phone_number: string;
  password: string;
}

interface User {
  user_id: string;
  full_name: string;
  phone_number: string;
  role_id: number;
}

// EXACT SRS COMPLIANT HOUSEHOLD DATA STRUCTURE
interface HouseholdData {
  household_id: string;
  hamlet_id: number;
  household_head_name: string;
  ration_card_number?: string;
  survey_date: string;
  enumerator_id: string;
  local_id?: string;
  last_synced_at?: string;
  is_deleted?: boolean;
  
  // SRS Section 1: Basic Household Information
  address: string;
  post_office: string;
  colony_settlement_name: string;
  category: string;
  micro_plan_number: string;
  grama_panchayat: string;
  ward_number: string;
  house_number: string;
  family_members_count: number;
  
  // SRS Section 2: Family Member Details
  members: FamilyMember[];
  
  // SRS Section 3: Migrant Worker Details
  migrant_workers: MigrantWorker[];
  
  // SRS Section 4: Land and House Information
  land_assets: LandAsset[];
  govt_scheme_houses: GovtSchemeHouse[];
  
  // SRS Section 5: Physical Structure Details
  housing_details: HousingDetail[];
  
  // SRS Section 6: Electrical and Lighting
  electrical_facilities: ElectricalFacility[];
  
  // SRS Section 7: Sanitation and Bathroom
  sanitation_facilities: SanitationFacility[];
  
  // SRS Section 8: Water Source and Management
  water_sources: WaterSource[];
  
  // SRS Section 9: Waste Management
  waste_management: WasteManagement[];
  
  // SRS Section 10: Health Conditions
  health_conditions: HealthCondition[];
  
  // SRS Section 11: Education Information
  education_details: EducationDetail[];
  
  // SRS Section 12: Employment and Registration
  employment_details: EmploymentDetail[];
  
  // SRS Section 13: Entitlements and Identity Documents
  entitlements: Entitlement[];
  
  // SRS Section 14: Nutrition Access
  nutrition_access: NutritionAccess[];
  
  // SRS Section 15: Transportation Facilities
  transportation: TransportationFacility[];
  
  // SRS Section 16: SHG Participation
  shg_participation: SHGParticipation[];
  
  // SRS Section 17: Loans and Debts
  loans_debts: LoanDebt[];
  
  // SRS Section 18: Balasabha Participation
  balasabha_participation: BalasabhaParticipation[];
  
  // SRS Section 19: Child-Focused Groups
  child_groups: ChildGroup[];
  
  // SRS Section 20: Agricultural Land & Irrigation
  agricultural_land: AgriculturalLand[];
  
  // SRS Section 21: Preferred Cultivation Mode
  cultivation_mode: CultivationMode[];
  
  // SRS Section 22: Traditional Farming
  traditional_farming: TraditionalFarming[];
  
  // SRS Section 23: Livestock and Poultry
  livestock_details: LivestockDetail[];
  
  // SRS Section 24: Food Consumption
  food_consumption: FoodConsumption[];
  
  // SRS Section 25: Cash Crops
  cash_crops: CashCrop[];
  
  // SRS Section 26: Forest Resource Collection
  forest_resources: ForestResource[];
  
  // SRS Section 27: Social Issues
  social_issues: SocialIssue[];
  
  // SRS Section 28: Wage Employment Schemes
  wage_employment: WageEmployment[];
  
  // SRS Section 29: New Livelihood Opportunities
  livelihood_opportunities: LivelihoodOpportunity[];
  
  // SRS Section 30: Arts and Sports Interest
  arts_sports: ArtsSport[];
  
  // SRS Section 31: Public Institutions Access
  public_institutions: PublicInstitution[];
  
  // SRS Section 32: Phone Connectivity
  phone_connectivity: PhoneConnectivity[];
  
  // SRS Section 33: Additional Information
  additional_info: AdditionalInfo;
}

interface FamilyMember {
  member_id: string;
  household_id: string;
  name: string;
  aadhaar_number?: string;
  date_of_birth: string;
  gender: string;
  relation_to_head: string;
  marital_status?: string;
  local_id?: string;
  last_synced_at?: string;
  is_deleted?: boolean;
  
  // SRS Member Details
  age: number;
  general_education_level: string;
  vocational_knowledge?: string;
  occupation_sector: string;
  bank_account: boolean;
  has_aadhaar: boolean;
  pension_type?: string;
  additional_details?: string;
}

interface MigrantWorker {
  migrant_id: number;
  member_id: string;
  name: string;
  place: string;
  work_sector: string;
  skills_expertise: string;
  employment_duration: number;
  additional_details?: string;
}

interface LandAsset {
  land_asset_id: number;
  household_id: string;
  land_type: string;
  ownership_type: string;
  area_in_acres: number;
  documentation_type: string;
}

interface GovtSchemeHouse {
  owner_name: string;
  scheme: string;
  allotted_by: string;
  area: number;
  year_built: number;
  sanctioned_amount: number;
  installments: number;
  amount_received: number;
  balance_amount: number;
}

interface HousingDetail {
  housing_id: number;
  household_id: string;
  completion_status: string;
  age_of_house: number;
  current_condition: string;
  roof_material: string;
  roof_condition: string;
  roof_budget?: number;
  wall_material: string;
  wall_condition: string;
  wall_budget?: number;
  floor_material: string;
  floor_needs_repair: boolean;
  floor_budget?: number;
  door_condition: string;
  good_doors_count: number;
  window_condition: string;
  good_windows_count: number;
  door_window_budget?: number;
  kitchen_ventilation: string;
  kitchen_appliances: string[];
  kitchen_budget?: number;
}

interface ElectricalFacility {
  is_electrified: boolean;
  has_connection: boolean;
  wiring_complete: string;
  wiring_safe: string;
  cooking_fuel: string;
  stove_type: string;
  bulbs_count: number;
  bulb_types: string[];
  has_solar: boolean;
  solar_usage: string;
  solar_condition: string;
  additional_comments?: string;
  estimated_budget?: number;
}

interface SanitationFacility {
  has_toilet: boolean;
  has_bathroom: boolean;
  all_use_toilet: boolean;
  uses_public_toilet: boolean;
  satisfied_with_public: boolean;
  public_toilet_quality: string;
  distance_to_water: number;
  toilet_tank_type: string;
  toilet_closet_type: string;
  toilet_roof_material: string;
  toilet_wall_type: string;
  toilet_door_type: string;
  toilet_floor_type: string;
  water_availability: string;
  additional_notes?: string;
  estimated_budget?: number;
}

interface WaterSource {
  has_conservation: boolean;
  conservation_methods?: string;
  has_storage_tank: boolean;
  source_type: string;
  ownership: string;
  availability: string;
  quality: string;
  collection_method: string;
  additional_remarks?: string;
  estimated_budget?: number;
}

interface WasteManagement {
  solid_waste_facility: string;
  liquid_waste_facility: string;
  wastewater_handling: string;
  additional_remarks?: string;
  estimated_budget?: number;
}

interface HealthCondition {
  member_name: string;
  health_condition: string;
  place_of_treatment: string;
  additional_details?: string;
  estimated_budget?: number;
}

interface EducationDetail {
  student_name: string;
  class_grade: string;
  school_institution: string;
  issues_faced: string;
  additional_remarks?: string;
  estimated_budget?: number;
  is_dropout: boolean;
  dropout_age?: number;
  last_class?: string;
  dropout_year?: number;
  dropout_reason?: string;
  reentry_budget?: number;
}

interface EmploymentDetail {
  member_name: string;
  age: number;
  employment_exchange: string;
  registered_psc: boolean;
  dwms: string;
  additional_details?: string;
}

interface Entitlement {
  land_ownership_document: boolean;
  ration_card_available: boolean;
  ration_card_type: string;
  health_insurance: boolean;
  employee_card: boolean;
  homeless_support_scheme: boolean;
  remarks: string;
}

interface NutritionAccess {
  source_of_support: string;
  ration_shop_receiving: boolean;
  ration_items: NutritionItem[];
  anganwadi_receiving: boolean;
  anganwadi_items: NutritionItem[];
  tribal_dept_receiving: boolean;
  tribal_dept_items: NutritionItem[];
  vathil_padi_receiving: boolean;
  vathil_padi_items: NutritionItem[];
}

interface NutritionItem {
  name: string;
  quantity: number;
  unit: string;
}

interface TransportationFacility {
  access_path_type: string;
  distance_to_main_road: number;
  path_condition: string;
  vehicle_owned: string;
  additional_notes?: string;
}

interface SHGParticipation {
  member_name: string;
  group_name: string;
  years_membership: number;
  additional_details?: string;
}

interface LoanDebt {
  source: string;
  purpose: string;
  year_taken: number;
  total_amount: number;
  interest_rate: number;
  repayment_frequency: string;
  monthly_repayment: number;
  outstanding_balance: number;
  additional_remarks?: string;
}

interface BalasabhaParticipation {
  has_children_members: boolean;
  children_count?: number;
}

interface ChildGroup {
  organization_name: string;
  child_participants: string;
  role_activity?: string;
  additional_notes?: string;
}

interface AgriculturalLand {
  land_type: string;
  total_cultivated_area: number;
  unused_area: number;
  high_water_area: number;
  medium_water_area: number;
  irrigation_sources: string[];
  additional_remarks?: string;
}

interface CultivationMode {
  preferred_method: string;
}

interface TraditionalFarming {
  practices_traditional: boolean;
  traditional_crop_details?: string;
  last_practiced_season?: string;
  interest_resume: boolean;
  resume_mode?: string;
  additional_support?: string;
  revival_budget?: number;
}

interface LivestockDetail {
  animal_category: string;
  animal_count: number;
  breed_type: string;
  estimated_income: number;
  additional_support?: string;
  interest_training: boolean;
}

interface FoodConsumption {
  food_item: string;
  monthly_quantity: number;
  unit: string;
  produced_at_home: boolean;
  source_location?: string;
}

interface CashCrop {
  crop_name: string;
  number: number;
  older_than_3_years: boolean;
  annual_income: number;
  additional_details?: string;
}

interface ForestResource {
  product_name: string;
  collection_days: number;
  quantity_kg: number;
  selling_price_per_kg: number;
  selling_place: string;
}

interface SocialIssue {
  issue_type: string;
  details?: string;
}

interface WageEmployment {
  workdays_2023_24: number;
  distance_to_job: number;
  payment_mode: string;
  work_availability: string;
  work_area_sector: string;
}

interface LivelihoodOpportunity {
  member_name: string;
  age: number;
  work_skill_interest: string;
  support_required: string;
  expected_income: number;
}

interface ArtsSport {
  member_name: string;
  age: number;
  area_of_interest: string;
  additional_details?: string;
}

interface PublicInstitution {
  institution_name: string;
  distance_from_home: number;
  services_availed: string[];
  support_received?: string;
  satisfaction_level: number;
}

interface PhoneConnectivity {
  has_phone: boolean;
  mobile_numbers?: string;
  landline_number?: string;
}

interface AdditionalInfo {
  benefits_received: string;
  additional_remarks: string;
  survey_comments: string;
}

// Helper to render icon with props only if it's a MUI icon
function renderIcon(IconComponent: any, props: any, emoji: string) {
  if (typeof IconComponent === 'function' && IconComponent.name !== '') {
    try {
      return <IconComponent {...props} />;
    } catch {
      return <span>{emoji}</span>;
    }
  }
  return <span>{emoji}</span>;
}

// UserContext for role-based access
export const UserContext = React.createContext<any>(null);
export const useUser = () => React.useContext(UserContext);

export default function Dashboard() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    phone_number: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Data state
  const [households, setHouseholds] = useState<HouseholdData[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [selectedHousehold, setSelectedHousehold] = useState<HouseholdData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedHamlet, setSelectedHamlet] = useState('');

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isLoggedIn) {
      fetchDashboardStats();
      fetchHouseholds();
    }
  }, [isLoggedIn]);

  // Fetch households when filters change
  useEffect(() => {
    if (isLoggedIn) {
      fetchHouseholds();
    }
  }, [currentPage, searchQuery, selectedCategory, selectedPanchayat, selectedHamlet]);

  const checkAuthStatus = () => {
    const isAuth = dashboardApiService.isAuthenticated();
    setIsLoggedIn(isAuth);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginError('');
      const response = await dashboardApiService.login(loginCredentials);
      
      if (response.success) {
        setIsLoggedIn(true);
        console.log('Login successful');
      } else {
        setLoginError(response.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    dashboardApiService.logout();
    setIsLoggedIn(false);
    console.log('Logged out');
  };

  const fetchDashboardStats = async () => {
    try {
    setLoading(true);
      const response = await dashboardApiService.getDashboardStats();
      
      if (response.success && response.data) {
        setDashboardStats(response.data);
      } else {
        console.error('Failed to fetch dashboard stats:', response.error);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // On mount, get user from localStorage
    const userObj = dashboardApiService.getCurrentUser();
    setUser(userObj);
  }, []);

  // Role-based data filtering for households
  const fetchHouseholds = async () => {
    if (!user) return;
    let params: any = {};
    // Example: restrict by hamlet for enumerator, by panchayat for panchayath officer, etc.
    if (user.role_id === 2 && user.hamlet_id) {
      params.hamlet = user.hamlet_id;
    } else if (user.role_id === 6 && user.panchayat_id) {
      params.panchayat = user.panchayat_id;
    } else if (user.role_id === 7 && user.block_id) {
      params.block = user.block_id;
    }
    // Add more role checks as needed
    try {
      setLoading(true);
      const response = await dashboardApiService.getHouseholdsPaginated(params);
      
      if (response.success && response.data) {
        setHouseholds(response.data.households);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.total);
      } else {
        console.error('Failed to fetch households:', response.error);
        setError(response.error || 'Failed to fetch households');
      }
    } catch (error) {
      console.error('Error fetching households:', error);
      setError('Error fetching households');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (household: HouseholdData) => {
    setSelectedHousehold(household);
  };

  const handleCloseDetails = () => {
    setSelectedHousehold(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Role-based UI controls
  const canEdit = user && [2].includes(user.role_id); // Only enumerator can edit
  const canExport = user && [6, 7].includes(user.role_id); // Only officers can export
  const canReport = user && [6, 7].includes(user.role_id); // Only officers can report

  // Professional, scalable, interactive Overview with MUI
  const statCards = [
    {
      label: 'Total Households',
      value: dashboardStats?.totalHouseholds?.toLocaleString() || '0',
      icon: <HomeWorkIcon fontSize="large" color="primary" />, key: 'households',
      onClick: () => setActiveTab('data'),
      color: 'primary.main',
    },
    {
      label: 'Total Members',
      value: dashboardStats?.totalMembers?.toLocaleString() || '0',
      icon: <GroupsIcon fontSize="large" color="secondary" />, key: 'members',
      onClick: undefined,
      color: 'secondary.main',
    },
    {
      label: 'Completed Surveys',
      value: dashboardStats?.completedSurveys?.toLocaleString() || '0',
      icon: <CheckCircleIcon fontSize="large" sx={{ color: 'success.main' }} />, key: 'completed',
      onClick: undefined,
      color: 'success.main',
    },
    {
      label: 'Pending Surveys',
      value: dashboardStats?.pendingSurveys?.toLocaleString() || '0',
      icon: <HourglassEmptyIcon fontSize="large" sx={{ color: 'warning.main' }} />, key: 'pending',
      onClick: undefined,
      color: 'warning.main',
    },
    {
      label: 'Hamlets Covered',
      value: dashboardStats?.hamletsCovered || '0',
      icon: <LocationCityIcon fontSize="large" color="info" />, key: 'hamlets',
      onClick: () => setSelectedHamlet(''),
      color: 'info.main',
    },
    {
      label: 'Panchayats Covered',
      value: dashboardStats?.panchayatsCovered || '0',
      icon: <BarChartIcon fontSize="large" color="action" />, key: 'panchayats',
      onClick: () => setSelectedPanchayat(''),
      color: 'grey.700',
    },
  ];

  // Move hooks to top-level to comply with React rules
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const renderOverview = () => (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary.main">Dashboard Overview</Typography>
      <Typography variant="subtitle1" mb={3} color="text.secondary">Comprehensive view of THUNAI household survey data</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
          mb: 2,
        }}
      >
        {statCards.map(card => (
          <Card
            key={card.key}
            sx={{
              cursor: card.onClick ? 'pointer' : 'default',
              transition: 'box-shadow 0.2s',
              boxShadow: 2,
              borderLeft: `6px solid`,
              borderColor: card.color,
              '&:hover': card.onClick ? { boxShadow: 6 } : undefined,
              minHeight: 120,
            }}
            onClick={card.onClick}
            aria-label={card.label}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {card.icon}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">{card.label}</Typography>
                <Typography variant="h5" fontWeight={600}>{loading ? <Skeleton width={60} /> : card.value}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        <Card sx={{ minHeight: 260 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>Category Distribution</Typography>
              {loading ? (
                <Skeleton variant="rectangular" height={120} />
              ) : dashboardStats?.categoryDistribution?.length ? (
                <Box>
                  {dashboardStats.categoryDistribution.map(cat => (
                    <Box key={cat.category} display="flex" alignItems="center" mb={1}>
                      <Box minWidth={80} fontWeight={500}>{cat.category}</Box>
                      <Box flex={1} mx={1}>
                        <Box height={16} bgcolor="#e3e3e3" borderRadius={1} position="relative">
                          <Box
                            bgcolor="primary.main"
                            height={16}
                            borderRadius={1}
                            width={`${(cat.count / Math.max(...dashboardStats.categoryDistribution.map(c => c.count), 1)) * 100}%`}
                          />
                        </Box>
                      </Box>
                      <Box minWidth={32} textAlign="right">{cat.count}</Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.disabled">No data</Typography>
              )}
            </CardContent>
          </Card>
        
        <Card sx={{ minHeight: 260 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Recent Activity</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <AccessTimeIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h5" fontWeight={600}>{loading ? <Skeleton width={60} /> : dashboardStats?.recentActivity?.toLocaleString() || '0'}</Typography>
                <Typography variant="body2" color="text.secondary">Households added in last 30 days</Typography>
              </Box>
            </Box>
            {dashboardStats?.lastUpdated && (
              <Typography mt={3} variant="caption" color="text.disabled">
                Last updated: {new Date(dashboardStats.lastUpdated).toLocaleString()}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  // Professional Data View with MUI DataGrid
  // DataGrid columns with correct typing
  // DataGrid columns (robust, no type errors)
  const columns = [
    { field: 'household_id', headerName: 'Household ID', width: 160 },
    { field: 'household_head_name', headerName: 'Head Name', width: 180 },
    { field: 'address', headerName: 'Address', width: 220, flex: 1 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'family_members_count', headerName: 'Members', width: 100 },
    { field: 'survey_date', headerName: 'Survey Date', width: 130, valueFormatter: (params: any) => params.value ? new Date(params.value).toLocaleDateString() : 'N/A' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <>
          <button className="btn btn-sm btn-view" onClick={() => handleViewDetails(params.row)}>View Details</button>
          <Button disabled={!canEdit} title={!canEdit ? 'Only enumerators can edit data' : ''}>Edit</Button>
        </>
      ),
    },
  ];

  const renderDataView = () => (
    <Paper elevation={3} sx={{ p: 3, mt: 2, borderRadius: 3, background: '#fafbfc' }}>
      <Typography variant="h5" fontWeight={700} color="primary.main" mb={1}>
        Household Data
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        SRS-compliant household survey records
      </Typography>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={households.map(h => ({ ...h, id: h.household_id }))}
          columns={columns}
          rowCount={totalRecords}
          pageSize={pageSize}
          page={currentPage - 1}
          pagination
          paginationMode="server"
          onPageChange={(params) => {
            if (params !== currentPage - 1) setCurrentPage(params + 1);
          }}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          autoHeight
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 1,
            '& .MuiDataGrid-columnHeaders': {
              background: '#f5f7fa',
              fontWeight: 700,
              fontSize: 16,
            },
            '& .MuiDataGrid-row': {
              fontSize: 15,
            },
            '& .MuiDataGrid-toolbarContainer': {
              background: '#f5f7fa',
            },
          }}
        />
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </Box>
    </Paper>
  );

  // Professional Reports Section
  const reportTypes = [
    {
      icon: <BarChartIcon color="primary" fontSize="large" />,
      title: 'Demographic Report',
      desc: 'Population distribution by age, gender, and category',
      onClick: () => alert('Demographic Report generated!'),
    },
    {
      icon: <HomeWorkIcon color="secondary" fontSize="large" />,
      title: 'Housing Report',
      desc: 'Housing conditions, amenities, and infrastructure',
      onClick: () => alert('Housing Report generated!'),
    },
    {
      icon: <GroupsIcon color="info" fontSize="large" />,
      title: 'Education Report',
      desc: 'Educational status, dropout rates, and needs',
      onClick: () => alert('Education Report generated!'),
    },
    {
      icon: <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="large" />,
      title: 'Employment Report',
      desc: 'Employment patterns, income levels, and skills',
      onClick: () => alert('Employment Report generated!'),
    },
    {
      icon: <HourglassEmptyIcon sx={{ color: 'warning.main' }} fontSize="large" />,
      title: 'Health Report',
      desc: 'Health conditions, access to healthcare',
      onClick: () => alert('Health Report generated!'),
    },
    {
      icon: <LocationCityIcon color="action" fontSize="large" />,
      title: 'Agriculture Report',
      desc: 'Land ownership, farming practices, livestock',
      onClick: () => alert('Agriculture Report generated!'),
    },
  ];

  const renderReports = () => (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h5" fontWeight={700} color="primary.main" mb={1}>
        Generate SRS-Compliant Reports
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Comprehensive reports for government analysis and decision-making
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {reportTypes.map((r, idx) => (
          <Card key={r.title} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 200, boxShadow: 2 }}>
            <Box mb={1}>{r.icon}</Box>
            <Typography variant="subtitle1" fontWeight={600} mb={0.5}>{r.title}</Typography>
            <Typography variant="body2" color="text.secondary" mb={2} align="center">{r.desc}</Typography>
            <Button variant="contained" color="primary" onClick={r.onClick} sx={{ mt: 'auto' }} disabled={!canReport}>
              Generate Report
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'data':
        return renderDataView();
      case 'reports':
        return renderReports();
      default:
        return renderOverview();
    }
  };

  // Professional Login Form
  const renderLoginForm = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Paper elevation={4} sx={{ p: 4, minWidth: 340, borderRadius: 3 }}>
        <Box mb={2} textAlign="center">
          <Typography variant="h5" fontWeight={700} color="primary.main">THUNAI Dashboard</Typography>
          <Typography variant="subtitle2" color="text.secondary">District Administration Palakkad</Typography>
        </Box>
        <form onSubmit={handleLogin}>
          {loginError && (
            <Typography color="error" mb={2}>{loginError}</Typography>
          )}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={0.5}>Phone Number</Typography>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              required
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              placeholder="Enter phone number"
              value={loginCredentials.phone_number}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, phone_number: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2" mb={0.5}>Password</Typography>
            <input
              id="password"
              name="password"
              type="password"
              required
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              placeholder="Enter password"
              value={loginCredentials.password}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.2, fontWeight: 600, fontSize: 16 }}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );

  // Main Dashboard Layout
  if (!isLoggedIn) {
    return renderLoginForm();
  }

  return (
    <UserContext.Provider value={user}>
      <Box minHeight="100vh" bgcolor="#f5f7fa">
        {/* Professional Header */}
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700} color="inherit">THUNAI Dashboard</Typography>
              <Typography variant="caption" color="inherit">District Administration Palakkad - Household Survey System</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="subtitle2" color="inherit">Welcome, User</Typography>
              <IconButton color="inherit" onClick={handleLogout} title="Logout">
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Tabs */}
        <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(_e, v) => setActiveTab(v)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Overview" value="overview" icon={<BarChartIcon />} iconPosition="start" />
            <Tab label="Household Data" value="data" icon={<HomeWorkIcon />} iconPosition="start" />
            <Tab label="Reports" value="reports" icon={<GroupsIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Main Content */}
        <Box sx={{ maxWidth: 1300, mx: 'auto', p: { xs: 1, md: 3 } }}>
          {renderCurrentTab()}
        </Box>

        {/* Household Detail Modal */}
        {selectedHousehold && (
          <HouseholdDetailView 
            household={selectedHousehold} 
            onClose={handleCloseDetails} 
          />
        )}
      </Box>
    </UserContext.Provider>
  );
}