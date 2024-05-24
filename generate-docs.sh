#!/bin/bash

# Generate documentation using JSDoc
jsdoc -c jsdoc.config.js

# Open the generated documentation in the default browser
open ./docs/index.html
