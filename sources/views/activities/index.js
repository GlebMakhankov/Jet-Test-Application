import {JetView} from "webix-jet";

import activities from "../../models/activities";
import activityTypes from "../../models/activityTypes";
import contacts from "../../models/contacts";
import ActivitiesHeader from "./ActivitiesHeader";
import ActivitiesWindow from "./ActivitiesWindow";

export default class ActivitiesView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

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
					header: [_("Activity type"), {content: "selectFilter"}],
					options: activityTypes,
					sort: "text",
					width: 120
				},
				{
					id: "date",
					header: [_("DueDate"), {content: "datepickerFilter"}],
					width: 200,
					sort: "date",
					format: webix.Date.dateToStr("%d %F %Y")
				},
				{
					id: "Details",
					header: [_("Details"), {content: "textFilter"}],
					width: 120,
					fillspace: true,
					sort: "text"
				},
				{
					id: "ContactID",
					header: [_("Contact"), {content: "selectFilter"}],
					options: contacts,
					width: 150,
					sort: "text"
				},
				{
					header: "",
					template:
            "<span class='mdi mdi-square-edit-outline editActivity'></span>",
					width: 50
				},
				{
					header: "",
					template: "<span class='mdi mdi-delete deleteActivity'></span>",
					width: 50
				}
			],
			onClick: {
				editActivity: (e, id) => {
					const entry = this.$$("activitiesDatatable").getItem(id);
					this.window.showWindow(entry);
					return false;
				},
				deleteActivity: (e, id) => {
					webix
						.confirm({
							title: _("Delete activity?"),
							text: _("Are you sure about that? This is cannot be undone!")
						})
						.then(() => {
							activities.remove(id);
						});
					return false;
				}
			}
		};

		const ui = {
			rows: [ActivitiesHeader, table]
		};

		return ui;
	}

	init() {
		this.table = this.$$("activitiesDatatable");
		this.table.sync(activities);
		this.window = this.ui(ActivitiesWindow);
		this.on(activities.data, "onStoreUpdated", (id, obj, mode) => {
			if (mode === "add" || mode === "update" || mode === "delete") {
				this.restoreFiltering();
			}
		});
	}

	restoreFiltering() {
		this.$$("activitiesDatatable").filterByAll();
	}
}
