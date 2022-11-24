const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = require('./docs/swagger.json');
app.use(express.json())


const pilet=[
    {id:1,name:"Dora pilet",Data:"06.04.2023", price: 15.00},
    {id:2,name:"Miyagi pilet",Data:"16.05.2023", price: 30.00},
    {id:3,name:"Pimedate Ööde filmifestival",Data:"27.12.2022", price: 7.00},
    {id:4,name:"Viini Filharmoonia Straussi orkester",Data:"30.11.2022", price: 20.10},
    {id:5,name:"Muusikasündmus kogu perele 'Frozen Christmas'",Data:"18.12.2022", price: 25.10},
    {id:6,name:"Lumekuninganna ",Data:"16.12.2022-26.12.2022", price: 31.10},
    {id:7,name:"Jõuluetendus 'Talvemeister'",Data:"23.12.2022-25.12.2022", price: 10.10},
]

document.querySelector('.content').innerHTML = `<table class="pilets"></table>`
for(key in pilet){
    let row = document.createElement('tr')
    row.innerHTML=`<td colspan="2">${key}</td>`
    document.querySelector('.phone').appendChild(row)
}



app.get('/pilet', (req,res)=>{
    res.send(pilet)
})

app.get('/pilet/:id',(req,res)=> {

    if(typeof pilet[req.params.id -1] ==="undefined"){
        return res.status(404).send({error:"Game not found"})
    }

    res.send(pilet[req.params.id - 1])
})

app.post('/pilet',(req,res)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).send({error:'One or all params are missing'})
    }
    let pilets={
        id: pilet.length + 1,
        name: req.body.name,
        Data: req.body.Data,
        price:req.body.price
    }

    pilet.push(pilets)

    res.status(201)
        .location(`${getBaseUrl(req)}/pilet/${pilet.length}`)
        .send(pilet)
})

app.delete('/pilet/:id',(req,res)=>{
    if(typeof pilet[req.params.id - 1] ==='undefined') {
        return res.status(404).send({error:"Game not found"})
    }
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port,() =>{
    console.log(`API up at: http://localhost:${port}`)
})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted
        ? 'https' : 'http' + `://${req.headers.host}`
}