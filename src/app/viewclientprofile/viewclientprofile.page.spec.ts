import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewclientprofilePage } from './viewclientprofile.page';

describe('ViewclientprofilePage', () => {
  let component: ViewclientprofilePage;
  let fixture: ComponentFixture<ViewclientprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewclientprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewclientprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
