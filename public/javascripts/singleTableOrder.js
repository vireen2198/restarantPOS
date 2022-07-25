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
const logOutBtn=getEl(".log-out-button");

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
setInterval(displayDateTimeDay, 1000);

const redirectPage=(route)=>{
    return window.location.href=`${url}/${route}`
}


//event listener
logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    return redirectPage("login.html")
})