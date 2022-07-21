//
const getEl = (elName, parent = document) => {
    return parent.querySelector(elName);
};
const getAllEl = (elName, parent = document) => {
    return[ ...parent.querySelectorAll(elName)];
};
const createEl = (elName) => {
    return document.createElement(elName);
};
//variables
const formParent=getEl("form");
const inputs=getAllEl("input",formParent).splice(0,2);
const submitBtn=getAllEl("input",formParent).pop();
const cross=getEl(".cross");
const serverMsgParent=getEl(".server-message-parent");
const serverText=getEl(".server-text");
//class
class Login{
    constructor(username,password){
        this.username=username;
        this.password=password
    }
}
//fn
const submitToServer=async(data)=>{
    try {
        // const {data}=await axios.post("",data);
    } catch (error) {
        console.log(error.response)
    }
}
const displayServerMessage=(message="something went wrong!!! please try again")=>{
    
    serverMsgParent.classList.add("show-server-error");
    
    serverText.textContent=message
}
const checkValidity=(inputs)=>{
    const isValid=inputs.every(input=>input.reportValidity())
    if(!isValid)return;
    return submitToServer(new Login(inputs[0].value,inputs[1].value))
}
const serverMsg=()=>{

}
//event listener
submitBtn.addEventListener("click",()=>{
    
    return checkValidity(inputs)
})
cross.addEventListener("click",()=>{
    serverMsgParent.classList.remove("show-server-error");
    serverText.textContent="";
    const passwordInput=inputs[1];
    passwordInput.value=""
})