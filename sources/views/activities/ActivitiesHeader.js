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
						onChange: () => {
							this.getParentView().table.filterByAll();
						}
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
		this.registerTableFilter();
	}

	registerTableFilter() {
		this.getParentView().table.registerFilter(
			this.tabbar,
			{
				columnId: "State",
				compare(value, filter, item) {
					const currentDate = new Date();
					const parser = webix.Date.dateToStr("%Y-%m-%d");
					const parserMonth = webix.Date.dateToStr("%Y-%m");
					const getFirstAndLast = (d) => {
						d = new Date(d);
						const day = d.getDay();
						const diff = d.getDate() - day + (+day === 0 ? -6 : 1);
						return {
							first: new Date(d.setDate(diff)),
							last: new Date(d.setDate(diff + 6))
						};
					};
					const firstAndLast = getFirstAndLast(currentDate);

					switch (filter) {
						case "overdue":
							return item.date < currentDate;

						case "completed":
							return item.State === "Open";

						case "today":
							return parser(item.date) === parser(currentDate);

						case "tomorrow":
							currentDate.setDate(currentDate.getDate() + 1);
							return parser(item.date) === parser(currentDate);

						case "week":
							return (
								item.date > firstAndLast.first && item.date < firstAndLast.last
							);

						case "month":
							return parserMonth(item.date) === parserMonth(currentDate);

						default:
							return true;
					}
				}
			},
			{
				getValue(node) {
					return node.getValue();
				},
				setValue(node, value) {
					node.setValue(value);
				}
			}
		);
	}
}
