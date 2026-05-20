const STORAGE_KEY = "aspireya.enquiryForm.v1";

const locationOptions = {
  cities: [
    "Ahmedabad",
    "Bengaluru",
    "Bhopal",
    "Chandigarh",
    "Chennai",
    "Delhi",
    "Gurugram",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Noida",
    "Pune",
    "Surat"
  ],
  states: [
    "Andhra Pradesh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
    "Other"
  ],
  countries: ["India", "United Arab Emirates", "United States", "United Kingdom", "Singapore", "Other"],
  universities: [
    "Savitribai Phule Pune University",
    "University of Mumbai",
    "Delhi University",
    "Bangalore University",
    "Anna University",
    "Osmania University",
    "Gujarat University",
    "Other"
  ],
  courses: [
    "Engineering",
    "Management",
    "Arts",
    "Commerce",
    "Science",
    "Medical",
    "Computer Applications",
    "Design",
    "Law",
    "Other"
  ]
};

const forms = {
  institute: {
    title: "Institute Enquiry Form",
    sections: [
      {
        id: "basic",
        title: "Institute Basic Details",
        description: "Primary contact and location information",
        fields: [
          text("Institute Name", "instituteName"),
          text("Contact Person Name", "contactPerson"),
          withOther(select("Designation", "designation", ["Principal", "Director", "Coordinator", "Teacher", "HOD", "Administrator", "Other"])),
          email("Official Email ID", "email"),
          phone("Contact Number", "phone"),
          text("City / Location", "city"),
          text("State", "state"),
          text("Country", "country")
        ]
      },
      {
        id: "info",
        title: "Institute Information",
        description: "Academic profile and student coverage",
        fields: [
          withOther(select("Type of Institute", "instituteType", ["School", "Junior College", "Coaching Institute", "Training Institute", "Polytechnic", "Educational Institute", "Other"])),
          multi("Student Education Level", "educationLevel", ["8th-10th", "11th-12th", "Diploma", "Undergraduate", "Postgraduate"]),
          select("Total Number of Students", "studentCount", ["1-100", "101-500", "501-1000", "1000+"]),
          select("Mode Preference", "modePreference", ["Online", "Offline", "Hybrid"])
        ]
      },
      {
        id: "requirement",
        title: "Requirement Details",
        description: "Services, priority, and enquiry details",
        fields: [
          withOther(multi("Requirement Type", "requirementType", ["Career Counselling Program", "Career Guidance Workshop", "Psychometric Assessment", "Parent Counselling", "Student Mentorship", "Faculty Training", "Internship Support", "Placement Support", "Partnership", "Other"])),
          select("Requirement Priority", "priority", ["High", "Medium", "Low"]),
          select("Preferred Timeline", "timeline", ["Immediate", "Within 1 Week", "Within 1 Month", "Flexible"]),
          textarea("Requirement Details / Query", "query")
        ]
      },
      contactSection(true)
    ]
  },
  college: {
    title: "College Enquiry Form",
    sections: [
      {
        id: "details",
        title: "College Details",
        description: "Institution contact information",
        fields: [
          text("College Name", "collegeName"),
          text("Contact Person Name", "contactPerson"),
          withOther(select("Designation", "designation", ["Principal", "Dean", "Placement Officer", "HOD", "Professor", "Coordinator", "Other"])),
          email("Official Email ID", "email"),
          phone("Contact Number", "phone"),
          text("City", "city"),
          text("State", "state"),
          text("Country", "country")
        ]
      },
      {
        id: "info",
        title: "College Information",
        description: "Programs, affiliation, and delivery mode",
        fields: [
          withOther(select("Type of College", "collegeType", ["Engineering", "Management", "Arts", "Commerce", "Medical", "Polytechnic", "University", "Other"])),
          datalist("Affiliated University", "affiliatedUniversity", locationOptions.universities),
          multi("Streams/Courses Offered", "coursesOffered", locationOptions.courses),
          select("Number of Students", "studentCount", ["1-100", "101-500", "501-1000", "1000+"]),
          select("Mode Preference", "modePreference", ["Online", "Offline", "Hybrid"])
        ]
      },
      {
        id: "requirement",
        title: "Requirement Type",
        description: "Select the support needed from Aspireya",
        fields: [
          withOther(multi("Requirement Type", "requirementType", ["Career Counselling Program", "Placement Support", "Internship Program", "Skill Development", "Workshop / Seminar", "Faculty Training", "Collaboration", "Other"])),
          textarea("Requirement Details / Query", "query", false)
        ]
      },
      contactSection(false)
    ]
  },
  corporate: {
    title: "Corporate Enquiry Form",
    sections: [
      {
        id: "company",
        title: "Company Details",
        description: "Business contact and location information",
        fields: [
          text("Company Name", "companyName"),
          text("Contact Person Name", "contactPerson"),
          withOther(select("Designation", "designation", ["HR Manager", "Director", "Founder", "CEO", "Team Lead", "Manager", "Other"])),
          email("Official Business Email", "email"),
          phone("Contact Number", "phone"),
          text("City", "city"),
          text("State", "state"),
          text("Country", "country")
        ]
      },
      {
        id: "info",
        title: "Company Information",
        description: "Industry, team size, and service mode",
        fields: [
          withOther(select("Industry Type", "industryType", ["IT", "Manufacturing", "Healthcare", "Education", "Finance", "Marketing", "Retail", "Consulting", "Startup", "Other"])),
          select("Company Size", "companySize", ["1-10", "11-50", "51-100", "100-500", "500+"]),
          select("Service Mode", "serviceMode", ["Online", "Offline", "Hybrid"])
        ]
      },
      {
        id: "requirement",
        title: "Requirement Details",
        description: "Services, urgency, and enquiry notes",
        fields: [
          withOther(multi("Requirement Type", "requirementType", ["Employee Training", "Career Counselling", "Internship Program", "Recruitment Support", "Workshop", "Skill Development", "Partnership", "Other"])),
          select("Priority Level", "priority", ["High", "Medium", "Low"]),
          textarea("Requirement Details / Query", "query")
        ]
      },
      contactSection(false)
    ]
  }
};

const state = {
  enquiryType: "",
  values: {}
};

const form = document.querySelector("#onboarding-form");
const formMount = document.querySelector("#formMount");
const formActions = document.querySelector(".form-actions");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const draftStatus = document.querySelector("#draftStatus");
const submitButton = document.querySelector("#submitButton");
const resetButton = document.querySelector("#resetButton");
const toast = document.querySelector("#toast");
const successDialog = document.querySelector("#successDialog");
const closeSuccess = document.querySelector("#closeSuccess");

const emailConfig = window.ASPIREYA_CONFIG?.emailjs;
if (emailConfig?.publicKey && window.emailjs) {
  window.emailjs.init({ publicKey: emailConfig.publicKey });
}

function field(label, name, type, options = [], required = true) {
  return { label, name, type, options, required };
}

function text(label, name) {
  return field(label, name, "text");
}

function email(label, name) {
  return field(label, name, "email");
}

function phone(label, name) {
  return field(label, name, "tel");
}

function select(label, name, options) {
  return field(label, name, "select", options);
}

function datalist(label, name, options) {
  return field(label, name, "datalist", options);
}

function multi(label, name, options) {
  return field(label, name, "multi", options);
}

function textarea(label, name, required = true) {
  return field(label, name, "textarea", [], required);
}

function withOther(item) {
  return { ...item, other: true };
}

function contactSection(multiselect) {
  return {
    id: "contact",
    title: "Contact Preferences",
    description: "How and when the team should contact you",
    fields: [
      multiselect
        ? multi("Preferred Contact Method", "contactMethod", ["Call", "WhatsApp", "Email", "Meeting"])
        : select("Preferred Contact Method", "contactMethod", ["Call", "WhatsApp", "Email", "Meeting"]),
      select("Preferred Contact Time", "contactTime", ["Morning", "Afternoon", "Evening"])
    ]
  };
}

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    state.enquiryType = saved.enquiryType || "";
    state.values = saved.values || {};
  } catch {
    state.enquiryType = "";
    state.values = {};
  }
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  draftStatus.textContent = "Draft saved on this device.";
}

function getValue(name) {
  return state.values[state.enquiryType]?.[name] ?? "";
}

function setValue(name, value) {
  if (!state.enquiryType) return;
  state.values[state.enquiryType] = state.values[state.enquiryType] || {};
  state.values[state.enquiryType][name] = value;
  saveDraft();
  updateProgress();
}

function renderSelectedForm() {
  document.querySelectorAll(".type-card").forEach((card) => {
    const input = card.querySelector("input");
    const selected = input.value === state.enquiryType;
    input.checked = selected;
    card.classList.toggle("is-selected", selected);
  });

  if (!state.enquiryType) {
    formMount.innerHTML = '<div class="empty-state">Choose Institute, College, or Corporate to open the right enquiry form.</div>';
    formActions.hidden = true;
    updateProgress();
    return;
  }

  const selectedForm = forms[state.enquiryType];
  formMount.innerHTML = selectedForm.sections.map((section, index) => renderAccordion(section, index)).join("");
  formActions.hidden = false;
  attachFormEvents();
  updateProgress();
}

function renderAccordion(section, index) {
  const openClass = index === 0 ? " is-open" : "";
  return `
    <section class="accordion-section${openClass}" data-section="${section.id}">
      <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
        <span class="accordion-title">
          <span class="accordion-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 4h14v16H5z" />
              <path d="M9 8h6M9 12h6M9 16h4" />
            </svg>
          </span>
          <span>
            <strong>${section.title}</strong>
            <small>${section.description}</small>
          </span>
        </span>
        <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </button>
      <div class="accordion-content">
        <div class="accordion-body">
          <div class="field-grid">
            ${section.fields.map(renderField).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderField(item) {
  const value = getValue(item.name);
  const required = item.required ? '<span class="required">*</span>' : "";
  const errorId = `${state.enquiryType}-${item.name}-error`;
  const inputId = `${state.enquiryType}-${item.name}-input`;
  const listId = `${state.enquiryType}-${item.name}-list`;
  const otherName = `${item.name}Other`;
  const otherValue = getValue(otherName);
  const otherVisible = item.other && hasOtherSelected(value);
  const otherInput = item.other
    ? `
      <input
        class="other-input"
        data-other-input
        type="text"
        name="${otherName}"
        value="${escapeHtml(otherValue)}"
        placeholder="Please specify"
        aria-label="${item.label} other details"
        ${otherVisible ? "" : "hidden"}
      />
    `
    : "";
  let control = "";

  if (item.type === "select") {
    control = `
      <select id="${inputId}" name="${item.name}" ${item.required ? "required" : ""} aria-describedby="${errorId}">
        <option value="">Select option</option>
        ${item.options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
      ${otherInput}
    `;
  } else if (item.type === "datalist") {
    control = `
      <input id="${inputId}" list="${listId}" name="${item.name}" value="${escapeHtml(value)}" ${item.required ? "required" : ""} aria-describedby="${errorId}" autocomplete="off" />
      <datalist id="${listId}">
        ${item.options.map((option) => `<option value="${option}"></option>`).join("")}
      </datalist>
    `;
  } else if (item.type === "multi") {
    const selected = Array.isArray(value) ? value : [];
    const summary = selected.length ? `${selected.length} selected` : "Select options";
    control = `
      <div class="multi-select" data-multi="${item.name}" role="group" aria-describedby="${errorId}">
        <button class="multi-trigger" type="button" aria-expanded="false">
          <span>${summary}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div class="multi-options" hidden>
          ${item.options
            .map(
              (option) => `
                <label class="chip-option ${selected.includes(option) ? "is-checked" : ""}">
                  <input type="checkbox" name="${item.name}" value="${option}" ${selected.includes(option) ? "checked" : ""} />
                  <span>${option}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </div>
      ${otherInput}
    `;
  } else if (item.type === "textarea") {
    control = `<textarea id="${inputId}" name="${item.name}" ${item.required ? "required" : ""} aria-describedby="${errorId}">${escapeHtml(value)}</textarea>`;
  } else {
    control = `<input id="${inputId}" type="${item.type}" name="${item.name}" value="${escapeHtml(value)}" ${item.required ? "required" : ""} aria-describedby="${errorId}" autocomplete="${item.type === "email" ? "email" : "on"}" />`;
  }

  return `
    <div class="field ${item.type === "textarea" ? "full" : ""}" data-field="${item.name}" data-required="${item.required}" data-type="${item.type}" data-other="${Boolean(item.other)}">
      <label ${item.type === "multi" ? "" : `for="${inputId}"`}>${item.label} ${required}</label>
      ${control}
      <span class="error-text" id="${errorId}"></span>
    </div>
  `;
}

function hasOtherSelected(value) {
  return Array.isArray(value) ? value.includes("Other") : value === "Other";
}

function attachFormEvents() {
  formMount.querySelectorAll(".accordion-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".accordion-section");
      const isOpen = section.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  formMount.querySelectorAll(".multi-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const multiSelect = button.closest(".multi-select");
      const options = multiSelect.querySelector(".multi-options");
      const isOpen = !options.hidden;

      closeMultiSelects();
      options.hidden = isOpen;
      multiSelect.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  formMount.querySelectorAll("input, select, textarea").forEach((control) => {
    control.addEventListener("input", () => syncControl(control));
    control.addEventListener("change", () => syncControl(control));
  });
}

function syncControl(control) {
  if (control.matches("[data-other-input]")) {
    setValue(control.name, control.value.trim());
    validateField(control.closest(".field")?.dataset.field, false);
    return;
  }

  if (control.type === "checkbox") {
    const values = [...formMount.querySelectorAll(`input[name="${control.name}"]:checked`)].map((input) => input.value);
    setValue(control.name, values);
    formMount.querySelectorAll(`input[name="${control.name}"]`).forEach((input) => {
      input.closest(".chip-option").classList.toggle("is-checked", input.checked);
    });
    const multiSelect = control.closest(".multi-select");
    const summary = multiSelect.querySelector(".multi-trigger span");
    summary.textContent = values.length ? `${values.length} selected` : "Select options";
    toggleOtherInput(control.name, values);
  } else {
    setValue(control.name, control.value.trim());
    toggleOtherInput(control.name, control.value.trim());
  }
  validateField(control.name, false);
}

function toggleOtherInput(name, value) {
  const fieldEl = formMount.querySelector(`[data-field="${name}"]`);
  const otherInput = fieldEl?.querySelector("[data-other-input]");
  if (!otherInput) return;

  const visible = hasOtherSelected(value);
  otherInput.hidden = !visible;
  if (!visible) {
    setValue(otherInput.name, "");
    otherInput.value = "";
  }
}

function closeMultiSelects() {
  formMount.querySelectorAll(".multi-select").forEach((multiSelect) => {
    multiSelect.classList.remove("is-open");
    multiSelect.querySelector(".multi-options").hidden = true;
    multiSelect.querySelector(".multi-trigger").setAttribute("aria-expanded", "false");
  });
}

function updateProgress() {
  if (!state.enquiryType) {
    progressText.textContent = "0% complete";
    progressBar.style.width = "0%";
    return;
  }

  const allFields = forms[state.enquiryType].sections.flatMap((section) => section.fields).filter((item) => item.required);
  const requiredCount = allFields.reduce((count, item) => count + (item.other && hasOtherSelected(getValue(item.name)) ? 2 : 1), 0);
  const completed = allFields.reduce((count, item) => {
    const value = getValue(item.name);
    const baseComplete = Array.isArray(value) ? value.length > 0 : String(value || "").trim().length > 0;
    const otherComplete = !item.other || !hasOtherSelected(value) || String(getValue(`${item.name}Other`) || "").trim().length > 0;
    return count + (baseComplete ? 1 : 0) + (item.other && hasOtherSelected(value) && otherComplete ? 1 : 0);
  }, 0);
  const percent = Math.round((completed / requiredCount) * 100);
  progressText.textContent = `${percent}% complete`;
  progressBar.style.width = `${percent}%`;
}

function validateField(name, reveal = true) {
  const fieldEl = formMount.querySelector(`[data-field="${name}"]`);
  if (!fieldEl) return true;

  const fieldType = fieldEl.dataset.type;
  const isRequired = fieldEl.dataset.required === "true";
  const value = getValue(name);
  const errorEl = fieldEl.querySelector(".error-text");
  let message = "";

  if (isRequired && (Array.isArray(value) ? value.length === 0 : !String(value || "").trim())) {
    message = "This field is required.";
  } else if (fieldEl.dataset.other === "true" && hasOtherSelected(value) && !String(getValue(`${name}Other`) || "").trim()) {
    message = "Please specify the other option.";
  } else if (fieldType === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Enter a valid official email address.";
  } else if (fieldType === "tel" && value && !/^[+]?[0-9\s()-]{8,18}$/.test(value)) {
    message = "Enter a valid contact number.";
  }

  fieldEl.classList.toggle("has-error", Boolean(message) && reveal);
  const multiEl = fieldEl.querySelector(".multi-select");
  if (multiEl) multiEl.classList.toggle("has-error", Boolean(message) && reveal);
  errorEl.textContent = reveal ? message : "";
  return !message;
}

function validateForm() {
  if (!state.enquiryType) {
    showToast("Please select an enquiry type to continue.");
    return false;
  }

  const fields = forms[state.enquiryType].sections.flatMap((section) => section.fields);
  let valid = true;
  fields.forEach((item) => {
    valid = validateField(item.name, true) && valid;
  });

  if (!valid) {
    formMount.querySelectorAll(".accordion-section").forEach((section) => {
      if (section.querySelector(".has-error")) {
        section.classList.add("is-open");
        section.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "true");
      }
    });

    const firstError = formMount.querySelector(".has-error");
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast("Please fix the highlighted fields.");
  }
  return valid;
}

function buildPayload() {
  return {
    enquiryType: state.enquiryType,
    submittedAt: new Date().toISOString(),
    source: window.location.href,
    data: state.values[state.enquiryType] || {}
  };
}

function syncEmailMetadata(payload) {
  const metadata = {
    enquiryType: payload.enquiryType,
    submittedAt: payload.submittedAt,
    source: payload.source,
    payload: JSON.stringify(payload.data)
  };

  Object.entries(metadata).forEach(([name, value]) => {
    let input = form.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  });
}

async function submitPayload(payload) {
  syncEmailMetadata(payload);

  if (emailConfig?.serviceId && emailConfig?.templateId && window.emailjs) {
    await window.emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form);
    return { ok: true, provider: "emailjs" };
  }

  const endpoint = window.ASPIREYA_CONFIG?.submissionEndpoint || "/api/enquiries";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || "Submission failed. Please try again.");
  }

  return response.json().catch(() => ({}));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3400);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

document.querySelectorAll('input[name="enquiryType"]').forEach((input) => {
  input.addEventListener("change", () => {
    state.enquiryType = input.value;
    state.values[state.enquiryType] = state.values[state.enquiryType] || {};
    saveDraft();
    renderSelectedForm();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  form.classList.add("is-submitting");
  submitButton.disabled = true;

  try {
    await submitPayload(buildPayload());
    localStorage.removeItem(STORAGE_KEY);
    state.values[state.enquiryType] = {};
    successDialog.showModal();
    renderSelectedForm();
  } catch (error) {
    showToast(error.message);
  } finally {
    form.classList.remove("is-submitting");
    submitButton.disabled = false;
  }
});

resetButton.addEventListener("click", () => {
  if (!state.enquiryType) return;
  state.values[state.enquiryType] = {};
  saveDraft();
  renderSelectedForm();
  showToast("The selected form has been reset.");
});

closeSuccess.addEventListener("click", () => {
  successDialog.close();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".multi-select")) {
    closeMultiSelects();
  }
});

loadDraft();
renderSelectedForm();
