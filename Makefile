all:
	bundle exec jekyll serve --livereload --watch

deploy:
	cp node_modules/d3/dist/d3.min.js js

img:
	rm -f assets/img/**/*_tn.jpg
	python scripts/process_img.py
