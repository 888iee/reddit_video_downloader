const request 	= require( "request" );
const cheerio 	= require( "cheerio" );
const fs		= require( "fs" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );
const Nightmare = require( "nightmare" );
const nightmare = Nightmare({ show: true });
const fsaver	= require( "file-saver" );
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
			// fsaver.saveAs( res, "file.mp4" )
		})
});


app.listen( port, () => {
	console.log( `Server running at Port ${port}` );
});
