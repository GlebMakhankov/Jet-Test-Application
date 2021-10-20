import {JetView} from "webix-jet";

import List from "./List";

export default class ContactsView extends JetView {
	config() {
		const ui = {
			cols: [List, {$subview: true}]
		};
		return ui;
	}

	init() {
		this.show("contacts.Info");
		this.on(this.app, "app:action:contacts:showInfo", () => {
			this.show("contacts.Info");
		});
		this.on(this.app, "app:action:contacts:showForm", () => {
			this.show("contacts.Form");
		});
	}
}
