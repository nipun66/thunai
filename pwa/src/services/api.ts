// API Service for PWA to connect to backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Helper function to sanitize data for JSON transmission
const sanitizeData = (data: any): any => {
  if (typeof data === 'string') {
    // Remove any control characters and escape special characters
    return data.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized;
  }
  return data;
};

// Helper function to ensure all required fields are present
const ensureRequiredFields = (data: any): any => {
  return {
    hamlet_id: 1, // This will be created automatically by the backend
    household_head_name: data.headName || 'Unknown',
    survey_date: new Date().toISOString(),
    enumerator_id: 'system@thunai.com', // This will be resolved to the actual user ID by the backend
    address: data.address || '',
    post_office: data.postOffice || '',
    colony_settlement_name: data.colonyName || '',
    category: data.category || '',
    micro_plan_number: data.microPlanNumber || '',
    grama_panchayat: data.gramaPanchayat || '',
    ward_number: data.wardNumber || '',
    house_number: data.houseNumber || '',
    family_members_count: data.familyMembersCount || 0
    // Remove all empty arrays - they will be added by transformHouseholdData if needed
  };
};

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add auth token if available
      const token = localStorage.getItem('pwa_auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }

      // Sanitize body data if present
      if (config.body && typeof config.body === 'string') {
        try {
          const parsedBody = JSON.parse(config.body);
          const sanitizedBody = sanitizeData(parsedBody);
          config.body = JSON.stringify(sanitizedBody);
        } catch (parseError) {
          console.error('Error parsing request body:', parseError);
          return {
            error: 'Invalid request data format',
            success: false,
          };
        }
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          success: false,
        };
      }

      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
        success: false,
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/');
  }

  // Household operations
  async getHouseholds(): Promise<ApiResponse<any[]>> {
    return this.request('/api/households');
  }

  async getHousehold(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/households/${id}`);
  }

  async createHousehold(householdData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(householdData);
    
    return this.request('/api/households', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  async updateHousehold(id: string, householdData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(householdData);
    
    return this.request(`/api/households/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sanitizedData),
    });
  }

  async deleteHousehold(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/households/${id}`, {
      method: 'DELETE',
    });
  }

  // Member operations
  async getMembers(): Promise<ApiResponse<any[]>> {
    return this.request('/api/members');
  }

  async createMember(memberData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(memberData);
    
    return this.request('/api/members', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  async updateMember(id: string, memberData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(memberData);
    
    return this.request(`/api/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sanitizedData),
    });
  }

  async deleteMember(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Education details operations
  async getEducationDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/education-details');
  }

  async createEducationDetail(educationData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(educationData);
    
    return this.request('/api/education-details', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  // Employment details operations
  async getEmploymentDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/employment-details');
  }

  async createEmploymentDetail(employmentData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(employmentData);
    
    return this.request('/api/employment-details', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  // Housing details operations
  async getHousingDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/housing-details');
  }

  async createHousingDetail(housingData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(housingData);
    
    return this.request('/api/housing-details', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  // Sanitation details operations
  async getSanitationDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/sanitation');
  }

  async createSanitationDetail(sanitationData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(sanitationData);
    
    return this.request('/api/sanitation', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  // Authentication operations
  async login(credentials: { phone_number: string; password: string }): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await this.request<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      localStorage.setItem('pwa_auth_token', response.data.token);
      localStorage.setItem('pwa_user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async register(userData: any): Promise<ApiResponse<any>> {
    // Sanitize the data before sending
    const sanitizedData = sanitizeData(userData);
    
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  async logout(): Promise<void> {
    localStorage.removeItem('pwa_auth_token');
    localStorage.removeItem('pwa_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('pwa_auth_token');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('pwa_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('pwa_auth_token');
  }
}

// Create and export the API service instance
export const apiService = new ApiService(API_BASE_URL);

// Helper function to transform PWA data to backend format (SRS compliant)
export const transformHouseholdData = (pwaData: any): any => {
  // Sanitize the input data first
  const sanitizedPwaData = sanitizeData(pwaData);
  
  // Start with required fields
  const baseData = ensureRequiredFields(sanitizedPwaData);
  
  // Helper function to convert arrays to strings
  const arrayToString = (arr: any): string => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.join(', ');
    }
    return '';
  };
  
  // Transform members if present and not empty
  if (sanitizedPwaData.members && Array.isArray(sanitizedPwaData.members) && sanitizedPwaData.members.length > 0) {
    baseData.members = sanitizedPwaData.members.map((member: any) => ({
      name: member.name || '',
      gender: member.gender || '',
      relation_to_head: member.relationship || '',
      age: member.age || 0,
      general_education_level: member.educationLevel || '',
      vocational_knowledge: member.vocationalKnowledge || '',
      occupation_sector: member.occupationSector || '',
      marital_status: member.maritalStatus || '',
      bank_account: member.hasBankAccount || false,
      has_aadhaar: member.hasAadhaar || false,
      pension: member.pension || '',
      additional_details: member.additionalDetails || '',
      date_of_birth: new Date().toISOString()
    }));
  } else {
    delete baseData.members;
  }
  
  // Transform housing details if present and has data
  if (sanitizedPwaData.housingDetails && Object.keys(sanitizedPwaData.housingDetails).some(key => sanitizedPwaData.housingDetails[key])) {
    baseData.housing_details = [{
      completion_status: sanitizedPwaData.housingDetails.completionStatus || '',
      age_of_house: sanitizedPwaData.housingDetails.ageOfHouse || 0,
      current_condition: sanitizedPwaData.housingDetails.currentCondition || '',
      roof_material: sanitizedPwaData.housingDetails.roofMaterial || '',
      roof_condition: sanitizedPwaData.housingDetails.roofCondition || '',
      roof_budget: sanitizedPwaData.housingDetails.roofBudget || 0,
      wall_material: sanitizedPwaData.housingDetails.wallMaterial || '',
      wall_condition: sanitizedPwaData.housingDetails.wallCondition || '',
      wall_budget: sanitizedPwaData.housingDetails.wallBudget || 0,
      floor_material: sanitizedPwaData.housingDetails.floorMaterial || '',
      floor_needs_repair: sanitizedPwaData.housingDetails.floorNeedsRepair || false,
      floor_budget: sanitizedPwaData.housingDetails.floorBudget || 0,
      door_condition: sanitizedPwaData.housingDetails.doorCondition || '',
      good_doors_count: sanitizedPwaData.housingDetails.goodDoorsCount || 0,
      window_condition: sanitizedPwaData.housingDetails.windowCondition || '',
      good_windows_count: sanitizedPwaData.housingDetails.goodWindowsCount || 0,
      door_window_budget: sanitizedPwaData.housingDetails.doorWindowBudget || 0,
      kitchen_ventilation: sanitizedPwaData.housingDetails.kitchenVentilation || '',
      kitchen_appliances: arrayToString(sanitizedPwaData.housingDetails.kitchenAppliances),
      kitchen_budget: sanitizedPwaData.housingDetails.kitchenBudget || 0
    }];
  } else {
    delete baseData.housing_details;
  }
  
  // Transform electrical facilities if present and has data
  if (sanitizedPwaData.electricalFacilities && Object.keys(sanitizedPwaData.electricalFacilities).some(key => sanitizedPwaData.electricalFacilities[key])) {
    baseData.electrical_facilities = [{
      is_electrified: sanitizedPwaData.electricalFacilities.isElectrified || false,
      has_connection: sanitizedPwaData.electricalFacilities.hasConnection || false,
      wiring_complete: sanitizedPwaData.electricalFacilities.wiringComplete || '',
      wiring_safe: sanitizedPwaData.electricalFacilities.wiringSafe || '',
      cooking_fuel: sanitizedPwaData.electricalFacilities.cookingFuel || '',
      stove_type: sanitizedPwaData.electricalFacilities.stoveType || '',
      bulbs_count: sanitizedPwaData.electricalFacilities.bulbsCount || 0,
      bulb_types: arrayToString(sanitizedPwaData.electricalFacilities.bulbTypes),
      has_solar: sanitizedPwaData.electricalFacilities.hasSolar || false,
      solar_usage: sanitizedPwaData.electricalFacilities.solarUsage || '',
      solar_condition: sanitizedPwaData.electricalFacilities.solarCondition || '',
      additional_comments: sanitizedPwaData.electricalFacilities.additionalComments || '',
      estimated_budget: sanitizedPwaData.electricalFacilities.estimatedBudget || 0
    }];
  } else {
    delete baseData.electrical_facilities;
  }
  
  // Transform sanitation facilities if present and has data
  if (sanitizedPwaData.sanitationFacilities && Object.keys(sanitizedPwaData.sanitationFacilities).some(key => sanitizedPwaData.sanitationFacilities[key])) {
    baseData.sanitation_facilities = [{
      has_toilet: sanitizedPwaData.sanitationFacilities.hasToilet || false,
      has_bathroom: sanitizedPwaData.sanitationFacilities.hasBathroom || false,
      all_use_toilet: sanitizedPwaData.sanitationFacilities.allUseToilet || false,
      uses_public_toilet: sanitizedPwaData.sanitationFacilities.usesPublicToilet || false,
      satisfied_with_public: sanitizedPwaData.sanitationFacilities.satisfiedWithPublic || false,
      public_toilet_quality: sanitizedPwaData.sanitationFacilities.publicToiletQuality || '',
      distance_to_water: sanitizedPwaData.sanitationFacilities.distanceToWater || 0,
      toilet_tank_type: sanitizedPwaData.sanitationFacilities.toiletTankType || '',
      toilet_closet_type: sanitizedPwaData.sanitationFacilities.toiletClosetType || '',
      toilet_roof_material: sanitizedPwaData.sanitationFacilities.toiletRoofMaterial || '',
      toilet_wall_type: sanitizedPwaData.sanitationFacilities.toiletWallType || '',
      toilet_door_type: sanitizedPwaData.sanitationFacilities.toiletDoorType || '',
      toilet_floor_type: sanitizedPwaData.sanitationFacilities.toiletFloorType || '',
      water_availability: sanitizedPwaData.sanitationFacilities.waterAvailability || '',
      additional_notes: sanitizedPwaData.sanitationFacilities.additionalNotes || '',
      estimated_budget: sanitizedPwaData.sanitationFacilities.estimatedBudget || 0
    }];
  } else {
    delete baseData.sanitation_facilities;
  }
  
  // Transform water sources if present and has data
  if (sanitizedPwaData.waterSources && Object.keys(sanitizedPwaData.waterSources).some(key => sanitizedPwaData.waterSources[key])) {
    baseData.water_sources = [{
      has_conservation: sanitizedPwaData.waterSources.hasConservation || false,
      conservation_methods: sanitizedPwaData.waterSources.conservationMethods || '',
      has_storage_tank: sanitizedPwaData.waterSources.hasStorageTank || false,
      source_type: sanitizedPwaData.waterSources.sourceType || '',
      ownership: sanitizedPwaData.waterSources.ownership || '',
      availability: sanitizedPwaData.waterSources.availability || '',
      quality: sanitizedPwaData.waterSources.quality || '',
      collection_method: sanitizedPwaData.waterSources.collectionMethod || '',
      additional_remarks: sanitizedPwaData.waterSources.additionalRemarks || '',
      estimated_budget: sanitizedPwaData.waterSources.estimatedBudget || 0
    }];
  } else {
    delete baseData.water_sources;
  }
  
  // Transform waste management if present and has data
  if (sanitizedPwaData.wasteManagement && Object.keys(sanitizedPwaData.wasteManagement).some(key => sanitizedPwaData.wasteManagement[key])) {
    baseData.waste_management = [{
      solid_waste_facility: sanitizedPwaData.wasteManagement.solidWasteFacility || '',
      liquid_waste_facility: sanitizedPwaData.wasteManagement.liquidWasteFacility || '',
      wastewater_handling: sanitizedPwaData.wasteManagement.wastewaterHandling || '',
      additional_remarks: sanitizedPwaData.wasteManagement.additionalRemarks || '',
      estimated_budget: sanitizedPwaData.wasteManagement.estimatedBudget || 0
    }];
  } else {
    delete baseData.waste_management;
  }
  
  // Transform entitlements if present and has data
  if (sanitizedPwaData.entitlements && Object.keys(sanitizedPwaData.entitlements).some(key => sanitizedPwaData.entitlements[key])) {
    baseData.entitlements = [{
      land_ownership_document: sanitizedPwaData.entitlements.landOwnershipDocument || false,
      ration_card_available: sanitizedPwaData.entitlements.rationCardAvailable || false,
      ration_card_type: sanitizedPwaData.entitlements.rationCardType || '',
      health_insurance: sanitizedPwaData.entitlements.healthInsurance || false,
      employee_card: sanitizedPwaData.entitlements.employeeCard || false,
      homeless_support_scheme: sanitizedPwaData.entitlements.homelessSupportScheme || false,
      remarks: sanitizedPwaData.entitlements.remarks || ''
    }];
  } else {
    delete baseData.entitlements;
  }
  
  // Transform nutrition access if present and has data
  if (sanitizedPwaData.nutritionAccess && Object.keys(sanitizedPwaData.nutritionAccess).some(key => sanitizedPwaData.nutritionAccess[key])) {
    baseData.nutrition_access = [{
      source_of_support: sanitizedPwaData.nutritionAccess.sourceOfSupport || '',
      ration_shop_receiving: sanitizedPwaData.nutritionAccess.rationShopReceiving || false,
      ration_items: arrayToString(sanitizedPwaData.nutritionAccess.rationItems),
      anganwadi_receiving: sanitizedPwaData.nutritionAccess.anganwadiReceiving || false,
      anganwadi_items: arrayToString(sanitizedPwaData.nutritionAccess.anganwadiItems),
      tribal_dept_receiving: sanitizedPwaData.nutritionAccess.tribalDeptReceiving || false,
      tribal_dept_items: arrayToString(sanitizedPwaData.nutritionAccess.tribalDeptItems),
      vathil_padi_receiving: sanitizedPwaData.nutritionAccess.vathilPadiReceiving || false,
      vathil_padi_items: arrayToString(sanitizedPwaData.nutritionAccess.vathilPadiItems)
    }];
  } else {
    delete baseData.nutrition_access;
  }
  
  // Transform transportation if present and has data
  if (sanitizedPwaData.transportation && Object.keys(sanitizedPwaData.transportation).some(key => sanitizedPwaData.transportation[key])) {
    baseData.transportation = [{
      access_path_type: sanitizedPwaData.transportation.accessPathType || '',
      distance_to_main_road: sanitizedPwaData.transportation.distanceToMainRoad || 0,
      path_condition: sanitizedPwaData.transportation.pathCondition || '',
      vehicle_owned: sanitizedPwaData.transportation.vehicleOwned || '',
      additional_notes: sanitizedPwaData.transportation.additionalNotes || ''
    }];
  } else {
    delete baseData.transportation;
  }
  
  // Transform balasabha participation if present and has data
  if (sanitizedPwaData.balasabhaParticipation && Object.keys(sanitizedPwaData.balasabhaParticipation).some(key => sanitizedPwaData.balasabhaParticipation[key])) {
    baseData.balasabha_participation = [{
      has_children_members: sanitizedPwaData.balasabhaParticipation.hasChildrenMembers || false,
      children_count: sanitizedPwaData.balasabhaParticipation.childrenCount || 0
    }];
  } else {
    delete baseData.balasabha_participation;
  }
  
  // Transform agricultural land if present and has data
  if (sanitizedPwaData.agriculturalLand && Object.keys(sanitizedPwaData.agriculturalLand).some(key => sanitizedPwaData.agriculturalLand[key])) {
    baseData.agricultural_land = [{
      land_type: sanitizedPwaData.agriculturalLand.landType || '',
      total_cultivated_area: sanitizedPwaData.agriculturalLand.totalCultivatedArea || 0,
      unused_area: sanitizedPwaData.agriculturalLand.unusedArea || 0,
      high_water_area: sanitizedPwaData.agriculturalLand.highWaterArea || 0,
      medium_water_area: sanitizedPwaData.agriculturalLand.mediumWaterArea || 0,
      irrigation_sources: arrayToString(sanitizedPwaData.agriculturalLand.irrigationSources),
      additional_remarks: sanitizedPwaData.agriculturalLand.additionalRemarks || ''
    }];
  } else {
    delete baseData.agricultural_land;
  }
  
  // Transform cultivation mode if present and has data
  if (sanitizedPwaData.cultivationMode && sanitizedPwaData.cultivationMode.preferredMethod) {
    baseData.cultivation_mode = [{
      preferred_method: sanitizedPwaData.cultivationMode.preferredMethod || ''
    }];
  } else {
    delete baseData.cultivation_mode;
  }
  
  // Transform traditional farming if present and has data
  if (sanitizedPwaData.traditionalFarming && Object.keys(sanitizedPwaData.traditionalFarming).some(key => sanitizedPwaData.traditionalFarming[key])) {
    baseData.traditional_farming = [{
      practices_traditional: sanitizedPwaData.traditionalFarming.practicesTraditional || false,
      traditional_crop_details: sanitizedPwaData.traditionalFarming.traditionalCropDetails || '',
      last_practiced_season: sanitizedPwaData.traditionalFarming.lastPracticedSeason || '',
      interest_resume: sanitizedPwaData.traditionalFarming.interestResume || false,
      resume_mode: sanitizedPwaData.traditionalFarming.resumeMode || '',
      additional_support: sanitizedPwaData.traditionalFarming.additionalSupport || '',
      revival_budget: sanitizedPwaData.traditionalFarming.revivalBudget || 0
    }];
  } else {
    delete baseData.traditional_farming;
  }
  
  return baseData;
}; 