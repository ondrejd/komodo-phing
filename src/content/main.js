/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

(function() {
	const log          = require("ko/logging").getLogger("phing");
	const {Cc, Ci, Cu} = require("chrome");
	const prefs        = ko.prefs;
	const menu         = require("ko/menu");
	const notify       = require("notify/notify");
	const button       = require("ko/button");
	const commands     = require("ko/commands");
	const editor       = require("ko/editor");

	this.load = function() {
		Cu.reportError("[komodo-phing-support/main].load()");
		try {
			commands.register("phingTest", this.share.bind(this, undefined), {
				label: "phing:Test..."
			});

			menu.register({
				id: "phing-menu",
				label: "Phing (test)",
				image: "chrome://komodo-phing-support/skin/icon32.png",
				command: ko.commands.doCommandAsync.bind(ko.commands, "cmd_phingTest"),
				context: []
			});

			notify.categories.register("phing", { label: "Komodo Phing Support" });
			notify.send(errorMsg, ADDON, {priority: "info"});
		} catch(e) {
			Cu.reportError(e);
		}
	};

	this.unload = function() {
		Cu.reportError("[komodo-phing-support/main].unload()");
		try {
			menu.unregister("phing-menu", menuContext);
		} catch(e) {
			Cu.reportError(e);
		}
	};
}).apply(module.exports);
