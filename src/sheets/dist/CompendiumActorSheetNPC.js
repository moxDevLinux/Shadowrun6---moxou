"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CompendiumActorSheetNPC = void 0;
var SR6ActorSheet_js_1 = require("./SR6ActorSheet.js");
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
var CompendiumActorSheetNPC = /** @class */ (function (_super) {
    __extends(CompendiumActorSheetNPC, _super);
    function CompendiumActorSheetNPC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CompendiumActorSheetNPC, "defaultOptions", {
        /** @override */
        get: function () {
            return mergeObject(_super.defaultOptions, {
                classes: ["shadowrun6", "sheet", "actor"],
                template: "systems/shadowrun6-eden/templates/compendium-actor-npc-sheet.html",
                width: 700,
                height: 800,
                editable: false
            });
        },
        enumerable: false,
        configurable: true
    });
    return CompendiumActorSheetNPC;
}(SR6ActorSheet_js_1.Shadowrun6ActorSheet));
exports.CompendiumActorSheetNPC = CompendiumActorSheetNPC;
