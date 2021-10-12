import {JetView} from "webix-jet";

import contacts from "../../models/contacts";

export default class ContactsList extends JetView {
	config() {
		return {
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
		};
	}

	init() {
		const list = this.$$("contactsList");
		list.sync(contacts);
		contacts.waitData.then(() => this.setContactInfoToTemplate(list.getFirstId()));
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

	setContactInfoToTemplate(id) {
		const list = this.$$("contactsList");
		const item = list.getItem(id);
		list.select(id);
		this.getParentView().setContactInfoToTemplate(item);
	}
}
