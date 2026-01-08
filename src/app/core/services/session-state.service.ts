import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStateService {

  save<T>(key: string, value: T): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  load<T>(key: string): T | null {
    if (typeof sessionStorage !== 'undefined') {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  // Create a persistent signal. Since effect() requires an injection context  
  // and cannot be called from a method, we return a simple signal and let
  // the caller handle persistence if needed. For simpler use, we just load initial value.
  createPersistentSignal<T>(key: string, initialValue: T): WritableSignal<T> {
    const loaded = this.load<T>(key);
    return signal<T>(loaded !== null ? loaded : initialValue);
  }
}
