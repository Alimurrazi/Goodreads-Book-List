import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';

class ScraperController {
  async syncContent(req: express.Request, res: express.Response) {
    const url = 'https://coinmarketcap.com/';
    axios(url).then(async (response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);
      const users = 'Hello';
      await res.status(200).send(users);
    });
  }
}
export default new ScraperController();
