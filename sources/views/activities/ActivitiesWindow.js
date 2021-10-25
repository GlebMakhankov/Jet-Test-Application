import {JetView} from "webix-jet";

import ActivitiesForm from "./ActivitiesForm";

export default class ActivitiesWindow extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "window",
			modal: true,
			localId: "ActivitiesWindow",
			height: 500,
			width: 650,
			position: "center",
			head: _("Add activity"),
			body: ActivitiesForm
		};
	}

	showWindow(data) {
		if (data) {
			this.changeHead(this.app.getService("locale")._("Edit"));
			this.setDataToForm(data);
		}
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
		this.changeHead();
	}

	setDataToForm(data) {
		this.app.callEvent("app:action:activitiesWindow:setDataToForm", [data]);
	}

	changeHead(title = "Add") {
		this.$$("ActivitiesWindow").getHead().setHTML(`${title} activity`);
	}
}
