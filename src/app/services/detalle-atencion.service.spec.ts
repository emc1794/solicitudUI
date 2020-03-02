import { TestBed } from '@angular/core/testing';

import { DetalleAtencionService } from './detalle-atencion.service';

describe('DetalleAtencionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleAtencionService = TestBed.get(DetalleAtencionService);
    expect(service).toBeTruthy();
  });
});
