import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  static readonly UPLOAD_IMAGE_FOR_OD_TESTING =
    'http://54.210.89.75:8888/upload_image_file_for_od_model_testing';
  static readonly UPLOAD_LABEL_FOR_OD_TESTING =
    'http://54.210.89.75:8888/upload_label_file_for_od_model_testing';
  statusObserver: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) {}

  uploadOdTesting(files: FileList, url: string) {
    const formData = new FormData();
    formData.append('file', files[0]);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('file-' + index, element);
    }
    this.http
      .post(url, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
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
