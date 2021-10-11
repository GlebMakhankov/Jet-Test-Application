import { JetView } from "webix-jet";

export default class Activities_Header extends JetView {
  config() {
    return {
      view: "toolbar",
      elements: [
        {},
        {
          view: "button",
          label: "Add activity",
          width: 150,
          type: "icon",
          icon: "mdi mdi-plus-circle",
          click: () => this.getParentView().window.showWindow(),
        },
      ],
    };
  }
}
