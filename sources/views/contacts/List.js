import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import statuses from "../../models/statuses";

export default class List extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "search",
					placeholder: _("type to find matching contacts"),
					localId: "listSearch",
					on: {
						onTimedKeyPress: () => this.listFilter()
					}
				},
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
					label: _("Add contact"),
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
		this.search = this.$$("listSearch");

		contacts.waitData.then(() => {
			this.list.select(this.list.getFirstId());
		});

		this.on(contacts.data, "onStoreUpdated", (id, obj, mode) => {
			if (mode === "add") {
				this.list.select(id);
			}
			else if (mode === "delete") {
				this.list.select(this.list.getFirstId());
			}
		});
	}

	setCurrentItem(id) {
		this.setParam("id", id, true);
		this.show("info");
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

	listFilter() {
		const filterQuery = this.search.getValue().trim().toLowerCase();
		if (!filterQuery) return this.list.filter();

		const operator = filterQuery.charAt(0);
		if (operator === "=" || operator === ">" || operator === "<") {
			return this.listFilterByDate(filterQuery, operator);
		}

		return this.listFilterByText(filterQuery);
	}

	listFilterByDate(filterQuery, operator) {
		this.list.filter((contact) => {
			const birthdayYear = this.strToDate(contact.Birthday).getFullYear();
			const query = +filterQuery.slice(1);
			switch (operator) {
				case "=":
					return birthdayYear === query;
				case ">":
					return birthdayYear > query;
				case "<":
					return birthdayYear < query;
				default:
					return true;
			}
		});
	}

	listFilterByText(filterQuery) {
		this.list.filter((contact) => {
			let baseStr = "";
			const values = Object.entries(contact);
			values.forEach((propArr) => {
				if (propArr[0] === "StatusID") baseStr += statuses.find(obj => obj.id === +propArr[1], true).Value;
				if (
					propArr[0].toLowerCase() !== "birthday" &&
          propArr[0].toLowerCase() !== "startdate" &&
          typeof propArr[1] !== "number"
				) baseStr += propArr[1];
			});
			return !!baseStr.toLowerCase().includes(filterQuery);
		});
	}

	strToDate(str) {
		const parser = webix.Date.strToDate("%Y.%m.%d %H:%i");
		const date = parser(str);
		return date;
	}
}
