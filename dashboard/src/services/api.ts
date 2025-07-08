// API Service for Dashboard to connect to backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

class DashboardApiService {
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
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
      let response: Response;
      try {
        response = await fetch(url, config);
      } catch (err) {
        // Network error (backend down, CORS, etc.)
        return {
          error: 'Unable to connect to backend API. Please check your network connection and backend server.',
          success: false,
        };
      }
      let raw: any = null;
      try {
        raw = await response.json();
      } catch (err) {
        raw = {};
      }
      if (!response.ok) {
        return {
          error: raw.error || `HTTP ${response.status}: ${response.statusText}`,
          success: false,
        };
      }
      // Unwrap nested data if present (for dashboard stats, etc.)
      let data = raw;
      if (raw && typeof raw === 'object' && 'data' in raw && Object.keys(raw).length === 2 && 'success' in raw) {
        data = raw.data;
      }
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }

  // Household operations with pagination
  async getHouseholdsPaginated(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    panchayat?: string;
    hamlet?: string;
  }): Promise<ApiResponse<{
    households: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.panchayat) queryParams.append('panchayat', params.panchayat);
    if (params.hamlet) queryParams.append('hamlet', params.hamlet);
    
    const endpoint = `/api/households?${queryParams.toString()}`;
    console.log('Dashboard: Fetching paginated households from:', `${this.baseURL}${endpoint}`);
    const response = await this.request<{
      households: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>(endpoint);
    console.log('Dashboard: Paginated households response:', response);
    return response;
  }

  // Household operations
  async getHouseholds(): Promise<ApiResponse<any[]>> {
    console.log('Dashboard: Fetching households from:', `${this.baseURL}/api/households`);
    const response = await this.request<any[]>('/api/households');
    console.log('Dashboard: Households response:', response);
    return response;
  }

  async getHousehold(id: string): Promise<ApiResponse<any>> {
    console.log('Dashboard: Fetching household:', id);
    const response = await this.request(`/api/households/${id}`);
    console.log('Dashboard: Household response:', response);
    return response;
  }

  async createHousehold(householdData: any): Promise<ApiResponse<any>> {
    console.log('Dashboard: Creating household:', householdData);
    const response = await this.request('/api/households', {
      method: 'POST',
      body: JSON.stringify(householdData),
    });
    console.log('Dashboard: Create household response:', response);
    return response;
  }

  async updateHousehold(id: string, householdData: any): Promise<ApiResponse<any>> {
    console.log('Dashboard: Updating household:', id, householdData);
    const response = await this.request(`/api/households/${id}`, {
      method: 'PUT',
      body: JSON.stringify(householdData),
    });
    console.log('Dashboard: Update household response:', response);
    return response;
  }

  async deleteHousehold(id: string): Promise<ApiResponse<any>> {
    console.log('Dashboard: Deleting household:', id);
    const response = await this.request(`/api/households/${id}`, {
      method: 'DELETE',
    });
    console.log('Dashboard: Delete household response:', response);
    return response;
  }

  // Member operations
  async getMembers(): Promise<ApiResponse<any[]>> {
    return this.request('/api/members');
  }

  async createMember(memberData: any): Promise<ApiResponse<any>> {
    return this.request('/api/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateMember(id: string, memberData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteMember(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Education operations
  async getEducationDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/education-details');
  }

  async createEducationDetail(educationData: any): Promise<ApiResponse<any>> {
    return this.request('/api/education-details', {
      method: 'POST',
      body: JSON.stringify(educationData),
    });
  }

  async updateEducationDetail(id: string, educationData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/education-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(educationData),
    });
  }

  async deleteEducationDetail(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/education-details/${id}`, {
      method: 'DELETE',
    });
  }

  // Employment operations
  async getEmploymentDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/employment-details');
  }

  async createEmploymentDetail(employmentData: any): Promise<ApiResponse<any>> {
    return this.request('/api/employment-details', {
      method: 'POST',
      body: JSON.stringify(employmentData),
    });
  }

  async updateEmploymentDetail(id: string, employmentData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/employment-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employmentData),
    });
  }

  async deleteEmploymentDetail(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/employment-details/${id}`, {
      method: 'DELETE',
    });
  }

  // Housing operations
  async getHousingDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/housing-details');
  }

  async createHousingDetail(housingData: any): Promise<ApiResponse<any>> {
    return this.request('/api/housing-details', {
      method: 'POST',
      body: JSON.stringify(housingData),
    });
  }

  async updateHousingDetail(id: string, housingData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/housing-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(housingData),
    });
  }

  async deleteHousingDetail(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/housing-details/${id}`, {
      method: 'DELETE',
    });
  }

  // Sanitation operations
  async getSanitationDetails(): Promise<ApiResponse<any[]>> {
    return this.request('/api/sanitation');
  }

  async createSanitationDetail(sanitationData: any): Promise<ApiResponse<any>> {
    return this.request('/api/sanitation', {
      method: 'POST',
      body: JSON.stringify(sanitationData),
    });
  }

  async updateSanitationDetail(id: string, sanitationData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/sanitation/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sanitationData),
    });
  }

  async deleteSanitationDetail(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/sanitation/${id}`, {
      method: 'DELETE',
    });
  }

  // Location operations
  async getDistricts(): Promise<ApiResponse<any[]>> {
    return this.request('/api/locations/districts');
  }

  async getBlocks(): Promise<ApiResponse<any[]>> {
    return this.request('/api/locations/blocks');
  }

  async getPanchayats(): Promise<ApiResponse<any[]>> {
    return this.request('/api/locations/panchayats');
  }

  async getHamlets(): Promise<ApiResponse<any[]>> {
    return this.request('/api/locations/hamlets');
  }

  // User operations
  async getUsers(): Promise<ApiResponse<any[]>> {
    return this.request('/api/users');
  }

  async getUser(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/users/${id}`);
  }

  async createUser(userData: any): Promise<ApiResponse<any>> {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Role operations
  async getRoles(): Promise<ApiResponse<any[]>> {
    return this.request('/api/roles');
  }

  async createRole(roleData: any): Promise<ApiResponse<any>> {
    return this.request('/api/roles', {
      method: 'POST',
      body: JSON.stringify(roleData),
    });
  }

  // Authentication operations
  async login(credentials: { phone_number: string; password: string }): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await this.request<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async register(userData: any): Promise<ApiResponse<any>> {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Dashboard statistics
  async getDashboardStats(): Promise<ApiResponse<{
    totalHouseholds: number;
    totalMembers: number;
    completedSurveys: number;
    pendingSurveys: number;
    hamletsCovered: number;
    panchayatsCovered: number;
    categoryDistribution: any[];
    recentActivity: number;
    lastUpdated: string;
  }>> {
    return this.request('/api/dashboard/stats');
  }

  // Reports
  async getReports(): Promise<ApiResponse<any>> {
    return this.request('/api/dashboard/reports');
  }
}

// Create and export a singleton instance
export const dashboardApiService = new DashboardApiService(API_BASE_URL);

// Export the class for testing
export { DashboardApiService }; 