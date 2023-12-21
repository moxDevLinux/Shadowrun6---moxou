"use strict";
exports.__esModule = true;
exports.registerSystemSettings = void 0;
var constants_js_1 = require("./constants.js");
exports.registerSystemSettings = function () {
    /**
     * Track the system version upon which point a migration was last applied
     */
    game.settings.register(constants_js_1.SYSTEM_NAME, "systemMigrationVersion", {
        name: "System Migration Version",
        scope: "world",
        config: false,
        type: String,
        "default": ""
    });
    /**
     * Register resting variants
     */
    game.settings.register(constants_js_1.SYSTEM_NAME, "maxEdgePerRound", {
        name: "shadowrun6.settings.maxEdgePerRound.name",
        hint: "shadowrun6.settings.maxEdgePerRound.hint",
        scope: "world",
        config: true,
        type: Number,
        "default": 2,
        onChange: function (max) {
            console.log("maxEdgePerRound adjusted to " + max);
            game.settings.set(constants_js_1.SYSTEM_NAME, "maxEdgePerRound", max);
            //      game.actors.forEach(actor => {
            //        if (actor.data.type == "character") {
            //          actor.prepareData();
            //        }
            //      });
        }
    });
    game.settings.register(constants_js_1.SYSTEM_NAME, "importToCompendium", {
        name: "shadowrun6.settings.importToCompendium.name",
        hint: "shadowrun6.settings.importToCompendium.hint",
        scope: "world",
        config: true,
        type: Boolean,
        "default": false,
        onChange: function (toggle) {
            console.log("importToCompendium changed to " + toggle);
            game.settings.set(constants_js_1.SYSTEM_NAME, "importToCompendium", toggle);
        }
    });
};
