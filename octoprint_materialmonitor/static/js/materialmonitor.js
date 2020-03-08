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

        self.Loadcell = ko.observable();


        self.ownSettings = {};
        self.Loadcell = ko.observableArray([]);


        self.addLoadcell = function() {
            console.log("button gedrückt")
            self.Loadcell({"name": ko.observable(""),
                            "sckpin": ko.observable(""),
                            "dtpin": ko.observable(""),
                            "refunit": ko.observable(""),
                            "matname": ko.observable(""),
                            "weight": ko.observable(""),
                            "color": ko.observable(""),
                            "spool": ko.observable("")});
                self.settings.settings.plugins.materialmonitor.Loadcell.push(self.Loadcell());
                $("#LoadcellEditor").modal("show");
        };

        self.removeLoadcell = function(row) {
			self.settings.settings.plugins.materialmonitor.Loadcell.remove(row);
		}
		self.editLoadcell = function(data) {
			self.Loadcell(data);
			$("#LoadcellEditor").modal("show");
		}


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
