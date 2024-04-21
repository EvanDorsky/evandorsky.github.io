all:
	bundle exec jekyll serve --livereload --watch

build:
	bundle exec jekyll build --trace

net:
	bundle exec jekyll serve --livereload --watch --host `ipconfig getifaddr en0`

serve:
	bundle exec jekyll serve --livereload --watch

deploy:
	cp node_modules/d3/dist/d3.min.js js

walk:
	./util.py series japan-test --action refresh --exif-rename
	./annotate.py
	./util.py photo-chain _data/2024-04-16-japan-test/metadata.json

img:
	rm -f assets/img/**/*_tn.jpg
	rm -f assets/img/posts/**/*_tn.jpg
	python util.py process-img
