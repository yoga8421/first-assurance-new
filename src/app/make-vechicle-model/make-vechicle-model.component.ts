import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleFormData, InsuranceType } from './make-vechicle.types';


@Component({
  selector: 'app-make-vechicle-model',
  standalone: false,
  
  templateUrl: './make-vechicle-model.component.html',
  styleUrls: ['./make-vechicle-model.component.scss']
})
export class MakeVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  availableYears: number[];
  selectedInsuranceType: InsuranceType = 'comprehensive';
  userProfile = {
    name: 'John Doe',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b71f46b069ec73bf103b4b5e7da89d293ca44fe3a1a46ff9efab3365a334bc06?placeholderIfAbsent=true&apiKey=4d7977f1d3054b48a4ebac8352e61b8e',
    role: 'User'
  };

  navigationItems = [
    { label: 'Motor', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e74deb1fd6bbe5473c64207738e803debf3f27307319f0edef15f039f7931a67?placeholderIfAbsent=true&apiKey=4d7977f1d3054b48a4ebac8352e61b8e' },
    { label: 'Broker', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4f2ff27d99286ab037e32343c7125743ff62fb54240b9f7b5a1ecfa73bc8e75b?placeholderIfAbsent=true&apiKey=4d7977f1d3054b48a4ebac8352e61b8e' },
    { label: 'Nairobi', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/163b167f369f25ceecb244a63e7fefa634d2a786e3810a065f40b75bb787ec09?placeholderIfAbsent=true&apiKey=4d7977f1d3054b48a4ebac8352e61b8e' }
  ];

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from(
      { length: 20 }, 
      (_, i) => currentYear - i
    );

    this.vehicleForm = this.fb.group({
      vehicleModel: ['', [Validators.required]],
      manufactureYear: ['', [Validators.required]],
      insuranceType: ['comprehensive', [Validators.required]],
      sumInsured: ['', [Validators.required, Validators.min(1000)]]
    });
  }

  ngOnInit(): void {}

  onInsuranceTypeSelect(type: InsuranceType): void {
    this.selectedInsuranceType = type;
    this.vehicleForm.patchValue({ insuranceType: type });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData: VehicleFormData = this.vehicleForm.value;
      console.log('Form submitted:', formData);
    }
  }

  onBack(): void {
    window.history.back();
  }
}

export type { VehicleFormData };
