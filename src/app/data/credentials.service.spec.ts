import { CredentialsService } from './credentials.service';
import { CookieService } from 'ngx-cookie-service';

describe('CredentialsService', () => {
  let cookieService: jasmine.SpyObj<CookieService>;
  let service: CredentialsService;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['check', 'set', 'get']);
    service = new CredentialsService(cookieService);
  });

  it('saveToken stores the token in cookie', () => {
    service.saveToken('abc');
    expect(cookieService.set).toHaveBeenCalledWith('access_token', 'abc', {path: '/', secure: true, sameSite: 'Strict'});
  });

  it('token getter retrieves value from cookie', () => {
    cookieService.get.and.returnValue('def');
    expect(service.token).toBe('def');
  });

  it('isAuthenticated returns true when token exists and is valid', () => {
    spyOn<any>(service as any, 'isTokenValid').and.returnValue(true);
    cookieService.check.and.returnValue(true);
    expect(service.isAuthenticated).toBeTrue();
  });
});
