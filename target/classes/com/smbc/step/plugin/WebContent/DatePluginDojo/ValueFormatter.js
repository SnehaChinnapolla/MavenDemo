define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/locale",
	"dojo/date/stamp",
	"dojo/number",
	"ecm/model/ValueFormatter"
], function(declare, lang, locale, stamp, number, ValueFormatter) {

	/**
	 * @name DatePluginDojo.ValueFormatter
	 * @class Represents the format that is applied to a property value prior to that value being displayed in the user
	 *        interface.
	 * @augments ecm.model.ValueFormatter
	 */
	return declare("DatePluginDojo.ValueFormatter", [
	      ValueFormatter
	], {
		/** @lends DatePluginDojo.ValueFormatter.prototype */

		constructor: function() {
			console.log("inside  valueFormatter");
		},
		/**
		 * Formats a value.
		 *
		 * @param value
		 *            The value to format. For multi-values this will be an array of values.
		 * @param type
		 *            The type of the value, such as xs:string, xs:timestamp, etc. See
		 *            {@link ecm.model.AttributeDefinition} for data type definitions.
		 */
		formatValue: function(value, type, format) {
			/* console.log("value",value);
			console.log("type",type);
			console.log("format",format); */
			
			var formattedValue = "";
			if (lang.isArray(value)) {
				for ( var i in value) {
					var v = value[i];
					if (!formattedValue) {
						formattedValue = this.formatValue(v, type, format);
					} else {
						formattedValue += this.getSeparator() + " " + this.formatValue(v, type);
					}
				}
			} else {
				// If the value is undefined or null...
				if (value == null) {
					formattedValue = "";
				} else {
					// Format based on special formatting if provided, otherwise based on type
					if (format == "fileSize") {
						var valueFloat = parseFloat(value);
						if (isNaN(valueFloat)) {
							// Not a valid number
							formattedValue = "" + value;
						} else if (valueFloat == 0) {
							// Empty file
							// Showing 0 KB
							formattedValue = "0 KB";
						} else if (valueFloat < (1024 * 1024)) {
							if (valueFloat / 1024 < 1) {
								formattedValue = "1 KB";
							} else {
								formattedValue = number.format((valueFloat / 1024.0), {
									locale: this.locale,
									places: 0
								}) + " KB";
							}
						} else {
							var valueMB = number.format((valueFloat / 1024.0 / 1024.0), {
								locale: this.locale,
								places: 1
							});
							var temp = number.parse(valueMB);
							if (temp < 1024) {
								// Less than 1GB
								formattedValue = valueMB + " MB";
							} else {
								// Greater than or equal to 1GB
								formattedValue = number.format((valueFloat / 1024.0 / 1024.0 / 1024.0), {
									locale: this.locale,
									places: 1
								}) + " GB";
							}
						}
						/**
						 * Note, although it would be nice to format numerics, we don't know what the proper format
						 * really is. It might have meaning, such as telephone number, and a general numeric formatting
						 * wouldn't be appropriate
						 */
					} else if (format == "path") {
						formattedValue = this.formatPath(value);
					} else if (type == "xs:date") {
						if (!value || value == "") {
							formattedValue = ""; // explicit check for no date value, display ""
						} else {
							
							var date = stamp.fromISOString(value);
							format = "yyyyMMdd";
							if (date == null) {
								return ecm.messages.error;
							}
							if (this.locale == "ar" && document.body.dir == "ltr") {
								format = "d/M/yyyy";
							}
							if (format) {
								//console.log("in if");
								formattedValue = locale.format(date, {
									locale: "fr",
									selector: "date",
									datePattern: "yyyyMMdd"
								});
								//console.log("formattedValue for date",formattedValue);
							} else {
								//console.log("in else");
								formattedValue = locale.format(date, {
									locale: "fr",
									selector: "date",
									formatLength: "short",
									fullYear: true,
									datePattern: "yyyyMMdd"
								});
								//console.log("formattedValue for date",formattedValue);
							}
						}
					} else if (type == "xs:time") {
						
						if (!value || value == "") {
							formattedValue = ""; // explicit check for no time value, display ""
						} else {
							var date = stamp.fromISOString(value);
							
							format = "HH:mm:ss";
							
							if (format) {
								formattedValue = locale.format(date, {
									locale: "fr",
									selector: "time",
									timePattern: "HH:mm:ss"
								});
							} else {
								formattedValue = locale.format(date, {
									locale: "fr",
									selector: "time",
									formatLength: "short",
									timePattern: "HH:mm:ss"
								});
							}
						}
					} else if (type == "xs:timestamp") {
						
						if (!value || value == "") {
							formattedValue = ""; // explicit check for no datetime value, display ""
						} else {
							
							var date = stamp.fromISOString(value);
							format = "yyyyMMdd HH:mm:ss";
							if (this.locale == "ar" && document.body.dir == "ltr") {
								format = "d/M/yyyy h:mm a";
							}
							if (format) {
								//console.log("format",format);
								formattedValue = locale.format(date, {
									locale: "fr",
									formatLength: "short",
									fullYear: true,
									datePattern: "yyyyMMdd",
									timePattern: "HH:mm:ss"
								
								});
								
							} else {
								
								formattedValue = locale.format(date, {
									locale: "fr",
									formatLength: "short",
									fullYear: true,
									datePattern: "yyyyMMdd",
									timePattern: "HH:mm:ss"
								});
								
								
							}
						}
					} else if (type == "xs:boolean") {
						formattedValue = value ? ecm.messages.true_label : ecm.messages.false_label;
					} else if (type == "xs:decimal" || type == "xs:double") {
						var decimalPoint = this.getDecimalPoint();
						if (decimalPoint != ".") {
							formattedValue = ("" + value).replace(".", decimalPoint);
						} else {
							formattedValue = "" + value;
						}
					} else {
						formattedValue = "" + value;
					}
				}
			}
			return formattedValue;
		},

		/**
		 * Returns the default format for the given data type.
		 *
		 * @param type
		 *            The data type, such as xs:string, xs:timestamp, etc. See {@link ecm.model.AttributeDefinition} for
		 *            data type definitions.
		 */
		getDefaultFormat: function(type) {
			var format = null;
			var gregorian = this.gregorian;
			if (type == "xs:timestamp") {
				format = "yyyyMMdd HH:mm:ss";
			/* 	format = lang.replace(gregorian["dateTimeFormat-short"], [
					gregorian["timeFormat-short"],
					gregorian["dateFormat-short"]
				]); */
				if (this.locale == "ar" && document.body.dir == "ltr") {
					format = "d/M/yyyy h:mm a";
				}
			} else if (type == "xs:date") {
				format = gregorian["dateFormat-short"];
				if (this.locale == "ar" && document.body.dir == "ltr") {
					format = "d/M/yyyy";
				}
			} else if (type == "xs:time") {
				format = gregorian["timeFormat-short"];
			}
			// expand 2 dijit years
			if (format && format.indexOf("yy") >= 0 && format.indexOf("yyyy") < 0) {
				format = format.replace("yy", "yyyy");
			}
			return format;
		},

		/**
		 * Formats a date.
		 * @since 2.0.2
		 * @param date
		 *     		The date to format.
		 * @param options
		 *     		The options to use for formatting.  See dojo.date.locale __FormatOptions for more information.
		 */
		formatDate: function(date, options) {
			//console.log("dateeeeeeeeeee",date);
			if (!options) {
				options = { formatLength: "short", fullYear: true,datePattern: "yyyyMMdd",timePattern: "HH:mm:ss"};
			}
			options.locale = "fr";
			return locale.format(date, options);
		},

		/**
		 * Parses a date string.  Returns a date.
		 * @since 2.0.2
		 * @param dateString
		 *     		The date string.
		 * @param options
		 *     		The options to use for parsing.  See dojo.date.locale __FormatOptions for more information.
		 */
		parseDate: function(dateString, options) {
			//console.log("dateeeeeeeeeee",date);
			if (!options) {
				options = { formatLength: "short", fullYear: true,datePattern: "yyyyMMdd",timePattern: "HH:mm:ss"};
			}
			options.locale = "fr";
			return locale.parse(dateString, options);
		},
		
		getLocale: function() {
			return this.locale;
		},
	});
});
