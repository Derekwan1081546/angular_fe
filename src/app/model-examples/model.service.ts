import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  static readonly YOLO8_TEST = 'http://54.210.89.75:8888/yolo8_test';
  static readonly YOLO8_TRAIN = 'http://54.210.89.75:8888/yolo8_train';
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

  yolo8Detecting() {
    const data = JSON.stringify({
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

  
}
