const url = `http://localhost:8080`;
// const getProducts=async()=>{
//     try {
//         const {data}=await axios.post(`/products/getProducts`)
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// getProducts()
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
const productImageCover = getEl(".input-file-cover");
const submitBtn = getEl("#submit-product");

//fn

const getImage= (element)=>{
    return new Promise((resolve,reject)=>{
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result)
            
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    })
}
const serverMsg=(message,stat=true)=>{
    const serverText=getEl(".server-msg");
    serverText.textContent=message;
    serverText.classList.add("opacity");
    if(!stat) serverText.classList.add("server-err-msg");
    setTimeout(()=>{
        serverText.classList.remove("opacity");
        serverText.classList.remove("server-err-msg");
    },3000)
}  
const sendToServer = async () => {
    try {
      const image64Str=await getImage(productImageInput)
      
      const newObj = new Product(
        productNameInput.value,
        productPriceInput.value,
        productDescInput.value,
        image64Str
      );
      
      const { data } = await axios.post("/products/addProducts", newObj);
      const {message}=data;
      return serverMsg(message)
      
    } catch (error) {
        const {message}=error.response.data
       if(message)return serverMsg(message,false)
    }
  };
class Product {
  constructor(productName, productPrice, productDescription,productImageAddress) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productImageAddress=productImageAddress
  }
}

//event listeners
submitBtn.addEventListener("click",()=>{
    const allInputs=[productImageInput,productNameInput,productPriceInput,productDescInput];
    const validity=allInputs.every(input=>input.reportValidity());
    if(!validity)return
    sendToServer()

});
productImageInput.addEventListener("change",async () => {
    try {
        const data=await getImage(productImageInput);
       productImageCover.style.backgroundImage=`url(${data})`;

    } catch (error) {
        console.log(error.response.data)
    }
});
productDescInput.addEventListener("keyup",()=>{
    const charactersRemainingText=getEl(".characters-remaining")
    const charactersLength=300
    charactersRemainingText.textContent=`${charactersLength-productDescInput.value.length} characters remaining`
})
