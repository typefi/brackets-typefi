/**
 * XMLHttpRequest utilities
 * @module XMLHttpRequestUtils
 */

"use strict"
define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		servletUtils = require('lib/servlet-utils'),
		pathUtils = require('lib/path-utils'),
		nativeApp = brackets.getModule("../utils/NativeApp"),
		listUtils = require('lib/list-utils');

	/**
	 * Adds the Function or EventListener to the EventTarget as a listener for the
	 * event named by the String
	 *
	 * @summary String -> Function -> EventTarget ->  Void 
	 * @summary String -> EventListener -> EventTarget ->  Void 
	 */
	const addEventListener = R.invoker(2, 'addEventListener');

	/**
	 * Returns the target XmlHttpRequest property of the XMLHttpRequestProgressEvent parameter
	 *
	 * @summary XMLHttpRequestProgressEvent -> XmlHttpRequest 
	 */
	const target = R.prop('target');

	/**
	 * Returns the String responseText property of the XMLHttpRequest parameter
	 *
	 * @summary XMLHttpRequest -> String 
	 */
	const responseText = R.prop('responseText');

	/**
	 * Returns the String path property of the JSON parameter
	 *
	 * @summary JSON -> String 
	 */
	const path = R.prop('path');

	/**
	 * Returns the String outputs property of the JSON parameter
	 *
	 * @summary JSON -> String 
	 */
	const outputs = R.prop('outputs');

	/**
	 * Returns the String href property of the URL parameter
	 *
	 * @summary URL -> String 
	 */
	const href = R.prop('href');

	/**
	 * Returns the String parameter parsed as an Object
	 * using the JSON parameter
	 *
	 * @summary JSON -> String -> Object 
	 */
	const parse = R.flip(R.invoker(1, 'parse'));

	/**
	 * Returns the String parameter parsed as a JSON Object
	 *
	 * @summary String -> Object 
	 */
	const jsonParse = parse(JSON);

	/**
	 * Returns the String responseText property of the XMLHttpRequest parameter
	 * parsed as a JSON Object
	 *
	 * @summary XMLHttpRequest -> Object 
	 */
	const responseTextAsJson = R.pipe(responseText, jsonParse);

	/**
	 * Returns true if the XmlHttpRequest status property is OK, ie has value 200
	 *
	 * @summary XmlHttpRequest -> Boolean
	 */
	const statusIsOk = R.propEq('status', 200);

	/**
	 * Returns the first list member that is pdf, ie has the pdf extension, or the head
	 * of the list if no such item exists
	 *
	 * @summary [String] -> String
	 */
	const getPdfOrFirstOutput = listUtils.findDefaultingToHead(pathUtils.isPdf);

	/**
	 * Opens the string href in the default browser
	 *
	 * @summary String -> Void
	 */
	const openHrefInBrowser = R.pipe(href, nativeApp.openURLInDefaultBrowser);

	/**
	 * Returns the first pdf element of the outputs property of the JSON data parameter
	 * (or the first element if no pdf member exists) resolved against the
	 * path property of the JSON data parameter as String. The returned value is made local,
	 * ie has the leading / removed if present.
	 *
	 * @summary JSON -> String
	 * @param {JSON} data JSON data for which the path property is to be resolved and returned
	 */
	const getOutputUrl = data => pathUtils.resolveAsLocal(path(data))(getPdfOrFirstOutput(outputs(data)));

	/**
	 * Returns the first pdf element of the outputs property of the JSON parameter
	 * (or the first element if no pdf member exists) resolved against the
	 * path property of the JSON parameter as a Promise containing a URL. 
	 * The returned value is made local,
	 * ie has the leading / removed if present, and resolved against the files API.
	 *
	 * @summary JSON -> Promise[URL]
	 */
	const getOutputApiPath = R.pipe(getOutputUrl,
		servletUtils.resolveFilesApiWithSearch);

	/**
	 * Opens in the default browser the first pdf element of the outputs property of the JSON parameter 
	 * resolved against the path property of the JSON parameter, which is
	 * in turn resolved against the files API.
	 *
	 * @summary JSON -> Void
	 */
	const openJobOutputInBrowser = R.pipeP(getOutputApiPath, openHrefInBrowser);

	/**
	 * Parses the response text of the XMLHttpRequest as JSON, then
	 * opens in the default browser the first pdf element of the outputs property of this JSON object 
	 * resolved against the path property of the JSON object, which is
	 * in turn resolved against the files API.
	 *
	 * @summary XMLHttpRequest -> Void
	 */
	const openResponseInBrowser = R.pipe(responseTextAsJson, openJobOutputInBrowser);

	/**
	 * Shows alert with the specified message
	 *
	 * @summary String -> Void
	 * @param {String} message
	 */
	const alert = message => window.alert(message);

	/**
	 * Shows alert containing the response text of the XMLHttpRequest parameter
	 *
	 * @summary XMLHttpRequest -> Void
	 */
	const alertResponseText = R.pipe(responseText, alert);

	/**
	 * If the XmlHttpRequest status property is OK, ie has value 200 then
	 * the first output pdf (or first output if no pdf output exists) is opened in the browser
	 * specified in the XmlHttpRequest response text is opened in the default browser;
	 * otherwise an alert is shown containing the response text
	 *
	 * @summary XmlHttpRequest -> Void
	 */
	const openResponseOrShowAlert = R.ifElse(statusIsOk, openResponseInBrowser,
		alertResponseText);

	/**
	 * Adds the Function or EventListener to the EventTarget as a listener for the
	 * load event
	 *
	 * @summary Function -> EventTarget ->  Void 
	 * @summary EventListener -> EventTarget ->  Void 
	 */
	module.exports.addLoadListener = addEventListener("load");

	/**
	 * Posts the form data asynchronously to the url using the xmlHttpRequest 
	 * with username and password taken from settings.
	 * @summary XMLHttpRequest -> FormData -> String -> Settings -> Void
	 * @param {XMLHttpRequest} xmlHttpRequest The XMLHttpRequest to post 
	 * @param {FormData} formData The form data to post
	 * @param {String} url The url to which the post is to be sent
	 * @param {Settings} settings A Settings object containing username and password properties
	 */
	module.exports.asyncPost = xmlHttpRequest => formData => url => settings => {
		xmlHttpRequest.open("POST", url, true, settings.username, settings.password);
		xmlHttpRequest.send(formData);
	}

	/**
	 * If the XMLHttpRequestProgressEvent parameter indicates success then the first output
	 * pdf (or first output if no pdf exists) is opened in the browser; otherwise an alert
	 * is shown containing the response text
	 * @summary XMLHttpRequestProgressEvent -> Void 
	 */
	const openLoadResponse = R.pipe(target, openResponseOrShowAlert);

	/**
	 * Adds a load listener that opens the first pdf output (or first output if no pdf output exists)
	 * in the browser, or shows an alert if the XmlHttpRequest was not executed successfully
	 * 
	 * @summary XmlHttpRequest -> Void
	 *
	 */
	module.exports.addLoadListenerOpenResponseOrShowAlert = module.exports.addLoadListener(openLoadResponse);

	/**
	 * Returns a new XMLHttpRequest object 
	 *
	 * @summary * -> XMLHttpRequest
	 */
	module.exports.constructXmlHttpRequest = R.constructN(0, XMLHttpRequest);

	/**
	 * Adds the Function or EventListener to the EventTarget as a listener for the
	 * error 
	 *
	 * @summary Function -> EventTarget ->  Void 
	 * @summary EventListener -> EventTarget ->  Void 
	 */
	module.exports.addErrorListener = addEventListener("error");
});
