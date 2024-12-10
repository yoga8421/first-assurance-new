import { Component } from '@angular/core';

@Component({
  selector: 'app-model-name',
  standalone: false,
  
  templateUrl: './model-name.component.html',
  styleUrls: ['./model-name.component.scss']
})
export class ModelNameComponent {
  manufactureYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
}
