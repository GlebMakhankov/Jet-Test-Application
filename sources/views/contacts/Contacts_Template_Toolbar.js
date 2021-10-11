const Contacts_Template_Toolbar = {
  view: "toolbar",
  elements: [
    {
      localId: "contactsTemplateUsername",
      template: (obj) =>
        `${obj.name ?? "Firstname"} ${obj.surname ?? "Lastname"}`,
      inputWidth: 100,
      borderless: true,
      css: "contactsTemplateUsername",
    },
    {
      view: "button",
      label: "Delete",
      width: 100,
      align: "right",
      type: "icon",
      icon: "mdi mdi-delete",
      click: () => webix.message("Click!"),
    },
    {
      view: "button",
      label: "Edit",
      width: 100,
      align: "right",
      type: "icon",
      icon: "mdi mdi-square-edit-outline",
      click: () => webix.message("Click!"),
    },
  ],
};

export default Contacts_Template_Toolbar;
