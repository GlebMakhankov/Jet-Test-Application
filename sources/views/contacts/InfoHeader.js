import {JetView} from "webix-jet";

export default class InfoHeader extends JetView {
	config() {
		return {
			view: "toolbar",
			elements: [
				{
					localId: "contactsTemplateUsername",
					template: obj => `${obj.name || "Firstname"} ${obj.surname || "Lastname"}`,
					inputWidth: 100,
					borderless: true,
					css: "contactsTemplateUsername"
				},
				{
					view: "button",
					label: "Delete",
					width: 100,
					align: "right",
					type: "icon",
					icon: "mdi mdi-delete",
					click: () => this.app.callEvent("app:action:contacts:deleteContact")
				},
				{
					view: "button",
					label: "Edit",
					width: 100,
					align: "right",
					type: "icon",
					icon: "mdi mdi-square-edit-outline",
					click: () => this.app.callEvent("app:action:contacts:editContact")
				}
			]
		};
	}

	init() {
		this.on(this.app, "app:action:contacts:setUsername", (title) => {
			this.setUsername(title);
		});
	}

	setUsername(username) {
		this.$$("contactsTemplateUsername").setValues(username);
	}
}
