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
		this.on(this.app, "app:action:contacts:showInfo", () => {
			this.show("info");
		});
		this.on(this.app, "app:action:contacts:showForm", () => {
			this.show("form");
		});
	}
}
