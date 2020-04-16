

##Available commands
```
npm run dev
npm run build
npm run clean
```

###Source code structure
```
root
|--src
|   |--assets
|   |   |--fonts
|   |   |--img
|   |   |--js
|   |   |--sass
|   |   |--vendor
|   |   
|   |--pages
|   |   |--index.html
|   |   |--example.html
|
|--gulpfig.js
```


#####Dist code structure(After ``npm run build``)
```
root
|--dist
|   |--assets
|   |   |--fonts
|   |   |--img
|   |   |--js
|   |   |   |--vendor.js
|   |   |   |--vendor.min.js
|   |   |   |--main.js
|   |   |   |--main.min.js
|   |   |
|   |   |--css
|   |   |   |--vendor.css
|   |   |   |--vendor.min.css
|   |   |   |--main.css
|   |   |   |--main.min.css
|   |   
|   |
|   |--index.html
|   |--example.html
```

