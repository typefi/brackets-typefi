/**
 * jQuery utilities
 * @module jQueryUtils
 */

"use strict"

define((require, exports, module) => {

	// Library
	const R = require('lib/ramda.min');

	/**
	 * Creates a jQuery object using the specified String selector
	 *
	 * @summary String -> jQuery
	 */
	const constructJQuery = R.constructN(1, $);

	/**
	 * Returns the named function as a function accepting the target object with zero parameters
	 *
	 * @summary String -> (a -> b -> ... -> n -> Object -> *)
	 */
	const invokeZero = R.invoker(0);

	/**
	 * Returns the named function as a function accepting the target object with one parameter
	 *
	 * @summary String -> (a -> b -> ... -> n -> Object -> *)
	 */
	const invokeOne = R.invoker(1);


	/**
	 * Appends the HTML string to the jQuery object
	 *
	 * @summary jQuery -> String -> jQuery
	 */
	const append = R.flip(invokeOne('append'));

	/**
	 * Binds the handler function to the jQuery object click event
	 *
	 * @summary  (* -> a) -> jQuery -> jQuery
	 */
	const click = invokeOne('click');

	/**
	 * Shows the jQuery object selected using the specified String selector
	 *
	 * @summary String -> jQuery
	 */
	const show = R.pipe(constructJQuery, invokeZero('show'));

	/**
	 * Hides the jQuery object selected using the specified String selector
	 *
	 * @summary String -> jQuery
	 */
	const hide = R.pipe(constructJQuery, invokeZero('hide'));

	/**
	 * Appends the HTML string to the jQuery object created using the specified String selector
	 *
	 * @summary String -> String -> jQuery
	 */
	module.exports.append = R.pipe(constructJQuery, append);

	/**
	 * Shows or hides the jQuery object selected using the specified String selector
	 * according to the Boolean parameter
	 *
	 * @summary String -> Boolean -> jQuery
	 * @param {String} selector jQuery selector
	 * @param {Boolean} show True if jQuery object is to be shown, false if jQuery 
	 * object is to be hidden
	 */
	module.exports.toggle = selector => showObject => showObject ? show(selector) : hide(selector);

	/**
	 * Binds the handler function to the jQuery object selected using the specified String selector
	 *
	 * @summary String -> (a -> *) -> jQuery
	 * @param {String} selector jQuery selector
	 * @param {Function} handler function to bind to click event
	 */
	module.exports.click = selector => handler => click(handler, constructJQuery(selector));

});
