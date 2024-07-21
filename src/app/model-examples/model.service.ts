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
  static readonly CLEAR_TRAIN_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_training';
  static readonly CLEAR_test_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_training';
  static readonly CLEAR_DETECT_IMAGE = 'http://100.27.155.124:8888/clear_folder_for_od_model_training';
  
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
  }

  
}
