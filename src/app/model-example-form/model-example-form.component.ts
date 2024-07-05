import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UploadFileService } from '../model-examples/upload-file.service';
import { ModelService } from '../model-examples/model.service';

class SupportedModel {
  model: string = '';
  uploadImgUrl: string = '';
  uploadLabelUrl: string = '';
  downloadUrl: string = '';

  constructor(
    model: string,
    uploadImgUrl: string,
    uploadLabelUrl: string,
    downloadUrl: string
  ) {
    this.model = model;
    this.uploadImgUrl = uploadImgUrl;
    this.uploadLabelUrl = uploadLabelUrl;
    this.downloadUrl = downloadUrl;
  }
}

@Component({
  selector: 'app-model-example-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadFileComponent],
  templateUrl: './model-example-form.component.html',
  styleUrl: './model-example-form.component.scss',
})
export class ModelExampleFormComponent implements OnInit {
  uploadForm: FormGroup = new FormGroup({
    model: new FormControl(''),
  });
  private model: string = '';
  private static readonly SUPPORTED_MODELS = {
    'yolov8-testing': new SupportedModel(
      'yolov8-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://54.210.89.75:8888/download_yolo8_test_files'
    ),
    'yolov8-training': new SupportedModel(
      'yolov8-training',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
      'http://54.210.89.75:8888/download_yolo8_model_files'
    ),
  };

  supportedModels = [
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-testing'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-training'],
  ];

  selectedModel: SupportedModel = this.supportedModels[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly uploadService: UploadFileService,
    private readonly modelService: ModelService
  ) {}

  ngOnInit() {
    this.model = this.route.snapshot.paramMap.get('model')!;
    for (let index = 0; index < this.supportedModels.length; index++) {
      const element = this.supportedModels[index];
      if (element.model == this.model) {
        this.uploadForm.get('model')!.setValue(this.model);
        this.selectedModel = element;
        break;
      }
    }
  }

  runCb() {
    if (this.model === 'yolov8-testing') {
      this.modelService.yolo8Test('1', '1', '1');
    } else if (this.model === 'yolov8-training') {
      this.modelService.yolo8Train(
        'cat',
        'yolov8s',
        100,
        1,
        100,
        0.01,
        0.01,
        640
      );
    } else {
      console.error('fk the world');
    }
  }

  downloadModel() {
    if (this.model === 'yolov8-testing') {
      this.modelService.yolo8Test('1', '1', '1');
    } else if (this.model === 'yolov8-training') {
      this.modelService.yolo8Train(
        'cat',
        'yolov8s',
        100,
        1,
        100,
        0.01,
        0.01,
        640
      );
    } else {
      console.error('fk the world');
    }
  }
}
