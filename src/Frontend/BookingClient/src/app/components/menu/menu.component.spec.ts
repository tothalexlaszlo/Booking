import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { User } from 'oidc-client-ts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MockAuthService } from 'src/test/services/auth.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentUser).toBeNull();
  });

  fit('should get user after login', () => {
    component.login();
    expect(component.currentUser).not.toBeNull();
  });

  fit('should logout user', waitForAsync(() => {
    component.login();
    component.logout();
    fixture.whenStable().then(() => {
      expect(component.currentUser).toBeNull();
    });
    
  
  }));
});
