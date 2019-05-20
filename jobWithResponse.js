const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
const uri =
  "https://getchant.com/widget/polling-mls.html?siteURL=https%3A%2F%2Fwww.mlssoccer.com%2Fpost%2F2019%2F05%2F19%2Fvote-att-goal-week-week-12&selector=1558362071202&type=poll&id=47084";

const voteSelector = "a.choice-4";

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36`
  );
  await page.goto(uri);
  console.log("Waiting for selector to appear on page");
  await page.waitForSelector(voteSelector);
  await page.click(voteSelector);
  console.log("Voted!");

  await browser.close();

  await showResults();
}
run();

async function showResults() {
    const response = await fetch(
      "https://chant-data.s3-ap-southeast-2.amazonaws.com/json/polls/47084.json?_=1558361144687",
      {
        credentials: "omit",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36"
        },
        referrer: uri,
        referrerPolicy: "no-referrer-when-downgrade",
        body: null,
        method: "GET",
        mode: "cors"
      }
    );
    const json = await response.json();
    var cornelius = json.choices[0].score;
    var mattocks = json.choices[1].score;
    var mueller = json.choices[2].score
    var bofo = json.choices[3].score;
    var wondo = json.choices[4].score;

    var totalVotes = cornelius + mattocks + mueller + bofo + wondo;
    var bofoPercentage = (bofo / totalVotes) * 100;
    var mattocksPercentage = (mattocks / totalVotes) * 100;
    console.log("Bofo has "+ bofoPercentage.toFixed(2) + "% of the vote. Mattocks has " + mattocksPercentage.toFixed(2) + "%.");
}

// Comment/Remove if you don't want it to run after 30 seconds.
setTimeout(function(){
  console.log("Second run!");
  run();
}, 30000);