import {JetView} from "webix-jet";

import activities from "../../models/activities";
import activityTypes from "../../models/activityTypes";
import contacts from "../../models/contacts";

export default class ActivitiesForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "form",
			localId: "ActivitiesForm",
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			},
			elements: [
				{
					view: "textarea",
					name: "Details",
					label: _("Details"),
					width: 650,
					height: 100
				},
				{
					view: "richselect",
					name: "TypeID",
					label: _("Type"),
					options: activityTypes,
					invalidMessage: "Type filed is required!"
				},
				{
					view: "richselect",
					name: "ContactID",
					label: _("Contact"),
					options: contacts,
					invalidMessage: "Contact filed is required!"
				},
				{
					cols: [
						{
							view: "datepicker",
							label: _("Date"),
							name: "Date",
							width: 300
						},
						{
							view: "datepicker",
							label: _("Time"),
							name: "Time",
							type: "time",
							width: 300
						}
					]
				},
				{
					view: "checkbox",
					name: "State",
					labelRight: _("Completed"),
					labelWidth: 0,
					checkValue: "Open",
					uncheckValue: "Close"
				},
				{
					cols: [
						{},
						{
							view: "button",
							value: _("Add"),
							localId: "saveBtn",
							width: 130,
							align: "center",
							css: "webix_primary",
							click: () => this.saveEntry()
						},
						{
							view: "button",
							value: _("Cancel"),
							width: 130,
							align: "center",
							click: () => this.hideWindow()
						}
					]
				}
			]
		};
	}

	init() {
		this.form = this.$$("ActivitiesForm");
		this.saveBtn = this.$$("saveBtn");
		this.on(this.app, "app:action:activitiesWindow:setDataToForm", data => this.setDataToForm(data));
	}

	setDataToForm(data) {
		const _ = this.app.getService("locale")._;
		this.saveBtn.setValue(_("Save"));
		if (data.DueDate) {
			const dateAndTime = this.strToDate(data.DueDate);
			data.Date = dateAndTime;
			data.Time = dateAndTime;
		}
		this.clearAll();
		this.form.setValues(data);
		if (data.readonly) {
			this.form.elements.ContactID.disable();
			this.form.elements.ContactID.refresh();
		}
	}

	saveEntry() {
		if (!this.form.validate()) return;
		const entry = this.form.getValues();
		entry.DueDate = this.dateToStr(entry);
		this.hideWindow();
		if (entry.id) {
			activities.updateItem(entry.id, entry);
		}
		else {
			activities.add(entry);
		}
	}

	hideWindow() {
		const _ = this.app.getService("locale")._;
		this.getParentView().hideWindow();
		this.clearAll();
		this.saveBtn.setValue(_("Add"));
	}

	clearAll() {
		this.form.clear();
		this.form.clearValidation();
	}

	dateToStr(entry) {
		const formatDate = webix.Date.dateToStr("%Y-%m-%d");
		const formatTime = webix.Date.dateToStr("%H:%i");
		const stringDate = formatDate(
			entry.Date || new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
		);
		const stringTime = entry.Time ? formatTime(entry.Time) : "00:00";
		return `${stringDate} ${stringTime}`;
	}

	strToDate(str) {
		const parser = webix.Date.strToDate("%Y.%m.%d %H:%i");
		const date = parser(str);
		return date;
	}
}
