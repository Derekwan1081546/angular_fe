import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExamplePageComponent } from './model-example-page.component';

describe('ModelExamplePageComponent', () => {
  let component: ModelExamplePageComponent;
  let fixture: ComponentFixture<ModelExamplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelExamplePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
