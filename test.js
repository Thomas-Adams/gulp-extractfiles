var extract = require('./index.js');
var gulp = require('gulp');
var clean = require('gulp-clean');
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

var logger = function(msg){
	if(msg) console.log(msg); else console.log('Is called');
};

gulp.src(['./dist/_common/css/stylesheet.min.css','./dist/_common/js/app.min.js']).pipe(clean());

setTimeout(function(){
	gulp.src('./public/accordion-navigation.html').pipe(extract({js:true,jsDestination:'./dist/_common/',encoding:'utf8'},logger));
	gulp.src('./public/accordion-navigation.html').pipe(extract({js:false,cssDestination:'./dist/_common/',encoding:'utf8'},logger));
},2000);
	
setTimeout(function(){
	console.log('Automatic file concatenation and minimization of linked JavaScript works  : ' + fs.existsSync('./dist/_common/js/app.min.js'));
	console.log('Automatic file concatenation and minimization of linked Stylesheets works : ' + fs.existsSync('./dist/_common/css/stylesheet.min.css'));
},6000);

	
	
	