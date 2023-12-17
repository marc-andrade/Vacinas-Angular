import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacaUpdateComponent } from './raca-update.component';

describe('RacaUpdateComponent', () => {
  let component: RacaUpdateComponent;
  let fixture: ComponentFixture<RacaUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacaUpdateComponent]
    });
    fixture = TestBed.createComponent(RacaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
