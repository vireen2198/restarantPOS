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
const tableNumber = window.location.search.split("=")[1];
const tableNumberParent = getEl(".table-number-header");
const backBtn = getEl("#add-new-product-btn");
const payNowBtn = getEl("#pay-now-btn");
tableNumberParent.textContent = `table number ${tableNumber}`;

//token//headers
const token = localStorage.getItem("user");
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
const loadPageError = () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
};
//shop menu
const getProducts = async () => {
  try {
    const { data } = await axios.post(
      `/products/getMenuProducts?sort=productCategory`,
      {},
      { headers }
    );
    return displayMenu(data.products);
  } catch (error) {
    return loadPageError();
  }
};
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
        div.addEventListener("click", () => {
          return addNewProductToCurrentOrder(product._id, tableNumber);
        });
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
      `/products/getMenuProducts?sort=productCategory`,
      {},
      { headers }
    );
    const filteredItems = data.products.filter((item) => {
      return item.productName.toLowerCase().includes(value.toLowerCase());
    });

    return displayMenu(filteredItems, "no matching items found");
  } catch (error) {
    return loadPageError();
  }
};
getProducts();
//table current order
const getTableCurrentOrder = async () => {
  try {
    const { data } = await axios.get(
      `/tables/tableCurrentOrder/${tableNumber}`,
      { headers }
    );
    const currentBillParent = getEl(".current-table-total");

    currentBillParent.textContent = `RM ${Number(data.orders.tableBill).toFixed(
      2
    )}`;
    return displayTableCurrentOrder(data.orders.tableOrder || []);
  } catch (error) {
    console.log(error);
  }
};
getTableCurrentOrder();
const displayTableCurrentOrder = (array) => {
  const tableParent = document.querySelector(".current-order-container");
  const tr = createEl("tr");
  tableParent.innerHTML = "";
  tr.innerHTML = `
    <th></th>
    <th>item name</th>
    <th>quantity</th>
    <th>item total</th>
    <th>remove</th>
  `;
  tableParent.appendChild(tr);
  if (!array.length) return;
  array.map((prop) => {
    const tr = createEl("tr");
    tr.classList.add("current-order");
    const {
      productName,
      productImageAddress,
      productQuantity,
      currentProductTotal,
      productId,
    } = prop;
    tr.innerHTML = `
      <td>
        <img
          src="${productImageAddress}"
          alt=""
          srcset=""
        />
      </td>
      <td>${productName}</td>
      <td>
        <div class="modify-quantity">
          <ion-icon name="remove-circle" class="minus"></ion-icon>
          <span class="quantity">${productQuantity}</span>
          <ion-icon name="add-circle" class="add"></ion-icon>
        </div>
      </td>
      <td class="current-table-price-table">rm ${currentProductTotal.toFixed(
        2
      )}</td>
      <td><ion-icon name="trash" class="trash"></ion-icon></td>
    `;
    const addBtn = getEl(".add", tr);
    const minusBtn = getEl(".minus", tr);
    const deleteBtn = getEl(".trash", tr);
    addBtn.addEventListener("click", () => {
      return modifyQuantity("+", productId, tableNumber);
    });
    minusBtn.addEventListener("click", () => {
      return modifyQuantity("-", productId, tableNumber);
    });
    deleteBtn.addEventListener("click", () => {
      return deleteItem(productId, tableNumber);
    });
    tableParent.appendChild(tr);
  });
};
const modifyQuantity = async (operator, productId, tableNumber) => {
  try {
    await axios.post(
      "/tables/modifyTableCurrentOrderItemQuantity",
      {
        operator,
        productId,
        tableNumber,
      },
      { headers }
    );
    return getTableCurrentOrder();
  } catch (error) {
    console.log(error);
  }
};
const deleteItem = async (productId, tableNumber) => {
  try {
    await axios.post(
      "/tables/deleteSingleOrder",
      { productId, tableNumber },
      { headers }
    );
    return getTableCurrentOrder();
  } catch (error) {
    console.log(error);
  }
};
const addNewProductToCurrentOrder = async (productId, tableNumber) => {
  try {
    await axios.post(
      "/tables/addTableCurrentOrder",
      {
        productId,
        tableNumber,
      },
      { headers }
    );
    return getTableCurrentOrder();
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
backBtn.addEventListener("click", () => {
  return redirectPage("cashier.html");
});
payNowBtn.addEventListener("click", () => {
  return redirectPage(`pay-now.html?tableNumber=${tableNumber}`);
});
