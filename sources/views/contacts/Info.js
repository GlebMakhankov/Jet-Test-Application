import {JetView} from "webix-jet";

import InfoActivities from "./InfoActivities";
import InfoFiles from "./InfoFiles";
import InfoHeader from "./InfoHeader";
import InfoTemplate from "./InfoTemplate";

export default class Info extends JetView {
	config() {
		const multiviewTabbar = {
			view: "tabbar",
			localId: "activitiesAndFilesTabbar",
			multiview: true,
			options: [
				{value: "Activities", id: "activities"},
				{value: "Files", id: "files"}
			]
		};

		const multiview = {
			cells: [
				{id: "activities", cols: [InfoActivities]},
				{id: "files", cols: [InfoFiles]}
			]
		};

		return {
			rows: [InfoHeader, InfoTemplate, multiviewTabbar, multiview]
		};
	}
}
