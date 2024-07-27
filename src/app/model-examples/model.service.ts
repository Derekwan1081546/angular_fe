import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  static readonly YOLO8_TEST = 'http://100.27.155.124:8888/yolo8_test';
  static readonly YOLO8_TRAIN = 'http://100.27.155.124:8888/yolo8_train';
  static readonly YOLO8_DETECT = 'http://100.27.155.124:8888/yolo8_detect';
  static readonly YOLO3_TRAIN = 'http://100.27.155.124:8888/yolo3_tiny_train';
  static readonly YOLO3_TEST = 'http://100.27.155.124:8888/yolo3_tiny_test';
  static readonly QAI_HUB_TEST = 'http://100.27.155.124:8888/qai_hub_test';
  static readonly QAI_HUB_DETECT = 'http://100.27.155.124:8888/qai_hub_detect';
  static readonly LORA_TRAIN = 'http://100.27.155.124:8888/lora_train';
  static readonly GENERATE_IMAGES_WITH_NO_LORA = 'http://100.27.155.124:8888/generate_images_with_no_lora';
  static readonly GENERATE_IMAGES_WITH_EXIST_LORA = 'http://100.27.155.124:8888/generate_images_with_existing_lora';
  static readonly GENERATE_IMAGES_WITH_NEW_LORA = 'http://100.27.155.124:8888/generate_images_with_new_lora';
  static readonly AUTO_LABEL = 'http://100.27.155.124:8888/auto_label';
  static readonly AUTO_PIPELINE_A = 'http://100.27.155.124:8888//auto_pipeline_a';
  static readonly CLEAR_TRAIN_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_training';
  static readonly CLEAR_TEST_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_testing';
  static readonly CLEAR_DETECT_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_detecting';
  static readonly CLEAR_AUTO_PIPELINE_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_auto_pipeline';
  static readonly CLEAR_BBOX_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_bbox_feature_visualization';
  static readonly CLEAR_IMAGE_FEATURE_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_image_feature_visualization';
  
  statusObserver: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) {}

  yolo8Test(
    confidenceThreshold: string,
    iouThreshold: string,
    resizeImageSize: string
  ) {
    const data = JSON.stringify({
      confidence_threshold: confidenceThreshold,
      iou_threshold: iouThreshold,
      resize_image_size: resizeImageSize,
    });
    this.http
      .post(ModelService.YOLO8_TEST, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  yolo8Train(
    namesOfClasses: string,
    yoloModel: string,
    batch: number,
    epochs: number,
    patience: number,
    learningRateLr0: number,
    learningRateLrf: number,
    resizeImageSize: number
  ) {
    const data = JSON.stringify({
      names_of_classes: namesOfClasses,
      YOLO_model: yoloModel,
      batch: batch,
      epochs: epochs,
      patience: patience,
      learning_rate_lr0: learningRateLr0,
      learning_rate_lrf: learningRateLrf,
      resize_image_size: resizeImageSize,
    });
    this.http
      .post(ModelService.YOLO8_TRAIN, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  yolo8Detecting(
    confidence_threshold: number,
    iou_threshold: number,
    resize_image_size: number,
  ) {
    const data = JSON.stringify({
      confidence_threshold: confidence_threshold,
      iou_threshold: iou_threshold,
      resize_image_size: resize_image_size,
    });
    this.http
      .post(ModelService.YOLO8_DETECT, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  yolov3Training(
    namesOfClasses: string,
    learningRate: number,
    batchSize: number,
    maxBatches: number,
    resizeImageSize: number,
  ) {
    const data = JSON.stringify({
      names_of_classes: namesOfClasses,
      learning_rate: learningRate,
      batch_size: batchSize,
      max_batches: maxBatches,
      resize_image_size: resizeImageSize,
    });
    console.log(data);
    this.http
      .post(ModelService.YOLO3_TRAIN, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  yolov3Testing() {
    const data = JSON.stringify({
    });
    this.http
      .post(ModelService.YOLO3_TEST, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  qaiHubTesting(
    confidenceThreshold: number,
    iouThreshold: number,
    resizeImageSize: number,
    numClasses: number,
    deviceName: string,
  ) {
    const data = JSON.stringify({
      confidence_threshold: confidenceThreshold,
      iou_threshold: iouThreshold,
      resize_image_size: resizeImageSize,
      num_classes: numClasses,
      device_name: deviceName,
    });
    console.log(data);
    this.http
      .post(ModelService.QAI_HUB_TEST, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  qaiHubDetecting(
    confidenceThreshold: number,
    iouThreshold: number,
    resizeImageSize: number,
    deviceName: string,
  ) {
    const data = JSON.stringify({
      confidence_threshold: confidenceThreshold,
      iou_threshold: iouThreshold,
      resize_image_size: resizeImageSize,
      device_name: deviceName,
    });
    console.log(data);
    this.http
      .post(ModelService.QAI_HUB_DETECT, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  loraTraining(
    idPrompt: string,
    Resolution: number,
    maxTrainSteps: number,
    checkpointingSteps: string,
  ) {
    const data = JSON.stringify({
      id_prompt: idPrompt,
      resolution: Resolution,
      max_train_steps: maxTrainSteps,
      checkpointing_steps: checkpointingSteps,
    });
    console.log(data);
    this.http
      .post(ModelService.LORA_TRAIN, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  generateImageWithNoLora(
    prompt: string,
    resolution: number,
    image_number_for_each_prompt: number,
  ) {
    const data = JSON.stringify({
      prompt: prompt,
      resolution: resolution,
      image_number_for_each_prompt: image_number_for_each_prompt
    });
    console.log(data);
    this.http
      .post(ModelService.GENERATE_IMAGES_WITH_NO_LORA, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  generateImageWithExistingLora(
    prompt: string,
    resolution: number,
    image_number_for_each_prompt: number,
    lora: string,
  ) {
    const data = JSON.stringify({
      prompt: prompt,
      resolution: resolution,
      image_number_for_each_prompt: image_number_for_each_prompt,
      lora: lora,
    });
    console.log(data);
    this.http
      .post(ModelService.GENERATE_IMAGES_WITH_EXIST_LORA, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  generateImageWithNewLora(
    id_prompt: string,
    prompt: string,
    resolution: number,
    image_number_for_each_prompt: number,
    train_steps: number,
  ) {
    const data = JSON.stringify({
      id_prompt: id_prompt,
      prompt: prompt,
      resolution: resolution,
      image_number_for_each_prompt: image_number_for_each_prompt,
      train_steps: train_steps,
    });
    console.log(data);
    this.http
      .post(ModelService.GENERATE_IMAGES_WITH_NEW_LORA, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  autoLabel(
    names_of_classes: string
  ) {
    const data = JSON.stringify({
      names_of_classes: names_of_classes,
    });
    console.log(data);
    this.http
      .post(ModelService.AUTO_LABEL, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  autoPipelinea(
    names_of_target_classes: string,
    id_prompt: string,
    resolution: number,
    max_train_steps: number,
    image_number_for_each_prompt: number,
    YOLO_model: string,
  ) {
    const data = JSON.stringify({
      names_of_target_classes: names_of_target_classes,
      id_prompt: id_prompt,
      resolution: resolution,
      max_train_steps: max_train_steps,
      image_number_for_each_prompt: image_number_for_each_prompt,
      YOLO_model: YOLO_model,
    });
    console.log(data);
    this.http
      .post(ModelService.AUTO_PIPELINE_A, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
              alert('task complete');
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  clearImage() {
    const data = JSON.stringify({
    });
    this.http
      .post(ModelService.CLEAR_TRAIN_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
      
      this.http
      .post(ModelService.CLEAR_DETECT_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
      this.http
      .post(ModelService.CLEAR_TEST_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
      this.http
      .post(ModelService.CLEAR_AUTO_PIPELINE_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
      this.http
      .post(ModelService.CLEAR_BBOX_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
      this.http
      .post(ModelService.CLEAR_IMAGE_FEATURE_IMAGE, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.Response) {
            if (event.ok) {
              console.warn(event);
              this.statusObserver.next(true);
            } else {
              console.error(event);
              this.statusObserver.next(false);
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.statusObserver.next(false);
        },
      });
  }

  download_result(url:string) {
    this.http.get(url, { responseType: 'blob' });
    }
  
}
