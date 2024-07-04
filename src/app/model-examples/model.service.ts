import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  static readonly YOLO8_TEST = 'http://54.210.89.75:8888/yolo8_test';
  statusObserver: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) {}

  yolo8Test(
    confidenceThreshold: string,
    iouThreshold: string,
    resizeImageSize: string
  ) {
    const data = JSON.stringify({
      confidence_threshold: confidenceThreshold,
      iou_threshold: resizeImageSize,
      resize_image_size: iouThreshold,
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
}
