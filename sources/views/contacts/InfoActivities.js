import {JetView} from "webix-jet";

import activities from "../../models/activities";
import activityTypes from "../../models/activityTypes";
import ActivitiesWindow from "../activities/ActivitiesWindow";

export default class InfoActivities extends JetView {
	config() {
		return {
			rows: [
				{
					view: "datatable",
					minWidth: 700,
					localId: "contactActivitiesTable",
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
							header: [{content: "selectFilter"}],
							options: activityTypes,
							sort: "text",
							width: 120
						},
						{
							id: "date",
							header: [{content: "datepickerFilter"}],
							width: 200,
							sort: "date",
							format: webix.Date.dateToStr("%d %F %Y")
						},
						{
							id: "Details",
							header: [{content: "textFilter"}],
							width: 120,
							fillspace: true,
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
							const entry = this.table.getItem(id);
							this.window.showWindow(entry);
							return false;
						},
						deleteActivity: (e, id) => {
							webix
								.confirm({
									title: "Delete activity?",
									text: "Are you sure about that? This is cannot be undone!"
								})
								.then(() => {
									activities.remove(id);
								});
							return false;
						}
					}
				},
				{
					view: "toolbar",
					elements: [
						{},
						{
							view: "button",
							label: "Add activity",
							width: 150,
							type: "icon",
							icon: "mdi mdi-plus-circle",
							click: () => this.window.showWindow({
								ContactID: this.ContactID,
								readonly: true
							})
						}
					]
				}
			]
		};
	}

	init() {
		this.window = this.ui(ActivitiesWindow);
		this.table = this.$$("contactActivitiesTable");
		this.table.sync(activities);
		this.on(this.app, "app:action:contacts:setUserInfo", (info) => {
			this.ContactID = info.ContactID;
			this.filterDatatable(this.table, info.ContactID);
		});
	}

	filterDatatable(view, id) {
		view.filter(obj => obj.ContactID === id);
	}
}
