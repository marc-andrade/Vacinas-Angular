import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacaListComponent } from './raca-list.component';

describe('RacaListComponent', () => {
  let component: RacaListComponent;
  let fixture: ComponentFixture<RacaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacaListComponent]
    });
    fixture = TestBed.createComponent(RacaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
