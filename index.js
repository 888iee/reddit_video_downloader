const request 	= require( "request" );
const cheerio 	= require( "cheerio" );
const fs		= require( "fs" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );

const port = 3000;

const app = express();
app.use( express.static( 'public' ));
app.use( bodyParse.json() );
app.use( bodyParse.urlencoded({
	extended: true
}) )

app.get( "/", ( req, res ) => {
	res.sendFile("index.html");
});

app.post( "/", ( req, res, next ) => {
	let url = req.body.redditUrl;
});


app.listen( port, () => {
	console.log( `Server running at Port ${port}` );
});
