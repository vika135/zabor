import { getSum, keys, checkboxCheck, setTotal, getMaterialName} from "./calc.js";  
import { nextPrev } from "./steps.js";  
import { PostData } from "./sendemail.js";  

let submit1 = document.getElementById('next1');
let send = document.getElementById('send');

let numberInputs = [...document.querySelectorAll('.shown input:not([type="checkbox"])')]; //нодлист в массив
let num = document.getElementById('sum');
let drpbtn = document.getElementById('dropbutton');

let inputsValid = false;
let dropbuttonValid = false;
let materialType = "none";
let width = 0, height = 0, sum = 0;
let name, email;

checkValidity();

//проверка инпутов на валидность
function checkValidity(){
for (var i = 0; i < numberInputs.length; i++) {
	numberInputs[i].addEventListener('keyup', function() {
        checkInput(this);
        if (numberInputs.every(input => input.validity.valid === true && input.value !== "")){
            if (this.id === "width" || this.id === "height"){
                width = numberInputs.find(elem => elem.id == "width").value;
                height = numberInputs.find(elem => elem.id == "height").value; 
            }
            inputsValid = true;
            if (dropbuttonValid){     
                setValidButton(materialType);
                //console.log("inputsValid is false")
            }             
        }
        else {
            setInvalidButton();
            inputsValid = false;
        } 
	});
}
}

//проверка дропдауна на валидность
for (var i = 0; i < keys.length; i++){
    keys[i].onclick = function(){
        materialType = this.id;
        drpbtn.textContent = this.textContent;
        if (this.id != "none") {
            dropbuttonValid = true;
            if (inputsValid ) {
                setValidButton(materialType);
            }
        }    
        else{
            dropbuttonValid = false;
            setInvalidButton();
        }
    }
}


//#region Обработчики нажатия на кнопки
submit1.onclick=function(){
    send.disabled = true;
    numberInputs = nextPrev(1);
    dropbuttonValid = true; //короче суть в следующем: чтобы не переписывать обработчик события для инпутов, я просто поставлю 
                            //валидность дропдауну, чтобы можно было активировать кнопку "Отправить" и на втором экране
    checkValidity();
    setTotal(materialType, width, height, sum);
    inputsValid = false;
}

send.onclick=function(){
    nextPrev(1);
    let headlineName = document.getElementById('order-isdone-name');
    let orderNumber = document.getElementById('order-number');
    let emailElem = document.getElementById('getemail');
    //console.log(emailElem );
    headlineName.textContent = `${name},`;
    orderNumber.textContent = `№ ${getRandomOrderNumber()}`;
    emailElem.textContent = `${email}`;

    let letter = {
        to: "ptizza.music@yandex.ru",
        subject: "забор",
        text: `Заказ ${orderNumber.textContent}:\n Вы заказали забор ${width}x${height} из материала ${getMaterialName(materialType)} общей стоимостью ${sum} рублей`
    }
    //console.log(JSON.stringify(letter))
    ;
    let res = PostData("sendmail", letter).then(
        result => console.log(result),
        error => console.log(error) 
    );
    console.log(res);
    res.catch(e => console.log("catch err"))

}
//#endregion

function getRandomOrderNumber(){
  return Math.floor(Math.random() * (9000)) + 1000;
}

//чекбокс
checkbox.onclick = function(){
    checkboxCheck(materialType, inputsValid)
}

function setValidButton(materialType){
    sum = getSum(materialType);
    if(sum) submit1.disabled = false;
    send.disabled = false;
}

function setInvalidButton(){
    num.textContent = 0 + " Р";
    submit1.disabled = true;
    send.disabled = true;
}

//#region Функции проверки на валидность
function checkNumberValidity(input){
    let value = +input.value.replace(',','.'); //числа в формате 55 5.5 5,5 5е5 проходят валидацию
    value = isFinite(value);
    value = value &&  !input.value.includes(' ')
         && input.value != '' && !input.value.startsWith('0')

    return(value);   
}

function checkEmailValidity(input){
    let value = input.value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = re.test(String(value).toLowerCase());
    if (isValid) email = value;
    return isValid;
}

function checkNameValidity(input){
    let isValid;
    let value = input.value;
    isValid = value.length > 0;
    if (isValid) name = value; 
    return isValid;
}

function checkTelValidity(input){
    let tel = input.value;
    const re = /^(\+7|8)? ?(\d{3})(\d{3})(\d{2})(\d{2})$/; //+7(8)1234567890 +7(8) 1234567890
    return re.test(String(tel).toLowerCase());
}
//#endregion

function checkInput(input) {
    let valid = false;
    if (input.id === "width" || input.id === "height") valid = checkNumberValidity(input);
    if (input.id === "name") valid = checkNameValidity(input);
    if (input.id === "email") valid = checkEmailValidity(input);
    if (input.id === "tel") valid = checkTelValidity(input);
    
    if (valid) input.setCustomValidity('');         //непустое сообщение об ошибке ставит свойство invalidity.valid инпута
    else input.setCustomValidity("some error");    //в false, а пустое делает валидным

    let errorElement = document.querySelector(`label[for="${input.id}"]`); //задаем видимость и красный цвет сообщению об ошибке под инпутом
    let checkmark = document.querySelector(`input#${input.id} ~ .is-ok`)
    setValidityLayout(valid, errorElement);
    if (checkmark) setValidityLayout(valid, checkmark);
}

function setValidityLayout(valid,elem){
    if (!valid) {
        elem.classList.add('invalid');
        elem.classList.remove('valid');
        
    }
    else {
        elem.classList.add('valid');
        elem.classList.remove('invalid');
    }
}

