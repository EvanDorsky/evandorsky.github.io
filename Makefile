all:
	bundle exec jekyll serve --livereload --watch

build:
	bundle exec jekyll build --trace

serve:
	# bundle exec jekyll serve --livereload --watch --host `ipconfig getifaddr en0`
	bundle exec jekyll serve --livereload --watch

deploy:
	cp node_modules/d3/dist/d3.min.js js

img:
	rm -f assets/img/**/*_tn.jpg
	rm -f assets/img/film/**/*_tn.jpg
	python util.py process-img
