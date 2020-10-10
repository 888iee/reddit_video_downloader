const puppet	= require( "puppeteer" );
const { writeFile } = require( "fs" );
 
// const REDDIT_URL = ( redditUrl ) => redditUrl.replace( "https://www.reddit", "https://www.old.reddit" );
let ar = [];
const self = {
    browser: null,
    page: null,

    initialize: async ( reddit ) => {
        self.browser = await puppet.launch({ headless: false });
        self.page 	 = await self.browser.newPage();
        // page.goto( url );
    
        await self.page.goto( reddit );
        await self.page.on( "response", res => {
            // res._headers.content-type === "video/mp4" ? console.log( res ) : null;
            // console.log( res.response() )
            res.request().method() === "GET" && res.request().resourceType()  ? console.log( res.headers() ) : null; 
        });

    }
}

module.exports = self;
