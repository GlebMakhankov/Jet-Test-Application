import {JetView} from "webix-jet";

import Storage from "../../models/Storage";
import ContactsTemplateContent from "./ContactsTemplateContent";
import ContactsTemplateToolbar from "./ContactsTemplateToolbar";

export default class ContactsView extends JetView {
	config() {
		const ContactsList = {
			view: "list",
			localId: "contactsList",
			maxWidth: 300,
			select: true,
			type: {
				height: 60
			},
			template: obj => `
									 <img src="http://simpleicon.com/wp-content/uploads/user1.svg"></img>
									 <div>
										 <div>${obj.FirstName} ${obj.LastName}</div>
										 <span>${obj.Company}</span>
									 </div>
								 `,
			on: {
				onAfterSelect: id => this.setContactInfoToTemplate(id)
			}
		};

		const template = {
			rows: [ContactsTemplateToolbar, ContactsTemplateContent]
		};

		const ui = {
			cols: [ContactsList, template]
		};
		return ui;
	}

	init() {
		this.$$("contactsList").sync(Storage.contacts);
		Storage.contacts.waitData.then(() => {
			this.initialSelection();
		});
	}

	initialSelection() {
		this.setContactInfoToTemplate(this.$$("contactsList").getFirstId());
	}

	setContactInfoToTemplate(id) {
		const list = this.$$("contactsList");
		const info = list.getItem(id);
		list.select(id);
		this.$$("contactsTemplateUsername").setValues({
			name: info.FirstName,
			surname: info.LastName
		});
		this.$$("ContactsTemplateContent").setValues(info);
	}
}
