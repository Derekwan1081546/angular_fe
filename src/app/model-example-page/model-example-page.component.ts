import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

class Example {
  title: string = '';
  description: string = '';
  model: string = '';
  form_type: string = '';
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
      form_type: 'default',
    },
    {
      title: 'Yolo V8 Training',
      description:
        'This is yolo8 training example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov8-training',
      form_type: 'default',
    },
    {
      title: 'Yolo V8 Detecting',
      description:
        'This is yolo8 dectecting example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov8-detecting',
      form_type: 'default',
    },
    {
      title: 'Yolo3 Tiny Training',
      description:
        'This is yolo3 tiny training example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov3tiny-training',
      form_type: 'default',
    },
    {
      title: 'Yolo3 Tiny Testing',
      description:
        'This is yolo3 tiny testing example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'yolov3tiny-testing',
      form_type: 'default',
    },
    {
      title: 'Qai-Hub Testing',
      description:
        'This is  Qai-Hub Testing example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'qai-Hub-testing',
      form_type: 'default',
    },
    {
      title: 'Qai-Hub Detecting',
      description:
        'This is Qai-Hub Detecting example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'qai-Hub-detecting',
      form_type: 'default',
    },
    {
      title: 'lora-training',
      description:
        'This is lora-training example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'lora-training',
      form_type: 'default',
    },
    {
      title: 'generate-image-with-no-lora',
      description:
        'This is generate-image-with-no-lora example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'generate-image-with-no-lora',
      form_type: 'default',
    },
    {
      title: 'generate-image-with-existing-lora',
      description:
        'This is generate-image-with-existing-lora example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'generate-image-with-existing-lora',
      form_type: 'default',
    },
    {
      title: 'generate-image-with-new-lora',
      description:
        'This is generate-image-with-new-lora example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'generate-image-with-new-lora',
      form_type: 'default',
    },
    {
      title: 'auto-label',
      description:
        'This is auto-label example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'auto-label',
      form_type: 'default',
    },
    {
      title: 'auto-pipeline-a',
      description:
        'This is auto-pipeline-a example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'auto-pipeline-a',
      form_type: 'default',
    },
    {
      title: 'bbox feature visualiztion for different datasets',
      description:
        'This is bbox feature visualiztion for different datasets example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'bbox-feature-visualiztion-for-different-datasets',
      form_type: 'default',
    },
    {
      title: 'bbox feature visualiztion for od train data and od test data',
      description:
        'This is bbox feature visualiztion for od train data and od test data example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'bbox-feature-visualiztion-for-od-train-data-and-od-test-data',
      form_type: 'default',
    },
    {
      title: 'image feature visualiztion for different datasets',
      description:
        'This is image feature visualiztion for different datasets example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'image-feature-visualiztion-for-different-datasets',
      form_type: 'default',
    },
    {
      title: 'image feature visualiztion for od train data and od test data',
      description:
        'This is image feature visualiztion for od train data and od test data example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'image-feature-visualiztion-for-od-train-data-and-od-test-data',
      form_type: 'default',
    },
    {
      title:
        'bbox feature visualiztion for lora train data and ai generated data',
      description:
        'This is bbox feature visualiztion for lora train data and ai generated data example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model:
        'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
      form_type: 'default',
    },
    {
      title:
        'image feature visualiztion for lora train data and ai generated data',
      description:
        'This is image feature visualiztion for lora train data and ai generated data example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model:
        'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
      form_type: 'default',
    },
    {
      title: 'feature visualiztion for lora train data and ai generated data',
      description:
        'This is feature visualiztion for lora train data and ai generated_data example for private usage. ' +
        'Click and follow the instruction to run the example.' +
        'abc',
      model: 'feature-visualiztion-for-lora-train-data-and-ai-generated-data',
      form_type: 'default',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {
    // 從 localStorage 中讀取 role
    const role = localStorage.getItem('role');
    if (role) {
      console.log('Role:', role);
      this.filterExamplesBasedOnRole(role);
    } else {
      console.error('No role information found in localStorage.');
    }
  }

  private filterExamplesBasedOnRole(role: string) {
    // 如果 role 為 "internal_user"，直接允許所有功能
    if (role === 'internal_user') {
      return;
    }
  
    // 根據其他 role 的邏輯來篩選功能
    this.examples = this.examples.filter((example) => {
      if (role.includes('generateimage') && 
          ['lora-training', 'generate-image-with-no-lora', 'generate-image-with-existing-lora', 'generate-image-with-new-lora'].includes(example.model)) {
        return true;
      }
      if (role.includes('autolabel') && example.model === 'auto-label') {
        return true;
      }
      if (role.includes('modeltrain') && 
          ['yolov8-testing', 'yolov8-training', 'yolov8-detecting', 'yolov3tiny-training', 'yolov3tiny-testing', 'qai-Hub-testing', 'qai-Hub-detecting'].includes(example.model)) {
        return true;
      }
      return false;
    });
  }
  
}
