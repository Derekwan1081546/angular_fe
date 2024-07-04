import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UploadFileService } from '../model-examples/upload-file.service';

class SupportedModel {
  model: string = '';
  uploadImgUrl: string = '';
  uploadLabelUrl: string = '';

  constructor(model: string, uploadImgUrl: string, uploadLabelUrl: string) {
    this.model = model;
    this.uploadImgUrl = uploadImgUrl;
    this.uploadLabelUrl = uploadLabelUrl;
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
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING
    ),
    'yolov8-training': new SupportedModel(
      'yolov8-training',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING
    ),
  };

  supportedModels = [
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-testing'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-training'],
  ];

  selectedModel: SupportedModel = this.supportedModels[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly uploadService: UploadFileService
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
}
