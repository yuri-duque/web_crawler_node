import {Page} from "puppeteer";

const url = "https://bahamas.com.br/encartes/";

async function clickOnAcceptCookies(page: Page) {
      await page.click('Aceitar Todos');
}

async function selectCidade(page:Page) {
  await page.waitForSelector('.localidade');
  await page.select('.localidade', 'Juiz de Fora');
  await page.waitForSelector('.list-encarte');
}



export default { url, clickOnAcceptCookies, selectCidade };
