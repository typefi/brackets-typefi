/**
 * UI utilities
 * @module UiUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		htmlUtils = require('lib/html-utils'),
		workflowUtils = require('lib/workflow-utils'),
		pathUtils = require('lib/path-utils'),
		mainViewManager = brackets.getModule("view/MainViewManager"),
		appInit = brackets.getModule("utils/AppInit"),
		cssUtils = require('lib/css-utils'),
		commandUtils = require('lib/command-utils'),
		jQueryUtils = require('lib/jquery-utils');

	/**
	 * Shows or hides the spinner according to the Boolean parameter
	 *
	 * @summary Boolean -> jQuery
	 */
	const toggleSpinner = jQueryUtils.toggle(htmlUtils.spinnerSelector);

	/**
	 * Shows or hides the run workflow button according to the Boolean parameter
	 *
	 * @summary Boolean -> jQuery
	 */
	const toggleRunWorkflowButton = jQueryUtils.toggle(htmlUtils.runWorkflowButtonSelector);

	/**
	 * Shows or hides the run workflow button according to the Boolean parameter negated
	 *
	 * @summary Boolean -> jQuery
	 */
	const negatedToggleRunWorkflowButton = R.pipe(R.not, toggleRunWorkflowButton);

	/**
	 * Shows the spinner and hides the run workflow button or vice versa, 
	 * according to the Boolean parameter
	 *
	 * @summary Boolean -> Void
	 */
	const toggleSpinnerRunWorkflow = starting => {
		toggleSpinner(starting);
		negatedToggleRunWorkflowButton(starting);
	}

	/**
	 * Binds the handler function to the run workflow button
	 *
	 * @summary (a -> *) -> jQuery
	 */
	const onClickRunworkflowButton = jQueryUtils.click(htmlUtils.runWorkflowButtonSelector);

	/**
	 * Shows or hides the run workflow button according to whether the current document is markdown
	 *
	 * @summary * -> jQuery
	 */
	const toggleRunWorkflowButtonIfCurrentDocumentIsMarkdown = R.pipe(pathUtils.isCurrentDocumentMarkdown, toggleRunWorkflowButton);

	/**
	 * Runs the workflow and replaces the workflow button with the spinner
	 *
	 * @summary * -> Void
	 */
	const runWorkflowToggleSpinnerRunWorkflow = () => {
		workflowUtils.runWorkflow();
		R.pipe(R.T, toggleSpinnerRunWorkflow);
	}

	/**
	 * Initialises event handling
	 *
	 * @summary * -> Void
	 */
	const initialiseEventHandling = () => {
		onClickRunworkflowButton(runWorkflowToggleSpinnerRunWorkflow);
		commandUtils.registerRunWorkflow(runWorkflowToggleSpinnerRunWorkflow);
		commandUtils.bindRunWorkflowShiftCmdT();
		mainViewManager.on("currentFileChange", toggleRunWorkflowButtonIfCurrentDocumentIsMarkdown);
		toggleRunWorkflowButtonIfCurrentDocumentIsMarkdown();
	}

	/**
	 * Hides the spinner and shows the run workflow button
	 *
	 * @summary * -> Void
	 */
	module.exports.hideSpinnerShowRunWorkflow = R.pipe(R.F, toggleSpinnerRunWorkflow);

	/**
	 * Shows alert with the specified message
	 *
	 * @summary String -> Void
	 * @param {String} message
	 */
	module.exports.alert = message => window.alert(message);

	/**
	 * Initialises the UI
	 *
	 * @summary * -> Void
	 */
	module.exports.initialiseUi = () => {
		cssUtils.loadStyleSheets();
		htmlUtils.appendControlsToMainToolbarButtons();
		module.exports.hideSpinnerShowRunWorkflow();
		appInit.appReady(initialiseEventHandling);
	}
});
