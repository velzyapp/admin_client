DIST=${CURDIR}/dist
ASSETS=../public/

all: build app css js img

build:
	npm run build

app:
	@cp $(DIST)/index.html ./serverviews/admin.ejs

css:
	@cp $(DIST)/css/*  ../server/public/css/
js:
	@cp $(DIST)/js/*  ./serverpublic/js/
img:
	@cp $(DIST)/img/*  ./serverpublic/img/
