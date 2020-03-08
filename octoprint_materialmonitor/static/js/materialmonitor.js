/*
 * View model for OctoPrint-Materialmonitor
 *
 * Author: Marc Hinrichsen
 * License: AGPLv3
 */
$(function() {
    function MaterialmonitorViewModel(parameters) {
        var self = this;
        self.settings = parameters[0];
        self.HT = ko.observableArray([]);
        self.Loadcell = ko.observableArray([]);


        self.addLoadcell = function() {
            console.log("button gedrückt")
            self.Loadcell({"name": ko.observable("new"),
                            "sckpin": ko.observable(""),
                            "dtpin": ko.observable(""),
                            "refunit": ko.observable(""),
                            "matname": ko.observable(""),
                            "weight": ko.observable(""),
                            "color": ko.observable("#000000"),
                            "spool": ko.observable("")});
                self.settings.settings.plugins.materialmonitor.Loadcell.push(self.Loadcell());
                $("#LoadcellEditor").modal("show");
        };

        self.removeLoadcell = function(row) {
			self.settings.settings.plugins.materialmonitor.Loadcell.remove(row);
		},
		self.editLoadcell = function(data) {
			self.Loadcell(data);
			$("#LoadcellEditor").modal("show");
		};


		self.addHT = function() {
            console.log("button gedrückt")
            self.HT({"htname": ko.observable("new"),
                            "htpin": ko.observable("")});
                self.settings.settings.plugins.materialmonitor.HT.push(self.HT());

        };

        self.removeHT = function(row) {
			self.settings.settings.plugins.materialmonitor.HT.remove(row);
		};



    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: MaterialmonitorViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ "settingsViewModel" /* "loginStateViewModel",  */ ],
        // Elements to bind to, e.g. #settings_plugin_materialmonitor, #tab_plugin_materialmonitor, ...
        elements: [ '#settings_plugin_materialmonitor' , '#tab_plugin_materialmonitor' ]
    });
});
