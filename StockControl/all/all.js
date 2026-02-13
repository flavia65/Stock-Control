
const list = document.querySelector('.product-list')
const productName = document.querySelector('.product-name')
const productPrice = document.querySelector('.price')
const productQuant = document.querySelector('.quantity')
const close = document.querySelector('#close')
const cancel = document.querySelector('#cancel-delete')
const deletePermanently = document.querySelector('#delete-delete')
const result = document.querySelector('.number')
const searchBtn = document.getElementById('search')


const sheetID = "1jBkKm4OnP4qFfF4X9n-lYIJFA18H8-U6d2ySpWAiKy8";
// const sheetID = "1aaUOztAAAjP_VwMWwHrZKqkSA90YPv29D3kSLuVifro"
// const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;
const apiURL = "https://stock-control-j.vercel.app/produtos";
const scriptURL = 'https://script.google.com/macros/s/AKfycbxo8a7PsVjaTbK_b8saJoI7KMepNTisro-tWSKY-Wnp20s7KSHm4KQJU8f2DKOEWujh/exec'
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

//https://docs.google.com/spreadsheets/d/1jBkKm4OnP4qFfF4X9n-lYIJFA18H8-U6d2ySpWAiKy8/edit?usp=sharing



async function fetchSheetData() {
    const response = await fetch(apiURL)
    const text = await response.json() // await response.text()
    // const json = JSON.parse(text.substring(47).slice(0, -2))

    // const data = parse(json)
    console.log(data[0])
    console.log(data[0]['Nome'])

    let arraySize = data.length
    let tableToDelete = ""

    // productName.innerHTML = data[6]['Nome ']


        for (let i=0; i<arraySize; i++){
            const newTable = document.createElement('table')
            newTable.innerHTML =  `
                <table>
                        <tr>
                            <td class="barcode"><p>${data[i]['Codigo']}</p></td>
                            <td class="product-name">${data[i]['Nome']}</td>
                            <td class="price"><span>R$</span>${data[i]['Preco']}</td>
                            <td class="quantity">${data[i]['Quantidade']}</td>
                            <td class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                            </td>
                            <td class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D62828"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </td>
                        </tr>
                    </table>
            `
            list.appendChild(newTable)
            result.innerText = i +1

            const deleteBtn = newTable.querySelector('.delete')
            deleteBtn.addEventListener('click', () => {
                tableToDelete = newTable
                document.querySelector('.deleteConfirmShow').style.display = 'flex'
            })

           
        }
   
        deletePermanently.addEventListener('click', () => {
                
            if(tableToDelete) {
                    const productID = tableToDelete.querySelector('.barcode').textContent.trim();
                    deleteSheet(productID).then(() => {
                        tableToDelete.remove()
                        // location.reload()
                    })
                
            }
            document.querySelector('.deleteConfirmShow').style.display = 'none'
        })


        //Home search

    const urlParams = new URLSearchParams(window.location.search)
    let inputHome = urlParams.get('info')
    if(inputHome){
        console.log (inputHome)

   
    const barcodeValue = productList.querySelectorAll('.barcode')
    // console.log(barcodeValue[0].textContent)
    const nameValue = productList.querySelectorAll('.product-name')

    
    // console.log(nameValue[0].textContent)
   list.innerHTML = ""

    console.log(inputHome)
    let found = false

    if(inputHome !== "") {
        result.innerText = 0
        for(let i = 0; i < data.length; i++ ) {
        if(barcodeValue[i].textContent.includes(inputHome)) {
            console.log('yes')
            const newTable = document.createElement('table')
            newTable.innerHTML =  `
                <table>
                        <tr>
                            <td class="barcode"><p>${data[i]['Codigo']}</p></td>
                            <td class="product-name">${data[i]['Nome']}</td>
                            <td class="price"><span>R$</span>${data[i]['Preco']}</td>
                            <td class="quantity">${data[i]['Quantidade']}</td>
                            <td class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                            </td>
                            <td class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D62828"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </td>
                        </tr>
                    </table>
            ` 
            list.appendChild(newTable)
            result.innerText ++

            

            const deleteBtn = newTable.querySelector('.delete')
            deleteBtn.addEventListener('click', () => {
                tableToDelete = newTable
                document.querySelector('.deleteConfirmShow').style.display = 'flex'
            })


            found = true

        } else if(nameValue[i].textContent.toLowerCase().includes(inputHome.toLowerCase())) {
           console.log('Found')
           const newTable = document.createElement('table')
            newTable.innerHTML =  `
                <table>
                        <tr>
                            <td class="barcode"><p>${data[i]['Codigo']}</p></td>
                            <td class="product-name">${data[i]['Nome']}</td>
                            <td class="price"><span>R$</span>${data[i]['Preco']}</td>
                            <td class="quantity">${data[i]['Quantidade']}</td>
                            <td class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                            </td>
                            <td class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D62828"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </td>
                        </tr>
                    </table>
            ` 
            list.appendChild(newTable)
            result.innerText++

            const deleteBtn = newTable.querySelector('.delete')
            deleteBtn.addEventListener('click', () => {
                tableToDelete = newTable
                document.querySelector('.deleteConfirmShow').style.display = 'flex'
            })


           found = true

        }

        document.querySelector('.search').addEventListener('keydown', () => location.reload())

    }
     if(!found) console.log('Product not found!')


    } else {
        alert('Você precisa escrever algo para buscar')
    }
}
        // urlParams.delete('info')
    
    



//End Home Search

        
    searchBtn.addEventListener('click', () => {
    let input = document.querySelector('.input-search').value
    const barcodeValue = productList.querySelectorAll('.barcode')
    // console.log(barcodeValue[0].textContent)
    const nameValue = productList.querySelectorAll('.product-name')

    
    // console.log(nameValue[0].textContent)
   list.innerHTML = ""

    console.log(input)
    let found = false

    if(input !== "") {
        result.innerText = 0
        for(let i = 0; i < data.length; i++ ) {
        if(barcodeValue[i].textContent.includes(input)) {
            console.log('yes')
            const newTable = document.createElement('table')
            newTable.innerHTML =  `
                <table>
                        <tr>
                            <td class="barcode"><p>${data[i]['Codigo']}</p></td>
                            <td class="product-name">${data[i]['Nome']}</td>
                            <td class="price"><span>R$</span>${data[i]['Preco']}</td>
                            <td class="quantity">${data[i]['Quantidade']}</td>
                            <td class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                            </td>
                            <td class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D62828"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </td>
                        </tr>
                    </table>
            ` 
            list.appendChild(newTable)
            result.innerText ++

            

            const deleteBtn = newTable.querySelector('.delete')
            deleteBtn.addEventListener('click', () => {
                tableToDelete = newTable
                document.querySelector('.deleteConfirmShow').style.display = 'flex'
            })


            found = true

        } else if(nameValue[i].textContent.toLowerCase().includes(input.toLowerCase())) {
           console.log('Found')
           const newTable = document.createElement('table')
            newTable.innerHTML =  `
                <table>
                        <tr>
                            <td class="barcode"><p>${data[i]['Codigo']}</p></td>
                            <td class="product-name">${data[i]['Nome']}</td>
                            <td class="price"><span>R$</span>${data[i]['Preco']}</td>
                            <td class="quantity">${data[i]['Quantidade']}</td>
                            <td class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                            </td>
                            <td class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D62828"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </td>
                        </tr>
                    </table>
            ` 
            list.appendChild(newTable)
            result.innerText++

            const deleteBtn = newTable.querySelector('.delete')
            deleteBtn.addEventListener('click', () => {
                tableToDelete = newTable
                document.querySelector('.deleteConfirmShow').style.display = 'flex'
            })


           found = true

        }

        document.querySelector('.search').addEventListener('keydown', () => location.reload())

    }
     if(!found) console.log('Product not found!')


    } else {
        alert('Você precisa escrever algo para buscar')
    }
})

    }



function parse({ table }) {
    return table.rows
        .map(row =>
            table.cols.map((col, index) => ({
                [col.label]: row.c[index]?.v || ""
            }))
        )
        .map(entry => entry.reduce((acc, cur) => ({ ...acc, ...cur }), {}));
}




close.addEventListener('click', () => {
    document.querySelector('.deleteConfirmShow').style.display = 'none'
})

cancel.addEventListener('click', () => {
    document.querySelector('.deleteConfirmShow').style.display = 'none'
})



async function deleteSheet(productID) {
    try {
        const response = await fetch(`https://stock-control-j.vercel.app/produtos/${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Erro ao deletar produto: ${response.status} - ${errorData.message || 'Erro desconhecido'}`)
        }

        const result = await response.json()
        console.log('Produto deletado via API Node.js:', result)
        location.reload()
        return result
        

    } catch (error) {
        console.error('Erro ao deletar produto na API Node.js:', error)
        throw error
    }
}







// function deleteSheet(productID) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     const url = 'https://script.google.com/macros/s/AKfycbzH19jP6zX1zBSqERmSpR1bszenKRocGme_wVPKLsn7isEr1xTxonvAVAaNmOVCZpQIRA/exec';
//     const formData = new URLSearchParams();
//     formData.append('action', 'delete');
//     formData.append('productID', productID);

//     xhr.open('POST', url);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     xhr.onload = function() {
//       console.log('Delete Response (XHR):', xhr);
//       if (xhr.status >= 200 && xhr.status < 300) {
//         try {
//           const data = JSON.parse(xhr.responseText);
//           console.log('Deleted (XHR):', data);
//           resolve(data);
//         } catch (error) {
//           console.error('Erro ao parsear JSON (XHR):', error);
//           reject(error);
//         }
//       } else {
//         console.error('Erro HTTP ao deletar (XHR):', xhr.status, xhr.statusText);
//         reject(new Error(`Erro HTTP ${xhr.status}: ${xhr.statusText}`));
//       }
//     };

//     xhr.onerror = function() {
//       console.error('Erro na requisição de deleção (XHR):', xhr.status, xhr.statusText);
//       reject(new Error(`Erro na requisição: ${xhr.statusText}`));
//     };

//     xhr.send(formData.toString());
//   });
// }
  

fetchSheetData()