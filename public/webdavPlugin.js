/*******************************************************************************
 * @license
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global require define console document*/
require.config({
	paths: {
		domReady: 'requirejs/domReady'
	}
});

define(["orion/Deferred", "orion/PluginProvider", "WebDAVFileService", "domReady!"], function(Deferred, PluginProvider, WebDAVFileService) {
	function trace(implementation) {

		function createTracedMethod(method) {
			return function() {
				console.log("*" + method);
				var args = Array.prototype.slice.call(arguments);
				Object.keys(args).forEach(function(arg) {
					console.log(" [" + arg + "] " + args[arg]);
				});
				var result = implementation[method].apply(implementation, args);
				Deferred.when(result, function(json) {
					console.log(json);
				});
				return result;
			};
		}

		var traced = {};
		for (var method in implementation) {
			if (typeof implementation[method] === 'function') {
				traced[method] = createTracedMethod(method);
			}
		}
		return traced;
	}
	var temp = document.createElement('a');
	function absoluteURL(url) {
		temp.href = url;
		return temp.href;
	}
	
	var provider = new PluginProvider({
		name: "Orion WebDAV Support",
		version: "1.0",
		description: "This plugin provides File Service Access for WebDAV servers hosting this plugin.",
		login: absoluteURL("login.html")
	});

	var base = absoluteURL(".");
	var service = new WebDAVFileService(base, base);
	provider.registerServiceProvider("orion.core.file", trace(service), {
		Name: 'WebDAV [' + base + ']',
		top: base,
		pattern: base
	});
	provider.connect();
});