const Contacts_Template_Content = {
  localId: "contactTemplate",
  borderless: true,
  scroll: true,
  data: {
    Email: "Email",
    Skype: "Skype",
    Job: "Job",
    Company: "Company",
    Birthday: "Date of Birth",
    Location: "Location",
    Status: "Status",
  },
  css: "contactInfo",
  template: function (obj) {
    return `
			<div class="contactInfoImageBlock">
				<img src="${
          obj.photo
            ? obj.photo
            : "http://simpleicon.com/wp-content/uploads/user1.svg"
        }"
				></img>
				<div>${obj.Status ?? "-"}</div>
			</div>
			<div class="contactInfoTextBlock">
				<ul>
					<li><i class="mdi mdi-email"></i> ${obj.Email || "-"}</li>
					<li><i class="mdi mdi-skype"></i> ${obj.Skype || "-"}</li>
					<li><i class="mdi mdi-tag"></i> ${obj.Job || "-"}</li>
					<li><i class="mdi mdi-briefcase"></i> ${obj.Company || "-"}</li>
					<li><i class="mdi mdi-calendar"></i> ${obj.Birthday || "-"}</li>
					<li><i class="mdi mdi-map-marker"></i> ${obj.Address || "-"}</li>
				</ul>
			</div>
	  `;
  },
};

export default Contacts_Template_Content;
