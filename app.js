//listen for submit
document.querySelector('#loan-form').addEventListener("submit", calculateResults);

//calculate results
function calculateResults(e) {
  e.preventDefault()
  //UI variables
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')

  //calculations
  const principal = parseFloat(amount.value);  //parseFloat will give it decimal
  const calculatedInterest = parseFloat(interest.value)/100/12
  const calculatedPayments = parseFloat(years.value) * 12

  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal*x*calculatedInterest)/(x-1)

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly* calculatedPayments)-principal).toFixed(2)
  } else {
    showError("Please check your numbers")
  }
}

function showError(error) {
  //create a div
  const errorDiv = document.createElement('div')
 
 //get elements
 const card = document.querySelector('.card')
 const heading = document.querySelector('.heading')
 
  //add class & append text node
  errorDiv.className = 'alert alert-danger'
  errorDiv.appendChild(document.createTextNode(error))

  //insert error above heading
  card.insertBefore(errorDiv, heading)

  //clear error after 3 sec
  setTimeout(clearError, 3000)   //3000 milliseconds is 3 secs
}

function clearError() {
  document.querySelector('.alert').remove()
}

