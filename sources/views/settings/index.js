import { JetView } from "webix-jet";

import activityTypesTable from "./activityTypesTable";
import statusesTable from "./statusesTable";

export default class SettingsView extends JetView {
  config() {
    this._ = this.app.getService("locale")._;

    const segmentedButton = {
      view: "segmented",
      localId: "lang",
      value: "en",
      options: [
        { id: "ru", value: this._("Russian") },
        { id: "en", value: this._("English") },
      ],
      click: () => this.toggleLanguage(),
    };

 
    return { rows: [segmentedButton, { cols: [activityTypesTable, statusesTable] }] };
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
