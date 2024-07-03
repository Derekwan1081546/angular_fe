import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExampleFormComponent } from './model-example-form.component';

describe('ModelExampleFormComponent', () => {
  let component: ModelExampleFormComponent;
  let fixture: ComponentFixture<ModelExampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelExampleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelExampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
