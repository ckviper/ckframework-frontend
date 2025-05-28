import { AuthCallbackStore } from './auth-callback.store';
import { CredentialsService } from '../data/credentials.service';
import { take } from 'rxjs';

describe('AuthCallbackStore', () => {
  let credentialsService: jasmine.SpyObj<CredentialsService>;
  let store: AuthCallbackStore;

  beforeEach(() => {
    credentialsService = jasmine.createSpyObj('CredentialsService', ['saveToken']);
    store = new AuthCallbackStore(credentialsService);
  });

  it('saveAccessToken stores token and emits tokenSaved$', (done) => {
    store.tokenSaved$.pipe(take(1)).subscribe(() => {
      expect(credentialsService.saveToken).toHaveBeenCalledWith('abc');
      done();
    });

    store.saveAccessToken('abc');
  });

  it('saveAccessToken does nothing when token is empty', () => {
    store.saveAccessToken('');
    expect(credentialsService.saveToken).not.toHaveBeenCalled();
  });
});
