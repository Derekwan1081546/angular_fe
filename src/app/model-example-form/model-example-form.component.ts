import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UploadFileService } from '../model-examples/upload-file.service';
import { ModelService } from '../model-examples/model.service';

class Parameter {
  name: string = '';
  defaultValue: string | number = 0;
  type: string = 'text';

  constructor(name: string, defaultValue: string | number, type: string) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.type = type;
  }
}

class SupportedModel {
  model: string = '';
  uploadImgUrl: string = '';
  uploadLabelUrl: string = '';
  downloadUrl: string = '';
  parameters: Parameter[] = [];

  constructor(
    model: string,
    uploadImgUrl: string,
    uploadLabelUrl: string,
    downloadUrl: string,
    parameters: Parameter[]
  ) {
    this.model = model;
    this.uploadImgUrl = uploadImgUrl;
    this.uploadLabelUrl = uploadLabelUrl;
    this.downloadUrl = downloadUrl;
    this.parameters = parameters;
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
  parametersForm: FormGroup = new FormGroup({});
  uploadForm: FormGroup = new FormGroup({
    model: new FormControl(''),
  });
  isParametersValid: boolean = false;
  private model: string = '';
  private static readonly SUPPORTED_MODELS = {
    'yolov8-testing': new SupportedModel(
      'yolov8-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://54.210.89.75:8888/download_yolo8_test_files',
      [
        new Parameter('confidenceThreshold', '', 'number'),
        new Parameter('iouThreshold', '', 'number'),
        new Parameter('resizeImageSize', '', 'number'),
      ]
    ),
    'yolov8-training': new SupportedModel(
      'yolov8-training',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
      'http://54.210.89.75:8888/download_yolo8_model_files',
      [
        new Parameter('namesOfClasses', '', 'text'),
        new Parameter('yoloModel', '', 'text'),
        new Parameter('batch', '', 'number'),
        new Parameter('epochs', '', 'number'),
        new Parameter('patience', '', 'number'),
        new Parameter('learningRateLr0', '', 'number'),
        new Parameter('learningRateLrf', '', 'number'),
        new Parameter('resizeImageSize', '', 'number'),
      ]
    ),
    'yolov8-detecting': new SupportedModel(
      'yolov8-detecting',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
      'xxx',
      'http://54.210.89.75:8888/download_yolo8_model_files',
      [
        new Parameter('confidence_threshold', '', 'number'),
        new Parameter('iou_threshold', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
      ]
    ),
    'yolov3tiny-training': new SupportedModel(
      'yolov3tiny-training',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
      'http://54.210.89.75:8888/download_yolo8_model_files',
      [
        new Parameter('names_of_classes', '', 'text'),
        new Parameter('learning_rate', '', 'number'),
        new Parameter('batch_size', '', 'number'),
        new Parameter('max_batches', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
      ]
    ),
    'yolov3tiny-testing': new SupportedModel(
      'yolov3tiny-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://54.210.89.75:8888/download_yolo8_model_files',
      []
    ),
    'qai-Hub-testing': new SupportedModel(
      'qai-Hub-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://54.210.89.75:8888/download_yolo8_model_files',
      [
        new Parameter('confidence_threshold', '', 'number'),
        new Parameter('iou_threshold', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
        new Parameter('num_classes', '', 'number'),
        new Parameter('device_name', '', 'text'),
      ]
    ),
    'qai-Hub-detecting': new SupportedModel(
      'qai-Hub-detecting',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
      'xxx',
      'http://54.210.89.75:8888/download_yolo8_model_files',
      [
        new Parameter('confidence_threshold', '', 'number'),
        new Parameter('iou_threshold', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
        new Parameter('device_name', '', 'text'),
      ]
    ),
  };

  supportedModels = [
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-testing'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-training'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov8-detecting'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov3tiny-training'],
    ModelExampleFormComponent.SUPPORTED_MODELS['yolov3tiny-testing'],
    ModelExampleFormComponent.SUPPORTED_MODELS['qai-Hub-testing'],
    ModelExampleFormComponent.SUPPORTED_MODELS['qai-Hub-detecting'],
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

    var isValid = true;
    for (let index = 0; index < this.selectedModel.parameters.length; index++) {
      const element = this.selectedModel.parameters[index];
      this.parametersForm.addControl(element.name, new FormControl(''));
      isValid =
        isValid && this.selectedModel.parameters[index].defaultValue != '';
    }
    this.isParametersValid = isValid;
  }

  parameterCheck() {
    this.isParametersValid = this.parametersForm.valid;
  }

  runCb() {
    if (this.model === 'yolov8-testing') {
      this.modelService.yolo8Test(
        this.parametersForm.value.confidenceThreshold,
        this.parametersForm.value.iouThreshold,
        this.parametersForm.value.resizeImageSize
      );
    } else if (this.model === 'yolov8-training') {
      this.modelService.yolo8Train(
        this.parametersForm.value.namesOfClasses,
        this.parametersForm.value.yoloModel,
        this.parametersForm.value.batch,
        this.parametersForm.value.epochs,
        this.parametersForm.value.patience,
        this.parametersForm.value.learningRateLr0,
        this.parametersForm.value.learningRateLrf,
        this.parametersForm.value.resizeImageSize
      );
    } else if (this.model === 'yolov8-detecting') {
        this.modelService.yolo8Detecting(
          this.parametersForm.value.confidence_threshold,
          this.parametersForm.value.iou_threshold,
          this.parametersForm.value.resize_image_size,
        );
    } else if (this.model === 'yolov3tiny-training') {
      this.modelService.yolov3Training(
        this.parametersForm.value.names_of_classes,
        this.parametersForm.value.learning_rate,
        this.parametersForm.value.batch_size,
        this.parametersForm.value.max_batches,
        this.parametersForm.value.resize_image_size,
      );
    } else if (this.model === 'yolov3tiny-testing') {
      this.modelService.yolov3Testing();
    } else if (this.model === 'qai-Hub-testing') {
      this.modelService.qaiHubTesting(
        this.parametersForm.value.confidence_threshold,
        this.parametersForm.value.iou_threshold,
        this.parametersForm.value.resize_image_size,
        this.parametersForm.value.num_classes,
        this.parametersForm.value.device_name,
      );
    } else if (this.model === 'qai-Hub-detecting') {
      this.modelService.qaiHubDetecting(
        this.parametersForm.value.confidence_threshold,
        this.parametersForm.value.iou_threshold,
        this.parametersForm.value.resize_image_size,
        this.parametersForm.value.device_name,
      );
    } else {
      console.error('fk the world');
    }
  }
  
  clearImage(){
    this.modelService.clearImage();
  }
  downloadModel() {}
}
