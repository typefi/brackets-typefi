/**
 * String utilities
 * @module StringUtils
 */

"use strict"

define((require, exports, module) => {

	// Ramda library
	const R = require('lib/ramda.min');

	/**
	 * Returns true if searchString is the start of string
	 * 
	 * @summary String -> String -> Boolean
	 */
	const startsWith = R.invoker(1, 'startsWith');

	/**
	 * Returns true if searchString is the end of string
	 * 
	 * @summary String -> String -> Boolean
	 */
	const endsWith = R.invoker(1, 'endsWith');

	/**
	 * Returns string with the first character removed
	 * 
	 * @summary String -> String
	 */
	const removeStart = R.invoker(1, 'slice')(1);

	/**
	 * Returns string with the last character removed
	 * 
	 * @summary String -> String
	 */
	const removeEnd = R.invoker(2, 'slice')(0, -1);

	/**
	 * Returns string with searchString removed from the start, unless it is not present in which case the
	 * string is returned unchanged
	 * 
	 * @summary String -> String -> String
	 * @param {String} seachString search string to remove from the start if present
	 */
	module.exports.removeStartIfPresent = searchString => R.ifElse(startsWith(searchString), removeStart, R.identity);

	/**
	 * Returns string with searchString removed from the end, unless it is not present in which case the
	 * string is returned unchanged
	 * 
	 * @summary String -> String -> String
	 * @param {String} seachString search string to remove from the end if present
	 */
	module.exports.removeEndIfPresent = searchString => R.ifElse(endsWith(searchString), removeEnd, R.identity);

	/**
	 * Returns stringA and stringB concatenated with separator between them. The function ensures that the
	 * separator will only be included once. 
	 * 
	 * @example 
	 * // Returns 'foo/baa'
	 * module.exports.concatenate('/')('foo')('baa');
	 * module.exports.concatenate('/')('foo')('/baa');
	 * module.exports.concatenate('/')('foo/')('baa');
	 * module.exports.concatenate('/')('foo/')('/baa');
	 * @summary String -> String -> String -> String
	 * @param {String} separator separator
	 * @param {String} stringA first string
	 * @param {String} stringB second string
	 */
	module.exports.concatenate = separator => stringA => stringB => module.exports.removeEndIfPresent(separator)(stringA) + separator + module.exports.removeStartIfPresent(separator)(stringB);

	/**
	 * Returns string, defaulting to empty string if the string is null or undefined
	 * 
	 * @summary String -> String
	 */
	module.exports.defaultToEmptyString = R.defaultTo("");

});
