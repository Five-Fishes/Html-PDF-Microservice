import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getPOHtml(poHeaderId: number) {
    return this.httpService.get(
      `http://localhost:8001/api/purchase-order/po-html/${poHeaderId}`,
    );
  }
}
