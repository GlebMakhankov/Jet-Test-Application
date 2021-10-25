import {JetView} from "webix-jet";

import activityTypes from "../../models/activityTypes";

export default class activityTypesTable extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "datatable",
					minWidth: 700,
					localId: "activityTypesTable",
					select: "row",
					scrollX: false,
					columns: [
						{
							id: "Value",
							header: _("Value"),
							sort: "text",
							width: 120,
							fillspace: true
						},
						{
							id: "Icon",
							header: _("Icon"),
							width: 200,
							fillspace: true,
							sort: "text"
						},
						{
							header: "",
							template: "<span class='mdi mdi-delete delete'></span>",
							width: 50
						}
					],
					on: {
						onAfterSelect: id => this.form.setValues(this.activityTypesTable.getItem(id))
					},
					onClick: {
						delete: (e, id) => {
							webix
								.confirm({
									title: _("Delete activity?"),
									text: _(
										"Are you sure about that? This is cannot be undone!"
									)
								})
								.then(() => {
									activityTypes.remove(id);
								});
							return false;
						}
					}
				},
				{
					view: "form",
					localId: "form",

					rules: {
						Value: webix.rules.isNotEmpty
					},
					elements: [
						{
							view: "text",
							placeholder: _("Type of activity"),
							name: "Value",
							invalidMessage: "Type of activity is required!"
						},
						{
							view: "text",
							placeholder: _("Icon name"),
							name: "Icon"
						},
						{
							view: "button",
							value: _("Save"),
							css: "webix_primary",
							click: () => {
								if (!this.form.validate()) return;
								this.saveEntry();
							}
						}
					]
				}
			]
		};
	}

	init() {
		this.activityTypesTable = this.$$("activityTypesTable");
		this.form = this.$$("form");
		this.activityTypesTable.sync(activityTypes);
	}

	saveEntry() {
		const entry = this.form.getValues();
		entry.value = entry.Value;
		if (!entry.id) {
			activityTypes.add(entry);
		}
		else {
			activityTypes.updateItem(entry.id, entry);
		}
		this.clearAll();
	}

	clearAll() {
		this.form.clear();
		this.form.clearValidation();
	}
}
