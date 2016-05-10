var fs          = require('fs');
var through     = require('through2');
var gutil       = require('gulp-util');
var _			= require('lodash');
var PluginError = gutil.PluginError;
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var cssmin		= require('gulp-cssmin');
var CommentParser = require('./commentparser.js');
var gulp = require('gulp');

module.exports = function(opts,callback) {
	
	var cssDestination = opts.cssDestination;
	var jsDestination = opts.jsDestination;
	var enc =opts.encoding;
	return through.obj(function(file, enc, callback){
		if (file.isNull() || file.isDirectory()) {	            
	        return callback();
	    }
		
		if (file.isStream()) {
	        this.emit('error', new PluginError({
	            plugin: 'FileExtractor',
	            message: 'Streams are not supported.'
	        }));
	        return callback();
	    }
		
		var result = {};
		
		if(opts.js) {		
			var parser = new CommentParser({"commentMarker":"build","buildType":"js"});							
			var content = fs.readFileSync(file.path,enc);
			//console.log(content);
			if (file.isBuffer()) {				
				
				result =  parser.getScriptBlocks(content);
				_.map(result, function(files,dest){	
					//console.log(JSON.stringify(files));
					//console.log(JSON.stringify(dest));
					var srcFiles = _.map(files, function(f){
						return './public/' + f;
					}); 
					
					gulp.src(srcFiles).pipe(concat(dest)).pipe(uglify({mangel:true,compress:true})).pipe(gulp.dest(jsDestination+'/js/'));					
				});
				this.push(file);
				return callback();
			}
		} else {
			var parser = new CommentParser({"commentMarker":"build","buildType":"css"});				
			var content = fs.readFileSync(file.path,enc);
			if (file.isBuffer()) {															
				result =  parser.getLinkBlocks(content);
				_.map(result, function(files,dest){
					var srcFiles = _.map(files, function(f){
						return './public/' + f;
					});
					gulp.src(srcFiles).pipe(concat(dest)).pipe(cssmin()).pipe(gulp.dest(cssDestination+'/css/'));					
				});
				this.push(file);
				return callback();
			}
		}							
	});
};