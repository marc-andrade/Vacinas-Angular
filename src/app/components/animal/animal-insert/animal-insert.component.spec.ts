import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInsertComponent } from './animal-insert.component';

describe('AnimalInsertComponent', () => {
  let component: AnimalInsertComponent;
  let fixture: ComponentFixture<AnimalInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalInsertComponent]
    });
    fixture = TestBed.createComponent(AnimalInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
