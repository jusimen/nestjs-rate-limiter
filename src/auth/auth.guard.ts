import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {
    console.log('AuthGuard instantiated');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    console.log('token', token);

    return token !== undefined;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.cookie.split('=');
    return type === 'sessionId' ? token : undefined;
  }
}
