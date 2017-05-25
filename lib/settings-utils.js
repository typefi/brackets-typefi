/**
 * Setting utilities
 * @module SettingUtils
 */

"use strict"

/** Settings utilities */
define((require, exports, module) => {

	// Libraries
	const fileUtils = brackets.getModule("file/FileUtils"),
		fileSystem = brackets.getModule("filesystem/FileSystem"),
		pathUtils = require('lib/path-utils'),
		R = require('lib/ramda.min');

	// String settings path
	const settingsPath = pathUtils.resolveAsModulePath("settings.json");

	// Settings File
	const settingsFile = fileSystem.getFileForPath(settingsPath);

	/**
	 * Returns a Promise containing an Object, created by reading from the
	 * specified File as text and parsing as JSON
	 * 
	 * @summary File -> Promise[Object]
	 */
	const readAsJson = R.pipeP(fileUtils.readAsText, JSON.parse);

	/**
	 * Returns a Promise containing the Settings object read from the settings file
	 * 
	 * @summary * -> Promise[Settings]
	 */
	const readSettings = () => readAsJson(settingsFile);

	/**
	 * Returns a Promise containing the specified property of the Settings object,
	 * which is read from the settings file
	 * 
	 * @summary String -> Promise[String]
	 * @param {String} property Property to return as a Promise
	 */
	const readProperty = property => R.composeP(R.prop(property), readSettings);

	/**
	 * Returns a Promise containing the String serverApi setting
	 * 
	 * @summary * -> Promise[String]
	 */
	module.exports.serverApi = readProperty('serverApi');

	/**
	 * Returns a Promise containing the String customer setting
	 * 
	 * @summary * -> Promise[String]
	 */
	module.exports.customer = readProperty('customer');

	/**
	 * Returns a Promise containing the String workflow setting
	 * 
	 * @summary * -> Promise[String]
	 */
	module.exports.workflow = readProperty('workflow');

	/**
	 * Returns a Promise containing the Settings object read from the settings file
	 * 
	 * @summary * -> Promise[Settings]
	 */
	module.exports.settings = readSettings;
});
