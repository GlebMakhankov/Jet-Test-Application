import {JetView} from "webix-jet";

import contacts from "../../models/contacts";

export default class List extends JetView {
	config() {
		return {
			rows: [
				{
					view: "list",
					localId: "contactsList",
					maxWidth: 300,
					select: true,
					type: {
						height: 60
					},
					template: obj => this.getListItemHTML(obj),
					on: {
						onAfterSelect: id => this.setCurrentItem(id)
					}
				},
				{
					view: "button",
					label: "Add contact",
					type: "icon",
					icon: "mdi mdi-plus-circle",
					click: () => {
						this.parent.setParam("id", 0, true);
						this.app.callEvent("app:action:contacts:showForm");
					}
				}
			]
		};
	}

	init() {
		this.list = this.$$("contactsList");
		this.parent = this.getParentView();
		this.list.sync(contacts);

		contacts.waitData.then(() => {
			this.list.select(this.list.getFirstId());
		});

		this.on(this.app, "app:action:contacts:showInfo", () => {
			this.list.select(this.list.getSelectedId());
		});

		this.on(contacts.data, "onStoreUpdated", (id, obj, mode) => {
			switch (mode) {
				case "add":
				case "update":
					this.list.select(id);
					break;
				case "delete":
				default:
					this.list.select(this.list.getFirstId());
					break;
			}
		});
	}

	setCurrentItem(id) {
		this.parent.setParam("id", id, true);
		this.parent.show("contacts.Info");
	}

	getListItemHTML(obj) {
		return `
	  <img src="http://simpleicon.com/wp-content/uploads/user1.svg"></img>
	  <div>
		  <div>${obj.FirstName} ${obj.LastName}</div>
		  <span>${obj.Company}</span>
	  </div>
  `;
	}
}
