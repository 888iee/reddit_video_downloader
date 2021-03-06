const { resolve } = require("path");

const execFile 	= require( "child_process" ).execFile;
// const ffmpeg	= require( "ffmpeg" );

const params = ( url ) => [ url, "--restrict-filenames", "--no-call-home", "--no-continue", "--no-part", "--no-cache-dir", "-otemp/%(id)s/%(id)s.%(ext)s", "--no-playlist", "--console-title"];
const infoparams = ( url ) => [ url, "-j"];


module.exports = class Download {
	
	/* TODO: get URL
	*/
	constructor( url ) {
		this.url 		= url;
		this.metadata;
		this.title;
		this.path;
	}


	/* TODO: retrieve metadata
	*/
	getMetadata() {

		return new Promise(( resolve ) => {
			console.log( "retrieving metadata" );

			execFile( "executables/youtube-dl", 
				infoparams( this.url ), 
				( err, stdout, stderr ) => {
					if( err ) throw err;
					
					this.metadata = JSON.parse( stdout );

					console.log( "metadata retrieved" );
					
					// set directory name and swap space with underscore
					this.title = this.metadata.title.split( " " ).join( "_" );
					resolve();
			});
		});
	}
	
	
	/* TODO: download video
	*/
	download() {
		return new Promise(( resolve ) => {
			console.log( `starting download for ${ this.title }` );

			// TODO: isn't downloading to directory yet
			execFile( "executables/youtube-dl", 
            params( this.url ), 
            ( err, stdout, stderr ) => {
				if( err ) throw err;
				this.path = `temp/${ this.metadata.id }/${ this.metadata.id }.mp4`;
				resolve();
                
        	});
		});
	}
	
	/* TODO: merge audio with video
	*/
	mergeAudioWithVideo() {
		return new Promise(( resolve ) => {
			console.log( `merging ${ this.title }` );

		});
	}

	/* TODO: return video file
	*/
	startProcessing() {
		return new Promise(( resolve ) => {
			this.getMetadata()
				.then(() => this.download() )
				.then(() => resolve( this.path ))
				.catch( err => console.log( err ) );
		});
	}
	/* TODO: delete after 10 minutes
	*/
	
}


