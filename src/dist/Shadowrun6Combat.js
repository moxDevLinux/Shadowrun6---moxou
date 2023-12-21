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
var constants_js_1 = require("./constants.js");
function getActorData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
var Shadowrun6Combat = /** @class */ (function (_super) {
    __extends(Shadowrun6Combat, _super);
    function Shadowrun6Combat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Define how the array of Combatants is sorted in the displayed list of the tracker.
     * This method can be overridden by a system or module which needs to display combatants in an alternative order.
     * By default sort by initiative, next falling back to name, lastly tie-breaking by combatant id.
     * @private
     */
    Shadowrun6Combat.prototype._sortCombatants = function (a, b) {
        console.log("_sortCombatants", a, b);
        var ia = Number.isNumeric(a.initiative) ? a.initiative : -9999;
        var ib = Number.isNumeric(b.initiative) ? b.initiative : -9999;
        if (!ia)
            ia = 0;
        if (!ib)
            ib = 0;
        var ci = ib - ia;
        if (ci !== 0)
            return Number(ci);
        var cn = a.name.localeCompare(b.name);
        if (cn !== 0)
            return cn;
        return 0;
    };
    Shadowrun6Combat.prototype.getMaxEdgeGain = function (actor) {
        var max = game.settings.get(constants_js_1.SYSTEM_NAME, "maxEdgePerRound");
        // If no combat started, max gain is always setting max
        if (!this.started) {
            console.log("getMaxEdgeGain: Combat not yet started - allow max");
            return max;
        }
        var actorData = getActorData(actor);
        var comb = this.getCombatantByActor(actorData._id);
        if (comb) {
            max -= Math.max(0, comb.edgeGained);
        }
        console.log("getMaxEdgeGain " + comb.name + " has already gained " + comb.edgeGained + " Edge which leaves " + max + " to gain");
        return max;
    };
    /** Begin the combat encounter, advancing to round 1 and turn 1 */
    Shadowrun6Combat.prototype.startCombat = function () {
        console.log("startCombat");
        this.combatants.forEach(function (comb) {
            var c6 = comb;
            c6.edgeGained = 0;
        });
        return _super.prototype.startCombat.call(this);
    };
    /** Advance the combat to the next turn */
    Shadowrun6Combat.prototype.nextRound = function () {
        console.log("nextRound");
        this.combatants.forEach(function (comb) {
            var c6 = comb;
            c6.edgeGained = 0;
        });
        return _super.prototype.nextRound.call(this);
    };
    return Shadowrun6Combat;
}(Combat));
exports["default"] = Shadowrun6Combat;
