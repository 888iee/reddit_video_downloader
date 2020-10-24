const execFile = require( "child_process" ).execFile;

const params = ( url ) => [ url, "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", "-t"];
const infoparams = ( url ) => [ url, "-j"];

const download = {
    url: null,
    getInfo: async ( rUrl, info ) => {
        execFile("executables/youtube-dl", 
                infoparams( rUrl ), 
                ( err, stdout, stderr ) => {
                    if( err ) throw err;
                    
                    info ? download.filename = JSON.parse( stdout )._filename : null;

                    download.startDownload( JSON.parse( stdout ).title );
                

        });
    },
    initialize: async ( retrievedUrl ) => {
        download.url = retrievedUrl;

        await download.getInfo( retrievedUrl )
    
    },
    startDownload: ( name ) => {
        console.log( "starting download" );
        
        execFile("executables/youtube-dl", 
            params( download.url ), 
            ( err, stdout, stderr ) => {
                if( err ) throw err;
                
        });

        console.log( `downloading ${ name } finished.` );

    }

}

module.exports = download;
