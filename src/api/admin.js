// API service for property management
const BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Get all properties
  async getProperties() {
    return this.request('/properties');
  }

  // Get single property by ID
  async getProperty(id) {
    return this.request(`/properties/${id}`);
  }

  // Create new property
  async createProperty(data) {
    return this.request('/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update property
  async updateProperty(id, data) {
    return this.request(`/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete property
  async deleteProperty(id) {
    return this.request(`/admin/${id}`, {
      method: 'DELETE',
    });
  }

  // Get dashboard stats (calculated from properties data)
  async getDashboardStats() {
    const properties = await this.getProperties();
    
    const totalProperties = properties.length;
    const totalInvested = properties.reduce((sum, prop) => sum + (prop.currentAmount || 0), 0);
    const averageReturnRate = properties.length > 0 
      ? properties.reduce((sum, prop) => sum + (parseFloat(prop.annualReturn) || 0), 0) / properties.length 
      : 0;
    const activeInvestors = properties.reduce((sum, prop) => sum + (prop.investorsCount || 0), 0);

    return {
      totalProperties,
      totalInvested,
      averageReturnRate,
      activeInvestors,
    };
  }
}

export const apiService = new ApiService();