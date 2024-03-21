const ui = {
  input: document.getElementById('user-input'),
  button: document.getElementById('spell'),
  result: document.getElementById('result')
}
let userInput

ui.input.addEventListener('click', ()=>{
 const symbolArr = check(ui.input.value)
 for(let symbol of symbolArr){
  const element = lookup(symbol)
 }
 console.log(userInput)
})

function createElementUi(element){
  const [nameEl, numberEl,symbolEl] = [
    document.createAttribute("div"),
    document.createAttribute("div"),
    document.createAttribute("div")
  ]

  nameEl.classList
}