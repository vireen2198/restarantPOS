

const getEl = (elName, parent = document) => {
  return parent.querySelector(elName);
};
const getAllEl = (elName, parent = document) => {
  return [...parent.querySelectorAll(elName)];
};
const createEl = (elName) => {
  return document.createElement(elName);
};
//variables
const url = `http://localhost:8080`;
const logOutBtn = getEl(".log-out-button");
const submitBtn = getEl("#submit-new-worker");
const xContainer = getEl(".x-container");
const serverMsgText = getEl(".server-msg-text");
const serverMsgParent = getEl(".server-msg");
const backToSettings = getEl("#go-to-products-page");
//token//headers
const token = localStorage.getItem("user");
if (!token) {
  localStorage.removeItem("user");
  window.location.href = `${url}/login.html`;
}
const headers = {
  Authorization: `Bearer ${token}`,
};
// class
class NewWorker {
  constructor(username, email, isAdmin, password) {
    this.username = username;
    this.email = email;
    this.isAdmin = isAdmin;
    this.password = password;
  }
}
//fn
const displayDateTimeDay = () => {
  const dateTimeParent = getEl(".date-time-text");
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const a = new Date();
  const day = a.getDay();
  const month = a.getMonth();
  const year = a.getFullYear();
  const date = a.getDate();
  const time = a.getTime();
  let morningEvening = undefined;
  const hours = a.getHours();
  if (hours <= 12) {
    morningEvening = "a.m.";
  } else {
    morningEvening = "p.m.";
  }
  dateTimeParent.textContent = `${dayArray[day]}, ${date} ${
    monthArray[month]
  } ${year}, ${a.toString().split(" ")[4]} ${morningEvening}`;
};
const redirectPage = (route) => {
  return (window.location.href = `${url}/${route}`);
};
const loadPageError = () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
};
const displayServerMessage = (
  message = "error! changes made could not be made"
) => {
  serverMsgParent.classList.add("show-server-err-msg");
  serverMsgText.textContent = message;
};
//server fn
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/users/getUser", { headers });
    const greetingText = getEl(".greeting-admin");
    greetingText.textContent = `welcome ${data.user.username}`;
  } catch (error) {
    return loadPageError();
  }
};
const sendWorkerToServer = async () => {
  try {
    const usernameInput = getEl("#username-input");
    const passwordInput = getEl("#password-input");
    const emailInput = getEl("#email-input");
    const isAdminEl = [...document.getElementsByName("is-admin")];
    const isAdmin = isAdminEl.find((el) => el.checked === true);
    const worker = new NewWorker(
      usernameInput.value,
      emailInput.value,
      isAdmin.value,
      passwordInput.value
    );
    const { data } = await axios.post("users/addNewWorker", worker, {
      headers,
    });
    return displayServerMessage(data.message);
  } catch (error) {
    return displayServerMessage(
      error.response.data.message ||
        "something went wrong !!! please try again later"
    );
  }
};
window.addEventListener("load",()=>{
  setInterval(displayDateTimeDay, 1000);
  fetchUser()
})


//event listener
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
});
submitBtn.addEventListener("click", () => {
  const formParent = getEl(".add-new-worker-wrapper");
  let inputs = getAllEl("input", formParent);
  inputs = inputs.splice(0, inputs.length - 1);
  const results = inputs.every((input) => input.reportValidity());
  if (!results) return;
  return sendWorkerToServer();
});
xContainer.addEventListener("click", () => {
  serverMsgParent.classList.remove("show-server-err-msg");
  serverMsgText.textContent = "";
});
backToSettings.addEventListener("click", () => {
  return redirectPage("settings.html");
});
