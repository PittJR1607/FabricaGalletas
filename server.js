import mysql from 'mysql2/promise'
import { config } from './dbconfig.js'

const getConnection = async () =>{
    const connection = await mysql.createConnection(config)
    return connection
}

export const addIngredient = async( req, res ) => {
    //console.log(req.body)   
    const {name, quantity} = req.body

    const connection = await getConnection()
    
    const uprname= name.toUpperCase()
    
    const [controlname, ]=await connection.execute(`SELECT nombre_ingredientes FROM ingredientes WHERE nombre_ingredientes = '${name}';`)
    // res.send(controlname)
    console.log(`Control name ${controlname}`)
    
    if (!controlname[0]){
        const [results, ] = await connection.execute(`INSERT INTO ingredientes (nombre_ingredientes, cant_ingredientes) VALUES ('${uprname}', ${quantity});`)
        // res.send(results)
        connection.commit()
        console.log("guardado")
        res.send(results)
    }
    else{
        const [controlqua, ]=await connection.execute(`SELECT cant_ingredientes FROM ingredientes WHERE nombre_ingredientes = '${uprname}';`)
        const intcontrolqua= controlqua[0].cant_ingredientes
        const intcontrolqua2= parseInt(intcontrolqua) 
        const refreshquantity= intcontrolqua2 + parseInt(quantity)
        
        const updatequery=`UPDATE ingredientes
        SET cant_ingredientes = '${refreshquantity}' WHERE nombre_ingredientes = '${uprname}';
        `
        const [results, ] = await connection.execute(updatequery)
        // res.send(requantity)
        connection.commit()
        console.log("modificado")
        res.send(results)
    }
}

export const getIngredients = async (req,res)=> {
    const connection = await getConnection()

    const [storage, ]= await connection.execute('SELECT nombre_ingredientes, cant_ingredientes FROM ingredientes')
    res.send(storage)
}




export const addRecipeData=async (req,res) => {
    const {nombre_receta, ingredient, quantity} = req.body
    // console.log(req.body)
    const connection = await getConnection()
    
    const uprnamereceta = nombre_receta.toUpperCase()
    const uprnameing =  ingredient.toUpperCase()
    
    const [recnames, ] = await connection.execute(`SELECT nombre_recetas FROM recetas WHERE nombre_recetas = '${uprnamereceta}';`)
    console.log(recnames)
    
    if (!recnames[0]){
        await connection.execute(`INSERT INTO recetas (nombre_recetas) VALUES ('${uprnamereceta}');`)
        connection.commit()
    }
    
    const [recipename, ] = await connection.execute(`SELECT idrecetas, nombre_recetas FROM recetas WHERE nombre_recetas = '${uprnamereceta}';`)

    const [recipeing, ] = await connection.execute(`SELECT idingredientes, nombre_ingredientes FROM ingredientes WHERE nombre_ingredientes = '${uprnameing}';`)

    const [exising, ] = await connection.execute(`SELECT idingredientes, nombre_ingrediente, cantidad_necesaria FROM ingredientesrecetas WHERE idingredientes = ${recipeing[0].idingredientes} AND idrecetas = '${recipename[0].idrecetas}'`)
    

    if (!exising[0]){
        console.log( "no existe")
        await connection.execute(`INSERT INTO ingredientesrecetas (idrecetas, nombre_receta,idingredientes, nombre_ingrediente, cantidad_necesaria) VALUES (${recipename[0].idrecetas},'${recipename[0].nombre_recetas}', ${recipeing[0].idingredientes}, '${recipeing[0].nombre_ingredientes}', ${quantity})`)
        connection.commit()
        console.log("Ingrediente Agregado a Receta")
    }
    else{
        console.log("si existe, cantidad : "+exising[0].cantidad_necesaria)
        
        const updatequery=`UPDATE ingredientesrecetas
        SET cantidad_necesaria = ${quantity} WHERE idingredientes = ${exising[0].idingredientes} AND idrecetas = '${recipename[0].idrecetas}';`
        
        await connection.execute(updatequery)
        connection.commit() 
        console.log("cantidad actualizada")
    }
    
    
    
}

export const getRecdata = async (req,res) => {
    const connection = await getConnection()

    const [recipeHeaders, ] = await connection.execute(`SELECT idrecetas, nombre_recetas FROM recetas ORDER BY idrecetas`)
    console.log(recipeHeaders)

    res.send(recipeHeaders)

    // const [inrecipeHeaders, ] =await connection.execute(`SELECT idrecetas, idingredientes, nombre_ingrediente FROM ingredientesrecetas ORDER BY idrecetas`)
    // console.log(inrecipeHeaders)

    // for ( let i=0; i<recipeHeaders.length; i++){
    //     console.log("receta: "+recipeHeaders[i].nombre_recetas)
    //     for (let x = 0; x<inrecipeHeaders.length; x++){
    //         if (recipeHeaders[i].idrecetas===inrecipeHeaders[x].idrecetas){
    //             console.log(" ingrediente: "+inrecipeHeaders[x].nombre_ingrediente)
    //         }
    //     }
    // }
}

export const getIngData = async ( req,res) => {
    const connection = await getConnection()

    const [inrecipeHeaders, ] =await connection.execute(`SELECT idrecetas, idingredientes, nombre_ingrediente, cantidad_necesaria FROM ingredientesrecetas ORDER BY idrecetas`)
    console.log(inrecipeHeaders)

    res.send(inrecipeHeaders)
}


