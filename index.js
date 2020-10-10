const fs		= require( "fs" );
const express 	= require( "express" );
const bodyParse = require( "body-parser" );
const puppet	= require( "puppeteer" );

// port
const port = 3000;

// blob:https://www.reddit.com/5765e95e-83f6-47f4-88bc-a4eba8cd72b5
// https://www.reddit.com/r/toptalent/comments/j761lc/this_dude_opens_milk_better_than_me/
// let url = "https://www.reddit.com/r/toptalent/comments/j761lc/this_dude_opens_milk_better_than_me/";

(async () => {
	const browser 	= await puppet.launch({ devtools: true });
	
	const page 		= await browser.newPage();
	console.info( page );

	// Holds the browser until we terminate the process explicitly
	await browser.waitForTarget(() => false );
	await browser.close();
})();
