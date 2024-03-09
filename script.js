let currentNumber="";
let storedNumber="";
let operation="";
const changeThemeButton=document.querySelector(".themes__toggle");
const changThemeFun=()=>{
    changeThemeButton.classList.toggle('themes__toggle--isActive')

}
const changeThemeWithEnter=(event)=>{if(event.key==='Enter') changThemeFun();}

changeThemeButton.addEventListener('keydown',changeThemeWithEnter);
changeThemeButton.addEventListener("click",changThemeFun);
// /////////////////////////////////////////////////////
const resultElement=document.querySelector(".calc__result");

const elementButton=document.querySelectorAll("[data-type]");

const upDateUI=(value)=>{
    
    resultElement.textContent=!value?"0" : value;
}
const resetButtonHandler=()=>{
currentNumber="";
storedNumber="";
operation="";
upDateUI(currentNumber);
}
const checkNumber=(value)=>{
    if(value==='.'&& currentNumber.includes('.')) return;
    if(value==='0' && !currentNumber) return;
    if(value==='.'&& !currentNumber)
    currentNumber=0;
    currentNumber+=value;
    upDateUI(currentNumber);
}
const deleteButtonHandler=()=>{
    if(!currentNumber || currentNumber.length==="0") return;
    if(currentNumber.length===1)
    currentNumber="";
    else {
        currentNumber=currentNumber.substring(0,currentNumber.length-1)
    }
    upDateUI(currentNumber);

}
const executeOperation=()=>{
    if(currentNumber && storedNumber && operation){
    switch (operation){
    case "+":
        storedNumber=parseFloat(storedNumber)+parseFloat(currentNumber);
        currentNumber="";
        upDateUI(storedNumber);
        break;
        
    case "-":
        storedNumber=storedNumber-currentNumber;
        currentNumber="";
        upDateUI(storedNumber);
         break;
    case "*":
        storedNumber=storedNumber*currentNumber;
        currentNumber="";
        upDateUI(storedNumber);
         break;
    case "/":
        storedNumber=storedNumber/currentNumber;
        currentNumber="";
        upDateUI(storedNumber);
         break;
     }
    }
}
const operationButtonHandler=(operationValue)=>{
    if(!currentNumber && !storedNumber) return;

    if(currentNumber && !storedNumber){
        storedNumber=currentNumber;
        currentNumber="";
        operation=operationValue;
    }
    else if(storedNumber){
        operation=operationValue;
        if(currentNumber)
         
        executeOperation();
    }
}
const keyElementHandler=(element)=>element.addEventListener("click",()=>{
    const type=element.dataset.type;
   if(type==='number')
   checkNumber(element.dataset.value);
   else if(type==='operation'){
       switch(element.dataset.value){
           case "c":
               resetButtonHandler();
            case "Backspace":
                deleteButtonHandler();
                break;
            case "Enter":
                executeOperation();
                break;
            default:
                operationButtonHandler(element.dataset.value);

               
   }
}}
);
elementButton.forEach(keyElementHandler);

const numbersList=["0","1","2","3","4","5","6","7","8","9"];
const operationList=["+","-","*","/"];
const allKeys=[...numbersList,...operationList,"Backspace","Enter","c"];

const keyboardWithoutHover=(key)=>{
    if(numbersList.includes(key)) checkNumber(key);
    else if(operationList.includes(key)) operationButtonHandler(key);
    else if(key==="Backspace") deleteButtonHandler();
    else if(key==="Enter") executeOperation()
    else if(key==="c") resetButtonHandler();
}
const keyboardWithHover=(key)=>{
    if(allKeys.includes(key)){
        const element=document.querySelector(`[data-value="${key}"]`);
        element.classList.add("hover");
        element.click();
       setTimeout(()=> element.classList.remove("hover"),100);
    }
}
// using keyboard
window.addEventListener("keydown",(event)=>{
    // keyboardWithoutHover(event.key);
    keyboardWithHover(event.key);
    
})