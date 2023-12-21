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
exports.Shadowrun6ActorSheetVehicle = void 0;
var RollTypes_js_1 = require("../dice/RollTypes.js");
var SR6ActorSheet_js_1 = require("./SR6ActorSheet.js");
function getSystemData(obj) {
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
function getActorData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
/**
 * Sheet for Vehicle actors
 * @extends {ActorSheet}
 */
var Shadowrun6ActorSheetVehicle = /** @class */ (function (_super) {
    __extends(Shadowrun6ActorSheetVehicle, _super);
    function Shadowrun6ActorSheetVehicle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Shadowrun6ActorSheetVehicle, "defaultOptions", {
        /** @override */
        get: function () {
            return mergeObject(_super.defaultOptions, {
                classes: ["shadowrun6", "sheet", "actor"],
                template: "systems/shadowrun6-eden/templates/actor/shadowrun6-Vehicle-sheet.html",
                width: 600,
                height: 800,
                tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }],
                scrollY: [".items", ".attributes"],
                dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
                allVehicleUser: game.actors.filter(function (actor) { return actor.type == "Player" || actor.type == "NPC"; })
            });
        },
        enumerable: false,
        configurable: true
    });
    Shadowrun6ActorSheetVehicle.prototype.activateListeners = function (html) {
        var _this = this;
        _super.prototype.activateListeners.call(this, html);
        //	   if (this.actor && this.actor.isOwner) { console.log("is owner"); } else { console.log("is not owner");}
        // Owner Only Listeners
        if (this.actor.isOwner) {
            html.find(".vehicle-slower").click(function (ev) { return _this._onDecelerate(ev, html); });
            html.find(".vehicle-faster").click(function (ev) { return _this._onAccelerate(ev, html); });
            html.find(".vehicleskill-roll").click(this._onRollVehicleSkillCheck.bind(this));
        }
    };
    Shadowrun6ActorSheetVehicle.prototype._onDecelerate = function (event, html) {
        var _a;
        console.log("_onDecelerate");
        var system = getSystemData(this.actor);
        var currentSpeed = system.vehicle.speed;
        var newSpeed = currentSpeed - (system.vehicle.offRoad ? system.accOff : system.accOn);
        if (newSpeed < 0)
            newSpeed = 0;
        var field = "data.vehicle.speed";
        this.actor.updateSource((_a = {}, _a[field] = newSpeed, _a));
    };
    Shadowrun6ActorSheetVehicle.prototype._onAccelerate = function (event, html) {
        var _a;
        console.log("_onAccelerate");
        var system = getSystemData(this.actor);
        var currentSpeed = system.vehicle.speed;
        var newSpeed = currentSpeed + (system.vehicle.offRoad ? system.accOff : system.accOn);
        if (newSpeed > system.tspd)
            newSpeed = system.tspd;
        var field = "vehicle.speed";
        this.actor.updateSource((_a = {}, _a[field] = newSpeed, _a));
    };
    //-----------------------------------------------------
    /**
     * Handle rolling a Skill check
     * @param {Event} event   The originating click event
     * @private
     */
    Shadowrun6ActorSheetVehicle.prototype._onRollVehicleSkillCheck = function (event, html) {
        console.log("_onRollVehicleSkillCheck");
        event.preventDefault();
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        var dataset = event.currentTarget.dataset;
        var skillId = dataset.skill;
        var actorData = getSystemData(this.actor);
        var vSkill = actorData.skills[skillId];
        console.log("Roll skill " + skillId + " with pool " + vSkill.pool + " and a threshold " + actorData.vehicle.modifier);
        var roll = new RollTypes_js_1.VehicleRoll(actorData, skillId);
        roll.threshold = actorData.vehicle.modifier;
        console.log("onRollSkillCheck before ", roll);
        this.actor.rollVehicle(roll);
    };
    return Shadowrun6ActorSheetVehicle;
}(SR6ActorSheet_js_1.Shadowrun6ActorSheet));
exports.Shadowrun6ActorSheetVehicle = Shadowrun6ActorSheetVehicle;
