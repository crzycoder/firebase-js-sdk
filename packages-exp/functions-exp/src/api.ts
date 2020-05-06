import { _registerComponent, _getProvider } from '@firebase/app-exp';
import { FirebaseApp, _FirebaseAppInternal } from '@firebase/app-types-exp';
import { _FirebaseNamespace } from '@firebase/app-types/private';
import {
  FirebaseFunctions,
  HttpsCallable,
  HttpsCallableOptions
} from '@firebase/functions-types-exp';
import { FUNCTIONS_TYPE } from './config';

import { Service } from './service';
import { Provider } from '@firebase/component';

/**
 * Returns a Functions instance for the given app.
 * @param app - The FirebaseApp to use.
 * @param region - The region to call functions in.
 * @public
 */
export function getFunctions(
  app: FirebaseApp,
  region?: string
): FirebaseFunctions {
  // Dependencies
  const functionsProvider: Provider<'functions'> = _getProvider(
    app,
    FUNCTIONS_TYPE
  );
  const functionsInstance = functionsProvider.getImmediate();
  if (region) {
    (functionsInstance as Service).setRegion(region);
  }
  return functionsInstance;
}

/**
 * Changes this instance to point to a Cloud Functions emulator running
 * locally. See https://firebase.google.com/docs/functions/local-emulator
 *
 * @param origin - The origin of the local emulator, such as
 * "http://localhost:5005".
 * @public
 */
export function useFunctionsEmulator(
  functionsInstance: FirebaseFunctions,
  origin: string
): void {
  return functionsInstance.useFunctionsEmulator(origin);
}

/**
 * Returns a reference to the callable https trigger with the given name.
 * @param name - The name of the trigger.
 * @public
 */
export function httpsCallable(
  functionsInstance: FirebaseFunctions,
  name: string,
  options?: HttpsCallableOptions
): HttpsCallable {
  return functionsInstance.httpsCallable(name, options);
}
