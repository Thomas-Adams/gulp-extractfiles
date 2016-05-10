var fs = require('fs');

module.exports = CommentParser;

function CommentParser(options){

	this.options = options || {};
	this.regStart = new RegExp('<!--\\s*' + this.options.commentMarker + ':' + this.options.buildType +'\\s*(.*?)\\s*-->');
	this.regEnd = new RegExp('(?:<!--\\s*)*\\/' + this.options.commentMarker);
	this.regScript = new RegExp('<script\\s*src="(.*?)"><\\/script>');
	this.regStyles = new RegExp('<link\\s*.*?href="(.*?)"');
}



CommentParser.prototype.getScriptBlocks= function(content) {
	return this.getBlocks(content, this.regScript);
};

CommentParser.prototype.getLinkBlocks= function(content) {
	return this.getBlocks(content, this.regStyles);
};


CommentParser.prototype.getBlocks = function(content, regBlock) {

	var lines = content.replace(/\r\n/g, '\n').split(/\n/);
	var inside = false;
	var files = {};
	var block = '';
	var regStart = this.regStart, regEnd = this.regEnd;
	
	lines.forEach(function (line) {
		var build = line.match(regStart);
		var endbuild = regEnd.test(line);
		
		if (build) {
			inside = true;
			block= build[1];
			files[block]=[];
		}
	
	
		if(inside && !build && !endbuild) {
		
			var match = line.match(regBlock);
			if(match[1]) {
				files[block].push(match[1]);
			}		
		}
	
	
		if(endbuild) {
			inside =false;
		}
	});
	
	//console.log(JSON.stringify(files));
	return files; 
};





