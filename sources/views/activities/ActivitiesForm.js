import { JetView } from "webix-jet";
import Storage from "../../models/Storage";

export default class ActivitiesForm extends JetView {
  config() {
    return {
      view: "form",
      localId: "ActivitiesForm",
      rules: {
        TypeID: webix.rules.isNotEmpty,
        ContactID: webix.rules.isNotEmpty,
      },
      elements: [
        {
          view: "textarea",
          id: "DetailsTextarea",
          name: "Details",
          label: "Details",
          width: 650,
          height: 100,
        },
        {
          view: "richselect",
          id: "richSelectActivitiesTypes",
          name: "TypeID",
          label: "Type",
          options: Storage.activityTypes,
        },
        {
          view: "richselect",
          id: "richSelectContacts",
          name: "ContactID",
          label: "Contact",
          options: Storage.contacts,
        },
        {
          cols: [
            {
              view: "datepicker",
              label: "Date",
              name: "Date",
              width: 300,
            },
            {
              view: "datepicker",
              label: "Time",
              name: "Time",
              type: "time",
              width: 300,
            },
          ],
        },
        {
          view: "checkbox",
          id: "stateCheckbox",
          name: "State",
          labelRight: "Completed",
          labelWidth: 0,
          checkValue: "Open",
          uncheckValue: "Close",
        },
        {
          cols: [
            {},
            {
              view: "button",
              value: "Save",
              localId: "saveBtn",
              width: 130,
              align: "center",
              css: "webix_primary",
              click: () => this.saveEntry(),
            },
            {
              view: "button",
              value: "Cancel",
              width: 130,
              align: "center",
              click: () => this.hideWindow(),
            },
          ],
        },
      ],
    };
  }

  setDataToForm(data) {
    this.$$("saveBtn").setValue("Save");
    if (data.DueDate) {
      const dateAndTime = this.strToDate(data.DueDate);
      data.Date = dateAndTime;
      data.Time = dateAndTime;
    }
    this.$$("ActivitiesForm").setValues(data);
  }

  saveEntry() {
    const form = this.$$("ActivitiesForm");
    if (!form.validate()) return;
    const entry = form.getValues();
    entry.DueDate = this.dateToStr(entry);
    Storage.activities.exists(entry.id)
      ? Storage.activities.updateItem(entry.id, entry)
      : Storage.activities.add(entry);
    this.hideWindow();
  }

  hideWindow() {
    this.getParentView().hideWindow();
    this.clearAll();
    this.$$("saveBtn").setValue("Add");
  }

  clearAll() {
    const form = this.$$("ActivitiesForm");
    form.clear();
    form.clearValidation();
  }

  dateToStr(entry) {
    const formatDate = webix.Date.dateToStr("%Y-%m-%d");
    const formatTime = webix.Date.dateToStr("%H:%i");
    const stringDate = formatDate(
      entry.Date ?? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );
    const stringTime = entry.Time ? formatTime(entry.Time) : "00:00";
    return `${stringDate} ${stringTime}`;
  }

  strToDate(str) {
    const parser = webix.Date.strToDate("%Y.%m.%d %H:%i");
    const date = parser(str);
    return date;
  }
}
