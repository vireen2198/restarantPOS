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
const nextPageBtn = getAllEl(".next-page-btn");
const backPageBtn = getAllEl(".back-page-link");
const stateSelect = getEl("#state-select");
const countySelect = getEl("#county-select");
const formParents = getAllEl("form");
const submitBtn = getAllEl(".submit-next-page-btn");
const businessNameInput = getEl("#business-name-input");
const businessAddressLine1Input = getEl("#address-line-1-input");
const businessAddressLine2Input = getEl("#address-line-2-input");
const businessAddressPostCodeInput = getEl("#address-postcode-input");
const businessAddressCountryInput = getEl("#country-select");
const businessServiceChargesInput = getEl("#business-service-charges-input");
const businessTaxInput = getEl("#business-tax-input");
const businessContactDetailsInput = getEl("#business-contact-input");
const businessEmailDetailsInput = getEl("#business-email-input");
const usernameInput = getEl("#username-input");
const emailAddressInput = getEl("#email-address-input");
const userMobileNumberInput = getEl("#user-mobile-number-input");
const xContainer = getEl(".x-container");
const serverMsgText = getEl(".server-msg-text");
const serverMsgParent = getEl(".server-msg");
const verifyBtn = getEl(".verify-phone-input");
const TacWrapper = getEl(".TAC-wrapper");
const closeTacWrapperBtn = getEl(".close-TAC-container");
const resendTACCode = getEl(".resend-TAC-code");
var TACInterval;
const TACTimer = getEl(".time-left");
const numberDisplays = getAllEl(".digits");
const homeButton = getEl("#go-to-products-page");
//token//headers
const token = localStorage.getItem("user");
if (!token) {
  localStorage.removeItem("user");
  window.location.href = `${url}/login.html`;
}
const headers = {
  Authorization: `Bearer ${token}`,
};

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
const changeForm = (i) => {
  const hrLine = getAllEl(".current-page-active-wrapper hr");

  const currentPageActive = getAllEl(".current-page-active-container");
  formParents.map((el) => {
    el.classList.remove("current-active-form-showing");
  });
  currentPageActive.map((el) => {
    el.classList.remove("current-page-is-active");
  });
  hrLine.map((el) => {
    el.classList.remove("current-line-active");
  });
  formParents[i].classList.add("current-active-form-showing");
  for (let index = 0; index <= i; index++) {
    currentPageActive[index].classList.add("current-page-is-active");
  }
  if (i == 1) {
    hrLine[0].classList.add("current-line-active");
  }
  if (i == 2) {
    hrLine.map((line) => {
      line.classList.add("current-line-active");
    });
  }
};
const redirectPage = (route) => {
  return (window.location.href = `${url}/${route}`);
};
const loadPageError = () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
};
const displaySelect = (stateValue = "", countyValue = "") => {
  const malaysiaStatesCities = [
    {
      stateName: "Johor",
      countyNames: [
        "Johor Bahru",
        "Tebrau",
        "Pasir Gudang",
        "Bukit Indah",
        "Skudai",
        "Kluang",
        "Batu Pahat",
        "Muar",
        "Ulu Tiram",
        "Senai",
        "Segamat",
        "Kulai",
        "Kota Tinggi",
        "Pontian Kechil",
        "Tangkak",
        "Bukit Bakri",
        "Yong Peng",
        "Pekan Nenas",
        "Labis",
        "Mersing",
        "Simpang Renggam",
        "Parit Raja",
        "Kelapa Sawit",
        "Buloh Kasap",
        "Chaah",
      ],
    },
    {
      stateName: "Kedah",
      countyNames: [
        "Sungai Petani",
        "Alor Setar",
        "Kulim",
        "Jitra / Kubang Pasu",
        "Baling",
        "Pendang",
        "Langkawi",
        "Yan",
        "Sik",
        "Kuala Nerang",
        "Pokok Sena",
        "Bandar Baharu",
      ],
    },
    {
      stateName: "Kelantan",
      countyNames: [
        "Kota Bharu",
        "Pangkal Kalong",
        "Tanah Merah",
        "Peringat",
        "Wakaf Baru",
        "Kadok",
        "Pasir Mas",
        "Gua Musang",
        "Kuala Krai",
        "Tumpat",
      ],
    },
    {
      stateName: "Melaka",
      countyNames: [
        "Bandaraya Melaka",
        "Bukit Baru",
        "Ayer Keroh",
        "Klebang",
        "Masjid Tanah",
        "Sungai Udang",
        "Batu Berendam",
        "Alor Gajah",
        "Bukit Rambai",
        "Ayer Molek",
        "Bemban",
        "Kuala Sungai Baru",
        "Pulau Sebang",
        "Jasin",
      ],
    },
    {
      stateName: "Negeri Sembilan",
      countyNames: [
        "Seremban",
        "Port Dickson",
        "Nilai",
        "Bahau",
        "Tampin",
        "Kuala Pilah",
      ],
    },
    {
      stateName: "Pahang",
      countyNames: [
        "Kuantan",
        "Temerloh",
        "Bentong",
        "Mentakab",
        "Raub",
        "Jerantut",
        "Pekan",
        "Kuala Lipis",
        "Bandar Jengka",
        "Bukit Tinggi",
      ],
    },
    {
      stateName: "Perak",
      countyNames: [
        "Ipoh",
        "Taiping",
        "Sitiawan",
        "Simpang Empat",
        "Teluk Intan",
        "Batu Gajah",
        "Lumut",
        "Kampung Koh",
        "Kuala Kangsar",
        "Sungai Siput Utara",
        "Tapah",
        "Bidor",
        "Parit Buntar",
        "Ayer Tawar",
        "Bagan Serai",
        "Tanjung Malim",
        "Lawan Kuda Baharu",
        "Pantai Remis",
        "Kampar",
      ],
    },
    {
      stateName: "Perlis",
      countyNames: ["Kangar", "Kuala Perlis"],
    },
    {
      stateName: "Pulau Pinang",
      countyNames: [
        "Bukit Mertajam",
        "Georgetown",
        "Sungai Ara",
        "Gelugor",
        "Ayer Itam",
        "Butterworth",
        "Perai",
        "Nibong Tebal",
        "Permatang Kucing",
        "Tanjung Tokong",
        "Kepala Batas",
        "Tanjung Bungah",
        "Juru",
      ],
    },
    {
      stateName: "Sabah",
      countyNames: [
        "Kota Kinabalu",
        "Sandakan",
        "Tawau",
        "Lahad Datu",
        "Keningau",
        "Putatan",
        "Donggongon",
        "Semporna",
        "Kudat",
        "Kunak",
        "Papar",
        "Ranau",
        "Beaufort",
        "Kinarut",
        "Kota Belud",
      ],
    },
    {
      stateName: "Sarawak",
      countyNames: [
        "Kuching",
        "Miri",
        "Sibu",
        "Bintulu",
        "Limbang",
        "Sarikei",
        "Sri Aman",
        "Kapit",
        "Batu Delapan Bazaar",
        "Kota Samarahan",
      ],
    },
    {
      stateName: "Selangor",
      countyNames: [
        "Subang Jaya",
        "Klang",
        "Ampang Jaya",
        "Shah Alam",
        "Petaling Jaya",
        "Cheras",
        "Kajang",
        "Selayang Baru",
        "Rawang",
        "Taman Greenwood",
        "Semenyih",
        "Banting",
        "Balakong",
        "Gombak Setia",
        "Kuala Selangor",
        "Serendah",
        "Bukit Beruntung",
        "Pengkalan Kundang",
        "Jenjarom",
        "Sungai Besar",
        "Batu Arang",
        "Tanjung Sepat",
        "Kuang",
        "Kuala Kubu Baharu",
        "Batang Berjuntai",
        "Bandar Baru Salak Tinggi",
        "Sekinchan",
        "Sabak",
        "Tanjung Karang",
        "Beranang",
        "Sungai Pelek",
      ],
    },
    {
      stateName: "Terengganu",
      countyNames: [
        "Kuala Terengganu",
        "Chukai",
        "Dungun",
        "Kerteh",
        "Kuala Berang",
        "Marang",
        "Paka",
        "Jerteh",
      ],
    },
    {
      stateName: "Wilayah Persekutuan",
      countyNames: ["Kuala Lumpur", "Labuan", "Putrajaya"],
    },
  ];
  const states = malaysiaStatesCities.map((item) =>
    item.stateName.toLowerCase()
  );
  states.map((item) => {
    const option = createEl("option");
    option.textContent = item;
    option.value = item;
    stateSelect.appendChild(option);
    if (stateValue && stateValue.toLowerCase() === item.toLowerCase()) {
      option.selected = true;
    }
  });

  const chosenCounties = malaysiaStatesCities.find((item) => {
    return item.stateName.toLowerCase() === stateSelect.value.toLowerCase();
  });

  if (chosenCounties) {
    countySelect.innerHTML = "";
    chosenCounties.countyNames.map((item) => {
      const option = createEl("option");
      option.textContent = item;
      option.value = item;
      countySelect.appendChild(option);
      if (countyValue && countyValue.toLowerCase() === item.toLowerCase()) {
        option.selected = true;
      }
    });
  }
};
const displayExistingUserInput = (obj) => {
  businessNameInput.value = obj.companyName;
  businessAddressLine1Input.value = obj.address.addressLine1;
  businessAddressLine2Input.value = obj.address.addressLine2;
  businessAddressPostCodeInput.value = obj.address.postCode;
  // businessAddressCountryInput.value=obj.address.country;
  displaySelect(obj.address.state, obj.address.county);
  businessServiceChargesInput.value = obj.serviceCharges;
  businessTaxInput.value = obj.tax;
  businessContactDetailsInput.value = obj.mobileNumber;
  usernameInput.value = obj.username;
  emailAddressInput.value = obj.email;
  userMobileNumberInput.value = obj.userMobileNumber;
  businessEmailDetailsInput.value = obj.businessEmail;
};
const deleteWorker = async (id) => {
  try {
    const { data } = await axios.delete(`/users/settings/deleteWorker/${id}`, {
      headers,
    });
    await fetchAllUser();
    return displayServerMessage(data.message);
  } catch (error) {
    return displayServerMessage(error.response.data.message);
  }
};
const displayExistingUsers = (array) => {
  if (!array.length || !array) return;
  const parentEl = formParents[2];
  const toDelete = getAllEl(".current-worker-container", parentEl);

  if (toDelete.length) {
    toDelete.map((el) => parentEl.removeChild(el));
  }
  array.map((worker) => {
    const div = createEl("div");
    div.classList.add("current-worker-container");
    div.innerHTML = `
        
        <p class="worker-name">${worker.username}<span class="worker-is-admin">(admin)</span></p>
        <div class="edit-delete-container">
            <ion-icon name="trash" class="trash"></ion-icon>
        </div>
        `;
    const trashBtn = getEl(".trash", div);
    trashBtn.addEventListener("click", () => {
      return deleteWorker(worker._id);
    });
    parentEl.insertBefore(div, getEl(".question-input-wrapper", parentEl));
  });
};
const displayServerMessage = (
  message = "error! changes made could not be saved"
) => {
  const currentWindowHeight = window.innerHeight;
  const currentWindowWidth = window.innerWidth;
  serverMsgParent.classList.add("show-server-err-msg");
  serverMsgText.textContent = message;
};
const displayTACWrapper = () => {
  TacWrapper.classList.add("TAC-wrapper-is-showing");
  const verifyBtn = getEl(".confirm-TAC");

  let startingMinutes = 10;
  let time = startingMinutes * 60;

  let codeArray = [];
  const updateCountDown = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (time <= 1) {
      time = 1;
      // const
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    time--;

    TACTimer.textContent = `${minutes}:${seconds}`;
  };
  const displayCode = () => {
    for (let i = 0; i < codeArray.length; i++) {
      numberDisplays[i].textContent = codeArray[i];
    }
    const toMakeEmpty = numberDisplays.slice(codeArray.length);
    toMakeEmpty.map((el) => (el.textContent = "_"));
  };
  if (TACInterval !== undefined) {
    clearInterval(TACInterval);
    TACInterval = setInterval(updateCountDown, 1000);
  } else {
    TACInterval = setInterval(updateCountDown, 1000);
  }
  window.addEventListener("keyup", (e) => {
    const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const checkWithNumbersArray = numberArray.some(
      (number) => number === e.key
    );
    if (checkWithNumbersArray && codeArray.length < 6) {
      codeArray.push(e.key);
      return displayCode();
    }
    if (e.key.toLowerCase() === "backspace" && codeArray.length) {
      codeArray.pop();
      return displayCode();
    }
  });
  verifyBtn.addEventListener("click", async () => {
    if (time <= 1 || codeArray.length < 6) return;
    try {
      const { data } = await axios.post(
        "/users/verifyUserPhoneNumber",
        {
          phoneNumber: `+6${userMobileNumberInput.value}`,
          code: codeArray.join(""),
        },
        { headers }
      );
      TACTimer.textContent = "10:00";
      codeArray = [];
      numberDisplays.map((el) => (el.textContent = "_"));
      clearInterval(TACTimer);
      time = startingMinutes * 60;
      TacWrapper.classList.remove("TAC-wrapper-is-showing");
      return displayServerMessage(data.message);
    } catch (error) {
      codeArray = [];
      displayCode();
      displayServerMessage(error.response.data.message);
    }
  });
};

//server fn
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/users/getUser", { headers });
    const greetingText = getEl(".greeting-admin");
    greetingText.textContent = `welcome ${data.user.username}`;
    return displayExistingUserInput(data.user);
  } catch (error) {
    return loadPageError();
  }
};
const fetchAllUser = async () => {
  try {
    const { data } = await axios.get("/users/getAllUser", { headers });
    return displayExistingUsers(data.users);
  } catch (error) {
    console.log(error);
  }
};
const routeToSendToServer = async (object) => {
  try {
    const { data } = await axios.post("/users/settings", object, { headers });

    displayServerMessage(data.message);
  } catch (error) {
    console.log(error);
  }
};
const submitDataToServer = (index) => {
  const inputs = getAllEl("input", formParents[index]);
  const selects = getAllEl("select", formParents[index]);

  var allInputs;
  if (index === 0) {
    allInputs = [...inputs, ...selects];
    const results = allInputs.every((el) => el.reportValidity());
    if (!results) return;
  }
  if (index === 1) {
    const phoneInputIndex = inputs.findIndex(
      (el) => el.getAttribute("id") === "user-mobile-number-input"
    );
    inputs.splice(phoneInputIndex, 1);
    allInputs = [...inputs, ...selects];
    const results = allInputs.every((el) => el.reportValidity());
    if (!results) return;
    console.log(results);
  }

  switch (index) {
    case 0:
      const business = new Business(
        businessNameInput.value,
        businessAddressLine1Input.value,
        businessAddressLine2Input.value,
        businessAddressPostCodeInput.value,
        stateSelect.value,
        countySelect.value,
        businessTaxInput.value,
        businessServiceChargesInput.value,
        businessContactDetailsInput.value,
        businessEmailDetailsInput.value
      );
      routeToSendToServer({ business });
      break;
    case 1:
      const user = new User(
        usernameInput.value,
        emailAddressInput.value,
        userMobileNumberInput.value
      );
      routeToSendToServer({ user });
      break;
    case 2:
      redirectPage("add-new-user.html");
      break;
  }
};
const sendNumberToServer = async (phoneNumber) => {
  try {
    const { data } = await axios.post(
      "users/userPhoneNumber",
      { phoneNumber: `+6${phoneNumber}` },
      { headers }
    );
    displayTACWrapper();
  } catch (error) {
    return displayServerMessage(error.response.data.message);
  }
};

fetchAllUser();
setInterval(displayDateTimeDay, 1000);
fetchUser();

//classes
class Business {
  constructor(
    companyName,
    addressLine1,
    addressLine2,
    postCode,
    state,
    county,
    tax,
    serviceCharges,
    mobileNumber,
    businessEmail
  ) {
    this.companyName = companyName;
    this.tax = tax;
    this.serviceCharges = serviceCharges;
    this.mobileNumber = mobileNumber;
    this.businessEmail = businessEmail;
    this.address = {
      addressLine1,
      addressLine2,
      postCode,
      state,
      county,
    };
  }
}
class User {
  constructor(username, email, userMobileNumber) {
    this.username = username;
    this.email = email;
    this.userMobileNumber = userMobileNumber;
  }
}

//event listeners
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
});

nextPageBtn.map((btn, i) => {
  btn.addEventListener("click", () => {
    return changeForm(i + 1);
  });
});
backPageBtn.map((btn, i) => {
  btn.addEventListener("click", () => {
    return changeForm(i);
  });
});
stateSelect.addEventListener("change", () => displaySelect());
submitBtn.map((btn, i) => {
  btn.addEventListener("click", () => submitDataToServer(i));
});
xContainer.addEventListener("click", () => {
  serverMsgParent.classList.remove("show-server-err-msg");
  serverMsgText.textContent = "";
});
verifyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const checkInput = userMobileNumberInput.reportValidity();
  if (!checkInput) return;
  return sendNumberToServer(userMobileNumberInput.value);
});
closeTacWrapperBtn.addEventListener("click", () => {
  TACTimer.textContent = "10:00";
  numberDisplays.map((el) => (el.textContent = "_"));
  TacWrapper.classList.remove("TAC-wrapper-is-showing");
});
resendTACCode.addEventListener("click", (e) => {
  e.preventDefault();
  return sendNumberToServer(userMobileNumberInput.value);
});
homeButton.addEventListener("click", (e) => {
  return redirectPage("index.html");
});
