/**
 * Path utilities
 * @module PathUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries 
	const fileUtils = brackets.getModule("file/FileUtils"),
		stringUtils = require("lib/string-utils"),
		documentManager = brackets.getModule("document/DocumentManager"),
		R = require('lib/ramda.min');

	// Extensions
	const pdf = 'pdf',
		md = 'md';

	// Path separator
	const pathSeparator = '/';

	// Current document path
	const currentDocumentPath = R.pipe(documentManager.getCurrentDocument, R.path(['file', 'fullPath']));

	// Current document path, defaulting to empty String if this is undefined or null
	const currentDocumentPathDefaultToEmptyString = R.pipe(currentDocumentPath, stringUtils.defaultToEmptyString);

	/**
	 * Extracts the extension from the String path and returns it converted to lower case
	 * @summary String -> String
	 */
	const getExtensionLowerCase = R.pipe(fileUtils.getFileExtension, R.toLower);

	/**
	 * Returns true if the String path has the String extension
	 * @summary String -> String -> Boolean
	 * @param String extension Extension with which the path extension is to be compared
	 */
	const hasExtension = extension => R.pipe(getExtensionLowerCase, R.equals(extension));

	/**
	 * Returns true if the String path is pdf, ie has the pdf extension
	 * @summary String -> Boolean
	 */
	module.exports.isPdf = hasExtension(pdf);

	/**
	 * Returns true if the String path is md, ie has the md extension
	 * @summary String -> Boolean
	 */
	const isMd = hasExtension(md);

	/**
	 * Returns the String path made local, ie with leading '/' removed if present
	 * @summary String -> String
	 */
	module.exports.makeLocal = stringUtils.removeStartIfPresent(pathSeparator);

	/**
	 * Returns the second String path resolved against the first. The function ensures 
	 * that the path separator will only be included once. 
	 * 
	 * @example 
	 * // Returns 'foo/baa'
	 * module.exports.resolve('foo')('baa');
	 * module.exports.resolve('foo')('/baa');
	 * module.exports.resolve('foo/')('baa');
	 * module.exports.resolve('foo/')('/baa');
	 * @summary String -> String -> String
	 */
	module.exports.resolve = stringUtils.concatenate(pathSeparator);

	/**
	 * Returns the second String path resolved against the first as a local path. The function
	 * ensures that the path separator will only be included once. 
	 * 
	 * @example 
	 * // Returns 'foo/baa'
	 * module.exports.resolve('/foo')('baa');
	 * module.exports.resolve('/foo')('/baa');
	 * module.exports.resolve('foo/')('baa');
	 * module.exports.resolve('foo/')('/baa');
	 * @summary String -> String -> String
	 * @param {String} path Path to resolve against the first path
	 */
	module.exports.resolveAsLocal = path => R.pipe(module.exports.resolve(path), module.exports.makeLocal);

	/**
	 * Returns true if the current document path is md, ie has the md extension
	 * @summary * - > Boolean
	 */
	module.exports.isCurrentDocumentMarkdown = R.pipe(currentDocumentPathDefaultToEmptyString, isMd);

	/**
	 * Returns the String path resolved as a module path
	 * @summary String - > String
	 */
	module.exports.resolveAsModulePath = require.toUrl;
});
