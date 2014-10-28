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

define(["domReady!, orion/HTMLTemplates"], function(Deferred, PluginProvider, WebDAVFileService) {


	var authorizedOrigins = document.getById("authorized_origins");
	
	var authroizedOriginTemplate =  HTMLTemplates.get("authorized_origin);
	var newOrigin = authroizedOriginTemplate.content.cloneNode();
	newOrigin.textContent = "http://";
	newOriing.on
	
	

	function renderAuthorizedOrigins() {
		
	
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