import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-model-example-page',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './model-example-page.component.html',
  styleUrl: './model-example-page.component.scss',
})
export class ModelExamplePageComponent {}
