// const recButton = document.getElementById('recButton');


// recButton.addEventListener('click', async (event) => {
//     event.preventDefault();

//     const nomRec = document.getElementById('nomRecipes').value;
    

//     const receta = {
//         nombre : nomRec,
//     };

//     console.log(receta);

//     await fetch('http://localhost:3000/addRecipes',{
//         method: 'POST',
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(receta),
//     })
//     .then( e => console.log(e))
//     .catch( e => console.log(e))


//     window.location.reload()
// });

const addIngtoRec = document.getElementById('addIngtoRec')

addIngtoRec.addEventListener('click', async (event) =>{
    event.preventDefault();

    const nomRec = document.getElementById('nomRecipes').value;
    const ingr = document.getElementById('ingredient').value;
    const quan = document.getElementById('quantity').value;

    const recIngredients = {
        nombre_receta : nomRec, 
        ingredient : ingr,
        quantity: quan,
    }

    await fetch('http://localhost:3000/addRecipeData',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recIngredients),
    })

    .then( e => console.log(e))
    .catch( e => console.log(e))


})

const onLoad = document.addEventListener('DOMContentLoaded', () => {
    const ing = document.querySelector('#ingredient')
    const qua = document.querySelector('#quantity')
    ing.value = ''
    ing.textContent = ''
    qua.value = 0   
})

function returntoMainPage(){
    addEventListener();
    onclick = open("index.html")
};

const generateTableRecipes = async () => {
    // Retrieve data from SQL database
    const resp = await fetch('/getRecdata')
    const data = await resp.json()
    console.log(data)


    const resping = await fetch('/getIngData')
    const ingdata = await resping.json()
    console.log(ingdata)

    // Create HTML table
    let tableHtml = '<table><tr><th>Recetas</th><th>Ingredientes Necesarios</th></tr>'
    for (let i = 0; i < data.length; i++) {
        for (let x = 0; x<ingdata.length; x++){
            if (data[i].idrecetas===ingdata[x].idrecetas){
                tableHtml += '<tr class="td-r"><td class="td-1">' + data[i].nombre_recetas + '</td><td class="td-2">' + ingdata[x].nombre_ingrediente + '</td></tr>'
            }
        }
    }
    tableHtml += '</table>'
    // Return HTML table as a string
    return tableHtml

    return ingdata

}

  // Call the generateTableHtml function and append the result to a container elemen

const tableContainer = document.getElementById('rec-table-container')

generateTableRecipes().then(tableHtml => {

    tableContainer.innerHTML = tableHtml
})
