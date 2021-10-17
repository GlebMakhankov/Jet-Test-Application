import {JetView} from "webix-jet";

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
		this.on(this.app, "app:action:contacts:setUserInfo", (info) => {
			this.setUserInfo(info);
		});
		this.app.callEvent("app:action:contacts:info:infoRequest");
	}

	setUserInfo(info) {
		this.$$("ContactsUserInfo").setValues(info);
	}

	getTemplate(obj) {
		return `
		<div class="contactInfoImageBlock">
			<img src="${
	obj.photo
		? obj.photo
		: "http://simpleicon.com/wp-content/uploads/user1.svg"
}"
			></img>
			<div>${obj.StatusID ? statuses.data.getItem(obj.StatusID).value : "-"}</div>
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
