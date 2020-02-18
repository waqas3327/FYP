import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostlostPage } from './postlost.page';

describe('PostlostPage', () => {
  let component: PostlostPage;
  let fixture: ComponentFixture<PostlostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostlostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostlostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
