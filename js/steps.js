var currentTab = 0; // Current tab is set to be the first tab (0)
//showTab(currentTab); // Display the current tab
let numberInputs;

function showTab(n) { 
  //numberInputs = [...document.querySelectorAll('.shown input:not([type="checkbox"])')]
  // This function will display the specified tab of the form ...
  var elems = document.getElementsByClassName("hidden");
  elems[n].classList.add('shown');
  elems[n].classList.remove('hidden');
  numberInputs = [...document.querySelectorAll('.shown input:not([type="checkbox"])')];
  //console.log(numberInputs);
  //x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  /*if (n == 0) {
    //document.getElementById("prevBtn").style.display = "none";
  } else {
    //document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (elems[n].length - 1)) {
    //document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    //document.getElementById("nextBtn").innerHTML = "Next";
  } */
  // ... and run a function that displays the correct step indicator:
  return numberInputs;
}

function nextPrev(n) {
  //document.getElementById('next1').disabled = true;
  // This function will figure out which tab to display
  var elems = document.getElementsByClassName("shown");
  // Exit the function if any field in the current tab is invalid:
  // Hide the current tab:
  elems[0].classList.add('hidden');
  elems[0].classList.remove('shown');
  //numberInputs = [...document.querySelectorAll('.shown input:not([type="checkbox"])')];
  //x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  /* if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  } */
  // Otherwise, display the correct tab:
  numberInputs = showTab(currentTab);
  //console.log(numberInputs)
  return numberInputs;

}

function loadedForm(){
  return [...document.querySelectorAll('.shown input:not([type="checkbox"])')]
}

export { nextPrev }