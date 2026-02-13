const rotateBtn = document.querySelector('#rotation')
const typeCodeBtn = document.querySelector('.type-code')
const inputBox = document.getElementById('input-box')
const camera = document.getElementById('camera')
const modal = document.querySelector('.modal')

rotateBtn.addEventListener('click', () => {
    document.querySelector('.rotate-wrapper').classList.toggle('rotate')
})

typeCodeBtn.addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'block'
    
    inputBox.style.display = 'flex';
})

window.addEventListener('click', e => {
    e.target === modal? modal.style.display = 'none' : false
    e.target === modal? inputBox.style.display = 'none' : false
})

//creating a detector

// const quaggaConf = {
//     inputStream: {
//         target: document.querySelector(".camera"),
//         type: "LiveStream",
//         constraints: {
//             width: {min: 640},
//             height: {min: 480},
//             facingMode: "environment",
//             aspectRadio: { min: 1, max: 2}
//         }
//     },
//     decoder: {
//         readers: ['code_128_reader']
//     },
// }

// Quagga.init(quaggaConf, function (err) {
//     if(err) {
//         return console.log(err)
//     }
//     Quagga.start()
// })

// Quagga.onDetected(function (result) {
//     alert("Detected barcode:" + result.codeResult.code)
// })














// const barcodeDetector = new  BarcodeDetector({
//     formats: ["code_39, code_128, code_93, codabar, ean_13, ean_8, itf, upc_a, upc_e"]
// })

// // check supported types
// BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
//     supportedFormats.forEach((format) => console.log(format));
//   });

//   barcodeDetector
//   .detect(imageEl)
//   .then((barcodes) => {
//     barcodes.forEach((barcode) => console.log(barcode.rawValue));
//   })
//   .catch((err) => {
//     console.log(err);
//   });