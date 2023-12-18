import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasUpdateComponent } from './vacinas-update.component';

describe('VacinasUpdateComponent', () => {
  let component: VacinasUpdateComponent;
  let fixture: ComponentFixture<VacinasUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacinasUpdateComponent]
    });
    fixture = TestBed.createComponent(VacinasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
