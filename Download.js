const execFile 	= require( "child_process" ).execFile;
const fs 		= require( "fs" );

const params = ( url ) => [ url, "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", "-t"];
const infoparams = ( url ) => [ url, "-j"];

class Download {
	
	/* TODO:
	*	get URL
	*/
	constructor( url ) {
		this.url 		= url;
		this.metadata;
		this.dirName;
	}

	/* TODO:
	*	retrieve metadata
	*/
	get metadata() {

		return new Promise( () => {
			console.log( "retrieving metadata" );

			execFile("executables/youtube-dl", 
				infoparams( this.url ), 
				( err, stdout, stderr ) => {
					if( err ) throw err;
					
					this.metadata = JSON.parse( stdout )._filename;

					console.log( "metadata retrieved" );
			});

		});
	}
	
	/* TODO:
	* 	create directory
	*/
	createDir() {
		return new Promise( () => {

			// set directory name and swap space with underscore
			this.dirName = this.metadata.title.split( " " ).join( "_" );
			
			// TODO: not checked yet if exist
			fs.mkdir( this.dirName, err => {
				console.log( err );
			});
		});
	}
	
	/* TODO:
	*	download video
	*/
	download() {
		return new Promise( () => {
			console.log( `starting download for ${ this.dirName }` );

			// TODO: isn't downloading to directory yet
			execFile("executables/youtube-dl", 
            params( this.url ), 
            ( err, stdout, stderr ) => {
                if( err ) throw err;
                
        	});
		});
	}
	
	/* TODO:
	*	merge audio with video
	*/
	
	/* TODO:
	*	return video file
	*/
	
	/* TODO:
	*	delete after 10 minutes
	*/
	
}

/* TASKS: 
*	- get URL
*	- retrieve metadata
* 	- create directory
*	- download video
*	- merge audio with video
*	- return video file
*	- delete after 10 minutes
*/
