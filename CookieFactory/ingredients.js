const ingButton = document.getElementById('ingButton');

ingButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const ing = document.querySelector('#ingredient')
    const qua = document.querySelector('#quantity')

    const ingredient = {
        name : ing.value,
        quantity : qua.value,
    }
    console.log(ingredient)
 
    await fetch('http://localhost:3000/addIngredient',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient),
    })
    .then( e => console.log(e))
    .catch( e => console.log(e))


    window.location.reload()
}); 

const onLoad = document.addEventListener('DOMContentLoaded', () => {
    const ing = document.querySelector('#ingredient')
    const qua = document.querySelector('#quantity')
    ing.value = ''
    ing.textContent = ''
    qua.value = 0   
})

// Define a function to generate HTML table from SQL data
const generateTableHtml = async () => {
    // Retrieve data from SQL database
    const response = await fetch('/getIngredients')
    const data = await response.json()
    // Create HTML table
    let tableHtml = '<table><tr><th>Ingrediente</th><th>Cantidad Disponible</th></tr>'
    for (let i = 0; i < data.length; i++) {
        tableHtml += '<tr class="td-r"><td class="td-1">' + data[i].nombre_ingredientes + '</td><td class="td-2">' + data[i].cant_ingredientes + '</td></tr>'
    }
    tableHtml += '</table>'
    // Return HTML table as a string
    return tableHtml
}
  
  // Call the generateTableHtml function and append the result to a container element
const tableContainer = document.getElementById('ing-table-container')

generateTableHtml().then(tableHtml => {
    tableContainer.innerHTML = tableHtml
})



function returntoMainPage(){
    addEventListener();
    onclick = open("index.html")
}

function increment() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    console.log(currentValue)
}

function decrement() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value);
    if (currentValue > 0) {
        quantityInput.value = currentValue - 1;
    }
}

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        var dropdownMenus = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdownMenus.length; i++) {
            var openDropdownMenu = dropdownMenus[i];
            if (openDropdownMenu.classList.contains('show')) {
                openDropdownMenu.classList.remove('show');
            }
        }
    }
}
