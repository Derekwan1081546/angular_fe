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
  extraUploadUrls: Map<string, string>;
  extraUploadParams: string[] = [];
  runExampleSection: boolean = true;

  constructor(
    model: string,
    uploadImgUrl: string,
    uploadLabelUrl: string,
    downloadUrl: string,
    parameters: Parameter[],
    extraUploadUrls: Map<string, string> = new Map<string, string>([]),
    extraUploadParams: string[] = [],
    runExampleSection: boolean = true
  ) {
    this.model = model;
    this.uploadImgUrl = uploadImgUrl;
    this.uploadLabelUrl = uploadLabelUrl;
    this.downloadUrl = downloadUrl;
    this.parameters = parameters;
    this.extraUploadUrls = extraUploadUrls;
    this.extraUploadParams = extraUploadParams;
    this.runExampleSection = runExampleSection;
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
  extraUploadUrls: Map<string, string> = new Map<string, string>([]);
  extraUploadUrlKeys: string[] = [];
  private model: string = '';
  private static readonly SUPPORTED_MODELS = {
    'yolov8-testing': new SupportedModel(
      'yolov8-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://100.27.155.124:8888/download_yolo8_test_files',
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
      'http://100.27.155.124:8888/download_yolo8_model_files',
      [
        new Parameter('namesOfClasses', '', 'text'),
        new Parameter('yoloModel', '', 'text'),
        new Parameter('batch', '', 'number'),
        new Parameter('epochs', '', 'number'),
        new Parameter('patience', '', 'number'),
        new Parameter('learningRateLr0', '', 'text'),
        new Parameter('learningRateLrf', '', 'text'),
        new Parameter('resizeImageSize', '', 'number'),
      ]
    ),
    'yolov8-detecting': new SupportedModel(
      'yolov8-detecting',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
      'xxx',
      'http://100.27.155.124:8888/download_yolo8_detect_files',
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
      'http://100.27.155.124:8888/download_yolo3_tiny_model_files',
      [
        new Parameter('names_of_classes', '', 'text'),
        new Parameter('learning_rate', '', 'text'),
        new Parameter('batch_size', '', 'number'),
        new Parameter('max_batches', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
      ]
    ),
    'yolov3tiny-testing': new SupportedModel(
      'yolov3tiny-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://100.27.155.124:8888/download_yolo3_tiny_test_files',
      []
    ),
    'qai-Hub-testing': new SupportedModel(
      'qai-Hub-testing',
      UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
      UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
      'http://100.27.155.124:8888/download_qai_hub_test_files',
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
      'http://100.27.155.124:8888/download_qai_hub_detect_files',
      [
        new Parameter('confidence_threshold', '', 'number'),
        new Parameter('iou_threshold', '', 'number'),
        new Parameter('resize_image_size', '', 'number'),
        new Parameter('device_name', '', 'text'),
      ]
    ),
    'lora-training': new SupportedModel(
      'lora-training',
      UploadFileService.UPLOAD_IMAGE_FOR_LORA_TRAINING,
      'xxx',
      'http://100.27.155.124:8888/download_lora_files',
      [
        new Parameter('id_prompt', '', 'text'),
        new Parameter('resolution', '', 'number'),
        new Parameter('max_train_steps', '', 'number'),
        new Parameter('checkpointing_steps', '', 'number'),
      ]
    ),
    'generate-image-with-no-lora': new SupportedModel(
      'generate-image-with-no-lora',
      'xxx',
      'xxx',
      'http://100.27.155.124:8888/download_generate_images_with_no_lora',
      [
        new Parameter('prompt', '', 'text'),
        new Parameter('resolution', '', 'number'),
        new Parameter('image_number_for_each_prompt', '', 'number'),
      ]
    ),
    'generate-image-with-existing-lora': new SupportedModel(
      'generate-image-with-existing-lora',
      'xxx',
      'xxx',
      'http://100.27.155.124:8888/download_generate_images_with_existing_lora',
      [
        new Parameter('prompt', '', 'text'),
        new Parameter('resolution', '', 'number'),
        new Parameter('image_number_for_each_prompt', '', 'number'),
        new Parameter('lora', '', 'text'),
      ]
    ),
    'generate-image-with-new-lora': new SupportedModel(
      'generate-image-with-new-lora',
      'xxx',
      'xxx',
      'http://100.27.155.124:8888/download_generate_images_with_new_lora',
      [
        new Parameter('id_prompt', '', 'text'),
        new Parameter('prompt', '', 'text'),
        new Parameter('resolution', '', 'number'),
        new Parameter('image_number_for_each_prompt', '', 'number'),
        new Parameter('train_steps', '', 'number'),
      ]
    ),
    'auto-label': new SupportedModel(
      'auto-label',
      UploadFileService.UPLOAD_IMAGE_FOR_AUTO_LABEL,
      'xxx',
      'http://100.27.155.124:8888/download_auto_label_data',
      [new Parameter('names_of_classes', '', 'text')]
    ),
    'auto-pipeline-a': new SupportedModel(
      'auto-pipeline-a',
      UploadFileService.UPLOAD_IMAGE_FOR_AUTO_PIPELINE,
      'xxx',
      'http://100.27.155.124:8888/download_auto_pipeline_files',
      [
        new Parameter('names_of_target_classes', '', 'text'),
        new Parameter('id_prompt', '', 'text'),
        new Parameter('resolution', '', 'number'),
        new Parameter('max_train_steps', '', 'number'),
        new Parameter('image_number_for_each_prompt', '', 'number'),
        new Parameter('YOLO_model', '', 'text'),
      ]
    ),
    'bbox-feature-visualiztion-for-different-datasets': new SupportedModel(
      'bbox-feature-visualiztion-for-different-datasets',
      '',
      '',
      'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_od_train_data_and_od_test_data',
      [],
      new Map<string, string>([
        ['Run', 'http://100.27.155.124:8888/upload_dataset_for_bbox_feature_visualization'],
      ]),
      ['dataset_name'],
    ),
    'bbox-feature-visualiztion-for-od-train-data-and-od-test-data':
      new SupportedModel(
        'bbox-feature-visualiztion-for-od-train-data-and-od-test-data',
        '',
        '',
        'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_od_train_data_and_od_test_data',
        [],
        new Map<string, string>([
          [
            'Upload Image: od model training',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
          ],
          [
            'Upload Label: od model training',
            UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
          ],
          [
            'Upload Image: od model testing',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
          ],
          [
            'Upload Label: od model testing',
            UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
          ],
        ])
      ),
    'image-feature-visualiztion-for-different-datasets': new SupportedModel(
      'image-feature-visualiztion-for-different-datasets',
      '',
      '',
      'http://100.27.155.124:8888/download_images_feature_visualization_for_different_datasets',
      [],
      new Map<string, string>([
        ['Run', 'http://100.27.155.124:8888/upload_dataset_for_image_feature_visualization'],
      ]),
      ['dataset_name'],
    ),
    'image-feature-visualiztion-for-od-train-data-and-od-test-data':
      new SupportedModel(
        'image-feature-visualiztion-for-od-train-data-and-od-test-data',
        '',
        '',
        'http://100.27.155.124:8888/download_image_feature_visualiztion_for_od_train_data_and_od_test_data',
        [],
        new Map<string, string>([
          [
            'Upload Image: od model training',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
          ],
          [
            'Upload Image: od model testing',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
          ],
        ])
      ),
    'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data':
      new SupportedModel(
        'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
        UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
        'xxx',
        'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_lora_train_data_and_ai_generated_data',
        [
          new Parameter('id_prompt', '', 'string'),
          new Parameter('prompt', '', 'string'),
          new Parameter('resolution', '', 'number'),
          new Parameter('image_number_for_each_prompt', '', 'number'),
          new Parameter('max_train_steps', '', 'number'),
          new Parameter('checkpointing_steps', '', 'number'),
          new Parameter('names_of_classes', '', 'string'),
        ]
      ),
    'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data':
      new SupportedModel(
        'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
        UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
        'xxx',
        'http://100.27.155.124:8888/download_image_feature_visualiztion_for_lora_train_data_and_ai_generated_data',
        [
          new Parameter('id_prompt', '', 'string'),
          new Parameter('prompt', '', 'string'),
          new Parameter('resolution', '', 'number'),
          new Parameter('image_number_for_each_prompt', '', 'number'),
          new Parameter('max_train_steps', '', 'number'),
          new Parameter('checkpointing_steps', '', 'number'),
        ]
      ),
    'feature-visualiztion-for-lora-train-data-and-ai-generated-data':
      new SupportedModel(
        'feature-visualiztion-for-lora-train-data-and-ai-generated-data',
        UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
        'xxx',
        'http://100.27.155.124:8888/download_auto_labels_for_visualization',
        [
          new Parameter('id_prompt', '', 'string'),
          new Parameter('prompt', '', 'string'),
          new Parameter('resolution', '', 'number'),
          new Parameter('image_number_for_each_prompt', '', 'number'),
          new Parameter('max_train_steps', '', 'number'),
          new Parameter('checkpointing_steps', '', 'number'),
          new Parameter('names_of_classes', '', 'string'),
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
    ModelExampleFormComponent.SUPPORTED_MODELS['lora-training'],
    ModelExampleFormComponent.SUPPORTED_MODELS['generate-image-with-no-lora'],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'generate-image-with-existing-lora'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS['generate-image-with-new-lora'],
    ModelExampleFormComponent.SUPPORTED_MODELS['auto-label'],
    ModelExampleFormComponent.SUPPORTED_MODELS['auto-pipeline-a'],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'bbox-feature-visualiztion-for-different-datasets'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'bbox-feature-visualiztion-for-od-train-data-and-od-test-data'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'image-feature-visualiztion-for-different-datasets'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'image-feature-visualiztion-for-od-train-data-and-od-test-data'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ],
    ModelExampleFormComponent.SUPPORTED_MODELS[
      'feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ],
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
    this.extraUploadUrls = this.selectedModel.extraUploadUrls;
    this.extraUploadUrlKeys = Array.from(
      this.selectedModel.extraUploadUrls.keys()
    );
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
        this.parametersForm.value.resize_image_size
      );
    } else if (this.model === 'yolov3tiny-training') {
      this.modelService.yolov3Training(
        this.parametersForm.value.names_of_classes,
        this.parametersForm.value.learning_rate,
        this.parametersForm.value.batch_size,
        this.parametersForm.value.max_batches,
        this.parametersForm.value.resize_image_size
      );
    } else if (this.model === 'yolov3tiny-testing') {
      this.modelService.yolov3Testing();
    } else if (this.model === 'qai-Hub-testing') {
      this.modelService.qaiHubTesting(
        this.parametersForm.value.confidence_threshold,
        this.parametersForm.value.iou_threshold,
        this.parametersForm.value.resize_image_size,
        this.parametersForm.value.num_classes,
        this.parametersForm.value.device_name
      );
    } else if (this.model === 'qai-Hub-detecting') {
      this.modelService.qaiHubDetecting(
        this.parametersForm.value.confidence_threshold,
        this.parametersForm.value.iou_threshold,
        this.parametersForm.value.resize_image_size,
        this.parametersForm.value.device_name
      );
    } else if (this.model === 'lora-training') {
      this.modelService.loraTraining(
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.max_train_steps,
        this.parametersForm.value.checkpointing_steps
      );
    } else if (this.model === 'generate-image-with-no-lora') {
      this.modelService.generateImageWithNoLora(
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt
      );
    } else if (this.model === 'generate-image-with-existing-lora') {
      this.modelService.generateImageWithExistingLora(
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.lora
      );
    } else if (this.model === 'generate-image-with-new-lora') {
      this.modelService.generateImageWithNewLora(
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.train_steps
      );
    } else if (this.model === 'auto-label') {
      this.modelService.autoLabel(this.parametersForm.value.names_of_classes);
    } else if (this.model === 'auto-pipeline-a') {
      this.modelService.autoPipelinea(
        this.parametersForm.value.names_of_target_classes,
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.max_train_steps,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.YOLO_model
      );
    } else if (
      this.model ===
      'bbox-feature-visualiztion-for-different-datasets'
    ) {
      this.modelService.bboxFeatureVistualizationOfdifferentData();
    } else if (
      this.model ===
      'bbox-feature-visualiztion-for-od-train-data-and-od-test-data'
    ) {
      this.modelService.bboxFeatureVistualizationOfOdData();
    } else if (
      this.model ===
      'image-feature-visualiztion-for-different-datasets'
    ) {
      this.modelService.imageFeatureVistualizationOfdifferentData();
    } else if (
      this.model ===
      'image-feature-visualiztion-for-od-train-data-and-od-test-data'
    ) {
      this.modelService.imageFeatureVistualizationOfOdData();
    } else if (
      this.model ===
      'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ) {
      this.modelService.bboxFeatureVisualiztionForLoraTrain(
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.max_train_steps,
        this.parametersForm.value.checkpointing_steps,
        this.parametersForm.value.names_of_classes
      );
    } else if (
      this.model ===
      'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ) {
      this.modelService.imageFeatureVisualiztionForLoraTrain(
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.max_train_steps,
        this.parametersForm.value.checkpointing_steps
      );
    } else if (
      this.model ===
      'feature-visualiztion-for-lora-train-data-and-ai-generated-data'
    ) {
      this.modelService.FeatureVisualiztionForLoraTrain(
        this.parametersForm.value.id_prompt,
        this.parametersForm.value.prompt,
        this.parametersForm.value.resolution,
        this.parametersForm.value.image_number_for_each_prompt,
        this.parametersForm.value.max_train_steps,
        this.parametersForm.value.checkpointing_steps,
        this.parametersForm.value.names_of_classes
      );
    } else {
      console.error('fk the world');
    }
  }

  clearImage() {
    this.modelService.clearImage();
  }
  downloadModel(download_url: string) {
    this.modelService.download_result(download_url);
  }
}
