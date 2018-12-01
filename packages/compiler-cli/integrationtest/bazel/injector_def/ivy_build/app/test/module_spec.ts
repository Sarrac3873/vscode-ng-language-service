/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, InjectionToken, Injector, NgModule, createInjector, forwardRef} from '@angular/core';
import {fixmeIvy} from '@angular/private/testing';
import {AOT_TOKEN, AotModule, AotService} from 'app_built/src/module';

describe('Ivy NgModule', () => {
  describe('AOT', () => {
    let injector: Injector;

    beforeEach(() => { injector = createInjector(AotModule); });
    it('works', () => { expect(injector.get(AotService) instanceof AotService).toBeTruthy(); });

    it('merges imports and exports', () => { expect(injector.get(AOT_TOKEN)).toEqual('exports'); });
  });



  describe('JIT', () => {
    @Injectable({providedIn: null})
    class Service {
    }

    @NgModule({
      providers: [Service],
    })
    class JitModule {
    }

    @NgModule({
      imports: [JitModule],
    })
    class JitAppModule {
    }

    it('works', () => { createInjector(JitAppModule); });

    fixmeIvy('FW-645: jit doesn\'t support forwardRefs') &&
        it('throws an error on circular module dependencies', () => {
          @NgModule({
            imports: [forwardRef(() => BModule)],
          })
          class AModule {
          }

          @NgModule({
            imports: [AModule],
          })
          class BModule {
          }

          expect(() => createInjector(AModule))
              .toThrowError(
                  'Circular dependency in DI detected for type AModule. Dependency path: AModule > BModule > AModule.');
        });

    it('merges imports and exports', () => {
      const TOKEN = new InjectionToken<string>('TOKEN');
      @NgModule({
        providers: [{provide: TOKEN, useValue: 'provided from A'}],
      })
      class AModule {
      }
      @NgModule({
        providers: [{provide: TOKEN, useValue: 'provided from B'}],
      })
      class BModule {
      }

      @NgModule({
        imports: [AModule],
        exports: [BModule],
      })
      class CModule {
      }

      const injector = createInjector(CModule);
      expect(injector.get(TOKEN)).toEqual('provided from B');
    });
  });
});