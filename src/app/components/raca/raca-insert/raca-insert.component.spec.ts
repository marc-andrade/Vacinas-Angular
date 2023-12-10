import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacaInsertComponent } from './raca-insert.component';

describe('RacaInsertComponent', () => {
  let component: RacaInsertComponent;
  let fixture: ComponentFixture<RacaInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacaInsertComponent]
    });
    fixture = TestBed.createComponent(RacaInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
