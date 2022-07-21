const getElByClass = (elName, parent) => {
    return parent.querySelector(elName)
}
const getElementsByClass = (elName, parent = document) => {
    return parent.querySelectorAll(elName)
}
// const statsUi=[...getElementsByClass(".stats-ui")];
// statsUi.map(el=>{
//     const getRandom255=()=>{return Math.floor(Math.random()*255)+1};
//     const randomColor=`rgb(${getRandom255()},${getRandom255()},${getRandom255()})`;
//     el.style.backgroundColor=randomColor
// })