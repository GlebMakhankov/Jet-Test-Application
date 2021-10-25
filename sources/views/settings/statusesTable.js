import {JetView} from "webix-jet";

import statuses from "../../models/statuses";

export default class statusesTable extends JetView {
	config() {
		this._ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "datatable",
					minWidth: 700,
					localId: "statusesTable",
					select: "row",
					scrollX: false,
					columns: [
						{
							id: "Value",
							header: this._("Name"),
							sort: "text",
							width: 120,
							fillspace: true
						},
						{
							id: "Icon",
							header: this._("Icon"),
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
						onAfterSelect: id => this.form.setValues(this.statusesTable.getItem(id))
					},
					onClick: {
						delete: (e, id) => {
							webix
								.confirm({
									title: this._("Delete activity?"),
									text: this._(
										"Are you sure about that? This is cannot be undone!"
									)
								})
								.then(() => {
									statuses.remove(id);
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
							placeholder: this._("Status name"),
							name: "Value",
							invalidMessage: "Type of activity is required!"
						},
						{
							view: "text",
							placeholder: this._("Icon name"),
							name: "Icon"
						},
						{
							view: "button",
							value: this._("Save"),
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
		this.statusesTable = this.$$("statusesTable");
		this.form = this.$$("form");
		this.statusesTable.sync(statuses);
	}

	saveEntry() {
		const entry = this.form.getValues();
		entry.value = entry.Value;
		if (!entry.id) {
			statuses.add(entry);
		}
		else {
			statuses.updateItem(entry.id, entry);
		}
		this.clearAll();
	}

	clearAll() {
		this.form.clear();
		this.form.clearValidation();
	}
}
