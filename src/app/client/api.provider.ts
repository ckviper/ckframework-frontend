import {Configuration, ConfigurationParameters} from "./configuration";
import {EnvironmentProviders, inject, Injector, makeEnvironmentProviders} from "@angular/core";
import {CredentialsService} from "../data/credentials.service";
import {environment} from "../../environments/environment";

// export function withApiConfiguration(configurationParameters: ConfigurationParameters = {}): Configuration {
//   return new Configuration({
//     basePath: 'http://localhost:8000',
//     ...configurationParameters,
//   });
// }
//
// export function withCredentials(): { [key: string]: string | (() => string | undefined) } {
//   const injector = Injector.create({
//     providers: [
//       {provide: CredentialsService, deps: []}
//     ]
//   });
//   const credentialsService = injector.get(CredentialsService);
//
//   return {
//     bearerHttpAuthentication: () => credentialsService.token
//   };
// }

export function apiConfigFactory(credentials: CredentialsService): Configuration {
  return new Configuration({
    basePath: environment.apiUrl,
    withCredentials: false,
    credentials: {
      bearerHttpAuthentication: () => credentials.token
    }
  });
}

export function provideApi(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: Configuration,
      useFactory: apiConfigFactory,
      deps: [CredentialsService],
    },
  ]);
}
