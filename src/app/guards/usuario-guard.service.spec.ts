import { TestBed } from '@angular/core/testing';

import { UsuarioGuard } from './usuario-guard.service';

describe('UsuarioGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioGuard = TestBed.get(UsuarioGuard);
    expect(service).toBeTruthy();
  });
});
