import { Controller, HttpCode, Param, Post, Res } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { AppService } from './app.service';

@Controller('api/purchase-order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('download/:poHeaderId')
  @HttpCode(200)
  async downloadPOPdf(@Res() res, @Param('poHeaderId') poHeaderId: number) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const responseObservable = await this.appService.getPOHtml(poHeaderId);
    responseObservable.forEach((value) => {
      (async () => {
        await page.setContent(value.data);
        const buffer = await page.pdf({
          format: 'a4',
          margin: { top: 100, bottom: 100, left: 10, right: 10 },
        });
        res.send(buffer);
        browser.close();
      })();
    });
  }
}
