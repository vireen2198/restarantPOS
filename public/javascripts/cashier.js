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
const tables=[
    {
        tableNumber:1,
        tableStatus:"ordered",
        tableBill:24.99
    },
    {
        tableNumber:2,
        tableStatus:"ordered",
        tableBill:100.00
    },
    {
        tableNumber:3,
        tableStatus:"ordered",
        tableBill:0.30
    },
    {
        tableNumber:4,
        tableStatus:"vacant",
        tableBill:0.00
    },
    {
        tableNumber:5,
        tableStatus:"ordered",
        tableBill:24.99
    },
    {
        tableNumber:6,
        tableStatus:"ordered",
        tableBill:100.00
    },
    {
        tableNumber:7,
        tableStatus:"ordered",
        tableBill:0.30
    },
    {
        tableNumber:8,
        tableStatus:"vacant",
        tableBill:0.00
    },
]
const fetchTables=async()=>{
    try {
        const {data}=await axios.get("/tables/getTables");
        return data.tables
    } catch (error) {
        console.log(error)
    }
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
const displayTables=async()=>{
    const tablesParent=getEl(".tables-display-wrapper");
    const tables = await fetchTables();
    if(!tables.length)return 

    tables.map((table=>{
        const div=createEl("div");
        div.classList.add("table-container")
        div.innerHTML= `
        <img src="./images/Table-Top-PNG-Image.png" alt="table" srcset="">
        <div class="table-number-wrapper">
          <span class="current-bill">RM ${table.tableBill.toFixed(2)}</span>
          <span class="table-number">${table.tableNumber}</span>
        </div>
        `
        if(table.tableStatus==="vacant"){
            div.classList.add("table--not-occupied");
            const tableBill=getEl(".current-bill",div);
            tableBill.textContent="VACANT";
            tableBill.classList.add("table--not-occupied")
        }
        div.addEventListener("click",()=>{
            return redirectPage(`single-table-order.html?tableNumber=${table.tableNumber}`)
        })
        tablesParent.appendChild(div);
    }))
}
displayTables(tables)
const redirectPage=(route)=>{
    return window.location.href=`${url}/${route}`
}


//event listener
logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    return redirectPage("login.html")
})