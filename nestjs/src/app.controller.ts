import { Controller } from "@nestjs/common";
import { AppService } from "@src/app.service";

@Controller({
  path: 'app',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) { }

  getHello(): string {
    return this.appService.getHello();
  }
}