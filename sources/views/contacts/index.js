import {JetView} from "webix-jet";

import ContactsHeader from "./ContactsHeader";
import ContactsList from "./ContactsList";
import ContactsUserInfo from "./ContactsUserInfo";

export default class ContactsView extends JetView {
	config() {
		const template = {
			rows: [ContactsHeader, ContactsUserInfo]
		};

		const ui = {
			cols: [ContactsList, template]
		};
		return ui;
	}

	setContactInfoToTemplate(item) {
		this.app.callEvent("app:action:contacts:setUsername", [{
			name: item.FirstName,
			surname: item.LastName
		}]);
		this.app.callEvent("app:action:contacts:setUserInfo", [item]);
	}
}
