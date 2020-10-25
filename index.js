const fs 		= require( "fs" );
const download 	= require( "./Download" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );
const Download = require("./Download");

// port
const port = 3000;
// debugger;

// DEBUGGING WITHOUT CLIENTSIDE HTML
// reddit.initialize( url );
let url = "https://reddit.com/r/WatchPeopleDieInside/comments/j8n5c1/putin_laughs_at_his_minister_for_suggesting_to/";

const f = new Download( url );

f.startProcessing();


// const app = express();

// // middlewares
// app.use( express.static( 'public' ));
// app.use( bodyParse.json() );
// app.use( bodyParse.urlencoded({
// 	extended: true
// }));

// // routes
// app.get( "/", ( req, res ) => {
// 	res.sendFile("index.html");
// });

// app.post( "/", ( req, res, next ) => {
// 	let url = req.body.redditUrl;
// 	console.log( `requested video download url: ${url}` );

	
// 	await download.initialize( url );
	
// });

// app.listen( port, () => console.log( `Server running on port ${ port }` ));

// https://stackoverflow.com/questions/56615083/executing-a-function-after-an-another-asynchronous-function-finishes-in-javasc
// https://superuser.com/questions/277642/how-to-merge-audio-and-video-file-in-ffmpeg
// https://github.com/damianociarla/node-ffmpeg
// https://stackoverflow.com/questions/28790744/how-would-one-do-async-javascript-getters-and-setters
