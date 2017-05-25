/**
 * HTML utilities
 * @module HtmlUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		jQueryUtils = require('lib/jquery-utils');

	// Ids
	const runWorkflowButtonId = 'typefi-run-workflow',
		spinnerId = 'typefi-spinner',
		mainToolbarId = 'main-toolbar';

	// Components
	const runWorkflowButtonHtml = `<a id='${runWorkflowButtonId}'></a>`,
		spinnerHtml = `<div id='${spinnerId}'><span><div class='loader' ></div></span></span>`,
		controlsHtml = [runWorkflowButtonHtml, spinnerHtml];

	// HTML selectors
	const mainToolbarButtonsSelector = `#${mainToolbarId} .buttons`;

	/**
	 * Returns the string id prepended with '#' to yield a selector
	 * @summary String -> String
	 */
	const makeIdSelector = R.concat('#');

	/** 
	 * Appends the HTML string control to the main toolbar buttons
	 *
	 * @summary String -> jQuery
	 */
	const appendControlToMainToolbarButtons = jQueryUtils.append(mainToolbarButtonsSelector);

	/** 
	 * Appends each of the HTML string controls in the list to the main toolbar buttons
	 *
	 * @summary [String] -> jQuery
	 */
	const appendControlsToMainToolbarButtons = R.forEach(appendControlToMainToolbarButtons);

	/**
	 * Appends the run workflow and spinner controls to the main toolbar buttons
	 * @summary * - > jQuery
	 */
	module.exports.appendControlsToMainToolbarButtons = () => appendControlsToMainToolbarButtons(controlsHtml);

	/**
	 * String run workflow button jQuery object
	 */
	module.exports.runWorkflowButtonSelector = makeIdSelector(runWorkflowButtonId);

	/**
	 * String spinner jQuery object
	 */
	module.exports.spinnerSelector = makeIdSelector(spinnerId);

});
