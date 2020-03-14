import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PicturePlaceHolderComponent } from './picture-place-holder.component';

describe('PicturePlaceHolderComponent', () => {
  let component: PicturePlaceHolderComponent;
  let fixture: ComponentFixture<PicturePlaceHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturePlaceHolderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PicturePlaceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
