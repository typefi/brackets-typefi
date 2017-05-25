/**
 * Blob utilities
 * @module BlobUtils
 */

"use strict"


define((require, exports, module) => {

	// Library
	const R = require('lib/ramda.min');

	/**
	 * Returns a Blob that concatenates values in the parameter array, which may contain
	 * String, ArrayBuffer, ArrayBufferView, Blob or any combination thereof
	 *
	 * @summary [String] -> Blob 
	 * @summary [ArrayBuffer] -> Blob 
	 * @summary [ArrayBufferView] -> Blob 
	 * @summary [Blob] -> Blob 
	 */
	const constructBlob = R.constructN(1, Blob);

	/**
	 * Returns a Blob containing the parameter, which may be of String, ArrayBuffer, ArrayBufferView
	 * or Blob type
	 * 
	 * @summary String -> Blob 
	 * @summary ArrayBuffer -> Blob 
	 * @summary ArrayBufferView -> Blob 
	 * @summary Blob -> Blob 
	 */
	module.exports.toBlob = R.pipe(R.of, constructBlob);

});
