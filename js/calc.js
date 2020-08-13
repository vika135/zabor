let width_total = document.getElementById('width-total');
let height_total = document.getElementById('height-total');
let sum_total = document.getElementById('sum-total');
let material_total = document.getElementById('material-total');

let materials = new Map();
materials.set("none", 0);
materials.set("profnastil", 400);
materials.set("moduli", 500);
materials.set("beton", 700);
materials.set("setka", 200);

let materialsNames = new Map();
materialsNames.set("profnastil", "профнастил");
materialsNames.set("moduli", "модули");
materialsNames.set("beton", "бетон");
materialsNames.set("setka", "сетка");

var label = document.getElementById('sum');
var sum;

let materialPrice = 0;
let mounting = 0;
var keys = document.querySelectorAll('.dropdwn-content > a');
let checkbox = document.getElementById('checkbox');


function getSum(materialType){
    materialPrice = materials.get(materialType);
    let width = +document.getElementById('width').value.replace(',','.');
    let height = +document.getElementById('height').value.replace(',','.');

    sum = width * height * (materialPrice + mounting)
    label.textContent =  sum.toFixed(2) + " ₽";
    //console.log(materialPrice);
    //if (sum != 0 ) return true;
    return sum;
}

function setTotal(materialType, width, height, sum){
    width_total.textContent = `длиной ${width} метров`;
    height_total.textContent = `высотой ${height} метров`;
    material_total.textContent = `${materialsNames.get(materialType)}`;
    sum_total.textContent = `${sum} ₽`;
}

function checkboxCheck(materialType, inputsValid){
    if (checkbox.checked){      
        mounting = 200;
    } 
    else{ 
        mounting = 0;
    }
    if (materialType != "none" && inputsValid) getSum(materialType);
}

export { getSum, keys, checkboxCheck, setTotal}