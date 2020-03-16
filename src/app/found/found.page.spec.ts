import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoundPage } from './found.page';

describe('FoundPage', () => {
  let component: FoundPage;
  let fixture: ComponentFixture<FoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
