import {JetView, plugins} from "webix-jet";

import AppHeader from "./AppHeader";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{value: _("menu_first"), id: "contacts", icon: "mdi mdi-account-group"},
				{value: _("menu_second"), id: "activities", icon: "mdi mdi-calendar-check"},
				{value: _("menu_third"), id: "settings", icon: "mdi mdi-cog"}
			],
			on: {
				onAfterSelect(id) {
					this.$scope.setTitle((this.getMenuItem(id).value));
				}
			}
		};

		const ui = {
			type: "wide",
			css: "app_layout",
			rows: [
				AppHeader,
				{
					cols: [
						{
							rows: [{css: "webix_shadow_medium", rows: [menu]}]
						},
						{
							type: "wide",
							rows: [{$subview: true}]
						}
					]
				}
			]
		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}

	setTitle(title) {
		this.app.callEvent("app:action:top:setTitle", [title]);
	}
}
