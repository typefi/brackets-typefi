/**
 * CSS utilities
 * @module CssUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries 
	const R = require('lib/ramda.min'),
		pathUtils = require('lib/path-utils'),
		extensionUtils = brackets.getModule("utils/ExtensionUtils");

	// Style sheet names
	const typefiStyleSheetNames = ["typefi.css", "spinner.css"];

	// CSS directory
	const cssDirectory = '../css';

	/**
	 * Returns the path resolved against the CSS directory
	 * @summary String -> String
	 */
	const resolveCssDirectory = pathUtils.resolve(cssDirectory);

	// Stylesheets mapped to the css directory
	const typefiStyleSheets = typefiStyleSheetNames.map(resolveCssDirectory);

	/**
	 * Curried version of ExtensionUtils.loadStyleSheet from the Brackets API
	 * @summary Module -> String -> Promise
	 * @see {@link http://brackets.io/docs/current/modules/utils/ExtensionUtils.html#-loadStyleSheet|ExtensionUtils.loadStyleSheet}	
	 */
	const loadStyleSheetCurried = R.curry(extensionUtils.loadStyleSheet);

	/**
	 * Loads style sheet from specified String path, relative to this module, and returns a Promise
	 * which resolves with an HTML node if loading is successful
	 * @summary String -> Promise
	 */
	const loadStyleSheet = loadStyleSheetCurried(module);

	/**
	 * Loads every style sheet specified by the List of String paths relative to this module; returns
	 * the list of String paths
	 *
	 * @summary [String] -> [String]
	 */
	const loadStyleSheets = R.forEach(loadStyleSheet);

	/**
	 * Loads style sheets
	 * @summary * -> [String]
	 */
	module.exports.loadStyleSheets = () => loadStyleSheets(typefiStyleSheets);
});
