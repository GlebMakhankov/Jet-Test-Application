import { JetView, plugins } from "webix-jet";
import Toolbar from "./toolbar";

export default class TopView extends JetView {
  config() {
    let menu = {
      view: "menu",
      id: "top:menu",
      css: "app_menu",
      width: 180,
      layout: "y",
      select: true,
      template: "<span class='webix_icon #icon#'></span> #value# ",
      data: [
        { value: "Contacts", id: "contacts", icon: "mdi mdi-account" },
        { value: "Activities", id: "activities", icon: "mdi mdi-calendar" },
        { value: "Settings", id: "settings", icon: "mdi mdi-cog" },
      ],
      on: {
        onAfterSelect: (id) => this.setTitle((this.$$("top:menu").getMenuItem(id).value)),
      },
    };
    let ui = {
      type: "wide",
      // paddingX: 5,
      // paddingY: 10,
      css: "app_layout",
      rows: [
		  { $subview: Toolbar, name: "header" },
        {
          cols: [
            {
              rows: [{ css: "webix_shadow_medium", rows: [menu] }],
            },
            {
              type: "wide",
              rows: [{ $subview: true }],
            },
          ],
        },
      ],
    };

    return ui;
  }

  init() {
    this.use(plugins.Menu, "top:menu");
  }

  setTitle(title) {
	this.getSubView("header").setTitle(title);
  }
}
