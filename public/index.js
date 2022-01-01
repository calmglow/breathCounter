let count=0
const addButton= document.getElementById("addButton")
const currentCountBox= document.getElementById("currentCount")
const audioBar= document.getElementById("audioBar")
const resetButton= document.getElementById("resetTodayButton")
showCount(count)
addButton.addEventListener("click", async () =>{
  count= increase(count)
  if (count%10 == 0) await audioBar.play()
  showCount(count)
},false)
resetButton.addEventListener("click", async () =>{
  setCount(0)
  showCount(count)
})
function increase(c){
  return ++c
}
function setCount(c){
  count=c
}
function showCount(c){
  currentCountBox.innerHTML=c
}