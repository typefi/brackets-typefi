/**
 * URL utilities
 * @module UiUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		stringUtils = require('lib/string-utils');

	/**
	 * Returns a URL object created using the specified url String / URL resolved against base
	 *
	 * @summary String -> String -> URL
	 * @summary String -> URL -> URL
	 */
	module.exports.resolveUrl = R.constructN(2, URL);

	/**
	 * Returns the Strings concatenated with '=' between them. 
	 * @summary String -> String -> String
	 */
	const joinEquals = stringUtils.concatenate('=');

	/**
	 * Returns url with search set to the search key and search value separated by equals. 
	 * @summary URL -> String -> String -> URL
	 * @param {URL} url URL to which search is to be added
	 * @param {String} searchKey Search key to add
	 * @param {String} searchValue Search value to add
	 */
	module.exports.addSearch = url => searchKey => searchValue => {
		url.search = joinEquals(searchKey)(searchValue);
		return url;
	}

});
