import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { User, IdTokenClaims } from 'oidc-client-ts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MockAuthService } from 'src/test/services/auth.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const fakedUser = {
    access_token: 'faked-long-token-here',
    token_type: 'access_token',
    profile: {} as IdTokenClaims
  }

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

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentUser).toBeNull();
  });

  it('should get current user object from outside', () => {
    // TODO: creating faked user object
    component.currentUser = {...fakedUser} as User;
    fixture.detectChanges();
    expect(component.currentUser).not.toBeNull();
  });

  it('should user is logged in after authentication?', () => {
    component.currentUser = {...fakedUser} as User;
    component.ngOnChanges();
    // refresh DOM
    fixture.detectChanges();
    expect(component.isUserLoggedIn).toBeTrue();
  });

  it('should get user after login, simulated navigation', () => {
    component.login();
    component.currentUser = {...fakedUser} as User;

    fixture.detectChanges();

    expect(component.currentUser).not.toBeNull();
  });

  it('should logout user', waitForAsync(() => {
    component.login();
    component.logout();
    fixture.whenStable().then(() => {
      expect(component.currentUser).toBeNull();
    });
  }));
});
