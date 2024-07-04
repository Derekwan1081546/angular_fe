import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private static readonly UPLOAD_FILE_FOR_OD_TESTING =
    'http://54.210.89.75:8888/upload_image_file_for_od_model_testing';

  constructor(private readonly http: HttpClient) {}

  uploadOdTesting(files: FileList) {
    const formData = new FormData();
    formData.append('file', files[0]);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('file-' + index, element);
    }
    this.http
      .post(UploadFileService.UPLOAD_FILE_FOR_OD_TESTING, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe((event) => {
        if (event.type == HttpEventType.Response) {
          if (event.ok) {
            console.warn(event);
          } else {
            console.error(event);
          }
        }
      });
  }
}
