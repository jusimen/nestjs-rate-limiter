import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UtilsService {
  secondsToMinutes(seconds) {
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    // Format the result as "mm:ss"
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}s`;
  }

  extractSessionFromCookie(request: Request): string | undefined {
    const [type, token] = request.headers.cookie?.split('=') || [];
    return type === 'sessionId' ? token : undefined;
  }
}
