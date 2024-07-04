import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadFileComponent } from '../upload-file/upload-file.component';

class SupportedModel {
  model: string = '';
  uploadUrl: string = '';

  constructor(model: string, uploadUrl: string) {
    this.model = model;
    this.uploadUrl = uploadUrl;
  }
};

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

  supportedModels = [
    new SupportedModel('yolov8-testing', 'yolov8-testing')
  ];

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.model = this.route.snapshot.paramMap.get('model')!;
    this.uploadForm.get('model')!.setValue(this.model);
  }
}
