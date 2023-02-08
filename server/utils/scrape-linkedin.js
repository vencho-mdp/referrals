import puppeteer from "puppeteer";
import jsdom from "jsdom";

// const username = config.LINKEDIN_PASSWORD;
// const password = config.LINKEDIN_USERNAME;
// import { Client } from "linkedin-private-api";
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
function parseDocument(document) {
  let data = { experience: [], education: [] };

  const name = document.getElementsByTagName("h1");
  const profile_pic = document.querySelectorAll("button img")[1];
  const tagLine = document.querySelectorAll(".pv-text-details__left-panel");
  const about = document.querySelector("#about");
  const experience = document.querySelector("#experience");
  const education = document.querySelector("#education");
  const companyName = document.querySelectorAll(
    ".pv-text-details__right-panel"
  )[0];
  data["profile_name"] = name[0]?.textContent.trim();
  data["profile_pic"] = profile_pic?.src;
  data["company_name"] = companyName?.textContent.trim();

  //About Section

  try {
    if (about) {
      data["about"] =
        about?.nextElementSibling?.nextElementSibling?.textContent.trim();
    } else {
      data["about"] = "null";
    }
  } catch (err) {}

  // Tag Line section

  tagLine.forEach((tag, index) => {
    if (index === 0) {
      const x = tag.querySelectorAll("div")[1];
      data["designation"] = x?.textContent.trim();
    }
    if (index === 1) {
      const x = tag.querySelectorAll("span")[0];
      data["location"] = x?.textContent.trim();

      const contactNode = tag.children[1];
      const anchor = contactNode.querySelectorAll("a")[0];
      anchor.click();
      const modal = document.querySelectorAll(".ci-email")[0];
      try {
        if (modal) {
          data["email"] = modal?.textContent.trim().slice(6).trim();
        } else {
          data["email"] = "null";
        }
      } catch (err) {}
    }
  });

  // Experiences

  try {
    const listOfExps = experience.nextElementSibling.nextElementSibling;

    const divs = listOfExps.querySelectorAll(
      "div > .display-flex .align-items-center > .mr1"
    );

    const exparr = [];
    divs.forEach((div) => {
      exparr.push(div.querySelector("span")?.textContent.trim());
    });

    data["experience"] = [...exparr];
  } catch (err) {}

  // Education

  try {
    const educationList = education?.nextElementSibling?.nextElementSibling;
    const institutionNames = educationList.querySelectorAll(
      "span.mr1.t-bold span.visually-hidden"
    );
    const coursesName = educationList.querySelectorAll(
      "span.t-14.t-normal span.visually-hidden"
    );
    const duration = educationList.querySelectorAll(
      "span.t-14.t-normal.t-black--light span.visually-hidden"
    );

    let obj = [];
    for (let i = 0; i < institutionNames.length; i++) {
      obj.push(
        institutionNames[i]?.textContent.trim() +
          ", " +
          coursesName[i]?.textContent.trim() +
          ", " +
          duration[i]?.textContent.trim()
      );
    }

    data["education"] = [...obj];
  } catch (err) {}

  return data;
}

export default async (url) => {
  const email = useRuntimeConfig().LINKEDIN_EMAIL;
  const password = useRuntimeConfig().LINKEDIN_PASSWORD;
  // open browser
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // set user agent
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
  );

  // set viewport
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto("https://linkedin.com/", {
    waitUntil: "networkidle2",
  });
  await delay(2000);
  await page.waitForSelector("input[name=session_key]");
  await page.type("input[name=session_key]", email);

  await page.waitForSelector("input[name=session_password]");
  await page.type("input[name=session_password]", password);

  await page.waitForSelector("button[type=submit]");
  await page.click("button[type=submit]");

  await delay(12000);

  // navigate to the page
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });
  await delay(2000);

  // get the html
  const htmlString = await page.content();
  await browser.close();

  const dom = new jsdom.JSDOM(htmlString);

  const data = parseDocument(dom.window.document);

  return data;
};
