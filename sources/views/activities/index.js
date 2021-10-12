import {JetView} from "webix-jet";

import Storage from "../../models/Storage";
import ActivitiesWindow from "./ActivitiesWindow";
import ActivitiesToolbar from "./Activities_Toolbar";

export default class ActivitiesView extends JetView {
	config() {
		const table = {
			view: "datatable",
			minWidth: 700,
			localId: "activitiesDatatable",
			hover: "movieTableRowHover",
			select: "row",
			columns: [
				{
					id: "State",
					header: "",
					width: 30,
					sort: "text",
					css: "rank",
					template: "{common.checkbox()}",
					checkValue: "Open",
					uncheckValue: "Close"
				},
				{
					id: "TypeID",
					header: ["Activity type", {content: "selectFilter"}],
					options: Storage.activityTypes,
					sort: "text",
					width: 120
				},
				{
					id: "date",
					header: ["DueDate", {content: "datepickerFilter"}],
					width: 200,
					sort: "text",
					format: webix.Date.dateToStr("%d %F %Y")
				},
				{
					id: "Details",
					header: ["Details", {content: "textFilter"}],
					width: 120,
					fillspace: true
				},
				{
					id: "ContactID",
					header: ["Contact", {content: "selectFilter"}],
					options: Storage.contacts,
					width: 150,
					sort: "text"
				},
				{
					header: "",
					template:
            "<span class='mdi mdi-square-edit-outline editActivity'></span>",
					width: 50,
					sort: "text"
				},
				{
					header: "",
					template: "<span class='mdi mdi-delete deleteActivity'></span>",
					width: 50,
					sort: "text"
				}
			],
			onClick: {
				editActivity: (e, id) => {
					const entry = this.$$("activitiesDatatable").getItem(id);
					this.window.setDataToForm(entry);
				},
				deleteActivity: (e, id) => {
					webix
						.confirm({
							title: "Delete activity?",
							text: "Are you sure about that? This is cannot be undone!"
						})
						.then(() => {
							Storage.activities.remove(id);
						});
				}
			}
		};

		const ui = {
			rows: [ActivitiesToolbar, table]
		};

		return ui;
	}

	init() {
		this.$$("activitiesDatatable").sync(Storage.activities);
		this.window = this.ui(ActivitiesWindow);
	}
}
