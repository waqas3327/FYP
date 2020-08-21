import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenchatPage } from './openchat.page';

describe('OpenchatPage', () => {
  let component: OpenchatPage;
  let fixture: ComponentFixture<OpenchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
