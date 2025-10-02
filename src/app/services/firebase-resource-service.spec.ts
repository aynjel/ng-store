import { TestBed } from '@angular/core/testing';

import { FirebaseResourceService } from './firebase-resource-service';

describe('FirebaseResourceService', () => {
  let service: FirebaseResourceService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
