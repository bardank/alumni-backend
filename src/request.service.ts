import { Injectable } from '@nestjs/common';
import { AllowedRole } from './common/dto/allowed.roles.enum';

@Injectable()
export class RequestService {
  private userId: string;
  private role: AllowedRole;

  setUserId(userId: string) {
    this.userId = userId;
  }

  setRole(role: AllowedRole) {
    this.role = role;
  }

  getUserId() {
    return this.userId;
  }

  getRole() {
    return this.role;
  }
}
