import { TestBed } from '@angular/core/testing';

import { AuditMessageSelectService } from './audit-message-select.service';

describe('AuditMessageSelectService', () => {
  let service: AuditMessageSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditMessageSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
