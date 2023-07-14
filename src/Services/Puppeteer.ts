import { Injectable, Inject } from "@xkairo/scrapy-interfaces";
import { Browser, PuppeteerLaunchOptions } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { PuppeteerExtraPlugin } from "puppeteer-extra-plugin";

@Injectable()
export class Puppeteer {
  private browser?: Browser;

  constructor(
    @Inject("config") private config?: PuppeteerLaunchOptions,
    @Inject("plugins") plugins?: PuppeteerExtraPlugin[]
  ) {
    plugins?.forEach((plugin) => puppeteer.use(plugin));
  }

  getBrowser = async () => {
    if (!this.browser) {
      this.browser = await puppeteer.launch(this.config || { headless: true });
    }

    return this.browser;
  };
}
