all:
	bundle exec jekyll serve --livereload --watch

build:
	bundle exec jekyll build --trace

net:
	bundle exec jekyll serve --livereload --watch --host `ipconfig getifaddr en0`

pserve:
	JEKYLL_PROFILE=1 bundle exec jekyll serve --livereload --watch

serve:
	bundle exec jekyll serve --livereload --watch

deploy:
	cp node_modules/d3/dist/d3.min.js js

WALK_TZ = America/Los_Angeles
WALK_PYTHON ?= uv run --no-project --python-preference only-managed --python 3.11 --with imageai==3.0.3 --with torch --with torchvision --with opencv-python --with pillow --with "numpy<2" --with scipy --with matplotlib --with tqdm python

walk-import:
	TZ=$(WALK_TZ) ./util.py series japan-walk --action refresh --exif-rename

walk:
	TZ=$(WALK_TZ) $(WALK_PYTHON) annotate.py
	./util.py photo-chain _data/2024-04-16-japan-walk/metadata.json
	$(MAKE) walk-thumbs

WALK_IMG = assets/img/posts/2024-04-16-japan-walk
SRGB_ICC = /System/Library/ColorSync/Profiles/sRGB Profile.icc

walk-thumbs:
	mkdir -p $(WALK_IMG)/thumb
	cd $(WALK_IMG) && find . -maxdepth 1 -name "*.webp" -print0 | xargs -0 -P 8 -I{} magick {} -resize '900x900>' -profile "$(SRGB_ICC)" -strip -quality 78 -define webp:method=6 thumb/{}

img:
	rm -f assets/img/**/*_tn.jpg
	rm -f assets/img/posts/**/*_tn.jpg
	python util.py process-img
