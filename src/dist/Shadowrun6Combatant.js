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
var RollTypes_js_1 = require("./dice/RollTypes.js");
var Shadowrun6Combatant = /** @class */ (function (_super) {
    __extends(Shadowrun6Combatant, _super);
    function Shadowrun6Combatant(data, context) {
        var _this = _super.call(this, data, context) || this;
        _this.edgeGained = 0;
        console.log("Shadowrun6Combatant.<init>");
        _this.setFlag("shadowrun6-eden", "iniType", RollTypes_js_1.InitiativeType.PHYSICAL);
        return _this;
    }
    Object.defineProperty(Shadowrun6Combatant.prototype, "initiativeType", {
        get: function () {
            return this.getFlag("shadowrun6-eden", "iniType");
        },
        enumerable: false,
        configurable: true
    });
    Shadowrun6Combatant.prototype._getInitiativeFormula = function () {
        console.log("Shadowrun6Combatant._getInitiativeFormula: ", this.initiativeType);
        switch (this.initiativeType) {
            case RollTypes_js_1.InitiativeType.PHYSICAL: return "@initiative.physical.pool + (@initiative.physical.dicePool)d6";
            case RollTypes_js_1.InitiativeType.ASTRAL: return "@initiative.astral.pool + (@initiative.astral.dicePool)d6";
            case RollTypes_js_1.InitiativeType.MATRIX: return "@initiative.matrix.pool + (@initiative.matrix.dicePool)d6";
            default:
                return _super.prototype._getInitiativeFormula.call(this);
        }
    };
    Shadowrun6Combatant.prototype.rollInitiative = function (formula) {
        console.log("Shadowrun6Combatant.rollInitiative: ", formula);
        return _super.prototype.rollInitiative.call(this, formula);
    };
    Shadowrun6Combatant.prototype.getInitiativeRoll = function (formula) {
        console.log("Shadowrun6Combatant.getInitiativeRoll: ", formula);
        return _super.prototype.getInitiativeRoll.call(this, formula);
    };
    return Shadowrun6Combatant;
}(Combatant));
exports["default"] = Shadowrun6Combatant;
