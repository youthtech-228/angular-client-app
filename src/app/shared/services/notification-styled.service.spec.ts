import { TestBed } from '@angular/core/testing';

import { NotificationStyledService } from './notification-styled.service';

describe('NotificationStyledService', () => {
  let service: NotificationStyledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationStyledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
