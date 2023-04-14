import express from "express"
import { addIngredient, getIngredients, getRecdata, addRecipeData, getIngData} from "./server.js"
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',express.static('./public'))

app.post('/addIngredient', addIngredient )
app.post('/addRecipeData', addRecipeData)


app.get('/getIngredients', getIngredients)
app.get('/getRecdata', getRecdata)
app.get('/getIngData', getIngData)



const port = 3000;

const ListenFunction=() =>console.log(`Servidor en puerto :  ${port}`)
app.listen(port, ListenFunction);