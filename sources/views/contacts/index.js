import { JetView } from "webix-jet";

import List from "./List";
import ContactsInfo from "./Info";
import Form from "./Form";

export default class ContactsView extends JetView {
  config() {
    const ui = {
      cols: [List, { $subview: true }],
    };
    return ui;
  }

  init() {
    this.show("contacts.Info");
    this.on(this.app, "app:action:contacts:showInfo", () => {
      this.show("contacts.Info");
    });
    this.on(this.app, "app:action:contacts:showForm", () => {
      this.show("contacts.Form");
    });
  }

  setContactInfoToTemplate(item) {
    this.app.callEvent("app:action:contacts:setUsername", [
      {
        name: item.FirstName,
        surname: item.LastName,
      },
    ]);
    this.app.callEvent("app:action:contacts:setUserInfo", [item]);
  }
}
