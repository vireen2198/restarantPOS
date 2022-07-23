const url = `http://localhost:8080`;
const getEl = (elName, parent = document) => {
  return parent.querySelector(elName);
};
const getAllEl = (elName, parent = document) => {
  return parent.querySelectorAll(elName);
};
//variables
const productNameInput = getEl("#product-name-input");
const productPriceInput = getEl("#product-price-input");
const productDescInput = getEl("#product-desc-input");
const productImageInput = getEl("#product-image-input");
const productImageCover = getEl(".product-img-input-display");
const productCategoryInput = getEl("#product-category-input");
const submitBtn = getEl("#submit-product");
const backToProductsPage = getEl("#go-to-products-page");
const toUpdateId = window.location.search.split("=")[1];
const noImgCover = getEl(".add-image-text-container");
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
setInterval(displayDateTimeDay, 1000);
const getImage = (element) => {
  return new Promise((resolve, reject) => {
    let file = element.files[0];

    let reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
const serverMsg = (message, stat = true) => {
  const serverText = getEl(".server-msg");
  serverText.textContent = message;
  serverText.classList.add("opacity");
  if (!stat) serverText.classList.add("server-err-msg");
  setTimeout(() => {
    serverText.classList.remove("opacity");
    serverText.classList.remove("server-err-msg");
  }, 3000);
};
const sendToServer = async () => {
  try {
    const checkImageFile = productImageInput.files[0];
    let image64Str = undefined;
    const newObj = new Product(
      productNameInput.value,
      productPriceInput.value,
      productDescInput.value,
      "",
      productCategoryInput.value
    );
    if (toUpdateId && checkImageFile) {
      image64Str = await getImage(productImageInput);
      newObj.productImageAddress = image64Str;
    }
    if (!toUpdateId) {
      image64Str = await getImage(productImageInput);
      newObj.productImageAddress = image64Str;
    }
    if (toUpdateId && !checkImageFile) {
      newObj.productImageAddress = productImageCover.getAttribute("src");
    }

    if (!toUpdateId) {
      const { data } = await axios.post("/products/addProducts", newObj, {
        headers,
      });
      const { message } = data;
      return serverMsg(message);
    } else {
      const { data } = await axios.post(
        "/products/editProducts",
        { _id: toUpdateId, ...newObj },
        { headers }
      );
      const { message } = data;
      return serverMsg(message);
    }
  } catch (error) {
    const { message } = error.response.data;
    if (message) return serverMsg(message, false);
    return serverMsg("something went wrong!!! please try again later", false);
  }
};
const displayEditExistingProducts = (object) => {
  const {
    productImageAddress,
    productName,
    productPrice,
    productDescription,
    productCategory,
  } = object;
  productImageCover.setAttribute("src", productImageAddress);
  productNameInput.value = productName;
  productPriceInput.value = Number(productPrice);
  productDescInput.value = productDescription;
  productCategoryInput.value = productCategory;
};
const displayExistingProduct = async (_id) => {
  try {
    const { data } = await axios.post(
      "/products/getProduct",
      { _id },
      { headers }
    );
    return displayEditExistingProducts(data.product[0]);
  } catch (error) {
    console.log(error.response);
  }
};
if (toUpdateId) {
  displayExistingProduct(toUpdateId);

  noImgCover.classList.add("remove-white-bg");
}
class Product {
  constructor(
    productName,
    productPrice,
    productDescription,
    productImageAddress,
    productCategory
  ) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productImageAddress = productImageAddress;
    this.productCategory = productCategory;
  }
}

//event listeners
submitBtn.addEventListener("click", () => {
  if (!toUpdateId) {
    const allInputs = [
      productImageInput,
      productNameInput,
      productPriceInput,
      productDescInput,
      productCategoryInput,
    ];
    const validity = allInputs.every((input) => input.reportValidity());
    if (!validity) return;
    return sendToServer();
  }
  const allInputs = [
    productNameInput,
    productPriceInput,
    productDescInput,
    productCategoryInput,
  ];
  const validity = allInputs.every((input) => input.reportValidity());
  if (!validity) return;
  return sendToServer();
});
productImageInput.addEventListener("change", async () => {
  try {
    const data = await getImage(productImageInput);
    productImageCover.setAttribute("src", data);

    noImgCover.classList.add("remove-white-bg");
  } catch (error) {
    console.log(error);
  }
});
productDescInput.addEventListener("keyup", () => {
  const charactersRemainingText = getEl(".characters-remaining");
  const charactersLength = 300;
  charactersRemainingText.textContent = `${
    charactersLength - productDescInput.value.length
  } characters remaining`;
});
backToProductsPage.addEventListener("click", () => {
  return (window.location.href = `${url}/products-page.html`);
});
