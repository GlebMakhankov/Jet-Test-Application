import {JetView} from "webix-jet";

import activities from "../../models/activities";
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
						onAfterSelect: id => this.setContactInfoToTemplate(id)
					}
				},
				{
					view: "button",
					label: "Add contact",
					type: "icon",
					icon: "mdi mdi-plus-circle",
					click: () => this.app.callEvent("app:action:contacts:showForm")
				}
			]
		};
	}

	init() {
		this.list = this.$$("contactsList");
		this.list.sync(contacts);
		contacts.waitData.then(() => this.setContactInfoToTemplate(this.list.getFirstId()));
		this.on(this.app, "app:action:contacts:deleteContact", () => {
			this.deleteContact();
		});
		this.on(this.app, "app:action:contacts:editContact", () => {
			this.setParam("id", this.list.getSelectedId(), true);
			this.app.callEvent("app:action:contacts:showForm");
		});
		this.on(this.app, "app:action:contacts:info:infoRequest", () => {
			this.setContactInfoToTemplate(this.list.getSelectedId());
		});
	}

	setContactInfoToTemplate(id) {
		if (!id) return;
		const item = this.list.getItem(id);
		this.list.select(id);
		this.getParentView().setContactInfoToTemplate(item);
	}

	deleteContact() {
		webix
			.confirm({
				title: "Delete contact?",
				text: "This is cannot be undone! All information, activities and files associated with this contact will be deleted."
			})
			.then(() => {
				const id = this.list.getSelectedId();
				contacts.remove(id);
				activities.data.each((item) => {
					if (item.ContactID === id) activities.remove(item.id);
				});
				this.setContactInfoToTemplate(this.list.getFirstId());
			});
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
