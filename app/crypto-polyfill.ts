// https://github.com/Braden1996/react-native-replicache/blob/master/packages/example/mobile-react-native/src/crypto-polyfill.ts
import * as Crypto from "expo-crypto";

declare const global: {
  crypto: {
    getRandomValues(array: Uint8Array): Uint8Array;
    randomUUID(): string;
  };
};

export function bootCryptoPolyfill() {
  global.crypto = {
    getRandomValues(array: Uint8Array) {
      return Crypto.getRandomValues(array);
    },
    randomUUID() {
      return Crypto.randomUUID();
    },
  };
}
