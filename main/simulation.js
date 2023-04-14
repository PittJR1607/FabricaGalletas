const selectRecetas = document.querySelector('.select-receta')

const ingredientesDiv = document.querySelector('.ingredientesDiv')

const iniciarButton = document.querySelector('#iniciarSimulacion')

let recetas 
let ingredientes

document.addEventListener('DOMContentLoaded' ,() => {
    loadRecetas()
    getIngredientsAvailable()
})

iniciarSimulacion.addEventListener('click', e => {
    e.preventDefault()
    recetas.forEach( receta => {
        console.log(receta)
    })

    ingredientes.forEach( ingrediente => {
        console.log(ingrediente)
    })
}) 

function checkIngredients(){

}

async function loadRecetas(){

    await fetch('http://localhost:3000/getRecdata')

    .then( response => response.json() )
    .then( json => recetas = json )

    console.log(recetas)

    recetas.forEach( receta => {
        selectRecetas.innerHTML += `
            <option value="${receta.nombre_recetas}">${receta.nombre_recetas}</option>
        `
    }) 
    console.log(selectRecetas)
}

async function getIngredientsAvailable(){
    await fetch('http://localhost:3000/getIngredients')
    .then( response => response.json() )
    .then( json => ingredientes = json )

    ingredientes.forEach( ingrediente => {
        const p = document.createElement('P')
        p.innerHTML = `Ingrediente: ${ingrediente.nombre_ingredientes} Cantidad: ${ingrediente.cant_ingredientes}`
        p.classList.add('ingrediente')
        ingredientesDiv.appendChild(p)
    })
}




