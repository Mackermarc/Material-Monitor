# coding=utf-8
from __future__ import absolute_import



import octoprint.plugin

class MaterialMonitorPlugin(octoprint.plugin.SettingsPlugin,
                            octoprint.plugin.AssetPlugin,
                            octoprint.plugin.TemplatePlugin):

	##~~ SettingsPlugin mixin
	def on_settings_initialized(self):
		self.Loadcell = self._settings.get(["Loadcell"])
		self.HT = self._settings.get(["HT"])
		self._logger.info("Settings initialized %s", self.Loadcell)


	def get_settings_defaults(self):
		return dict(Loadcell=[],
					HT=[])

	##~~ AssetPlugin mixin

	def get_assets(self):
		# Define your plugin's asset files to automatically include in the
		# core UI here.
		return dict(
			js=["js/materialmonitor.js"],
			css=["css/materialmonitor.css"],
			less=["less/materialmonitor.less"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		# Define the configuration for your plugin to use with the Software Update
		# Plugin here. See https://github.com/foosel/OctoPrint/wiki/Plugin:-Software-Update
		# for details.
		return dict(
			materialmonitor=dict(
				displayName="MaterialMonitor Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="Mackermarc",
				repo="OctoPrint-Materialmonitor",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/Mackermarc/OctoPrint-Materialmonitor/archive/{target_version}.zip"
			)
		)


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "Material-Monitor Plugin"

# Starting with OctoPrint 1.4.0 OctoPrint will also support to run under Python 3 in addition to the deprecated
# Python 2. New plugins should make sure to run under both versions for now. Uncomment one of the following
# compatibility flags according to what Python versions your plugin supports!
#__plugin_pythoncompat__ = ">=2.7,<3" # only python 2
__plugin_pythoncompat__ = ">=3,<4" # only python 3
#__plugin_pythoncompat__ = ">=2.7,<4" # python 2 and 3

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = MaterialMonitorPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

