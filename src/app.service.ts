import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class AppService {
  static userModel: Provider<any>;
  getHello(): string {
    return 'Hello World!';
  }
}
