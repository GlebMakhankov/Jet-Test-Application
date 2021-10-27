import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import statuses from "../../models/statuses";

export default class InfoTemplate extends JetView {
	config() {
		return {
			localId: "ContactsUserInfo",
			borderless: true,
			scroll: true,
			data: {
				Email: "Email",
				Skype: "Skype",
				Job: "Job",
				Company: "Company",
				Birthday: "Date of Birth",
				Location: "Location",
				Status: "Status"
			},
			css: "contactInfo",
			template: obj => this.getTemplate(obj)
		};
	}

	init() {
		this.setInfo();
	}

	urlChange() {
		this.setInfo();
	}

	setInfo() {
		this.id = this.getParam("id", true);
		webix.promise
			.all([statuses.waitData, contacts.waitData])
			.then(() => this.$$("ContactsUserInfo").setValues(contacts.getItem(this.id)));
	}

	getTemplate(obj) {
		const statusID = obj.StatusID || null;
		const status = statusID ? statuses.data.getItem(statusID) : null;
		const statusValue = status ? status.value : "-";
		return `
		<div class="contactInfoImageBlock">
			<img src="${
	obj.photo
		? obj.photo
		: "http://simpleicon.com/wp-content/uploads/user1.svg"
}"
			></img>
			<div>${statusValue}</div>
		</div>
		<div class="contactInfoTextBlock">
			<ul>
				<li><i class="mdi mdi-email"></i> ${obj.Email || "-"}</li>
				<li><i class="mdi mdi-skype"></i> ${obj.Skype || "-"}</li>
				<li><i class="mdi mdi-tag"></i> ${obj.Job || "-"}</li>
				<li><i class="mdi mdi-briefcase"></i> ${obj.Company || "-"}</li>
				<li><i class="mdi mdi-calendar"></i> ${
	webix.Date.dateToStr("%d %F %Y")(obj.Birthday) || "-"
}</li>
				<li><i class="mdi mdi-map-marker"></i> ${obj.Address || "-"}</li>
			</ul>
		</div>
  `;
	}
}
