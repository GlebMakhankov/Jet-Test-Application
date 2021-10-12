import {JetView} from "webix-jet";

import ActivitiesForm from "./ActivitiesForm";

export default class ActivitiesWindow extends JetView {
	config() {
		return {
			view: "window",
			localId: "ActivitiesWindow",
			height: 500,
			width: 650,
			position: "center",
			head: "Add activity",
			body: {$subview: ActivitiesForm, name: "form"}
		};
	}

	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
		this.changeHead();
	}

	setDataToForm(data) {
		this.getSubView("form").setDataToForm(data);
		this.changeHead("Edit");
		this.showWindow();
	}

	changeHead(title = "Add") {
		this.$$("ActivitiesWindow").getHead().setHTML(`${title} activity`);
	}
}
