import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasInsertComponent } from './vacinas-insert.component';

describe('VacinasInsertComponent', () => {
  let component: VacinasInsertComponent;
  let fixture: ComponentFixture<VacinasInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacinasInsertComponent]
    });
    fixture = TestBed.createComponent(VacinasInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
