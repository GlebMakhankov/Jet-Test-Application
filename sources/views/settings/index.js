import { JetView } from "webix-jet";

import SettingsTable from "./settingsTable";
import activityTypes from "../../models/activityTypes";
import statuses from "../../models/statuses";

export default class SettingsView extends JetView {
  config() {
    const _ = this.app.getService("locale")._;

    const segmentedButton = {
      view: "segmented",
      localId: "lang",
      value: "en",
      options: [
        { id: "ru", value: "Русский" },
        { id: "en", value: "English" },
      ],
      click: () => this.toggleLanguage(),
    };

    return {
      rows: [
        segmentedButton,
        {
          cols: [
            new SettingsTable(this.app, "", activityTypes),
            new SettingsTable(this.app, "", statuses),
          ],
        },
      ],
    };
  }

  init() {
    this.lang = this.$$("lang");
  }

  toggleLanguage() {
    const langs = this.app.getService("locale");
    const value = this.lang.getValue();
    langs.setLang(value);
  }
}
