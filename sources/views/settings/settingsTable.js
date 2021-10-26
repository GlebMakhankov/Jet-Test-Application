import { JetView } from "webix-jet";

export default class SettingsTable extends JetView {
  constructor(app, name, collection) {
    super(app, name);
    this._collection = collection;
  }

  config() {
    const _ = this.app.getService("locale")._;
    return {
      rows: [
        {
          view: "datatable",
          minWidth: 200,
          localId: "table",
          select: "row",
          scrollX: false,
          columns: [
            {
              id: "Value",
              header: _("Value"),
              sort: "text",
              width: 120,
              fillspace: true,
            },
            {
              id: "Icon",
              header: _("Icon"),
              width: 200,
              fillspace: true,
              sort: "text",
            },
            {
              header: "",
              template: "<span class='mdi mdi-delete delete'></span>",
              width: 50,
            },
          ],
          on: {
            onAfterSelect: (id) => this.form.setValues(this.table.getItem(id)),
          },
          onClick: {
            delete: (e, id) => {
              webix
                .confirm({
                  title: _("Delete activity?"),
                  text: _("Are you sure about that? This is cannot be undone!"),
                })
                .then(() => {
                  this._collection.remove(id);
                  this.clearAll();
                });
              return false;
            },
          },
        },
        {
          view: "form",
          localId: "form",

          rules: {
            Value: webix.rules.isNotEmpty,
          },
          elements: [
            {
              view: "text",
              placeholder: _("Type of activity"),
              name: "Value",
              invalidMessage: "Type of activity is required!",
            },
            {
              view: "text",
              placeholder: _("Icon name"),
              name: "Icon",
            },
            {
              cols: [
                {
                  view: "button",
						inputWidth: 200,
                  align: "right",
                  value: _("Clear"),
                  click: () => this.clearAll(),
					},
					{
						view: "button",
						width: 200,
                  align: "right",
                  value: _("Save"),
                  css: "webix_primary",
                  click: () => {
                    if (!this.form.validate()) return;
                    this.saveEntry();
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }

  init() {
    this.table = this.$$("table");
    this.form = this.$$("form");
    this.table.sync(this._collection);
  }

  saveEntry() {
    const entry = this.form.getValues();
    entry.value = entry.Value;
    if (!entry.id) {
      this._collection.add(entry);
    } else {
      this._collection.updateItem(entry.id, entry);
    }
    this.clearAll();
  }

  clearAll() {
    this.form.clear();
    this.form.clearValidation();
  }
}
