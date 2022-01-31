let count=0
const addButton= document.getElementById("addButton")
const currentCountBox= document.getElementById("currentCount")
const audioBar= document.getElementById("audioBar")
const resetButton= document.getElementById("resetTodayButton")
const statButton= document.getElementById("statButton")
const statDiv= document.getElementById("statDiv")
const store= window.localStorage
const today= new Date()
const 지난달= new Date()
지난달.setMonth(지난달.getMonth()-1)
const 지지난달= new Date()
지지난달.setMonth(지지난달.getMonth()-2)
const todayText= (today.getYear() + 1900) + "-" + (today.getMonth() + 1) + "-" + today.getDate()
const 이번달Text= (today.getYear() + 1900) + "-" + (today.getMonth() +1)
const 지난달Text= (지난달.getYear() + 1900) + "-" + (지난달.getMonth() +1)
let countList= []
let 지난달Stat={
  명상한날수:0,
  일별평균숨수:0,
  일별기록:{}
}
let 이번달Stat={
  명상한날수:0,
  일별평균숨수:0,
  일별기록:{}
}
initStore(store)
showCount(count)
이번달정보가져오기()
지난달정보가져오기()
showStat()
function showStat(){
  let statText= `<h2>이번달</h2><p>명상한날수: ${이번달Stat.명상한날수}</p>
  <p>평균숨수: ${이번달Stat.일별평균숨수}</p>
  <h2>지난달</h2><p>명상한날수: ${지난달Stat.명상한날수}</p>
  <p>평균숨수: ${지난달Stat.일별평균숨수}</p>
  <h2>세부기록</h2>
  `
  var tempVar= Object.keys(이번달Stat.일별기록)
  for(i=0;i< tempVar.length;i++){
    var 하루기록= 이번달Stat.일별기록[tempVar[i]]
    statText= statText +`<li>${tempVar[i]}: 숨수: ${하루기록.날숨수}/ 평균숨간격: ${하루기록.일평균숨간격}</li>`
  }
  statDiv.innerHTML=statText
}
addButton.addEventListener("click", async () =>{
  increase()
  if (countList.length %10 == 0) await audioBar.play()
  showCount()
},false)
resetButton.addEventListener("click", async () =>{
  resetCount()
  showCount()
})
statButton.addEventListener("click", () => {
  const modal= document.querySelector(".modal")
  if(modal.style.display === 'block') {
    modal.style.display= 'none'
    document.querySelector("body").style.overflow= 'auto'
  }else {
    modal.style.display = 'block'
    document.querySelector("body").style.overflow= 'hidden'
  }
  console.log(modal.style.display)
},false)
function increase(){
  countList.push(new Date().getTime())
  store.setItem(todayText, JSON.stringify(countList))
}
function 지난달정보가져오기(){
  let keyDate=0;
  let 숨수=0;
  let 날숨수=0;
  let 달숨수=0;
  for (i = 0; i < store.length; i++){
    keyDate= store.key(i)
    if (keyDate.startsWith(지난달Text)){
      지난달Stat.명상한날수++
      const 날숨목록= JSON.parse(store.getItem(keyDate))
      날숨수= 날숨목록.length
      달숨수= 달숨수 + 날숨수
      let 일평균숨간격=0
      for (j=0; j< 날숨수; j++){
        if ((j+1)<날숨수){
          차이= 날숨목록[j+1] - 날숨목록[j]
          if (차이>19000 || 차이<4000)차이=13000
          일평균숨간격 += 차이
        }
      }
      일평균숨간격= 일평균숨간격/(날숨수-1)/1000
      지난달Stat.일별기록[keyDate]= {일평균숨간격, 날숨수}
    }
  }
  지난달Stat.일별평균숨수= 달숨수/지난달Stat.명상한날수
  
}
function 이번달정보가져오기(){
  let keyDate=0;
  let 달숨수=0;
  let 날숨수=0;
  for (i = 0; i < store.length; i++){
    keyDate= store.key(i)
    if (keyDate.startsWith(이번달Text)){
      이번달Stat.명상한날수++
      const 날숨목록= JSON.parse(store.getItem(keyDate))
      날숨수= 날숨목록.length
      달숨수= 달숨수 + 날숨수
      let 일평균숨간격=0
      for (j=0; j< 날숨수; j++){
        if ((j+1)<날숨수){
          차이= 날숨목록[j+1] - 날숨목록[j]
          if (차이>19000 || 차이<4000)차이=13000
          일평균숨간격 += 차이
        }
      }
      일평균숨간격= 일평균숨간격/(날숨수-1)/1000
      이번달Stat.일별기록[keyDate]= {일평균숨간격, 날숨수}
    }
  }
  이번달Stat.일별평균숨수= 달숨수/이번달Stat.명상한날수
}
function decrease(){
  countList.pop()
  store.setItem(todayText, JSON.stringify(countList))
}
function resetCount(){
  countList = []
  store.setItem(todayText, countList)
}
function showCount(){
  currentCountBox.innerHTML=countList.length
}
function initStore(s){
  if (s.getItem(todayText) !== null && s.getItem(todayText) !== ''){
    countList= JSON.parse(s.getItem(todayText))
  }else{
    s.setItem(todayText, JSON.stringify(countList))
  }
}