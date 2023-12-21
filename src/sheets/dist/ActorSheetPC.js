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
exports.Shadowrun6ActorSheetPC = void 0;
var SR6ActorSheet_js_1 = require("./SR6ActorSheet.js");
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
var Shadowrun6ActorSheetPC = /** @class */ (function (_super) {
    __extends(Shadowrun6ActorSheetPC, _super);
    function Shadowrun6ActorSheetPC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Shadowrun6ActorSheetPC, "defaultOptions", {
        /** @override */
        get: function () {
            var options = _super.defaultOptions;
            return foundry.utils.mergeObject(_super.defaultOptions, {
                classes: ["shadowrun6", "sheet", "actor"],
                template: "systems/shadowrun6-eden/templates/actor/shadowrun6-Player-sheet.html",
                width: 830,
                height: 900,
                tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "basics" }],
                scrollY: [".biography", ".items", ".attributes"],
                dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
            });
        },
        enumerable: false,
        configurable: true
    });
    return Shadowrun6ActorSheetPC;
}(SR6ActorSheet_js_1.Shadowrun6ActorSheet));
exports.Shadowrun6ActorSheetPC = Shadowrun6ActorSheetPC;
