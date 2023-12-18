import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasListComponent } from './vacinas-list.component';

describe('VacinasListComponent', () => {
  let component: VacinasListComponent;
  let fixture: ComponentFixture<VacinasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacinasListComponent]
    });
    fixture = TestBed.createComponent(VacinasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
