/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { classes: CC, interfaces: CI, utils: CU } = Components;

CU.import("resource://gre/modules/Services.jsm");

var startupData;

function loadIntoWindow(aWindow) {
	CU.reportError("[phing/bootstrap]:loadIntoWindow");
	try {
		aWindow.require.setRequirePath("komodo-phing-support/", "chrome://komodo-phing-support/content/");
		aWindow.require("komodo-phing-support/main").load();
	} catch (e) {
		CU.reportError("[phing/bootstrap]: Exception while initializing");
		CU.reportError(e);
	}
}

function unloadFromWindow(aWindow) {
	CU.reportError("[phing/bootstrap]:unloadFromWindow");
	if (!aWindow) {
		return;
	}

	window.require("komodo-phing-support/main").unload();
}

/* Boilerplate below */

var windowListener = {
	onOpenWindow: function(aWindow) {
		// Wait for the window to finish loading
		let domWindow = aWindow.QueryInterface(CI.nsIInterfaceRequestor).
			getInterface(CI.nsIDOMWindowInternal || CI.nsIDOMWindow);

		domWindow.addEventListener(
			"komodo-post-startup",
			function onLoad() {
				domWindow.removeEventListener("komodo-post-startup", onLoad, false);
				loadIntoWindow(domWindow);
			},
			false);
	},
	onCloseWindow: function(aWindow) {},
	onWindowTitleChange: function(aWindow, aTitle) {}
};

function startup(data, reason) {
	CU.reportError("[phing/bootstrap]:startup");
	startupData = data;

	// Load into any existing windows
	let windows = Services.wm.getEnumerator("Komodo");
	while (windows.hasMoreElements()) {
		let domWindow = windows.getNext().QueryInterface(CI.nsIDOMWindow);
		loadIntoWindow(domWindow);
	}

	// Load into any new windows
	Services.wm.addListener(windowListener);
}

function shutdown(data, reason) {
	CU.reportError("[phing/bootstrap]:shutdown");
	// When the application is shutting down we normally don't have to clean
	// up any UI changes made
	if (reason == APP_SHUTDOWN) {
		return;
	}

	// Stop listening for new windows
	Services.wm.removeListener(windowListener);

	// Unload from any existing windows
	let windows = Services.wm.getEnumerator("Komodo");
	while (windows.hasMoreElements()) {
		let domWindow = windows.getNext().QueryInterface(CI.nsIDOMWindow);
		unloadFromWindow(domWindow);
	}
}

function install(data, reason) {
	CU.reportError("[phing/bootstrap]:install");
	// TODO Register our XML Catalog!!!
}

function uninstall(data, reason) {
	CU.reportError("[phing/bootstrap]:uninstall");
	// TODO Unegister our XML Catalog!!!
}