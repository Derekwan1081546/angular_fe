import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from '../model-examples/upload-file.service';
import { NONE_TYPE } from '@angular/compiler';

class FileInfo {
  index: number = 0;
  name: string = '';
  size: number = 0;
  type: string = '';

  constructor(index: number, name: string, size: number, type: string) {
    this.index = index;
    this.name = name;
    this.size = size;
    this.type = type;
  }
}

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent implements OnInit {
  static readonly unitScale: number = 1024 * 1024;
  filenames: string[] = [];
  files!: FileList;
  fileInfoList: FileInfo[] = [];
  currentPage: number = 0;
  isDragOver: boolean = false;
  pageList: number[] = [0];
  showingPageList: number[] = [];
  uploading: boolean = false;
  uploadSuccess: boolean = false;
  @Input() accept: string = '*';
  @Input() numRows: number = 10;
  @Input() maxPageSize: number = 4;
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() extraParameters: string[] = [];
  extraParametersMap: Map<string, string> = new Map([]);

  constructor(private readonly service: UploadFileService) {}

  ngOnInit() {
    this.service.statusObserver.subscribe((value) => {
      if (!this.uploading) {
        return;
      }
      this.uploading = false;
      this.uploadSuccess = value;
    });
  }

  changePage(page: number) {
    if (page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.fileInfoList = [];
    for (let index = 0; index < this.numRows; index++) {
      const idx = page * this.numRows + index;
      if (idx >= this.files.length) {
        return;
      }
      const element = this.files[idx];
      this.fileInfoList.push(
        new FileInfo(
          idx,
          element.name,
          element.size / UploadFileComponent.unitScale,
          element.type
        )
      );
    }

    this.changeShowingPage();
  }

  changeShowingPage() {
    const offset = this.currentPage < 2 ? 0 : this.currentPage - 2;
    this.showingPageList = [];
    for (let index = 0; index < this.maxPageSize; index++) {
      const idx = index + offset;
      if (idx >= this.pageList.length) {
        return;
      }
      this.showingPageList.push(this.pageList[idx]);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event?.dataTransfer?.files && event?.dataTransfer?.files.length > 0) {
      this.handleSelectedFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.handleSelectedFiles(inputElement.files);
    }
  }

  onParamChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.extraParametersMap.set(element.name, element.value);
    console.log(this.extraParametersMap);
  }

  handleSelectedFiles(files: FileList) {
    this.fileInfoList = [];
    this.pageList = [];
    this.currentPage = 0;

    const newFiles = new DataTransfer();
    if (this.files) {
      for (let index = 0; index < this.files.length; index++) {
        newFiles.items.add(this.files[index]);
      }
    }
    for (let index = 0; index < files.length; index++) {
      if (this.filenames.includes(files[index].name)) {
        continue;
      }
      newFiles.items.add(files[index]);
      this.filenames.push(files[index].name);
    }

    this.files = newFiles.files;

    const maxSize =
      this.files.length < this.numRows ? this.files.length : this.numRows;
    for (let index = 0; index < maxSize; index++) {
      const element = this.files[index];
      this.fileInfoList.push(
        new FileInfo(
          index,
          element.name,
          element.size / UploadFileComponent.unitScale,
          element.type
        )
      );
    }

    for (let index = 0; index < this.files.length / this.numRows; index++) {
      this.pageList.push(index);
    }

    this.changeShowingPage();
  }

  clear() {
    this.files = new DataTransfer().files;
    this.filenames = [];
    this.fileInfoList = [];
    this.currentPage = 0;
    this.pageList = [0];
    this.showingPageList = [];
    this.uploadSuccess = false;
  }

  upload() {
    if (!this.files) {
      return;
    }
    this.uploading = true;
    this.service.uploadOdTesting(this.files, this.url, this.extraParametersMap);
  }
}
