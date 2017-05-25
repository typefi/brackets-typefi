/**
 * Document utilities
 * @module DocumentUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		blobUtils = require('lib/blob-utils'),
		documentManager = brackets.getModule("document/DocumentManager");

	/**
	 * Returns the document as text, defaulting to empty text if the document is null
	 *
	 * @summary Document -> String
	 */
	const documentText = document => documentManager ? document.getText() : "";

	/**
	 * Returns the document text as Blob, defaulting to Blob containing empty text 
	 * if the current document is null
	 *
	 * @summary Document -> Blob
	 */
	module.exports.documentTextAsBlob = R.pipe(documentText, blobUtils.toBlob);

	/**
	 * Returns the name of the document as String  
	 *
	 * @summary Document -> String
	 */
	module.exports.documentName = R.path(['file', 'name']);

	/**
	 * Returns the current document
	 *
	 * @summary * -> Document
	 */
	module.exports.currentDocument = documentManager.getCurrentDocument;

});
