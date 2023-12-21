"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.doRoll = void 0;
var RollDialog_js_1 = require("./RollDialog.js");
var SR6Roll_js_1 = require("./SR6Roll.js");
var RollTypes_js_1 = require("./dice/RollTypes.js");
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function isWeapon(obj) {
    return obj.attackRating != undefined;
}
function isSpell(obj) {
    return obj.drain != undefined;
}
function getSystemData(obj) {
    if (!obj)
        return null;
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
function doRoll(data) {
    return __awaiter(this, void 0, Promise, function () {
        var _r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ENTER doRoll ", data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, _showRollDialog(data)];
                case 2:
                    _r = _a.sent();
                    console.log("returned from _showRollDialog with ", _r);
                    if (_r) {
                        console.log("==============Calling toRoll() with ", data);
                        _r.toMessage(data, { rollMode: data.rollMode });
                    }
                    return [2 /*return*/, _r];
                case 3:
                    console.log("LEAVE doRoll");
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.doRoll = doRoll;
//-------------------------------------------------------------
/**
 * @param data { PreparedRoll} Roll configuration from the UI
 * @return {Promise<Roll>}
 * @private
 */
function _showRollDialog(data) {
    return __awaiter(this, void 0, Promise, function () {
        var lifeform, dia2_1, template, dialogData, html_1, title_1, dialogResult_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ENTER _showRollDialog", this);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    lifeform = void 0;
                    if (data.actor) {
                        if (!isLifeform(getSystemData(data.actor))) {
                            console.log("Actor is not a lifeform");
                        }
                        lifeform = getSystemData(data.actor);
                        data.edge = data.actor ? lifeform.edge.value : 0;
                    }
                    if (!data.calcPool || data.calcPool == 0) {
                        data.calcPool = data.pool - data.actor.getWoundModifier();
                    }
                    /*
                     * Edge, Edge Boosts and Edge Actions
                     */
                    data.edgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(function (boost) { return boost.when == "PRE" && boost.cost <= data.edge; });
                    if (data.rollType == RollTypes_js_1.RollType.Weapon) {
                        data.calcPool = data.pool;
                        data.calcAttackRating = __spreadArrays(data.weapon.attackRating);
                        data.calcDmg = data.weapon.dmg;
                    }
                    if (data.rollType == RollTypes_js_1.RollType.Spell && lifeform != null) {
                        data.calcDamage = lifeform.attributes.mag.pool / 2;
                    }
                    template = "systems/shadowrun6-eden/templates/chat/configurable-roll-dialog.html";
                    dialogData = {
                        //checkText: data.extraText,
                        data: data,
                        CONFIG: CONFIG,
                        rollModes: CONFIG.Dice.rollModes
                    };
                    return [4 /*yield*/, renderTemplate(template, dialogData)];
                case 2:
                    html_1 = _a.sent();
                    title_1 = data.title;
                    // Also prepare a ConfiguredRoll
                    console.log("###Create ConfiguredRoll");
                    dialogResult_1 = new RollTypes_js_1.ConfiguredRoll();
                    dialogResult_1.copyFrom(data);
                    dialogResult_1.updateSpecifics(data);
                    // Create the Dialog window
                    return [2 /*return*/, new Promise(function (resolve) {
                            console.log("_showRollDialog prepared buttons");
                            var buttons;
                            if (data.allowBuyHits) {
                                buttons = {
                                    bought: {
                                        icon: '<i class="fas fa-dollar-sign"></i>',
                                        label: game.i18n.localize("shadowrun6.rollType.bought"),
                                        callback: function (html) { return resolve(_dialogClosed(RollTypes_js_1.ReallyRoll.AUTOHITS, html[0].querySelector("form"), data, dia2_1, dialogResult_1)); }
                                    },
                                    normal: {
                                        icon: '<i class="fas fa-dice-six"></i>',
                                        label: game.i18n.localize("shadowrun6.rollType.normal"),
                                        callback: function (html) { return resolve(_dialogClosed(RollTypes_js_1.ReallyRoll.ROLL, html[0].querySelector("form"), data, dia2_1, dialogResult_1)); }
                                    }
                                };
                            }
                            else {
                                buttons = {
                                    normal: {
                                        icon: '<i class="fas fa-dice-six"></i>',
                                        label: game.i18n.localize("shadowrun6.rollType.normal"),
                                        callback: function (html) {
                                            console.log("doRoll: in callback");
                                            resolve(_dialogClosed(RollTypes_js_1.ReallyRoll.ROLL, html[0].querySelector("form"), data, dia2_1, dialogResult_1));
                                            console.log("end callback");
                                        }
                                    }
                                };
                            }
                            var diagData = {
                                title: title_1,
                                content: html_1,
                                render: function (html) {
                                    console.log("Register interactivity in the rendered dialog", _this);
                                    // Set roll mode to default from chat window
                                    var chatRollMode = $(".roll-type-select").val();
                                    $("select[name='rollMode']").not(".roll-type-select").val(chatRollMode);
                                },
                                buttons: buttons,
                                "default": "normal"
                            };
                            var myDialogOptions = {
                                width: 520,
                                jQuery: true,
                                resizeable: true,
                                actor: data.actor,
                                prepared: data,
                                dialogResult: dialogResult_1
                            };
                            console.log("create RollDialog");
                            dia2_1 = new RollDialog_js_1.RollDialog(diagData, myDialogOptions);
                            dia2_1.render(true);
                            console.log("showRollDialog after render()");
                        })];
                case 3:
                    console.log("LEAVE _showRollDialog");
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function _dialogClosed(type, form, prepared, dialog, configured) {
    var _a, _b, _c;
    console.log("ENTER _dialogClosed(type=" + type + ")##########");
    console.log("dialogClosed: prepared=", prepared);
    configured.updateSpecifics(prepared);
    console.log("dialogClosed: configured=", configured);
    /* Check if attacker gets edge */
    if (configured.actor && configured.edgePlayer > 0) {
        console.log("Actor " + configured.actor.data._id + " gets " + configured.edgePlayer + " Edge");
        var newEdge = getSystemData(configured.actor).edge.value + configured.edgePlayer;
        configured.actor.update((_a = {}, _a["data.edge.value"] = newEdge, _a));
        var combat = game.combat;
        if (combat) {
            console.log("In combat: mark edge gained in combatant " + configured.edgePlayer + " Edge");
            var combatant = combat.getCombatantByActor(configured.actor.data._id);
            if (combatant) {
                combatant.edgeGained += configured.edgePlayer;
            }
        }
    }
    try {
        if (!dialog.modifier)
            dialog.modifier = 0;
        var system = getSystemData(prepared.actor);
        if (prepared.actor && isLifeform(system)) {
            // Pay eventuallly selected edge boost
            if (configured.edgeBoost && configured.edgeBoost != "none") {
                console.log("Edge Boost selected: " + configured.edgeBoost);
                if (configured.edgeBoost === "edge_action") {
                    console.log("ToDo: handle edge action");
                }
                else {
                    var boost = CONFIG.SR6.EDGE_BOOSTS.find(function (boost) { return boost.id == configured.edgeBoost; });
                    console.log("Pay " + boost.cost + " egde for Edge Boost: " + game.i18n.localize("shadowrun6.edge_boost." + configured.edgeBoost));
                    system.edge.value = prepared.edge - boost.cost;
                    // Pay Edge cost
                    console.log("Update Edge to " + (prepared.edge - boost.cost));
                    prepared.actor.update((_b = {}, _b["data.edge.value"] = system.edge.value, _b));
                }
            }
            else {
                if (prepared.edge > 0) {
                    console.log("Update Edge to " + prepared.edge);
                    prepared.actor.update((_c = {}, _c["data.edge.value"] = prepared.edge, _c));
                }
            }
        }
        //configured.edgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(boost => boost.when=="POST");
        var formula = "";
        var isPrivate = false;
        if (form) {
            console.log("---prepared.targets = ", prepared.targets);
            console.log("---configured.targetIds = ", configured.targetIds);
            configured.threshold = form.threshold ? parseInt(form.threshold.value) : 0;
            configured.useWildDie = form.useWildDie.checked ? 1 : 0;
            configured.explode = form.explode.checked;
            configured.buttonType = type;
            dialog.modifier = parseInt(form.modifier.value);
            if (!dialog.modifier)
                dialog.modifier = 0;
            configured.defRating = form.defRating ? parseInt(form.defRating.value) : 0;
            console.log("rollMode = ", form.rollMode.value);
            configured.rollMode = form.rollMode.value;
            var base = configured.pool ? configured.pool : 0;
            var mod = dialog.modifier ? dialog.modifier : 0;
            var woundMod = form.useWoundModifier.checked ? prepared.actor.getWoundModifier() : 0;
            configured.pool = +base + +mod + -woundMod;
            prepared.calcPool = configured.pool;
            /* Check for a negative pool! Set to 0 if negative so the universe doesn't explode */
            if (configured.pool < 0)
                configured.pool = 0;
            /* Build the roll formula */
            formula = createFormula(configured, dialog);
        }
        console.log("_dialogClosed: ", formula);
        // Execute the roll
        return new SR6Roll_js_1["default"](formula, configured);
    }
    catch (err) {
        console.log("Oh NO! " + err.stack);
    }
    finally {
        console.log("LEAVE _dialogClosed()");
    }
    return this;
}
/*
 * Convert ConfiguredRoll into a Foundry roll formula
 */
function createFormula(roll, dialog) {
    console.log("createFormula-------------------------------");
    console.log("--pool = " + roll.pool);
    console.log("--modifier = " + dialog.modifier);
    var regular = +(roll.pool ? roll.pool : 0) + (dialog.modifier ? dialog.modifier : 0);
    var wild = 0;
    if (roll.useWildDie > 0) {
        regular -= roll.useWildDie;
        wild = roll.useWildDie;
    }
    var formula = regular + "d6";
    if (roll.explode) {
        formula += "x6";
    }
    formula += "cs>=5";
    if (wild > 0) {
        formula += " + " + wild + "d6";
        if (roll.explode) {
            formula += "x6";
        }
        formula += "cs>=5";
    }
    return formula;
}
