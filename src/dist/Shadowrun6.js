"use strict";
/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var SR6Roll_js_1 = require("./SR6Roll.js");
var settings_js_1 = require("./settings.js");
var Shadowrun6Combat_js_1 = require("./Shadowrun6Combat.js");
var Shadowrun6Actor_js_1 = require("./Shadowrun6Actor.js");
var config_js_1 = require("./config.js");
var ActorSheetPC_js_1 = require("./sheets/ActorSheetPC.js");
var ActorSheetNPC_js_1 = require("./sheets/ActorSheetNPC.js");
var ActorSheetVehicle_js_1 = require("./sheets/ActorSheetVehicle.js");
//import { Shadowrun6ActorSheetVehicleCompendium } from "./sheets/ActorSheetVehicleCompendium.js";
var SR6ItemSheet_js_1 = require("./sheets/SR6ItemSheet.js");
var templates_js_1 = require("./templates.js");
var helper_js_1 = require("./util/helper.js");
var RollTypes_js_1 = require("./dice/RollTypes.js");
var Rolls_js_1 = require("./Rolls.js");
var EdgeUtil_js_1 = require("./util/EdgeUtil.js");
var Shadowrun6Combatant_js_1 = require("./Shadowrun6Combatant.js");
var Shadowrun6CombatTracker_js_1 = require("./Shadowrun6CombatTracker.js");
var Importer_js_1 = require("./util/Importer.js");
var diceIconSelector = "#chat-controls .chat-control-icon .fa-dice-d20";
function getData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
function getRoll(obj) {
    if (game.release.generation >= 10)
        return obj.rolls[0];
    return obj.roll;
}
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
 * Init hook. Called from Foundry when initializing the world
 */
Hooks.once("init", function () {
    return __awaiter(this, void 0, void 0, function () {
        /*
         * Change default icon
         */
        function onCreateItem(item, options, userId) {
            var _a, _b;
            console.log("onCreateItem  " + item.data.type);
            var actor = getActorData(item);
            if (actor.img == "icons/svg/item-bag.svg" && CONFIG.SR6.icons[actor.type]) {
                actor.img = CONFIG.SR6.icons[actor.type]["default"];
                item.updateSource((_a = {}, _a["img"] = actor.img, _a));
            }
            // If it is a compendium item, copy over text description
            var system = getSystemData(item);
            var key = actor.type + "." + system.genesisID;
            console.log("Item with genesisID - check for " + key);
            if (!game.i18n.localize(key + "name").startsWith(key)) {
                system.description = game.i18n.localize(key + ".desc");
                actor.name = game.i18n.localize(key + ".name");
                item.updateSource((_b = {}, _b["description"] = system.description, _b));
            }
            console.log("onCreateItem: " + actor.img);
        }
        var _this = this;
        return __generator(this, function (_a) {
            console.log("Initializing Shadowrun 6 System");
            CONFIG.debug.hooks = false;
            CONFIG.debug.dice = true;
            CONFIG.SR6 = new config_js_1.SR6Config();
            CONFIG.ChatMessage.documentClass = SR6Roll_js_1.SR6RollChatMessage;
            CONFIG.Combat.documentClass = Shadowrun6Combat_js_1["default"];
            CONFIG.Combatant.documentClass = Shadowrun6Combatant_js_1["default"];
            CONFIG.ui.combat = Shadowrun6CombatTracker_js_1["default"];
            CONFIG.Actor.documentClass = Shadowrun6Actor_js_1.Shadowrun6Actor;
            CONFIG.Dice.rolls = [SR6Roll_js_1["default"]];
            //	(CONFIG as any).compatibility.mode = 0;
            getData(game).initiative = "@initiative.physical.pool + (@initiative.physical.dicePool)d6";
            settings_js_1.registerSystemSettings();
            // Register sheet application classes
            Actors.unregisterSheet("core", ActorSheet);
            Actors.registerSheet("shadowrun6-eden", ActorSheetPC_js_1.Shadowrun6ActorSheetPC, { types: ["Player"], makeDefault: true });
            Actors.registerSheet("shadowrun6-eden", ActorSheetNPC_js_1.Shadowrun6ActorSheetNPC, { types: ["NPC", "Critter", "Spirit"], makeDefault: true });
            Actors.registerSheet("shadowrun6-eden", ActorSheetVehicle_js_1.Shadowrun6ActorSheetVehicle, { types: ["Vehicle"], makeDefault: true });
            Items.registerSheet("shadowrun6-eden", SR6ItemSheet_js_1.SR6ItemSheet, {
                types: [
                    "gear",
                    "martialarttech",
                    "martialartstyle",
                    "quality",
                    "spell",
                    "adeptpower",
                    "ritual",
                    "metamagic",
                    "focus",
                    "echo",
                    "complexform",
                    "sin",
                    "contact",
                    "lifestyle",
                    "critterpower"
                ],
                makeDefault: true
            });
            templates_js_1.preloadHandlebarsTemplates();
            helper_js_1.defineHandlebarHelper();
            document.addEventListener('paste', function (e) { return Importer_js_1["default"].pasteEventhandler(e); }, false);
            // https://discord.com/channels/732325252788387980/915388333125955645/1001455991151394836
            Hooks.once('initREMOVEME', function () {
                if (game.release.generation >= 10)
                    return;
                Object.defineProperties(game.system, {
                    version: { get: function () { return this.data.version; } },
                    initiative: { get: function () { return this.data.initiative; } }
                });
                Object.defineProperties(TokenDocument.prototype, {
                    hidden: { get: function () { return this.data.hidden; } },
                    actorData: { get: function () { return this.data.actorData; } },
                    actorLink: { get: function () { return this.data.actorLink; } }
                });
                Object.defineProperties(Actor.prototype, {
                    system: { get: function () { return this.data.data; } },
                    prototypeToken: { get: function () { return this.data.token; } },
                    ownership: { get: function () { return this.data.permission; } }
                });
                Object.defineProperties(Item.prototype, {
                    system: { get: function () { return this.data.data; } }
                });
                globalThis.isEmpty = isObjectEmpty;
            });
            Hooks.once("diceSoNiceReady", function (dice3d) {
                dice3d.addSystem({ id: "SR6", name: "Shadowrun 6 - Eden" }, "default");
                dice3d.addDicePreset({
                    type: "d6",
                    labels: [
                        "",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6"
                        //        "systems/shadowrun6-eden/icons/SR6_D6_5_o.png",
                        //        "systems/shadowrun6-eden/icons/SR6_D6_6_o.png"
                    ],
                    bumpMaps: [
                        ,
                        ,
                        ,
                        ,
                        ,
                    ],
                    colorset: "SR6_dark",
                    system: "SR6"
                });
                dice3d.addDicePreset({
                    type: "dc",
                    labels: ["systems/shadowrun6-eden/images/EdgeToken.png", "systems/shadowrun6-eden/images/EdgeToken.png"],
                    bumpMaps: [,],
                    colorset: "SR6_dark",
                    system: "SR6"
                });
                dice3d.addColorset({
                    name: "SR6_light",
                    description: "SR 6 Pink",
                    category: "SR6",
                    foreground: "#470146",
                    background: "#f7c8f6",
                    outline: "#2e2b2e",
                    texture: "none",
                    edge: "#9F8003",
                    material: "glass",
                    font: "Arial Black",
                    fontScale: {
                        d6: 1.1,
                        df: 2.5
                    },
                    visibility: "hidden"
                }, "no");
                dice3d.addColorset({
                    name: "SR6_dark",
                    description: "SR 6 Pink Dark",
                    category: "SR6",
                    foreground: "#470146",
                    background: "#000000",
                    outline: "#2e2b2e",
                    texture: "none",
                    edge: "#470146",
                    material: "metal",
                    font: "Arial Black",
                    fontScale: {
                        d6: 1.1,
                        df: 2.5
                    },
                    visibility: "visible"
                }, "default");
            });
            Hooks.on("createItem", function (doc, options, userId) { return onCreateItem(doc, options, userId); });
            Hooks.on("ready", function () {
                // Render a modal on click.
                $(document).on("click", diceIconSelector, function (ev) {
                    console.log("diceIconSelector clicked  ", ev);
                    ev.preventDefault();
                    // Roll and return
                    var roll = new RollTypes_js_1.PreparedRoll();
                    roll.pool = 0;
                    roll.speaker = ChatMessage.getSpeaker({ actor: _this });
                    roll.rollType = RollTypes_js_1.RollType.Common;
                    Rolls_js_1.doRoll(roll);
                });
            });
            Hooks.on("renderShadowrun6ActorSheetPC", function (doc, options, userId) {
                console.log("renderShadowrun6ActorSheetPC hook called", doc);
            });
            Hooks.on("renderShadowrun6ActorSheetVehicle", function (app, html, data) {
                //    console.log("renderShadowrun6ActorSheetVehicle hook called");
                _onRenderVehicleSheet(app, html, data);
            });
            Hooks.on("renderSR6ItemSheet", function (app, html, data) {
                console.log("renderSR6ItemSheet hook called");
                _onRenderItemSheet(app, html, data);
            });
            Hooks.on("dropCanvasData", function (doc, data) {
                console.log("dropCanvasData hook called", doc);
            });
            /*
             * Something has been dropped on the HotBar
             */
            Hooks.on("hotbarDrop", function (bar, data, slot) { return __awaiter(_this, void 0, void 0, function () {
                var macroData;
                return __generator(this, function (_a) {
                    console.log("DROP to Hotbar");
                    macroData = {
                        name: "",
                        type: "script",
                        img: "icons/svg/dice-target.svg",
                        command: ""
                    };
                    return [2 /*return*/];
                });
            }); });
            Hooks.on("renderChatMessage", function (app, html, data) {
                console.log("ENTER renderChatMessage");
                registerChatMessageEdgeListener(this, app, html, data);
                html.on("click", ".chat-edge", function (ev) {
                    var event = ev;
                    event.preventDefault();
                    var roll = $(event.currentTarget);
                    var tip = roll.find(".chat-edge-collapsible");
                    if (!tip.is(":visible")) {
                        tip.slideDown(200);
                    }
                    else {
                        tip.slideUp(200);
                    }
                });
                html.find(".rollable").click(function (event) {
                    //      const type =  $(event.currentTarget).closestData("roll-type");
                    console.log("ENTER renderChatMessage.rollable.click -> event.currentTarget = ", event.currentTarget);
                    var dataset = event.currentTarget.dataset;
                    var actorId = dataset["actorid"];
                    var sceneId = dataset["sceneid"];
                    var tokenId = dataset["targetid"];
                    var actor;
                    var token;
                    // If scene and token ID is given, resolve token
                    if (sceneId && tokenId) {
                        var scene = game.scenes[sceneId];
                        if (scene) {
                            var t1 = scene.tokens.get(tokenId);
                            console.log("Token ", t1);
                        }
                    }
                    // If we already have a actor that is rolling, that is great.
                    // If not, find one
                    if (actorId) {
                        actor = game.actors.get(actorId);
                    }
                    /*			var targetId = ($(event.currentTarget) as any).closestData("targetid");
                                /*
                                 * If no target was memorized in the button, try to find one from the
                                 * actor associated with the player
                                 */
                    if (!actor) {
                        console.log("No target ID found - use characters actor if possible");
                        game.actors.forEach(function (item) {
                            if (item.hasPlayerOwner)
                                actor = item;
                        });
                    }
                    console.log("Actor ", actor);
                    if (actor) {
                        if (!actor.isOwner) {
                            console.log("Current user not owner of actor ", actor.data.name);
                            return;
                        }
                    }
                    var rollType = dataset.rollType;
                    console.log("Clicked on rollable : " + rollType);
                    console.log("dataset : ", dataset);
                    var threshold = parseInt(dataset.defendHits);
                    var damage = dataset.damage ? parseInt(dataset.damage) : 0;
                    var monitor = parseInt(dataset.monitor);
                    console.log("Target actor ", actor);
                    console.log("Target actor ", actor.name);
                    switch (rollType) {
                        case RollTypes_js_1.RollType.Defense:
                            /* Avoid being hit/influenced */
                            console.log("TODO: call rollDefense with threshold " + threshold);
                            if (actor) {
                                var defendWith = dataset.defendWith;
                                actor.rollDefense(defendWith, threshold, damage);
                            }
                            break;
                        case RollTypes_js_1.RollType.Soak:
                            /* Resist incoming netto damage */
                            console.log("TODO: call rollSoak with threshold " + threshold + " on monitor " + dataset.soakWith);
                            if (actor) {
                                var soak = dataset.soak;
                                actor.rollSoak(soak, damage);
                            }
                            break;
                        case RollTypes_js_1.RollType.Damage:
                            /* Do not roll - just apply damage */
                            var monitor_1 = dataset.monitor;
                            console.log("TODO: apply " + damage + " on monitor " + dataset.monitor);
                            actor.applyDamage(monitor_1, damage);
                            break;
                    }
                    /*
              if (rollType === RollType.Defense) {
                    const actor = (game as Game).actors!.get(targetId);
                console.log("Target actor ",actor);
                    console.log("TODO: call rollDefense with threshold "+threshold);
                    if (actor) {
                        let defendWith : Defense = (dataset.defendWith! as Defense);
                        let damage     : number  = (dataset.damage)?parseInt(dataset.damage):0;
                        (actor as Shadowrun6Actor).rollDefense(defendWith, threshold, damage);
                    }
              }
                */
                });
                html.on("click", ".chat-edge", function (event) {
                    event.preventDefault();
                    var roll = $(event.currentTarget);
                    var tip = roll.find(".chat-edge-collapsible");
                    if (!tip.is(":visible")) {
                        tip.slideDown(200);
                    }
                    else {
                        tip.slideUp(200);
                    }
                });
                html.on("click", ".chat-edge-post", function (event) {
                    event.preventDefault();
                    var roll = $(event.currentTarget.parentElement);
                    var tip = roll.find(".chat-edge-post-collapsible");
                    if (!tip.is(":visible")) {
                        tip.slideDown(200);
                    }
                    else {
                        tip.slideUp(200);
                    }
                });
                html.on("click", ".chat-spell", function (event) {
                    console.log("chat-spell");
                    event.preventDefault();
                    var roll = $(event.currentTarget);
                    var tip = roll.find(".chat-spell-collapsible");
                    if (!tip.is(":visible")) {
                        tip.slideDown(200);
                    }
                    else {
                        tip.slideUp(200);
                    }
                });
                console.log("LEAVE renderChatMessage");
            });
            /**
             * If a player actor is created, change default token settings
             */
            Hooks.on("preCreateActor", function (actor, createData, options, userId) {
                if (actor.type === "Player") {
                    actor.prototypeToken.updateSource({ actorLink: "true" });
                    actor.prototypeToken.updateSource({ vision: "true" });
                }
            });
            Hooks.on("preUpdateCombatant", function (combatant, createData, options, userId) {
                console.log("Combatant with initiative " + createData.initiative);
            });
            Hooks.on("preUpdateCombat", function (combat, createData, options, userId) {
                var realCombat = getData(combat);
                console.log("Combat with turn " + createData.turn + " in round " + realCombat.round);
            });
            Hooks.on("deleteCombat", function (combat, createData, userId) {
                console.log("End Combat");
            });
            Hooks.once("dragRuler.ready", function (SpeedProvider) {
                var FictionalGameSystemSpeedProvider = /** @class */ (function (_super) {
                    __extends(FictionalGameSystemSpeedProvider, _super);
                    function FictionalGameSystemSpeedProvider() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Object.defineProperty(FictionalGameSystemSpeedProvider.prototype, "colors", {
                        get: function () {
                            return [
                                { id: "walk", "default": 0x00ff00, name: "shadowrun6-eden.speeds.walk" },
                                { id: "dash", "default": 0xffff00, name: "shadowrun6-eden.speeds.dash" },
                                { id: "run", "default": 0xff8000, name: "shadowrun6-eden.speeds.run" }
                            ];
                        },
                        enumerable: false,
                        configurable: true
                    });
                    FictionalGameSystemSpeedProvider.prototype.getRanges = function (token) {
                        var baseSpeed = 5; //token.actor.data.speed
                        // A character can always walk it's base speed and dash twice it's base speed
                        var ranges = [
                            { range: 10, color: "walk" },
                            { range: 15, color: "dash" }
                        ];
                        // Characters that aren't wearing armor are allowed to run with three times their speed
                        if (!token.actor.data.isWearingArmor) {
                            ranges.push({ range: baseSpeed * 3, color: "dash" });
                        }
                        return ranges;
                    };
                    return FictionalGameSystemSpeedProvider;
                }(SpeedProvider));
                // @ts-ignore
                dragRuler.registerSystem("shadowrun6-eden", FictionalGameSystemSpeedProvider);
            });
            return [2 /*return*/];
        });
    });
});
$.fn.closestData = function (dataName, defaultValue) {
    var _a;
    if (defaultValue === void 0) { defaultValue = ""; }
    var value = (_a = this.closest("[data-" + dataName + "]")) === null || _a === void 0 ? void 0 : _a.data(dataName);
    return value ? value : defaultValue;
};
/* -------------------------------------------- */
function registerChatMessageEdgeListener(event, chatMsg, html, data) {
    if (!chatMsg.isOwner) {
        console.log("I am not owner of that chat message from " + data.alias);
        return;
    }
    // React to changed edge boosts and actions
    var boostSelect = html.find(".edgeBoosts");
    var edgeActions = html.find(".edgeActions");
    if (boostSelect) {
        boostSelect.change(function (event) { return EdgeUtil_js_1["default"].onEdgeBoostActionChange(event, "POST", chatMsg, html, data); });
        boostSelect.keyup(function (event) { return EdgeUtil_js_1["default"].onEdgeBoostActionChange(event, "POST", chatMsg, html, data); });
    }
    // chatMsg.roll is a SR6Roll
    var btnPerform = html.find(".edgePerform");
    var roll = getRoll(chatMsg);
    if (btnPerform && roll) {
        btnPerform.click(function (event) { return EdgeUtil_js_1["default"].peformPostEdgeBoost(chatMsg, html, data, btnPerform, boostSelect, edgeActions); });
    }
}
function _onRenderVehicleSheet(application, html, data) {
    console.log("_onRenderVehicleSheet for " + data.actor);
}
function _onRenderItemSheet(sheet, html, item) {
    console.log("_onRenderItemSheet for ", item);
}
