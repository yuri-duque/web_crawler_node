import puppeteer, {Page} from "puppeteer";
import fs from "fs";

async function init(url) {
  const browser = await puppeteer.launch({ headless: `new` });
  const page = await browser.newPage();
  await page.goto(url);

  return page;
}

async function takeScreenshot(page, filename) {
  const path = "./screenshots";

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  await page.screenshot({ path: `${path}/${filename}` });
}

export default { init, takeScreenshot };
