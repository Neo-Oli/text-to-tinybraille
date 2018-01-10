JS:= text-to-tinybraille.js
minify: vendor/autoload.php text-to-tinybraille.min.js
text-to-tinybraille.min.js: $(JS)
	php -r "\
		require __DIR__ . '/vendor/autoload.php';\
		use MatthiasMullie\Minify;\
		\$$minifier = new Minify\JS();\
		foreach(explode(' ','$(JS)') as \$$file){\
			\$$minifier->add(\$$file);\
			}\
		\$$minifier->minify('$@');\
	"

.PHONY: clean
clean:
	rm -frv vendor
	rm -frv text-to-tinybraille.min.js

.PHONY: deps_update
deps_update:
	composer update
.PHONY: setup
setup: vendor/autoload.php

composer.lock: composer.json
	composer install
	touch $@
vendor/autoload.php: composer.lock
	composer install
	touch $@

