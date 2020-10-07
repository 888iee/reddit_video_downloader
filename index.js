const request 	= require( "request" );
const cheerio 	= require( "cheerio" );
const fs		= require( "fs" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );
const Nightmare = require( "nightmare" );
const nightmare = Nightmare({ show: true });
const fsaver	= require( "file-saver" );
const XMLHttpRequest = require( "xmlhttprequest" ).XMLHttpRequest;
const FileReader = require( "FileReader" );
// port
const port = 3000;

const app = express();

// middlewares
app.use( express.static( 'public' ));
app.use( bodyParse.json() );
app.use( bodyParse.urlencoded({
	extended: true
}) )

// routes
app.get( "/", ( req, res ) => {
	res.sendFile("index.html");
});

app.post( "/", ( req, res, next ) => {
	let url = req.body.redditUrl;
	console.log( `requested video download url: ${url}` );

	nightmare
		.goto( url )
		.wait( 5000 )
		.evaluate(() => document.body.querySelector( "video" ).src )
		.catch(error => console.error( 'Search failed:', error ))
		.then(( res ) => {
			console.log( `Video url: ${ res }` )
		
			// let blob = new Blob([ res ], { type: "video/.mp4" });
			// let blobUrl = Url.createObjectURL( res );

			let xhr = new XMLHttpRequest();
			xhr.responseType = "blob";

			xhr.onload = () => {
				let recoveredBlob = xhr.response;

				let reader = new FileReader();

				reader.onload = () => {
					let blobAsDataUrl = reader.result;
					window.location = blobAsDataUrl;
				};

				reader.readAsDataURL( recoveredBlob );

			}
			console.log( res );
			xhr.open( "GET", res.replace( "blob:", "" ) );
			xhr.send();
		})
});


app.listen( port, () => {
	console.log( `Server running at Port ${port}` );
});
