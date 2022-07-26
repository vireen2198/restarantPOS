
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
const addNewProductsPage = getEl("#add-new-product-btn");
const searchInput = getEl("#search-products-box");
const searchBox = getEl(".search-btn-parent");
const logOutBtn=getEl(".log-out-button")
//token//headers
const token=localStorage.getItem("user");
if(!token){
    localStorage.removeItem("user")
    window.location.href=`${url}/login.html`
}
const headers={
    Authorization:`Bearer ${token}`
}
//fn
const displayDateTimeDay = () => {
    const dateTimeParent = getEl(".date-time-text")
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const a = new Date();
    const day = a.getDay();
    const month = a.getMonth();
    const year = a.getFullYear();
    const date = a.getDate();
    const time = a.getTime();
    let morningEvening = undefined;
    const hours = a.getHours();
    if (hours <= 12) {
        morningEvening = "a.m."
    } else {
        morningEvening = "p.m."
    }
    dateTimeParent.textContent = `${dayArray[day]}, ${date} ${monthArray[month]} ${year}, ${a.toString().split(" ")[4]} ${morningEvening}`
}

setInterval(displayDateTimeDay, 1000)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const displayLoader = async () => {
    const loaderParent = getEl(".loading-img-div");
    loaderParent.classList.add("show-loader");
    await delay(1000);
    loaderParent.classList.remove("show-loader");

}
const redirectPage=(route)=>{
    return window.location.href=`${url}/${route}`
}
const getProducts = async (value) => {
    try {

        const sortBy = getEl("#sort-by-products");
        if (value) {
            const { data } = await axios.post(`/products/searchProducts?sort=${sortBy.value}`, { productName: value },{headers});
            return data
        }
        const { data } = await axios.post(`/products/getProducts`,{},{headers})
        return data
    } catch (error) {
        localStorage.removeItem("user");
        return redirectPage("login.html")
    }
}
const displayAllProducts = async (value) => {
    try {
        await displayLoader()
        const { products } = await getProducts(value);
        const allProductsParent = getEl(".all-products-wrapper");
        const deleteUnwantedProducts = getAllEl(".single-product-container");
        if (deleteUnwantedProducts.length) {
            deleteUnwantedProducts.forEach((unwanted) => {
                allProductsParent.removeChild(unwanted)
            })
        }
        if (!products.length && value) return displayNoProducts(hasValue = true)
        if (!products.length) return displayNoProducts()
        products.map((product, i) => {
            const noContentWrapper = getEl(".no-content-parent");
            if (noContentWrapper) {
                const contentWrapper = getEl(".content-wrapper");
                contentWrapper.removeChild(noContentWrapper)
            }
            const { productImageAddress, productPrice, productName, _id ,productSize} = product;
            const div = createEl("div");
            div.classList.add("single-product-container");
            
            div.innerHTML = `
            <img src="${productImageAddress}" alt="" class="products-img">
            <div class="edit-delete-wrapper">
                <ion-icon name="create" class="edit" id="edit-btn"></ion-icon>
                <ion-icon name="trash" class="delete" id="delete-btn"></ion-icon>
            </div>
            <div class="item-desc-wrapper">
                <p class="item-name">${productName}</p>
                <p class="item-price">rm ${Number(productPrice).toFixed(2)}</p>
            </div>
            `
           
            const deleteBtn = getEl("#delete-btn", div);
            const editBtn = getEl("#edit-btn", div);
            const itemName=getEl(".item-name",div);
            if(productSize){
                itemName.textContent = `${productName} (${productSize})`
            }
            deleteBtn.addEventListener("click", () => deleteProduct(_id));
            editBtn.addEventListener("click", () => editProduct(_id))
            allProductsParent.appendChild(div);

        })

    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (_id) => {
    try {

        const { data } = await axios.post("/products/deleteProducts", { _id });
        displayAllProducts()

    } catch (error) {
        console.log(error)
    }
}
const editProduct = (id) => {
    return window.location.href = `${url}/add-edit-products.html?_id=${id}`
}

const displayNoProducts = (hasValue = false) => {
    const div = createEl("div");
    div.classList.add("no-content-parent")
    if (hasValue) {
        div.innerHTML = `
        <p>you dont have matching items related to your search...</p>
        `
    } else {
        div.innerHTML = `
        <p>you dont have any items listed yet ...</p>
        `
    }
    const contentWrapper = getEl(".content-wrapper");
    const noContentParent = getAllEl(".no-content-parent");
    if (noContentParent.length) {
        noContentParent.forEach(parent => {
            contentWrapper.removeChild(parent)
        })
    }
    contentWrapper.appendChild(div)
}

displayAllProducts()

//event listener
addNewProductsPage.addEventListener("click", () => {
    return redirectPage("add-edit-products.html")
})
searchBox.addEventListener("click", () => {
    const checkInput = searchInput.reportValidity();
    if (!checkInput) return
    return displayAllProducts(searchInput.value)
})
logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    return redirectPage("login.html")
})