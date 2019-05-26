import { TestBed } from '@angular/core/testing';

import { CafedrasService } from './cafedras.service';

describe('CafedrasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CafedrasService = TestBed.get(CafedrasService);
    expect(service).toBeTruthy();
  });
});
