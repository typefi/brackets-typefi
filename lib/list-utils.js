/**
 * List utilities
 * @module ListUtils
 */

"use strict"
define((require, exports, module) => {

	/** Ramda library */
	const R = require('lib/ramda.min');

	/**
	 *
	 * Returns the first member of list matching the predicate, defaulting to the head if no match is found.
	 *
	 * @summary (a -> Boolean) -> [a] -> a
	 * @param {Function} predicate The predicate function used to test each list element
	 * @param {Array} list The array to search 
	 */
	module.exports.findDefaultingToHead = predicate => list => R.defaultTo(R.head(list), R.find(predicate, list));
});
