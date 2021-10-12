import {JetView} from "webix-jet";

export default class AppHeader extends JetView {
	config() {
		return {
			view: "toolbar",
			elements: [
				{
					view: "label",
					label: "My App",
					maxWidth: 250,
					align: "right",
					localId: "pageTitle"
				}
			]
		};
	}

	init() {
		this.setTitle("APP");
		this.on(this.app, "app:action:top:setTitle", (title) => {
			this.setTitle(title);
		});
	}

	setTitle(title) {
		this.$$("pageTitle").setValue(title);
	}
}
