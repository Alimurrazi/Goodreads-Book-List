import axios from 'axios';
import puppeteer from 'puppeteer';
const SHELF_PAGE_URL = `https://www.goodreads.com/shelf/show/`;

class ScraperService {
  async getShelfPageContents(keyword: string, index: number, cookie: string) {
    const url = `${SHELF_PAGE_URL}${keyword}?page=${index}`;
    return await axios(url, {
      headers: {
        Cookie: cookie,
      },
    });
  }

  async getDetailsPageContents(url: string) {
    const gridContainerClass = '.BookPage__gridContainer';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(gridContainerClass);
    const html_data = await page.content();
    await browser.close();
    return html_data;
  }
}

export default new ScraperService();
