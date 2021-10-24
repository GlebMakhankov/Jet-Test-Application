import {JetView} from "webix-jet";

import files from "../../models/files";

export default class InfoFiles extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
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
							header: _("Name"),
							sort: "text",
							fillspace: true
						},
						{
							id: "changeDate",
							header: _("Change Date"),
							sort: "date",
							width: 120,
							format: webix.Date.dateToStr("%d %F %Y")
						},
						{
							id: "size",
							header: _("Size"),
							width: 120,
							sort: "int",
							template: obj => obj.sizetext
						},
						{
							header: "",
							template: "<span class='mdi mdi-delete deleteActivity'></span>",
							width: 50
						}
					],
					onClick: {
						deleteActivity: (e, id) => {
							webix
								.confirm({
									title: _("Delete file?"),
									text: _("Are you sure about that? This is cannot be undone!")
								})
								.then(() => {
									files.remove(id);
								});
							return false;
						}
					}
				},
				{
					view: "toolbar",
					elements: [
						{},
						{
							view: "uploader",
							localId: "fileUploader",
							value: _("Upload file"),
							link: "files",
							upload: files,
							autosend: false,
							on: {
								onAfterFileAdd: (obj) => {
									obj.changeDate = new Date();
									obj.ContactID = this.id;
									files.add(obj);
								}
							}
						},
						{}
					]
				}
			]
		};
	}

	init() {
		this.table = this.$$("filesTable");
		this.table.sync(files);
		this.filterDatatable();
		this.on(files.data, "onStoreUpdated", () => {
			this.filterDatatable();
		});
		this.id = this.getParam("id", true);
	}

	filterDatatable() {
		this.id = this.getParam("id", true);
		this.table.filter(obj => +obj.ContactID === +this.id);
	}
}
