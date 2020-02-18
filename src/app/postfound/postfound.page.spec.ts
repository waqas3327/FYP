import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostfoundPage } from './postfound.page';

describe('PostfoundPage', () => {
  let component: PostfoundPage;
  let fixture: ComponentFixture<PostfoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostfoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostfoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
