//node AutomationScript.js --url="https://www.hackerrank.com" --config=config.json

//npm init -y
//npm install puppeteer
//npm install minimist

let minimist= require("minimist");
let puppeteer= require("puppeteer");
let fs= require("fs");

let args = minimist(process.argv);
// console.log(args.url);
// console.log(args.config);

let configJSON = fs.readFileSync(args.config,"utf-8");
let configJSO = JSON.parse(configJSON);

run();

async function run(){
    //start the browser
    let browser = await puppeteer.launch({
        defaultViewport:null, //full screen-content
        args: [
            "--start-maximised" // full screen window
        ],
        headless:false
    });

    //get a tab
    let pages = await browser.pages();
    let page = pages[0];

    //go to url
    await page.goto(args.url);
    
    //click login on 1st page(login1)
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    //click on login2
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    // type username
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",configJSO.userid);

    //type password
    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']",configJSO.password);

    //click on login3
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    //click on compete
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");

    //click on manage contest
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    //find pages
    await page.waitForSelector("a[data-attr1='Last']");
    let numPages = await page.$eval("a[data-attr1='Last']" ,function(lastTag){
        let numPages = lastPage.getAttribute("data-Page");
        let np = parseInt(atag.getAttribute('data-page'));
        return np;
    });
    console.log(numPages);

    //move to all pages
    for(let i=0;i<numPages;i++){
        //do the same code

        await page.waitFor(1500);
        await page.waitForSelector("a[data-attr1='Right']");
        await page.click("a[data-attr1='Right']");
    }


}