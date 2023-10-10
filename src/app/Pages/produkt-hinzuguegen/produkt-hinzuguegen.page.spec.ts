import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktHinzuguegenPage } from './produkt-hinzuguegen.page';

describe('ProduktHinzuguegenPage', () => {
  let component: ProduktHinzuguegenPage;
  let fixture: ComponentFixture<ProduktHinzuguegenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktHinzuguegenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduktHinzuguegenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
