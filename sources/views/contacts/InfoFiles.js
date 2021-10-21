import {JetView} from "webix-jet";

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
							fillspace: true
						},
						{
							id: "changeDate",
							header: "Change Date",
							sort: "date",
							width: 120,
							format: webix.Date.dateToStr("%d %F %Y")
						},
						{
							id: "size",
							header: "Size",
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
									title: "Delete file?",
									text: "Are you sure about that? This is cannot be undone!"
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
							value: "Upload file",
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
