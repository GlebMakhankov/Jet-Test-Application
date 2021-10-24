import { JetView } from "webix-jet";

import activities from "../../models/activities";
import activityTypes from "../../models/activityTypes";
import ActivitiesWindow from "../activities/ActivitiesWindow";

export default class InfoActivities extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    return {
      rows: [
        {
          view: "datatable",
          minWidth: 700,
          localId: "contactActivitiesTable",
          select: "row",
          columns: [
            {
              id: "State",
              header: "",
              width: 30,
              sort: "text",
              css: "rank",
              template: "{common.checkbox()}",
              checkValue: "Open",
              uncheckValue: "Close",
            },
            {
              id: "TypeID",
              header: [{ content: "selectFilter" }],
              options: activityTypes,
              sort: "text",
              width: 120,
            },
            {
              id: "date",
              header: [{ content: "datepickerFilter" }],
              width: 200,
              sort: "date",
              format: webix.Date.dateToStr("%d %F %Y"),
            },
            {
              id: "Details",
              header: [{ content: "textFilter" }],
              width: 120,
              fillspace: true,
              sort: "text",
            },
            {
              header: "",
              template:
                "<span class='mdi mdi-square-edit-outline editActivity'></span>",
              width: 50,
            },
            {
              header: "",
              template: "<span class='mdi mdi-delete deleteActivity'></span>",
              width: 50,
            },
          ],
          onClick: {
            editActivity: (e, id) => {
              const entry = this.table.getItem(id);
              this.window.showWindow(entry);
              return false;
            },
            deleteActivity: (e, id) => {
              webix
                .confirm({
                  title: _("Delete activity?"),
                  text: _("Are you sure about that? This is cannot be undone!"),
                })
                .then(() => {
                  activities.remove(id);
                });
              return false;
            },
          },
        },
        {
          view: "toolbar",
          elements: [
            {},
            {
              view: "button",
              label: _("Add activity"),
              width: 150,
              type: "icon",
              icon: "mdi mdi-plus-circle",
              click: () =>
                this.window.showWindow({
                  ContactID: this.id,
                  readonly: true,
                }),
            },
          ],
        },
      ],
    };
  }

  init() {
    this.window = this.ui(ActivitiesWindow);
    this.table = this.$$("contactActivitiesTable");
    this.on(activities.data, "onStoreUpdated", () => {
      this.processDataForTable();
    });
  }

  urlChange() {
    this.processDataForTable();
  }

  processDataForTable() {
    this.id = this.getParam("id", true);
    this.table.clearAll();
    this.table.parse(
      activities.data.find((obj) => +obj.ContactID === +this.id)
    );
    this.table.filterByAll();
  }
}
