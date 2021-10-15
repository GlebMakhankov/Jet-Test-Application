import { JetView } from "webix-jet";
import statuses from "../../models/statuses";
import contacts from "../../models/contacts";

export default class Form extends JetView {
  config() {
    return {
      rows: [
        {
          localId: "formTitle",
          template: (obj) => `${obj.title || "Add new"} contact`,
          height: 50,
        },
        {
          view: "form",
          localId: "contactForm",
          rules: {
            FirstName: webix.rules.isNotEmpty,
            LastName: webix.rules.isNotEmpty,
          },
          elements: [
            {
              margin: 50,
              cols: [
                {
                  margin: 40,
                  rows: [
                    {
                      view: "text",
                      label: "First name",
                      name: "FirstName",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Last name",
                      name: "LastName",
                      labelWidth: 120,
                    },
                    {
                      view: "datepicker",
                      label: "Joining date",
                      name: "StartDate",
                      labelWidth: 120,
                    },
                    {
                      view: "richselect",
                      name: "StatusID",
                      label: "Status",
                      options: statuses,
                      invalidMessage: "Contact filed is required!",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Job",
                      name: "Job",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Company",
                      name: "Company",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Website",
                      name: "Website",
                      labelWidth: 120,
                    },
                    {
                      view: "textarea",
                      name: "Address",
                      label: "Address",
                      height: 100,
                      labelWidth: 120,
                    },
                  ],
                },
                {
                  margin: 40,
                  rows: [
                    {
                      view: "text",
                      label: "Email",
                      name: "Email",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Skype",
                      name: "Skype",
                      labelWidth: 120,
                    },
                    {
                      view: "text",
                      label: "Phone",
                      name: "Phone",
                      labelWidth: 120,
                    },
                    {
                      view: "datepicker",
                      label: "Birthday",
                      name: "Birthday",
                      labelWidth: 120,
                    },
                    {
                      margin: 20,
                      cols: [
                        {
                          template: `
										<img src="http://simpleicon.com/wp-content/uploads/user1.svg" />
										`,
                        },
                        {
                          margin: 20,
                          rows: [
                            {},
                            {
                              view: "button",
                              value: "Change photo",
                            },
                            {
                              view: "button",
                              value: "Delete photo",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {},
            {
              margin: 10,
              cols: [
                {},
                {
                  view: "button",
                  value: "Cancel",
                  width: 150,
                  click: () => this.close(),
                },
                {
                  view: "button",
                  localId: "SaveBtn",
                  value: "Add",
                  width: 150,
                  css: "webix_primary",
                  click: () => this.saveContact(),
                },
              ],
            },
          ],
        },
      ],
    };
  }

  init() {
    this.form = this.$$("contactForm");
  }

  urlChange() {
    this.id = this.getParam("id", true);
    if (this.id) {
      this.form.setValues(contacts.getItem(this.id));
      this.$$("formTitle").setValues({ title: "Edit" });
      this.$$("SaveBtn").setValue("Save");
    }
  }

  saveContact() {
    if (!this.form.validate()) return;
    const entry = this.form.getValues();
    if (entry.id) {
      contacts.updateItem(entry.id, entry);
    } else {
      contacts.add(entry);
    }
    this.close();
  }

  close() {
    //  this.app.callEvent("app:action:contacts:closeForm", [this.id]);
    this.clearAll();
    this.app.show("top/contacts/contacts.Info");
    this.$$("SaveBtn").setValue("Add");
  }

  clearAll() {
    this.id = null;
    this.form.clear();
    this.form.clearValidation();
  }
}
