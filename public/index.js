let count=0
const addButton= document.getElementById("addButton")
const currentCountBox= document.getElementById("currentCount")
const audioBar= document.getElementById("audioBar")
const resetButton= document.getElementById("resetTodayButton")
const store= window.localStorage
const d= new Date()
const today= (d.getYear() + 1900) + "-" + (d.getMonth() + 1) + "-" + d.getDate()
let countList= []
initStore(store)
showCount(count)
addButton.addEventListener("click", async () =>{
  increase()
  if (countList.length %10 == 0) await audioBar.play()
  showCount()
},false)
resetButton.addEventListener("click", async () =>{
  resetCount()
  showCount()
})
function increase(){
  countList.push(new Date().getTime())
  store.setItem(today, JSON.stringify(countList))
}
function decrease(){
  countList.pop()
  store.setItem(today, JSON.stringify(countList))
}
function resetCount(){
  countList = []
  store.setItem(today, countList)
}
function showCount(){
  currentCountBox.innerHTML=countList.length
}
function initStore(s){
  if (s.getItem(today) !== null && s.getItem(today) !== ''){
    countList= JSON.parse(s.getItem(today))
  }else{
    s.setItem(today, JSON.stringify(countList))
  }
}