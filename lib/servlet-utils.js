/**
 * Servlet utilities
 * @module ServletUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		settingsUtils = require('lib/settings-utils'),
		urlUtils = require('lib/url-utils');

	// Servlets
	const filesServlet = "files/",
		workflowsServlet = "workflows/";

	/**
	 * Returns Promise containing url with customer, read from the settings JSON, 
	 * appended as search parameter
	 * 
	 * @summary URL -> Promise[URL]
	 * @param {URL} url URL to which customer is to be added
	 */
	const addSearchCustomer = url => settingsUtils.customer().then(urlUtils.addSearch(url)('customer'));

	/**
	 * Returns Promise containing url resolved against the server API url,
	 * read from the settings JSON
	 * 
	 * @summary String -> Promise[URL]
	 * @param {String} url URL to resolve against the server API
	 */
	const resolveServerApi = url => settingsUtils.serverApi().then(urlUtils.resolveUrl(url));

	/**
	 * Returns Promise containing url resolved against servlet, 
	 * which is in turn resolved against the 
	 * server API url, read from the settings JSON
	 * 
	 * @summary String -> String -> Promise[URL]
	 * @param {String} servlet Servlet to resolve against the server API
	 * @param {String} url URL to resolve against the servlet
	 */
	const resolveServletApi = servlet => url => resolveServerApi(servlet).then(urlUtils.resolveUrl(url));

	/**
	 * Returns Promise containing url resolved against the files servlet
	 * 
	 * @summary String -> Promise[URL]
	 */
	const resolveFilesServletApi = resolveServletApi(filesServlet);

	/**
	 * Returns Promise containing url resolved against the workflows servlet
	 * 
	 * @summary String -> Promise[URL]
	 */
	const resolveWorkflowsServletApi = resolveServletApi(workflowsServlet);

	/**
	 * Returns Promise containing url resolved against the workflows servlet,
	 * with customer, read from the settings JSON, 
	 * appended as search parameter
	 * 
	 * @summary String -> Promise[URL]
	 */
	const resolveWorkflowsApiWithSearch = R.pipeP(resolveWorkflowsServletApi, addSearchCustomer);

	/**
	 * Returns Promise containing url resolved against the files servlet,
	 * with customer, read from the settings JSON, 
	 * appended as search parameter
	 * 
	 * @summary String -> Promise[URL]
	 */
	module.exports.resolveFilesApiWithSearch = R.pipeP(resolveFilesServletApi, addSearchCustomer);

	/**
	 * Returns Promise containing the workflow URL,
	 * with customer, read from the settings JSON, 
	 * appended as search parameter
	 * 
	 * @summary String -> Promise[URL]
	 */
	module.exports.workflowUrl = () => settingsUtils.workflow().then(resolveWorkflowsApiWithSearch);
});
