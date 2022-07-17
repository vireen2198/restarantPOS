
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
//fn
const reloadPage=()=>{
    return window.location.href=`${url}/products-page.html`
}
const getProducts=async()=>{
    try {
        const {data}=await axios.post(`/products/getProducts`)
        return data
    } catch (error) {
        return reloadPage()
    }
}
const displayAllProducts=async()=>{
    try {
        const {products}=await getProducts();
        const allProductsParent=getEl(".all-products-wrapper");
        const deleteUnwantedProducts=getAllEl(".single-product-container");
        if(deleteUnwantedProducts.length){
            deleteUnwantedProducts.forEach((unwanted)=>{
                allProductsParent.removeChild(unwanted)
            })
        }
        products.map((product,i)=>{
            const {productImageAddress,productPrice,productName,_id}=product
            const div=createEl("div");
            div.classList.add("single-product-container")
            div.innerHTML=`
            <img src="${productImageAddress}" alt="" class="products-img">
            <div class="edit-delete-wrapper">
                <ion-icon name="create" class="edit"></ion-icon>
                <ion-icon name="trash" class="delete" id="delete-btn"></ion-icon>
            </div>
            <div class="item-desc-wrapper">
                <p class="item-name">${productName}</p>
                <p class="item-price">rm ${productPrice}</p>
            </div>
            `
            const deleteBtn=getEl("#delete-btn",div);
            deleteBtn.addEventListener("click",()=>deleteProduct(_id))
            allProductsParent.appendChild(div);

        })
        
    } catch (error) {
        console.log(error)
    }
}
const deleteProduct=async(_id)=>{
    try {
        
        const {data}=await axios.post("/products/deleteProducts",{_id});
        displayAllProducts()

    } catch (error) {
        console.log(error)
    }
}
displayAllProducts()