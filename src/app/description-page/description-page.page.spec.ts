import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescriptionPagePage } from './description-page.page';

describe('DescriptionPagePage', () => {
  let component: DescriptionPagePage;
  let fixture: ComponentFixture<DescriptionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
