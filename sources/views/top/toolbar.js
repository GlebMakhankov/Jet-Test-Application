import { JetView } from "webix-jet";

export default class Toolbar extends JetView {
  config() {
    return {
      view: "toolbar",
      elements: [
        {
          view: "label",
          label: "My App",
          maxWidth: 250,
          align: "right",
          localId: "pageTitle",
        },
      ],
    };
  }

  init(view) {
    this.setTitle("APP");
  }

  setTitle(title) {
    this.$$("pageTitle").setValue(title);
  }
}
