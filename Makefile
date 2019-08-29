DIST=${CURDIR}/dist
ASSETS=../public/

serve:
	npm run serve

all: build app css js img

build:
	npm run build

app:
	@cp $(DIST)/index.html ../server/views/admin.ejs

assets: clean css js img app

css:
	@cp $(DIST)/css/*  ../server/public/css/
js:
	@cp $(DIST)/js/*  ../server/public/js/
img:
	@cp $(DIST)/img/*  ../server/public/img/

clean:
	@rm -rf ../server/public/css/app.*.css
	@rm -rf ../server/public/css/chunk-vendors*.css
	@rm -rf ../server/public/js/chunk-vendors*.js
	@rm -rf ../server/public/js/chunk-vendors*.map
	@rm -rf ../server/public/js/app.*.js
	@rm -rf ../server/public/js/app.*.map
	@rm -rf ../server/public/js/about.*.map
	@rm -rf ../server/public/js/about.*.js
