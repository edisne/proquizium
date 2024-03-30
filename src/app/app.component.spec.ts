import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MenubarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    fixture.detectChanges();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should have correct menu item properties', () => {
    fixture.detectChanges();
    const menuItem = component.menuItems[0];
    expect(menuItem.label).toEqual('Proquizium');
    expect(menuItem.icon).toEqual('pi pi-question');
  });
});
