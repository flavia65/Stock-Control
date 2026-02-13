// const barcodeInput = document.querySelector('#barcode')
// const nameInput = document.getElementById('name')
// const priceInput = document.querySelector('#price')
// const quantityInput = document.querySelector('#quantity')
// const categorySel = document.querySelector('#categorySel')


// const saveBtn = document.querySelector('.saveBtn')

// let product = {}


//

const scriptURL = 'https://script.google.com/macros/s/AKfycbx3LRlU_bSO8TFxayiBFzwG6Po1j251RpQmX8NQzbz1dXD4f8geRAUvWf73vVWEq5c7/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {

  e.preventDefault()

  let priceInput = document.querySelector('#price').value
  priceInput = priceInput.replace(',', '.')

  const  formData = new FormData(form)
  formData.set('price', priceInput)
  formData.set('action', 'add')


  fetch(scriptURL, { method: 'POST',
    mode: 'no-cors',
    body: formData})
  .then(response => {
    console.log('Full response:', response);
    if (!response.ok) {
          console.error('HTTP error!', response);
      }
    response.json().then(text => console.log('Response content:', text))
  })
    .catch(error => console.log('Error!', error.message))
})

//

// function getValues() {
//     const nameValue = nameInput.value
//     const priceValue = parseFloat(priceInput.value)
//     // console.log(nameInput.value, priceInput.value)

//     product = {
//         code: '000',
//         name: nameValue,
//         price: priceValue,
//         quantity: 3,
//         category: 'outros'
//     }
//     console.log('1° ' + product.name)
   
// }





// saveBtn.addEventListener('click', getValues )



// console.log( 'ultimo console.log: '+ product.name)
// export {product}
