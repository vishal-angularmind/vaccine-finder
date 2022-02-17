import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCenterFinderComponent } from './vaccination-center-finder.component';

describe('VaccinationCenterFinderComponent', () => {
  let component: VaccinationCenterFinderComponent;
  let fixture: ComponentFixture<VaccinationCenterFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCenterFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationCenterFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
