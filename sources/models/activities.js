const activities = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activities/",
	save: "rest->http://localhost:8096/api/v1/activities/",
	scheme: {
		$change(obj) {
			obj.date = webix.Date.strToDate("%Y.%m.%d %H:%i")(obj.DueDate);
		}
	}
});

export default activities;
