import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent {
  otp: string = '';

  constructor(private router: Router) {}

  verifyOtp(): void {
    if (this.otp === '123456') {
      alert('OTP Verified Successfully!');
      // Navigate to the next page or display a success message
      this.router.navigate(['/customer-add-info']); // Example: Navigate back to the previous page
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }

  goBack(): void {
    this.router.navigate(['/quote-basic-info-continue']);
  }
}


