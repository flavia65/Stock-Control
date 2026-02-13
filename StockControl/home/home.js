const adicionar = document.querySelector('.addBtn')
const searchInp = document.querySelector('.input-search')
const searchBtn = document.querySelector('#search')


searchBtn.addEventListener('click', () => {
    const searchValue = searchInp.value
    window.location.href = `http://192.168.56.1:5501/all/all.html?info=${searchValue}`

    console.log(searchValue)
})


adicionar.addEventListener('click',)
