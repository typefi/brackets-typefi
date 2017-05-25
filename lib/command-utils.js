/**
 * Command utilities
 * @module CommandUtils
 */

"use strict"

define((require, exports, module) => {

	// Libraries
	const R = require('lib/ramda.min'),
		commandManager = brackets.getModule("command/CommandManager"),
		keyBindingManager = brackets.getModule("command/KeyBindingManager");

	// Run workflow command ID using Brackets packet style naming for collision avoidance
	const runWorkflowCommandId = "typefi.brackets-typefi.runworkflow";

	// Run workflow key binding
	const runWorkflowKeyBinding = "Shift-Cmd-T";

	// Run workflow display name
	const runWorkflowDisplayName = "Publish";

	/**
	 * Curried version of the CommandManager register function
	 *
	 * @summary String -> String -> (a -> *) -> Void
	 */
	const register = R.curry(commandManager.register);

	/**
	 * Curried version of the KeyBindingManager addBinding function; the final (platform)
	 * parameter is left null since this is a platform independent extension
	 *
	 * @summary String -> String -> Void
	 */
	const addBinding = R.curryN(2, keyBindingManager.addBinding);

	/**
	 * Adds the specified key binding to the run workflow command
	 *
	 * @summary String -> Void
	 */
	const addRunWorkflowBinding = addBinding(runWorkflowCommandId);

	/**
	 * Registers the parameter as the Function to be called when the run workflow command
	 * is executed
	 *
	 * @summary (a -> *) -> Void
	 */
	exports.registerRunWorkflow = register(runWorkflowDisplayName, runWorkflowCommandId);

	/**
	 * Binds Shit-Cmd-T to the run workflow command
	 *
	 * @summary * -> Void
	 */
	module.exports.bindRunWorkflowShiftCmdT = () => addRunWorkflowBinding(runWorkflowKeyBinding);

});
