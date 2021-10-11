import { JetView } from "webix-jet";
import { Storage } from "../../models/Storage";
import Contacts_Template_Toolbar from "./Contacts_Template_Toolbar";
import Contacts_Template_Content from "./Contacts_Template_Content";

export default class ContactsView extends JetView {
  config() {
    const Contacts_List = {
      view: "list",
      localId: "contactsList",
      maxWidth: 300,
      select: true,
      type: {
        height: 60,
      },
      template: (obj) => `
									 <img src="http://simpleicon.com/wp-content/uploads/user1.svg"></img>
									 <div>
										 <div>${obj.FirstName} ${obj.LastName}</div>
										 <span>${obj.Company}</span>
									 </div>
								 `,
      on: {
        onAfterSelect: (id) => this.setContactInfoToTemplate(id),
      },
    };

    const template = {
      rows: [Contacts_Template_Toolbar, Contacts_Template_Content],
    };

    const ui = {
      cols: [Contacts_List, template],
    };
    return ui;
  }

  init() {
    this.$$("contactsList").sync(Storage.contacts);
    Storage.contacts.waitData.then(() => {
      this.initialSelection();
    });
  }

  initialSelection() {
    this.setContactInfoToTemplate(this.$$("contactsList").getFirstId());
  }

  setContactInfoToTemplate(id) {
    const list = this.$$("contactsList");
    const info = list.getItem(id);
    list.select(id);
    this.$$("contactsTemplateUsername").setValues({
      name: info.FirstName,
      surname: info.LastName,
    });
    this.$$("contactTemplate").setValues(info);
  }
}
