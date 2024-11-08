import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KundeHinzufuegenPage } from './kunde-hinzufuegen.page';

describe('KundeHinzufuegenPage', () => {
  let component: KundeHinzufuegenPage;
  let fixture: ComponentFixture<KundeHinzufuegenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeHinzufuegenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KundeHinzufuegenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
