all:
	bundle exec jekyll serve --livereload --watch

img:
	rm -f assets/img/**/*_tn.jpg
	python scripts/process_img.py