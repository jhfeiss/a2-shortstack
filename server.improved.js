const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata=[
   {yourname:'Jake', password:'password',age:'20', birthyear:'2001'},
   {yourname:'Harrison', password:'RocketLeague4Life',age:'20', birthyear:'2001'},
   {yourname:'Loren', password:'Lily',age:'20', birthyear:'2001'},
   {yourname:'Jake', password:'ManteTeo',age:'21', birthyear:'2000'},
   {yourname:'Jakes GF', password:'noOneKnows',age:'?', birthyear:'null'}

]
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
 
  if( request.url === '/submit' ) {
    const json = JSON.parse(dataString)
let age = json.age
        let birthyear = 2021-age
      json.birthyear=birthyear

      appdata.push(json)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  }
  if( request.url === '/remove' ) {
      appdata.splice(dataString.substring(6),1)
     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  
  }
    if( request.url === '/load' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  }
     if( request.url === '/modify' ) {


     let json2 = dataString.substring(0,dataString.indexOf('}')+1)
     let index = dataString.substring(dataString.indexOf('}')+5)
json2 = JSON.parse(json2)
        let age = json2.age
        let birthyear = 2021-age
      json2.birthyear=birthyear


         
      appdata[index]=json2
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  }
 })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{


       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
