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
const redirectPage = (route) => {
  return (window.location.href = `${url}/${route}`);
};
const loadPageError = () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
};
//server fn
const fetchTables = async () => {
  try {
    const { data } = await axios.get("/tables/getTables", { headers });
    return data.tables;
  } catch (error) {
    return loadPageError();
  }
};
const displayTables = async () => {
  const tablesParent = getEl(".tables-display-wrapper");
  let tables = await fetchTables();
  if (!tables.length) return;
  let numberInAPage = 10;
  let numberOfPages = Math.ceil(tables.length / numberInAPage);
  let page=1
  const fwdBtn=getEl(".fwd-btn");
  const backBtn=getEl(".back-btn");
  const searchTableInput=getEl("#search-table-input");
  const tablesSelect=getEl("#sort-tables-select");
  const displayNumberOfPagesCurrentPage=(page)=>{
    const currentPageText=getEl(".current-pagination-page");
    currentPageText.textContent=`page ${page}/${numberOfPages}`
  }
  const pagination=(page)=>{
    let numberInAPage=10;
    let start = (page - 1) * numberInAPage;
    let end = start + numberInAPage;
    let listPage = tables.slice(start, end);
    tablesParent.innerHTML="";
    listPage.map((table) => {
      const div = createEl("div");
      div.classList.add("table-container");
      div.innerHTML = `
          <img src="./images/Table-Top-PNG-Image.png" alt="table" srcset="">
          <div class="table-number-wrapper">
            <span class="current-bill">RM ${table.tableBill.toFixed(2)}</span>
            <span class="table-number">${table.tableNumber}</span>
          </div>
          `;
      if (!table.tableBill) {
        div.classList.add("table--not-occupied");
        const tableBill = getEl(".current-bill", div);
        tableBill.textContent = "VACANT";
        tableBill.classList.add("table--not-occupied");
      }
      div.addEventListener("click", () => {
        return redirectPage(
          `single-table-order.html?tableNumber=${table.tableNumber}`
        );
      });
      tablesParent.appendChild(div);
    });
  }
  const changePage=(operator)=>{
    switch(operator){
      case "+":
        if(page<numberOfPages){
          page++;
          pagination(page);
          displayNumberOfPagesCurrentPage(page);
          break
        }
        break;
      case "-":
        if(page>1){
          page--;
          pagination(page);
          displayNumberOfPagesCurrentPage(page);
          break
        }
        break;

    }
  }
  const modifyContent=()=>{
    page=1;
    numberOfPages=Math.ceil(tables.length / numberInAPage);
    pagination(page)
    displayNumberOfPagesCurrentPage(page)
  }
  const searchTable=async()=>{
    if (!tables.length) return;

    const currentTable=tables.filter(table=>{
      return table.tableNumber===Number(searchTableInput.value)
    });
    if (!currentTable.length){
      tables = await fetchTables();
      return modifyContent()
    }else{
      tables=currentTable
      return modifyContent()
    }
   
  }
  const displaySelectValues=async(value)=>{
    let allTables=await fetchTables();
    var sortTables;
    if(value==="occupied"){
      sortTables=allTables.filter(table=>table.tableBill);
      if(sortTables.length){
        tables=sortTables
      }else{
        tables=allTables
      }
      
      return modifyContent()
    }
    if(value==="vacant"){
      sortTables=allTables.filter(table=>!table.tableBill);
      if(sortTables.length){
        tables=sortTables
      }else{
        tables=allTables
      }
      return modifyContent()
    }
    if(value==="all"){

      tables=allTables
      
      return modifyContent()
    }


  }
  fwdBtn.addEventListener("click",()=>changePage("+"))
  backBtn.addEventListener("click",()=>changePage("-"))
  searchTableInput.addEventListener("search",()=>{
    const check=searchTableInput.reportValidity();
    if(!check)return
    return searchTable()
  })
  tablesSelect.addEventListener("change",()=>displaySelectValues(tablesSelect.value))
  // tablesSelect.addEventListener("click",()=>displaySelectValues(tablesSelect.value))
  pagination(page);
  displayNumberOfPagesCurrentPage(page);

};
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/users/getUser", { headers });
    const greetingText = getEl(".greeting-admin");
    greetingText.textContent = `welcome ${data.user.username}`;
  } catch (error) {
    return loadPageError();
  }
};
window.addEventListener("load",()=>{
  setInterval(displayDateTimeDay, 1000);
  displayTables();
  fetchUser()
})
//event listener
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  return redirectPage("login.html");
});
homeButton.addEventListener("click", (e) => {
  return redirectPage("index.html");
});