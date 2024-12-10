export interface VehicleFormData {
    vehicleMake: string;
    vehicleModel: string;
    manufactureYear: number;
    insuranceType: InsuranceType;
    sumInsured: number;
  }
  
  export type InsuranceType = 'comprehensive' | 'thirdParty' | 'basic';
  
  export interface VehicleModel {
    id: string;
    name: string;
    code: string;
  }
  
  export interface NavigationItem {
    label: string;
    icon: string;
    action: () => void;
  }
  
  export interface UserProfile {
    name: string;
    image: string;
    role: string;
  }