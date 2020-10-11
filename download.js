const execFile = require( "child_process" ).execFile;

const params = ( url ) => [ url, "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", "-t"];
const infoparams = ( url ) => [ url, "-j"];

const download = {
    url: null,
    filename: null,
    getInfo: async ( rUrl, info ) => {
        execFile("youtube-dl", 
            infoparams( rUrl ), 
            ( err, stdout, stderr ) => {
                if( err ) throw err;
                
                info ? download.filename = JSON.parse( stdout )._filename : null;

                console.log( JSON.parse( stdout ).title )
        });
    },
    initialize: async ( retrievedUrl ) => {
        download.url = retrievedUrl;

        await download.getInfo( retrievedUrl )
        // console.log( info !== undefined ? info : "nothing to see here" );
    }

}

module.exports = download;
