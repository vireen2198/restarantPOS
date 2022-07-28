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

const searchInput = getEl("#search-product-input");

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

const redirectPage = (route) => {
  return (window.location.href = `${url}/${route}`);
};
const getProducts = async () => {
  try {
    const { data } = await axios.post(
      `/products/getProducts?sort=productCategory`,
      {},
      { headers }
    );
    return displayMenu(data.products);
  } catch (error) {
    console.log(error);
    // localStorage.removeItem("user");
    // return redirectPage("login.html")
  }
};

getProducts();
const displayMenu = (
  array,
  message = "you do not have any items listed yet"
) => {
  const menuParent = getEl(".menu-container-parent");
  const pagesNumberDisplay = getEl(".number-of-page-current-page");
  const nextBtn = getEl(".next-Btn");
  const prevBtn = getEl(".back-Btn");
  const paginationButtonSelect = getEl("#pagination-button-select");
  let currentPage = 1;
  let numberInAPage = Number(paginationButtonSelect.value);
  let numberOfPages = Math.ceil(array.length / numberInAPage);
  const displayNoItems = (message) => {
    menuParent.innerHTML = "";
    const div = createEl("div");
    div.classList.add("menu-no-item-container");
    const p = createEl("p");
    p.classList.add("no-items-message");
    p.textContent = message;
    div.appendChild(p);
    menuParent.appendChild(div);
    pagesNumberDisplay.textContent = "1/1";
  };
  const displayControlledProducts = (array) => {
    let start = (currentPage - 1) * numberInAPage;
    let end = start + numberInAPage;

    let listPage = array.slice(start, end);
    menuParent.innerHTML = "";
    if (array.length) {
      listPage.map((product) => {
        const { productPrice } = product;

        const div = createEl("div");
        div.classList.add("menu-item-container");

        div.innerHTML = `
                        
                        <img src=${
                          product.productImageAddress
                        } alt="menu items" srcset="">
                        <p class="menu-item-name">${product.productName}</p>
                        <p class="menu-item-name">RM ${Number(
                          product.productPrice
                        ).toFixed(2)}</p>
        
                    `;
        if (product.productSize) {
          const menuItemName = getEl(".menu-item-name", div);
          menuItemName.textContent = `${product.productName} (${product.productSize})`;
        }
        menuParent.appendChild(div);
      });
      pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
    } else {
      return displayNoItems(message);
    }
  };
  displayControlledProducts(array);

  const changePage = (operator, array) => {
    switch (operator) {
      case "+":
        if (currentPage < numberOfPages) {
          currentPage++;
          pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
          displayControlledProducts(array);
          break;
        }
        currentPage = numberOfPages;
        pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
        displayControlledProducts(array);
        break;

      case "-":
        if (currentPage > 1) {
          currentPage--;

          pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
          displayControlledProducts(array);
          break;
        }
        currentPage = 1;
        pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
        displayControlledProducts(array);
        break;
    }
  };
  nextBtn.addEventListener("click", () => {
    return changePage("+", array);
  });
  prevBtn.addEventListener("click", () => {
    return changePage("-", array);
  });

  paginationButtonSelect.addEventListener("change", () => {
    numberInAPage = Number(paginationButtonSelect.value);
    numberOfPages = Math.ceil(array.length / numberInAPage);
    pagesNumberDisplay.textContent = `${currentPage}/${numberOfPages}`;
    return displayControlledProducts(array);
  });
};

const searchProducts = async (value) => {
  try {
    const { data } = await axios.post(
      `/products/getProducts?sort=productCategory`,
      {},
      { headers }
    );
    const filteredItems = data.products.filter((item) => {
      return item.productName.toLowerCase().includes(value.toLowerCase());
    });

    return displayMenu(filteredItems, "no matching items found");
  } catch (error) {
    console.log(error);
  }
};

//event listener
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
});

searchInput.addEventListener("search", () => {
  return searchProducts(searchInput.value);
});
