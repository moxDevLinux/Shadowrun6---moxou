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
exports.Shadowrun6ActorSheetCritter = void 0;
var SR6ActorSheet_js_1 = require("./SR6ActorSheet.js");
/**
 * Extend the basic ActorSheet
 * @extends {ActorSheet}
 */
var Shadowrun6ActorSheetCritter = /** @class */ (function (_super) {
    __extends(Shadowrun6ActorSheetCritter, _super);
    function Shadowrun6ActorSheetCritter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Shadowrun6ActorSheetCritter, "defaultOptions", {
        /** @override */
        get: function () {
            return mergeObject(_super.defaultOptions, {
                classes: ["shadowrun6", "sheet", "actor"],
                template: "systems/shadowrun6-eden/templates/actor/shadowrun6-Critter-sheet.html",
                width: 700,
                height: 800,
                tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }],
                scrollY: [".items", ".attributes"],
                dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
            });
        },
        enumerable: false,
        configurable: true
    });
    return Shadowrun6ActorSheetCritter;
}(SR6ActorSheet_js_1.Shadowrun6ActorSheet));
exports.Shadowrun6ActorSheetCritter = Shadowrun6ActorSheetCritter;
