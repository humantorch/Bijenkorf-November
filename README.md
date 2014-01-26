#Bijenkorf November app content

This experience was built for De Bijenkorf's iPad app. Since the app is a native wrapper for a standards-based CMS, I was able to use HTML, CSS, and JavaScript to create the experience. This particular piece of content strictly used multiple photographs and advanced CSS3 techniques (animations, gradient masking, filters) to emulate different types of lights turning on and off in each "scene."

This content is best viewed on an iPad (in landscape orientation, as that was the only format supported by the app), but it will also function in Chrome and Safari (and possibly on an Android tablet, but it was never tested there #becauseAndroid). Because the final platform was restricted to iOS there is a lot of Webkit-specific code used and will completely break in Firefox/IE/older Opera/etc. Also note: no jQuery used in this project. jQuery's a great tool but I've been working towards weaning myself off of it as much as possible. Anything I would have potentially used it for in this project was already natively supported by Mobile Safari's engine.

The project can be viewed at http://prayingmadness.com/Bijenkorf-November/. (Note: swiping left and right will switch "scenes.")


This site is built using the <a href="http://yeoman.io">Yeoman</a> build system. All files in the repo are the _development_ files (unminified, unconcatenated, etc.), the production-ready files are generated in a .gitignore'd /dist directory when the build script is run.

Basic deployment instructions:
* Install Yeoman (really only OS X and *nix for now, though some people have got it running in Windows)
* From the command line, `cd` into the project directory
* `grunt server` will kick off the preview server and initialize the Live Reload script. 
* Editing the HTML, JS, or SASS files will automatically refresh the site
* *NOTE: DO NOT EDIT CSS DIRECTLY, ALL STYLES SHOULD BE ADDED IN THE main.scss FILE FOR CSS GENERATION
* to run the build script, CTRL-C in the Terminal to stop the preview server, then type `grunt`. The build script will run (JS & CSS files concatenated and minified, images optimized, cachebusters added to filenames)
* A production-ready build of the site will be in /dist at the root of the project directory. Note that /dist is included in .gitignore, so will not be added to version control.
