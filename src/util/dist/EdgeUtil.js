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
exports.__esModule = true;
var SR6Roll_js_1 = require("../SR6Roll.js");
function getSystemData(obj) {
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
var EdgeUtil = /** @class */ (function () {
    function EdgeUtil() {
    }
    //-------------------------------------------------------------
    EdgeUtil.updateEdgeBoosts = function (elem, available, when) {
        if (when === void 0) { when = "POST"; }
        var newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(function (boost) { return boost.when == when && boost.cost <= available; });
        // Node for inserting new data before
        var insertBeforeElem = {};
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach(function (child) {
            if (child.value != "none" && child.value != "edge_action") {
                elem.removeChild(child);
            }
            if (child.value == "edge_action") {
                insertBeforeElem = child;
            }
        });
        // Add new data
        newEdgeBoosts.forEach(function (boost) {
            var opt = document.createElement("option");
            opt.setAttribute("value", boost.id);
            opt.setAttribute("data-item-boostid", boost.id);
            var cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_boost." + boost.id) + " - (" + boost.cost + ")");
            opt.appendChild(cont);
            elem.insertBefore(opt, insertBeforeElem);
        });
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._updateEdgeActions = function (elem, available) {
        var newEdgeActions = CONFIG.SR6.EDGE_ACTIONS.filter(function (action) { return action.cost <= available; });
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach(function (child) {
            if (child.value != "none") {
                elem.removeChild(child);
            }
        });
        // Add new data
        newEdgeActions.forEach(function (action) {
            var opt = document.createElement("option");
            opt.setAttribute("value", action.id);
            opt.setAttribute("data-item-actionid", action.id);
            var cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_action." + action.id) + " - (" + action.cost + ")");
            opt.appendChild(cont);
            elem.appendChild(opt);
        });
    };
    //-------------------------------------------------------------
    /*
     * Called when a change happens in the Edge Action or Edge Action
     * selection.
     */
    EdgeUtil.onEdgeBoostActionChange = function (event, when, chatMsg, html, data) {
        if (when === void 0) { when = "Post"; }
        console.log("_onEdgeBoostActionChange");
        if (event.currentTarget.name === "edgeBoost") {
            var boostsSelect = event.currentTarget;
            var boostId = boostsSelect.children[boostsSelect.selectedIndex].dataset.itemBoostid;
            console.log(" boostId = " + boostId);
            chatMsg.data.edgeBoost = boostId;
        }
        else if (event.currentTarget.name === "edgeAction") {
            var actionSelect = event.currentTarget;
            var actionId = actionSelect.children[actionSelect.selectedIndex].dataset.itemActionid;
            console.log(" actionId = " + actionId);
            chatMsg.data.edgeAction = actionId;
            data.edge_use = game.i18n.localize("shadowrun6.edge_action." + actionId);
        }
        // Ignore this, if there is no actor
        if (!data.actor) {
            console.log("Ignore because no actor");
            return;
        }
        if (!event || !event.currentTarget) {
            console.log("Ignore because no current target");
            return;
        }
        console.log(" target is " + event.currentTarget.name);
        /*		if (event.currentTarget.name === "edgeBoost") {
            const boostsSelect = event.currentTarget;
            let boostId = boostsSelect.children[boostsSelect.selectedIndex].dataset.itemBoostid;
            console.log(" boostId = "+boostId);
            data.edgeBoost = boostId;
           if (boostId==="edge_action") {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0] , this.data.edge);
            } else {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0] , 0);
            }
            if (boostId!="none") {
                data.edge_use = (game as Game).i18n.localize("shadowrun6.edge_boost."+boostId)
            } else {
                data.edge_use="";
            }
            this._performEdgeBoostOrAction(data, boostId);
        } else if (event.currentTarget.name === "edgeAction") {
            const actionSelect = event.currentTarget;
            let actionId = actionSelect.children[actionSelect.selectedIndex].dataset.itemActionid;
            console.log(" actionId = "+actionId);
            data.edgeAction = actionId;
            data.edge_use = game.i18n.localize("shadowrun6.edge_action."+actionId)
            this._performEdgeBoostOrAction(data, actionId);
        }
*/
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._performEdgeBoostOrAction = function (data, boostOrActionId) {
        console.log("ToDo: performEgdeBoostOrAction " + boostOrActionId);
        if (boostOrActionId == "edge_action") {
            return;
        }
        data.explode = false;
        data.modifier = 0;
        switch (boostOrActionId) {
            case "add_edge_pool":
                data.explode = true;
                break;
        }
        // Update content on dialog
        $("input[name='modifier']")[0].value = data.modifier;
        $("input[name='explode' ]")[0].value = data.explode;
        $("input[name='explode' ]")[0].checked = data.explode;
        //this._updateDicePool(data);
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._payEdge = function (cost, user, actor) {
        return __awaiter(this, void 0, void 0, function () {
            var system, er;
            var _a;
            return __generator(this, function (_b) {
                console.log("ENTER: _payEdge(" + cost + "," + user + "," + actor + ")");
                system = getSystemData(actor);
                system.edge.value -= cost;
                if (system.edge.value < 0) {
                    system.edge.value = 0;
                }
                actor.updateSource((_a = {}, _a["edge.value"] = system.edge.value, _a));
                er = new Roll(cost + "dc", {}, {});
                er.evaluate({ async: false });
                if (game.dice3d) {
                    game.dice3d.showForRoll(er);
                }
                return [2 /*return*/];
            });
        });
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._getFailedIndices = function (results, max) {
        var indices = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].count == 0 && indices.length < max) {
                indices.push(i);
            }
        }
        return indices;
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._getPlusOneIndex = function (results) {
        var indices = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].count == 0 && results[i].result === 4) {
                return i;
            }
        }
        return -1;
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._rerollIndices = function (chatMsg, roll, indices, html) {
        return __awaiter(this, void 0, void 0, function () {
            var rollData, r, diceHtml, newTotal, i, index;
            var _a;
            return __generator(this, function (_b) {
                console.log("_rerollIndices ", indices);
                rollData = {};
                rollData.pool = indices.length;
                rollData.formula = rollData.pool + "d6";
                rollData.modifier = 0;
                rollData.buttonType = 0;
                rollData.edge_use = "reroll";
                rollData.actionText = "Reroll";
                r = new SR6Roll_js_1["default"]("", rollData);
                diceHtml = html.find(".dice-rolls");
                try {
                    r.evaluate();
                    r.toMessage(rollData);
                    newTotal = roll._total + r.total;
                    roll._total = newTotal;
                    // Change previous results
                    for (i = 0; i < indices.length; i++) {
                        index = indices[i];
                        roll.data.results[index] = r.results[i];
                    }
                    // Try to update html
                    diceHtml.children().each(function (i, obj) {
                        $(obj).attr("class", roll.data.results[i].classes);
                    });
                    html.find(".spend_edge").append('<h4 class="highlight" style="margin:0px">Rerolled</h4>');
                    html.find(".resulttext").empty();
                    html
                        .find(".resulttext")
                        .append(game.i18n.localize("shadowrun6.roll.success") +
                        ": <b>" +
                        newTotal +
                        "</b> " +
                        game.i18n.localize("shadowrun6.roll.successes"));
                    // Update message
                    roll.results = roll.data.results;
                    chatMsg.update((_a = {},
                        _a["roll"] = roll.toJSON(),
                        _a["content"] = html[0].innerHTML,
                        _a));
                }
                catch (err) {
                    console.error("sr6_roll error: " + err);
                    console.error("sr6_roll error: " + err.stack);
                    ui.notifications.error("Dice roll evaluation failed: " + err.message);
                }
                return [2 /*return*/];
            });
        });
    };
    //-------------------------------------------------------------
    EdgeUtil.prototype._performPlusOne = function (chatMsg, roll, index, html) {
        return __awaiter(this, void 0, void 0, function () {
            var newResult, newTotal, diceHtml;
            var _a;
            return __generator(this, function (_b) {
                console.log("_performPlus1 ");
                newResult = roll.data.results[index].result + 1;
                newTotal = roll._total;
                // Change previous results
                roll.data.results[index].result = newResult;
                roll.data.results[index].classes = "die die_" + newResult;
                if (roll.data.results[index].result >= 5) {
                    roll.data.results[index].success = true;
                    newTotal++;
                }
                diceHtml = html.find(".dice-rolls");
                try {
                    roll._total = newTotal;
                    // Try to update html
                    diceHtml.children().each(function (i, obj) {
                        $(obj).attr("class", roll.data.results[i].classes);
                    });
                    html.find(".spend_edge").append('<h4 class="highlight" style="margin:0px">+1 to one die</h4>');
                    html.find(".resulttext").empty();
                    html
                        .find(".resulttext")
                        .append(game.i18n.localize("shadowrun6.roll.success") +
                        ": <b>" +
                        newTotal +
                        "</b> " +
                        game.i18n.localize("shadowrun6.roll.successes"));
                    // Update message
                    roll.results = roll.data.results;
                    chatMsg.update((_a = {},
                        _a["roll"] = roll.toJSON(),
                        _a["content"] = html[0].innerHTML,
                        _a));
                }
                catch (err) {
                    console.error("sr6_roll error: " + err);
                    console.error("sr6_roll error: " + err.stack);
                    ui.notifications.error("Dice roll evaluation failed: " + err.message);
                }
                return [2 /*return*/];
            });
        });
    };
    //-------------------------------------------------------------
    EdgeUtil.peformPostEdgeBoost = function (chatMsg, html, data, btnPerform, edgeBoosts, edgeActions) {
        console.log("ToDo performPostEdgeBoost");
        console.log("chatMsg = ", chatMsg);
        console.log("   data = ", data);
        console.log("   html = ", html);
        /*
        console.log("results = ",chatMsg._roll.data.results);
        let results = chatMsg._roll.data.results;

        let user  = (game as Game).users!.get(data.message.user);
        let actor = (game as Game).actors!.get(chatMsg._roll.data.actor._id);
        let diceHtml = html.find(".message-content");

        let boostOrActionId = chatMsg.data.edgeBoost;
        if (boostOrActionId==='edge_action') {
            boostOrActionId = chatMsg.data.edgeAction;
        }
        console.log("to perform: "+boostOrActionId);

        // Remove "Spending Edge"
        html.find(".spend_edge").empty();


        switch (boostOrActionId) {
        case "reroll_one":
            console.debug("Reroll one die");
            chatMsg._roll._payEdge(1, user, actor);
            chatMsg._roll._rerollIndices(chatMsg, chatMsg._roll, chatMsg._roll._getFailedIndices(results,1), diceHtml);
            break;
        case "plus_1_roll":
            console.debug("+1 to single roll");
            chatMsg._roll._payEdge(2, user, actor);
            // ToDo: Find a 4 or at least a 1
            chatMsg._roll._performPlusOne(chatMsg, chatMsg._roll, chatMsg._roll._getPlusOneIndex(results), diceHtml);
            break;
        case "reroll_failed":
            console.debug("Reroll all failed");
            chatMsg._roll._payEdge(4, user, actor);
            chatMsg._roll._rerollIndices(chatMsg, chatMsg._roll, chatMsg._roll._getFailedIndices(results,Number.MAX_VALUE), diceHtml);
            break;
        default:
            console.log("ToDo: Support edge action "+boostOrActionId);
        }
    */
        /*
        let rollData = {};
        rollData.pool = 2;
        rollData.formula = rollData.pool + "d6";
        rollData.modifier= 0;
        rollData.buttonType=0;
        rollData.edge_use=false;
        let r = new SR6Roll("", rollData);
        try {
        console.log("Call r.evaluate: "+r);
        r.evaluate();
            console.log(" toMessage  data = ",data);
            console.log(" toMessage  r    = ",r);
            console.log(" Reroll = ",r.results);
            r.toMessage(rollData);

            let chatOptions = mergeObject( {
                from: "peformPostEdgeBoost.chatOptionsMerged",
                user: game.user.id,
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                sound: CONFIG.sounds.dice,
                roll: r
            },
                data
            );
            //chatOptions.content = r.render(chatOptions);
            //ChatMessage.create(chatOptions);
        } catch (err) {
        console.error("sr6_roll error: "+err);
        console.error("sr6_roll error: "+err.stack);
            ui.notifications.error(`Dice roll evaluation failed: ${err.message}`);
        }
        */
    };
    return EdgeUtil;
}());
exports["default"] = EdgeUtil;
