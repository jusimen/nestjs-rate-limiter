import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  main(@Res() res) {
    return res.sendFile('/', { root: 'public' });
  }
}
