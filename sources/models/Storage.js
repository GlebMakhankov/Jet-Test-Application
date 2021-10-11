class StorageConstructor {
  constructor() {
    this.contacts = new webix.DataCollection({
      url: "http://localhost:8096/api/v1/contacts/",
      save: "rest->http://localhost:8096/api/v1/contacts/",
      scheme: {
        $init: function (item) {
          item.ContactID = item.id;
          item.value = `${item.FirstName} ${item.LastName}`;
        },
      },
    });
    this.activities = new webix.DataCollection({
      url: "http://localhost:8096/api/v1/activities/",
      save: "rest->http://localhost:8096/api/v1/activities/",
      scheme: {
        $change: function (obj) {
          obj.date = webix.Date.strToDate("%Y.%m.%d %H:%i")(obj.DueDate);
        },
      },
    });
    this.activityTypes = new webix.DataCollection({
      url: "http://localhost:8096/api/v1/activitytypes/",
      save: "rest->http://localhost:8096/api/v1/activitytypes/",
      scheme: {
        $init: function (item) {
          item.TypeID = item.id;
          item.value = item.Value;
        },
      },
    });
    this.statuses = new webix.DataCollection({
      url: "http://localhost:8096/api/v1/statuses/",
      save: "rest->http://localhost:8096/api/v1/statuses/",
    });
  }
}

export const Storage = new StorageConstructor();
