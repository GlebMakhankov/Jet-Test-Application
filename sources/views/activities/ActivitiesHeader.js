import {JetView} from "webix-jet";

export default class ActivitiesHeader extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "toolbar",
			elements: [
				{
					view: "segmented",
					localId: "tabbarActivitiesFilter",
					value: "all",
					borderless: true,
					options: [
						{id: "all", value: _("All")},
						{id: "overdue", value: _("Overdue")},
						{id: "completed", value: _("Completed")},
						{id: "today", value: _("Today")},
						{id: "tomorrow", value: _("Tomorrow")},
						{id: "week", value: _("This week")},
						{id: "month", value: _("This month")}
					],
					on: {
						onChange: id => this.app.callEvent("app:action:activities:tableFilter", [id])
					}
				},
				{
					view: "button",
					label: _("Add activity"),
					width: 150,
					type: "icon",
					icon: "mdi mdi-plus-circle",
					click: () => this.getParentView().window.showWindow()
				}
			]
		};
	}

	init() {
		this.tabbar = this.$$("tabbarActivitiesFilter");
		this.getParentView().registerTableFilter(this.tabbar);
	}
}
