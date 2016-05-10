

# extractfiles

Gulp plugin, extract all script and css files with a html file, cancatenates and minimize them according
to the gulp-processhtml directives.

## Usage

```javascript
gulp.src('./public/accordion-navigation.html').pipe(extract({js:true,jsDestination:'./dist/_common/',encoding:'utf8'},logger));

gulp.src('./public/accordion-navigation.html').pipe(extract({js:false,cssDestination:'./dist/_common/',encoding:'utf8'},logger));
```

```javascript
options =
{
    js : (true extract js files, otherwise extract css files,
    cssDestination : destination folder for css file,
    jsDestination : destination folder for js file,
    encoding: default is utf8
}
```

### Test

To test call node test.js.

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
