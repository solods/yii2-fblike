window.fbLike = {
	// Private variables
	bgEl: {},
	popupFb: {},
	closeBtnFb: {},
	shown: false,
	overflowDefault: "visible",
	transformDefault: "",
	
	// Popup options
	width: 400,
	height: 220,
	html: "",
	css: "",
	fonts: [],
	delay: 5,
	showOnDelay: false,
	cookieExp: 30,
	onPopup: null,
	
	// Object for handling cookies, taken from QuirksMode
	// http://www.quirksmode.org/js/cookies.html
	cookieManager: {
		// Create a cookie
		create: function(name, value, days) {
			var expires = "";
			
			if(days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		
		// Get the value of a cookie
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");
			
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			
			return null;
		},
		
		// Delete a cookie
		erase: function(name) {
			this.create(name, "", -1);
		}
	},
	
	// Handle the fblikecook cookie
	// If present and true, return true
	// If not present or false, create and return false
	checkCookie: function() {
		// Handle cookie reset
		if(this.cookieExp <= 0) {
			this.cookieManager.erase("fblikecook");
			return false;
		}

		// If cookie is set to true
		if(this.cookieManager.get("fblikecook") == "true")
			return true;

		return false;
	},

	// Add font stylesheets and CSS for the popup
	addCSS: function() {
		// Add font stylesheets
		for(var i = 0; i < this.fonts.length; i++) {
			var font = document.createElement("link");
			font.href = this.fonts[i];
			font.type = "text/css";
			font.rel = "stylesheet";
			document.head.appendChild(font);
		}

		// Base CSS styles for the popup
		var css = document.createTextNode(
			"#fb_like_p_bg {}" +
			"#fb_like_p {display: none; position: fixed; width: " + this.width + "px; height: " + this.height + "px; left: 85%; top: 95%; transform: translateX(-80%) translateY(-80%); -webkit-transform: translateX(-80%) translateY(-80%); -ms-transform: translateX(-80%) translateY(-80%);  z-index: 10002;}" +
			"#fb_like_p_close {position: absolute; left: 100%; margin: -8px 0 0 -39px; width: 20px; height: 20px; color: #ccd6de; font-size: 12px; font-weight: bold; text-align: center; border-radius: 50%; cursor: pointer; z-index:10005;}" +
			this.css
		);

		// Create the style element
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(css);

		// Insert it before other existing style
		// elements so user CSS isn't overwritten
		document.head.insertBefore(style, document.getElementsByTagName("style")[0]);
	},

	// Add the popup to the page
	addPopup: function() {
		// Add the background div
//		this.bgEl = document.createElement("div");
//		this.bgEl.id = "fb_like_p_bg";
//		document.body.appendChild(this.bgEl);

		// Add the popup
		if(document.getElementById("fb_like_p"))
			this.popupFb = document.getElementById("fb_like_p");
		else {
			this.popupFb = document.createElement("div");
			this.popupFb.id = "fb_like_p";
			this.popupFb.innerHTML = this.html;
			document.body.appendChild(this.popupFb);
		}

		// Add the close button
		this.closeBtnFb = document.createElement("div");
		this.closeBtnFb.id = "fb_like_p_close";
		this.closeBtnFb.appendChild(document.createTextNode("X"));
		this.popupFb.insertBefore(this.closeBtnFb, this.popupFb.firstChild);
	},

	// Show the popup
	showPopup: function() {
		if(this.shown) return;

		this.popupFb.style.display = "block";

		// Handle scaling
		this.scalePopup();

		// Save body overflow value and hide scrollbars
		//this.overflowDefault = document.body.style.overflow;
		//document.body.style.overflow = "hidden";

		this.shown = true;
		
		this.cookieManager.create("fblikecook", "true", this.cookieExp);
		
		if(typeof this.onPopup === "function") {
			this.onPopup();
		}
	},

	// Hide the popup
	hidePopup: function() {
		//this.bgEl.style.display = "none";
		this.popupFb.style.display = "none";

		// Set body overflow back to default to show scrollbars
		//document.body.style.overflow = this.overflowDefault;
	},

	// Handle scaling the popup
	scalePopup: function() {
		var margins = { width: 40, height: 40 };
		var popupSize = { width: fbLike.popupFb.offsetWidth, height: fbLike.popupFb.offsetHeight };
		var windowSize = { width: window.innerWidth, height: window.innerHeight };
		var newSize = { width: 0, height: 0 };
		var aspectRatio = popupSize.width / popupSize.height;

		// First go by width, if the popup is larger than the window, scale it
		if(popupSize.width > (windowSize.width - margins.width)) {
			newSize.width = windowSize.width - margins.width;
			newSize.height = newSize.width / aspectRatio;

			// If the height is still too big, scale again
			if(newSize.height > (windowSize.height - margins.height)) {
				newSize.height = windowSize.height - margins.height;
				newSize.width = newSize.height * aspectRatio;
			}
		}

		// If width is fine, check for height
		if(newSize.height === 0) {
			if(popupSize.height > (windowSize.height - margins.height)) {
				newSize.height = windowSize.height - margins.height;
				newSize.width = newSize.height * aspectRatio;
			}
		}

		// Set the scale amount
		var scaleTo = newSize.width / popupSize.width;

		// If the scale ratio is 0 or is going to enlarge (over 1) set it to 1
		if(scaleTo <= 0 || scaleTo > 1) scaleTo = 1;

		// Save current transform style
		if(this.transformDefault === "")
			this.transformDefault = window.getComputedStyle(this.popupFb, null).getPropertyValue("transform");

		// Apply the scale transformation
		this.popupFb.style.transform = this.transformDefault + " scale(" + scaleTo + ")";
	},

	// Event listener initialisation for all browsers
	addEvent: function (obj, event, callback) {
		if(obj.addEventListener)
			obj.addEventListener(event, callback, false);
		else if(obj.attachEvent)
			obj.attachEvent("on" + event, callback);
	},

	// Load event listeners for the popup
	loadEvents: function() {
		// Track mouseout event on document
		this.addEvent(document, "mouseout", function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;

			// Reliable, works on mouse exiting window and user switching active program
			if(!from)
				fbLike.showPopup();
		});

		// Handle the popup close button
		this.addEvent(this.closeBtnFb, "click", function() {
			fbLike.hidePopup();
		});

		// Handle window resizing
		this.addEvent(window, "resize", function() {
			fbLike.scalePopup();
		});
	},

	// Set user defined options for the popup
	setOptions: function(opts) {
		this.width = (typeof opts.width === 'undefined') ? this.width : opts.width;
		this.height = (typeof opts.height === 'undefined') ? this.height : opts.height;
		this.html = (typeof opts.html === 'undefined') ? this.html : opts.html;
		this.css = (typeof opts.css === 'undefined') ? this.css : opts.css;
		this.fonts = (typeof opts.fonts === 'undefined') ? this.fonts : opts.fonts;
		this.delay = (typeof opts.delay === 'undefined') ? this.delay : opts.delay;
		this.showOnDelay = (typeof opts.showOnDelay === 'undefined') ? this.showOnDelay : opts.showOnDelay;
		this.cookieExp = (typeof opts.cookieExp === 'undefined') ? this.cookieExp : opts.cookieExp;
		this.onPopup = (typeof opts.onPopup === 'undefined') ? this.onPopup : opts.onPopup;
	},

	// Ensure the DOM has loaded
	domReady: function(callback) {
		(document.readyState === "interactive" || document.readyState === "complete") ? callback() : this.addEvent(document, "DOMContentLoaded", callback);
	},

	// Initialize
	init: function(opts) {
		// Handle options
		if(typeof opts !== 'undefined')
			this.setOptions(opts);

		// Add CSS here to make sure user HTML is hidden regardless of cookie
		this.addCSS();

		// Once the DOM has fully loaded
		this.domReady(function() {
			// Handle the cookie
			if(fbLike.checkCookie()) return;

			// Add the popup
			fbLike.addPopup();

			// Load events
			setTimeout(function() {
				fbLike.loadEvents();

				if(fbLike.showOnDelay)
					fbLike.showPopup();
			}, fbLike.delay * 1000);
		});
	}
}
