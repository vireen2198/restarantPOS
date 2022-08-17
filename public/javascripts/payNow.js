const getEl = (elName, parent = document) => {
  return parent.querySelector(elName);
};
const getAllEl = (elName, parent = document) => {
  return parent.querySelectorAll(elName);
};
const createEl = (elName) => {
  return document.createElement(elName);
};
//variables
const url = `http://localhost:8080`;
const logOutBtn = getEl(".log-out-button");
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
const backToTableBtn = getEl("#add-new-product-btn");
const payNowBtn = getEl("#confirm-pay-now");
//token//headers
const token = localStorage.getItem("user");
const tableNumber = window.location.search.split("=")[1];
const printReceiptWrapper = getEl(".print-receipt-wrapper");
const closeReceiptWrapper = getEl(".x-button");
const withReceiptBtn = getEl(".with-receipt-btn");
const withoutReceiptBtn = getEl(".without-receipt-btn");
if (!token || !tableNumber) {
  localStorage.removeItem("user");
  window.location.href = `${url}/login.html`;
}
const headers = {
  Authorization: `Bearer ${token}`,
};

//fn
const displayDateTimeDay = () => {
  const dateTimeParent = getEl(".date-time-text");

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
const displayReceiptHeader = (obj) => {
  const businessNameText = getEl(".shop-name");
  const addressLine1Text = getEl(".address-line-1");
  const addressLine2Text = getEl(".balance-address");
  const phoneNumberText = getEl(".shop-number");
  const serverNameText = getEl(".server-name");
  const taxesText = getEl(".shop-taxes");
  const serviceChargesText = getEl(".shop-service-charges");
  const dateText = getEl(".current-date");
  businessNameText.textContent = obj.companyName;
  addressLine1Text.textContent = `${obj.address.addressLine1},`;
  if (obj.address.addressLine2) {
    addressLine2Text.textContent = `${obj.address.addressLine2},${obj.address.county},${obj.address.state},${obj.address.country}.`;
  }
  if (!obj.address.addressLine2) {
    addressLine2Text.textContent = `${obj.address.county},${obj.address.state},${obj.address.country}.`;
  }
  const mobileNumberFirst = obj.mobileNumber.split("").splice(0, 3).join("");
  phoneNumberText.textContent = `tel : ${mobileNumberFirst}-${obj.mobileNumber
    .split("")
    .splice(3)
    .join("")}`;
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  dateText.textContent = `date: ${day} ${monthArray[month]} ${year}`;
  serverNameText.textContent = obj.username;
  taxesText.textContent = `${Number(obj.tax)}%`;
  serviceChargesText.textContent = `${Number(obj.serviceCharges)}%`;
};
const displayTableTotalBill = (array) => {
  const { tableBill, tableOrder, totalToPay } = array;
  const tableParent = getEl(".bill-products-table");
  tableParent.innerHTML = "";
  const headerTr = createEl("tr");
  headerTr.innerHTML = `
        <th>product</th>
        <th>quantity</th>
        <th>price (RM)</th>
        <th>total (RM)</th>
    `;
  tableParent.appendChild(headerTr);
  if (!tableOrder.length) return;
  tableOrder.map((item) => {
    const ordersTr = createEl("tr");
    const { productName, productQuantity, productPrice, currentProductTotal } =
      item;
    ordersTr.innerHTML = `
            <td>${productName}</td>
            <td>${productQuantity}</td>
            <td>${Number(productPrice).toFixed(2)}</td>
            <td>${Number(currentProductTotal).toFixed(2)}</td>
        `;
    tableParent.appendChild(ordersTr);
  });
  const subTotalParent = getEl(".table-sub-total");

  const totalParent = getEl(".table-total-amount");
  subTotalParent.textContent = `rm ${Number(tableBill).toFixed(2)}`;
  totalParent.textContent = `rm ${Number(totalToPay).toFixed(2)}`;
};
const printDocument = () => {
  printReceiptWrapper.classList.remove("show-print-receipt-wrapper");
  document.body.style.visibility = "hidden";
  payNowBtn.style.visibility = "hidden";
  const bill = getEl(".bill-container");
  bill.style.visibility = "visible";
  bill.style.position = "absolute";
  bill.style.top = "0vw";
  bill.style.left = "0vw";
  bill.style.width = "40vw";
  window.print();
};
//fetch user/ table from db
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/users/getUser", { headers });
    const greetingText = getEl(".greeting-admin");
    greetingText.textContent = `welcome ${data.user.username}`;
    return displayReceiptHeader(data.user);
  } catch (error) {
    // return loadPageError();
    console.log(error);
  }
};
const fetchTable = async () => {
  try {
    const { data } = await axios.get(
      `tables/tableCurrentOrder/${tableNumber}`,
      { headers }
    );
    return displayTableTotalBill(data.orders);
  } catch (error) {
    console.log(error);
  }
};
const confirmPaidTable = async () => {
  try {
    const data = await axios.post(
      `/transactions/addPreviousTransactions/${tableNumber}`,
      {},
      { headers }
    );
    return redirectPage("cashier.html");
  } catch (error) {
    alert(error.response);
  }
};

setInterval(displayDateTimeDay, 1000);
fetchUser();
fetchTable();

//event listener
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
});
backToTableBtn.addEventListener("click", () => {
  return redirectPage(`single-table-order.html?tableNumber=${tableNumber}`);
});
payNowBtn.addEventListener("click", () => {
  const totalParent = getEl(".table-total-amount");
  if (totalParent.textContent.split(" ")[1] === "0.00") return;
  printReceiptWrapper.classList.add("show-print-receipt-wrapper");
});
closeReceiptWrapper.addEventListener("click", () => {
  printReceiptWrapper.classList.remove("show-print-receipt-wrapper");
});

withReceiptBtn.addEventListener("click", () => {
  printDocument();
  return confirmPaidTable();
});
withoutReceiptBtn.addEventListener("click", () => {
  printReceiptWrapper.classList.remove("show-print-receipt-wrapper");
  return confirmPaidTable();
});
