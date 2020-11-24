const download 	= require( "./Download" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );
const path 		= require( "path" );

// port
const port = 3000;

const app = express();

// middlewares
app.use( express.static( 'public' ));
app.use( bodyParse.json() );
app.use( bodyParse.urlencoded({
	extended: true
}));

// routes
app.get( "/", ( req, res ) => {
	res.sendFile("index.html");
});

app.post( "/", ( req, res, next ) => {
	let url = req.body.redditUrl;
	console.log( `requested video download url: ${ url }` );

	new download( url )
		.startProcessing() 
		.then(( p ) => {
			console.log( p );
			// process.nextTick(() => 
			res.download( path.join( __dirname, p ) );
		})
		.catch( err => console.log( err ) );
	
});

app.listen( port, () => console.log( `Server running on port ${ port }` ));
