import { JetView } from "webix-jet";

import activities from "../../models/activities";
import contacts from "../../models/contacts";

export default class InfoHeader extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    return {
      view: "toolbar",
      elements: [
        {
          localId: "contactsTemplateUsername",
          template: (obj) =>
            `${obj.FirstName || "Firstname"} ${obj.LastName || "Lastname"}`,
          inputWidth: 100,
          borderless: true,
          css: "contactsTemplateUsername",
        },
        {
          view: "button",
          label: _("Delete"),
          width: 150,
          align: "right",
          type: "icon",
          icon: "mdi mdi-delete",
          click: () => this.deleteContact(),
        },
        {
          view: "button",
          label: _("Edit"),
          width: 150,
          align: "right",
          type: "icon",
          icon: "mdi mdi-square-edit-outline",
          click: () => this.app.callEvent("app:action:contacts:showForm"),
        },
      ],
    };
  }

  urlChange() {
    this.id = this.getParam("id", true);
    this.$$("contactsTemplateUsername").setValues(contacts.getItem(this.id));
  }

  deleteContact() {
	const _ = this.app.getService("locale")._;
    webix
      .confirm({
        title: _("Delete contact?"),
        text: _("This is cannot be undone! All information, activities and files associated with this contact will be deleted."),
      })
      .then(() => {
        contacts.remove(this.id);
        activities.data.each((item) => {
          if (+item.ContactID === +this.id) activities.remove(item.id);
        });
        this.app.callEvent("app:action:contacts:showInfo");
      });
  }
}
