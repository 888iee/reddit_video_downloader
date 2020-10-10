// const reddit = require( "./reddit" );
const fs = require( "fs" );
const execFile = require( "child_process" ).execFile;

// port
const port = 3000;


let url = "https://reddit.com/r/WatchPeopleDieInside/comments/j8n5c1/putin_laughs_at_his_minister_for_suggesting_to/";
// reddit.initialize( url );

const child = execFile("youtube-dl", 
	[ url, "--id", "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", ], 
	( err, stdout, stderr ) => {
		if( err ) throw err;

		console.log( stdout );
	});
