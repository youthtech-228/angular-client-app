import { TestBed } from '@angular/core/testing';

import { JsonClientService } from './json-client.service';

describe('JsonClientService', () => {
  let service: JsonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
