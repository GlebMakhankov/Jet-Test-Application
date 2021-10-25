import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import statuses from "../../models/statuses";

export default class Form extends JetView {
	config() {
		this._ = this.app.getService("locale")._;
		const myLabelWidth = 120;
		return {
			rows: [
				{
					localId: "formTitle",
					template: obj => `${obj.title || this._("Add new")} ${this._("contact")}`,
					height: 50,
					css: "contactsFormTitle"
				},
				{
					view: "form",
					localId: "contactForm",
					css: "contactsForm",
					rules: {
						FirstName: webix.rules.isNotEmpty,
						LastName: webix.rules.isNotEmpty,
						StatusID: webix.rules.isNotEmpty
					},
					elements: [
						{
							margin: 50,
							cols: [
								{
									margin: 40,
									rows: [
										{
											view: "text",
											label: this._("First name"),
											name: "FirstName",
											labelWidth: myLabelWidth,
											invalidMessage: "First name is required!"
										},
										{
											view: "text",
											label: this._("Last name"),
											name: "LastName",
											labelWidth: myLabelWidth,
											invalidMessage: "Last name is required!"
										},
										{
											view: "datepicker",
											label: this._("Joining date"),
											name: "StartDate",
											labelWidth: myLabelWidth
										},
										{
											view: "richselect",
											name: "StatusID",
											label: this._("Status"),
											options: statuses,
											invalidMessage: "Contact field is required!",
											labelWidth: myLabelWidth
										},
										{
											view: "text",
											label: this._("Job"),
											name: "Job",
											labelWidth: myLabelWidth
										},
										{
											view: "text",
											label: this._("Company"),
											name: "Company",
											labelWidth: myLabelWidth
										},
										{
											view: "text",
											label: this._("Website"),
											name: "Website",
											labelWidth: myLabelWidth
										},
										{
											view: "textarea",
											name: this._("Address"),
											label: "Address",
											height: 100,
											labelWidth: myLabelWidth
										}
									]
								},
								{
									margin: 40,
									rows: [
										{
											view: "text",
											label: this._("Email"),
											name: "Email",
											labelWidth: myLabelWidth
										},
										{
											view: "text",
											label: this._("Skype"),
											name: "Skype",
											labelWidth: myLabelWidth
										},
										{
											view: "text",
											label: this._("Phone"),
											name: "Phone",
											labelWidth: myLabelWidth
										},
										{
											view: "datepicker",
											label: this._("Birthday"),
											name: "Birthday",
											labelWidth: myLabelWidth
										},
										{
											margin: 20,
											cols: [
												{
													template: `
														<img src="http://simpleicon.com/wp-content/uploads/user1.svg" />
													`
												},
												{
													margin: 20,
													rows: [
														{},
														{
															view: "button",
															value: this._("Change photo")
														},
														{
															view: "button",
															value: this._("Delete photo")
														}
													]
												}
											]
										}
									]
								}
							]
						},
						{},
						{
							margin: 10,
							cols: [
								{},
								{
									view: "button",
									value: this._("Cancel"),
									width: 150,
									click: () => this.close()
								},
								{
									view: "button",
									localId: "SaveBtn",
									value: this._("Add"),
									width: 150,
									css: "webixthis._primary",
									click: () => this.saveContact()
								}
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.form = this.$$("contactForm");
		this.parent = this.getParentView();
		this.saveBtn = this.$$("SaveBtn");
		this.formTitle = this.$$("formTitle");
	}

	urlChange() {
		this.id = this.getParam("id", true);
		if (+this.id === 0) this.clearAll();
		if (this.id) {
			this.form.setValues(contacts.getItem(this.id));
			this.formTitle.setValues({
				title: this._("Edit")
			});
			this.saveBtn.setValue(this._("Save"));
		}
	}

	saveContact() {
		if (!this.form.validate()) return;
		const entry = this.form.getValues();
		const parser = webix.Date.dateToStr("%Y-%m-%d %H:%i");
		entry.StartDate = parser(entry.StartDate) || parser(new Date());
		entry.Birthday = parser(entry.Birthday) || entry.StartDate;
		if (entry.id) {
			contacts.updateItem(entry.id, entry);
		}
		else {
			contacts
				.waitSave(() => contacts.add(entry))
				.then(obj => this.parent.setParam("id", obj.id, true));
		}
		this.close();
	}

	close() {
		this.clearAll();
		this.app.callEvent("app:action:contacts:showInfo");
		this.saveBtn.setValue("Add");
	}

	clearAll() {
		this.id = null;
		this.form.clear();
		this.form.clearValidation();
	}
}
