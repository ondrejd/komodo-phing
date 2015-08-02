/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/*
const { classes: CC, interfaces: CI, utils: CU } = Components;

// TODO Value for `ADDON_NAME` should be passed from Phing build file...
const ADDON_NAME  = "komodo-phing-support";
const ADDON_ID    = ADDON_NAME + "@ondrejd.info";
const PREF_BRANCH = "extensions." + ADDON_NAME + ".";
*/
if (typeof(KomodoPhingSupport) == "undefined") {
	var KomodoPhingSupport = {};
}

(function () {
/*
try {
	this.mozDirSvc = CC["@mozilla.org/file/directory_service;1"].getService(CI.nsIProperties);
	this.os = CC["@activestate.com/koOs;1"].getService(CI.koIOs);
	this.koSysUtils = CC["@activestate.com/koSysUtils;1"].getService(CI.koISysUtils);
	this.appInfo = CC["@mozilla.org/xre/app-info;1"].getService(CI.nsIXULRuntime);
	this.koDirs = CC["@activestate.com/koDirs;1"].getService(CI.koIDirs);
	this.prefSvc = CC["@activestate.com/koPrefService;1"].getService(CI.koIPrefService).prefs;
	this.prefBranch = CC["@mozilla.org/preferences-service;1"].getService(CI.nsIPrefService).getBranch(this.BRANCH);
} catch (e) {
	// TODO Remove this alert...
	alert(e);
}
*/

/**
 * Just helper method.
 *
 * @returns {void}
 */
this.test = function() {
	alert("Test");
};

/**
 * Remove children from the given element.
 *
 * @param {DOMElement} aElm
 * @returns {void}
 */
this.removeChildren = function(aElm) {
	var children = aElm.childNodes;
	for (var i=children.length-1; i>=0; i--) {
		aElm.removeChild(children[i]);
	}
};

/**
 * Called when Phing tools menupopup is showing.
 *
 * @param {DOMEvent} aEvent
 * @returns {Boolean}
 */
this.onPhingMenuShowing = function(aEvent) {
	Components.utils.reportError("KomodoPhingSupport.onPhingMenuShowing")
	Components.utils.reportError(aEvent);

	var popup = document.getElementById("komodo-phing-support-popup");
	Components.utils.reportError(popup)
	this.removeChildren(popup);

	var menuitem = document.createElement("menuitem");
	menuitem.setAttribute("label", "Build (default target)");
	menuitem.setAttribute("oncommand", "KomodoPhingSupport.test()");
	popup.appendChild(menuitem);

	return true;
};

}).apply(KomodoPhingSupport);
