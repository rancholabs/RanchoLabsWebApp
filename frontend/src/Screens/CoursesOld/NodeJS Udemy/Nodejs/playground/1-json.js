const fs= require('fs')

// const book = {
//     title: "The Secret",
//     author: "Rhonda Byrne"
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json',bookJSON) 

 const buffer= fs.readFileSync('1-json.json')   
 const dataJSON= buffer.toString()
 const data= JSON.parse(dataJSON)
  
 data.name='Rucha'
 data.age= 20

 const userJson= JSON.stringify(data)
 fs.writeFileSync('1-json.json',userJson)
