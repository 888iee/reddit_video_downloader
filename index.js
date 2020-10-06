const request 	= require( "request" );
const cheerio 	= require( "cheerio" );
const fs		= require( "fs" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );

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

	request( url, ( err, reqRes, html ) => {
		if( !err && reqRes.statusCode == 200 ) {
			const $ = cheerio.load( html, { decodeEntities: false, withDomLvl1: false });

			console.log( $( "video" ).attr( "src" ));
		}
	});
	res.send("ok")
});


app.listen( port, () => {
	console.log( `Server running at Port ${port}` );
});
