# PWA 👣  
Progressive Web Apps ♪ step-by-step ooh baby… ♪  

## 1. Preparation
Place your *plain web site* files in a web server directory. Why? Because we need to test it later on between online and offline state.  
> Don't forget the ```favicon.ico``` as it will be used as app icon later on.  

Test it online, make sure it runs properly before carry on.  
Don't bother do an offline test, obviously won't work for now. 

## 2. Organization  
Open ```index.html``` in an editor, look inside the ```<head>``` tag, in this case it was:  
```html
<head>
	<title>Progressive Web Apps 👣</title>
	<meta charset="UTF-8" />
	<meta name="Description" content="Progressive Web Apps ♪ step-by-step ooh baby… ♪" />
	<link href="css/github-markdown.css" rel="stylesheet">
	<link href="css/ssc.css" rel="stylesheet">
	<script type="text/javascript" src="jss/jquery-3.6.0.min.js"></script>
	<script type="text/javascript" src="jss/marked.min.js"></script>
</head>
```  
> Sometimes ```.css``` and ```.js``` script has some too, better check them out.  

List **all the required files**, which are:  
```
css/github-markdown.css
css/ssc.css
jss/jquery-3.6.0.min.js
jss/marked.min.js
pre.md
index.html
favicon.ico
```
> It's okay to have some files being forgotten, add them later.  
