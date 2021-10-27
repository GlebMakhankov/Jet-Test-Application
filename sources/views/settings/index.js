import {JetView} from "webix-jet";

import activityTypes from "../../models/activityTypes";
import statuses from "../../models/statuses";
import SettingsTable from "./settingsTable";

export default class SettingsView extends JetView {
	config() {
		const locale = this.app.getService("locale");
		const _ = locale._;
		const lang = locale.getLang();

		const segmentedButton = {
			view: "segmented",
			localId: "lang",
			label: _("Language"),
			value: lang,
			inputWidth: 300,
			align: "right",
			options: [
				{id: "ru", value: "Русский"},
				{id: "en", value: "English"}
			],
			click: () => this.toggleLanguage()
		};

		return {
			margin: 10,
			rows: [
				segmentedButton,
				{
					cols: [
						{
							rows: [
								{
									view: "template",
									template: _("Activity types settings"),
									type: "header"
								},
								new SettingsTable(this.app, "", activityTypes)
							]
						},
						{
							rows: [
								{
									view: "template",
									template: _("Statuses settings"),
									type: "header"
								},
								new SettingsTable(this.app, "", statuses)
							]
						}
					]
				}
			]
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
