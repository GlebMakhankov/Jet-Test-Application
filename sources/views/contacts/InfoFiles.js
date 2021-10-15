import { JetView } from "webix-jet";
import files from "../../models/files";

export default class InfoFiles extends JetView {
  config() {
    return {
      rows: [
        {
          view: "datatable",
          minWidth: 700,
          localId: "filesTable",
          select: "row",
          columns: [
            {
              id: "name",
              header: "Name",
              sort: "text",
              fillspace: true,
            },
            {
              id: "changeDate",
              header: "Change Date",
              sort: "date",
              width: 120,
              format: webix.Date.dateToStr("%d %F %Y"),
            },
            {
              id: "sizetext",
              header: "Size",
              width: 120,
              sort: "text",
            },
            {
              header: "",
              template: "<span class='mdi mdi-delete deleteActivity'></span>",
              width: 50,
            },
          ],
          onClick: {
            deleteActivity: (e, id) => {
              webix
                .confirm({
                  title: "Delete file?",
                  text: "Are you sure about that? This is cannot be undone!",
                })
                .then(() => {
                  files.remove(id);
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
              view: "uploader",
              localId: "fileUploader",
              value: "Upload file",
              link: "files",
              upload: files,
              autosend: false,
              on: {
                onAfterFileAdd: (obj) => {
                  obj.changeDate = new Date();
                  obj.ContactID = this.ContactID;
                  files.add(obj);
                },
              },
            },
            {},
          ],
        },
      ],
    };
  }

  init() {
    this.table = this.$$("filesTable");
    this.table.sync(files);
    this.on(this.app, "app:action:contacts:setUserInfo", (info) => {
      this.ContactID = info.ContactID;
      this.filterDatatable(this.table, this.ContactID);
    });
  }

  filterDatatable(view, id) {
	view.filter((obj) => obj.ContactID === id);
 }
}
