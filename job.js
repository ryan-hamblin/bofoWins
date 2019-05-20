const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const uri =
  'https://getchant.com/widget/polling-mls.html?siteURL=https%3A%2F%2Fwww.mlssoccer.com%2Fpost%2F2019%2F05%2F19%2Fvote-att-goal-week-week-12&selector=1558362071202&type=poll&id=47084';

const voteSelector = 'a.choice-4';
async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36`
  );
  await page.goto(uri);
  console.log('Waiting for selector to appear on page');
  await page.waitForSelector(voteSelector);
  await page.click(voteSelector);
  console.log('Voted!');

  await browser.close();
}
run();
