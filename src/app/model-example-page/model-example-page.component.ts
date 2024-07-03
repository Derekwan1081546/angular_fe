import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

class Example {
  title: string = '';
  description: string = '';
  model: string = '';
}

@Component({
  selector: 'app-model-example-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './model-example-page.component.html',
  styleUrl: './model-example-page.component.scss',
})
export class ModelExamplePageComponent {
  examples: Example[] = [
    {
      title: 'Yolo V8 Testing',
      description:
        'This is yolo8 testing example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov8-testing',
    },
    {
      title: 'Yolo V8 Training',
      description:
        'This is yolo8 training example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov8-training',
    },
    {
      title: 'Yolo V8 Detecting',
      description:
        'This is yolo8 dectecting example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov8-detecting',
    },
    {
      title: 'Yolo3 Tiny Training',
      description:
        'This is yolo3 tiny training example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolo3-tiny-training',
    },
    {
      title: 'Yolo3 Tiny Testing',
      description:
        'This is yolo3 tiny testing example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolo3-tiny-testing',
    },
  ];
}
