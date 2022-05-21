import { DataStore } from "./DataStore";

type SiteSettings = {
  darkmode: "auto" | "light" | "dark";
};

const NAME = "site_settings";
const VERSION = 1;
export default new (class extends DataStore<SiteSettings> {
  constructor() {
    super(VERSION, NAME, {
      darkmode: "auto",
    });
  }
  protected migrate(_: number, data: any): SiteSettings {
    return data;
  }
})();
