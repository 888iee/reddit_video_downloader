// const reddit = require( "./reddit" );
const fs = require( "fs" );
const download = require( "./download" );

// port
const port = 3000;
// debugger;


let url = "https://reddit.com/r/WatchPeopleDieInside/comments/j8n5c1/putin_laughs_at_his_minister_for_suggesting_to/";
// reddit.initialize( url );

download.initialize( url );
