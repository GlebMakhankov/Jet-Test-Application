import { JetView } from "webix-jet";
import Activities_Form from "./Activities_Form";

export default class Activities_Window extends JetView {
  config() {
    return {
      view: "window",
      localId: "Activities_Window",
      height: 500,
      width: 650,
      position: "center",
      head: "Add activity",
      body: { $subview: Activities_Form, name: "form" },
    };
  }

  showWindow() {
    this.getRoot().show();
  }

  hideWindow() {
    this.getRoot().hide();
    this.changeHead();
  }

  setDataToForm(data) {
    this.getSubView("form").setDataToForm(data);
    this.changeHead("Edit");
    this.showWindow();
  }

  changeHead(title = "Add") {
    this.$$("Activities_Window").getHead().setHTML(`${title} activity`);
  }
}
