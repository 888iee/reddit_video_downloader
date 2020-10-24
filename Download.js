const execFile 	= require( "child_process" ).execFile;
const fs 		= require( "fs" );

const params = ( url ) => [ url, "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", "-t"];
const infoparams = ( url ) => [ url, "-j"];


module.exports = class Download {
	
	/* TODO: get URL
	*/
	constructor( url ) {
		this.url 		= url;
		this.metadata;
		this.title;
	}


	/* TODO: retrieve metadata
	*/
	getMetadata() {

		return new Promise( (resolve) => {
			console.log( "retrieving metadata" );

			execFile("executables/youtube-dl", 
				infoparams( this.url ), 
				( err, stdout, stderr ) => {
					if( err ) throw err;
					
					this.metadata = JSON.parse( stdout );

					console.log( "metadata retrieved" );
					resolve();
			});
		});
	}
	
	/* TODO: create directory
	*/
	createDir() {
		return new Promise( () => {

			// set directory name and swap space with underscore
			this.title = this.metadata.title.split( " " ).join( "_" );
			
			// TODO: not checked yet if exist
			fs.mkdir( `./temp/${ this.title }`, err => err ? console.log( err ) : true );
		});
	}
	
	/* TODO: download video
	*/
	download() {
		return new Promise( () => {
			console.log( `starting download for ${ this.title }` );

			// TODO: isn't downloading to directory yet
			execFile("executables/youtube-dl", 
            params( this.url ), 
            ( err, stdout, stderr ) => {
                if( err ) throw err;
                
        	});
		});
	}
	
	/* TODO: merge audio with video
	*/
	
	/* TODO: return video file
	*/
	startProcessing() {
		this.getMetadata()
			.then( () => this.createDir() )
			.then( () => this.download() );
	}
	/* TODO: delete after 10 minutes
	*/
	
}


