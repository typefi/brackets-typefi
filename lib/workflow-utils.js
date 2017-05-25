/**
 * Workflow utilities
 * @module WorkflowUtils
 */

"use strict"
define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		servletUtils = require('lib/servlet-utils'),
		settingsUtils = require('lib/settings-utils'),
		uiUtils = require('lib/ui-utils'),
		blobUtils = require('lib/blob-utils'),
		documentUtils = require('lib/document-utils'),
		xmlHttpRequestUtils = require('lib/xml-http-request-utils');

	/**
	 * Returns an overriding workflow as String containing an md-to-html action with the input set to
	 * the specified document name
	 *
	 * @summary String -> String 
	 * @param {String} name Document name
	 */
	const overrideWorkflowMarkdownInput = name =>
		JSON.stringify({
			actions: [{
				type: "md-to-html",
				inputs: [{
					name: "input",
					value: name
				}],
				plugin: "typefi-plugin-md",
				uiVersion: "1"
            }]
		});

	/**
	 * Returns an overriding workflow as Blob containing an md-to-html action with the input set to
	 * the name of the specified document
	 *
	 * @summary Document -> Blob
	 */
	const overrideWorkflowMarkdownInputAsBlob = R.pipe(documentUtils.documentName, overrideWorkflowMarkdownInput, blobUtils.toBlob);

	/**
	 * Appends the String named Blob to the FormData using the String file name
	 *
	 * @summary String -> Blob -> String -> FormData -> Void
	 */
	const append = R.invoker(3, 'append');

	/**
	 * Attaches the Blob value to the FormData object with name and filename set to the specified name
	 * and returns the updated FormData object
	 *
	 * @summary String -> Blob -> FormData -> FormData
	 * @param {String} name
	 * @param {Blob} value
	 */
	const formDataAppend = name => value => R.tap(append(name, value, name));

	/**
	 * Attaches the Blob value to the FormData object with name and filename set to 
	 * override.typefi_workflow and returns the updated FormData object
	 *
	 * @summary Blob -> FormData -> FormData
	 * @param {Blob} value
	 */
	const formDataAppendOverride = formDataAppend("override.typefi_workflow");

	/**
	 * Attaches the Document to the FormData object as a Blob with name and filename set to 
	 * override.typefi_workflow and returns the updated FormData object
	 *
	 * @summary Document -> FormData -> FormData
	 * @param {Blob} value
	 */
	const formDataAppendOverrideAsBlob = document => formDataAppendOverride(overrideWorkflowMarkdownInputAsBlob(document));

	/**
	 * Returns a new FormData object
	 *
	 * @summary * -> FormData
	 */
	const constructFormData = R.constructN(0, FormData);

	/**
	 * Attaches the Document to the FormData object with name and filename set to the document name
	 * and returns the updated FormData object
	 *
	 * @summary Document -> FormData -> FormData
	 * @param {Document} document Document to attach to the FormData object
	 */
	const appendDocument = document =>
		formDataAppend(documentUtils.documentName(document))(documentUtils.documentTextAsBlob(document));

	/**
	 * Attaches the Document to the FormData object with name and filename set to the document name,
	 * along with an overriding workflow with input set to the Document name,
	 * and returns the updated FormData object
	 *
	 * @summary Document -> FormData -> FormData
	 * @param {Document} document Document to attach to the FormData object along with an overriding
	 * workflow with input set to the Document name
	 */
	const appendDocumentAndWorkflow = document => R.pipe(appendDocument(document),
		formDataAppendOverrideAsBlob(document));

	/**
	 * Returns a FormData object containing the current document and an overriding workflow with input
	 * set to the current document.
	 *
	 * @summary * -> FormData
	 */
	const makeFormData = () => appendDocumentAndWorkflow(documentUtils.currentDocument())(constructFormData());

	/**
	 * Returns the XmlHttpRequest with all listeners attached.
	 *
	 * @summary XmlHttpRequest -> XmlHttpRequest
	 */
	const addListeners = xmlHttpRequest => {
		xmlHttpRequestUtils.addLoadListenerOpenResponseOrShowAlert(xmlHttpRequest);
		xmlHttpRequestUtils.addLoadListener(uiUtils.hideSpinnerShowRunWorkflow)(xmlHttpRequest);
		xmlHttpRequestUtils.addErrorListener(() => window.alert("Error sending workflow to server"))(xmlHttpRequest);
		xmlHttpRequestUtils.addErrorListener(uiUtils.hideSpinnerShowRunWorkflow)(xmlHttpRequest);
		return xmlHttpRequest;
	}

	/**
	 * Returns a new XmlHttpRequest with all listeners attached.
	 *
	 * @summary * -> XmlHttpRequest
	 */
	const makeXMLHttpRequest = R.pipe(xmlHttpRequestUtils.constructXmlHttpRequest, addListeners);


	/**
	 * Runs the specified workflow URL using the specified Settings
	 *
	 * @summary URL -> Settings -> Void
	 * @param{URL} workflowUrl URL of workflow to run
	 */
	const runWorkflow = workflowUrl =>
		xmlHttpRequestUtils.asyncPost(makeXMLHttpRequest())(makeFormData())(workflowUrl);

	/**
	 * Runs the specified workflow URL using Settings read from the settings file
	 *
	 * @summary URL -> Void
	 * @param{URL} workflowUrl URL of workflow to run
	 */
	const runWorkflowWithSettings = workflowUrl => settingsUtils.settings().then(runWorkflow(workflowUrl));

	/**
	 * Runs the workflow to publish the current Document using Settings read from the settings file
	 *
	 * @summary * -> Void
	 * @param{URL} workflowUrl URL of workflow to run
	 */
	module.exports.runWorkflow = R.pipeP(servletUtils.workflowUrl, runWorkflowWithSettings);

});
