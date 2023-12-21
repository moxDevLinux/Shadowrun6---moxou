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
exports.defineHandlebarHelper = exports.fireModesToString = exports.attackRatingToString = void 0;
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function deHTML(html) {
    html = html.replace(/<br\/>/gi, "\n");
    html = html.replace(/<b>(.*?)<\/b>/gi, " $1");
    return html;
}
function attackRatingToString(val) {
    if (!val)
        return "NULL";
    return (val[0] +
        "/" +
        (val[1] != 0 ? val[1] : "-") +
        "/" +
        (val[2] != 0 ? val[2] : "-") +
        "/" +
        (val[3] != 0 ? val[3] : "-") +
        "/" +
        (val[4] != 0 ? val[4] : "-"));
}
exports.attackRatingToString = attackRatingToString;
function fireModesToString(val) {
    var list = [];
    if (val["SS"])
        list.push(game.i18n.localize("shadowrun6.item.mode_ss"));
    if (val["BF"])
        list.push(game.i18n.localize("shadowrun6.item.mode_bf"));
    if (val["FA"])
        list.push(game.i18n.localize("shadowrun6.item.mode_fa"));
    if (val["SA"])
        list.push(game.i18n.localize("shadowrun6.item.mode_sa"));
    return list.toString();
}
exports.fireModesToString = fireModesToString;
exports.defineHandlebarHelper = function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Handlebars.registerHelper("attackrating", function (val) {
                if (!val)
                    return "NULL";
                return (val[0] +
                    "/" +
                    (val[1] != 0 ? val[1] : "-") +
                    "/" +
                    (val[2] != 0 ? val[2] : "-") +
                    "/" +
                    (val[3] != 0 ? val[3] : "-") +
                    "/" +
                    (val[4] != 0 ? val[4] : "-"));
            });
            Handlebars.registerHelper("firemodes", function (val) {
                var list = [];
                if (val["SS"])
                    list.push(game.i18n.localize("shadowrun6.item.mode_ss"));
                if (val["BF"])
                    list.push(game.i18n.localize("shadowrun6.item.mode_bf"));
                if (val["FA"])
                    list.push(game.i18n.localize("shadowrun6.item.mode_fa"));
                if (val["SA"])
                    list.push(game.i18n.localize("shadowrun6.item.mode_sa"));
                return list.toString();
            });
            Handlebars.registerHelper("spellRangeName", function (val) {
                return game.i18n.localize(CONFIG.SR6.spell_range[val]);
            });
            Handlebars.registerHelper("spellTypeName", function (val) {
                return game.i18n.localize(CONFIG.SR6.spell_type[val] + "_short");
            });
            Handlebars.registerHelper("spellDurationName", function (val) {
                return game.i18n.localize(CONFIG.SR6.spell_duration[val] + "_short");
            });
            Handlebars.registerHelper("concat", function (op1, op2) {
                return op1 + op2;
            });
            Handlebars.registerHelper("concat3", function (op1, op2, op3) {
                return op1 + op2 + op3;
            });
            Handlebars.registerHelper("ifIn", function (elem, list, options) {
                if (list.indexOf(elem) > -1) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
            Handlebars.registerHelper('getByKey', function (map, key) {
                return map.get(key);
            });
            Handlebars.registerHelper('getIniType', function (map, key) {
                return map.get(key).initiativeType;
            });
            Handlebars.registerHelper("skillAttr", getSkillAttribute);
            Handlebars.registerHelper("skillPool", getSkillPool);
            Handlebars.registerHelper("gearSubtype", getSubtypes);
            Handlebars.registerHelper("ritualFeat", getRitualFeatures);
            Handlebars.registerHelper("spellFeat", getSpellFeatures);
            Handlebars.registerHelper("matrixPool", getMatrixActionPool);
            Handlebars.registerHelper("itemNotInList", itemNotInList);
            Handlebars.registerHelper("itemTypeInList", itemTypeInList);
            Handlebars.registerHelper("itemsOfType", itemsOfType);
            Handlebars.registerHelper("itemsOfGeartype", itemsOfGeartype);
            Handlebars.registerHelper("skillPointsNotZero", skillPointsNotZero);
            Handlebars.registerHelper("description", function (itemData, type) {
                var fallback = itemData.description;
                var key = type + "." + itemData.genesisID + ".desc";
                var name = game.i18n.localize(key);
                if (name == key) {
                    return fallback;
                }
                return deHTML(name);
            });
            // Allows {if X = Y} type syntax in html using handlebars
            Handlebars.registerHelper("iff", function (a, operator, b, opts) {
                var bool = false;
                switch (operator) {
                    case "==":
                        bool = a == b;
                        break;
                    case ">":
                        bool = a > b;
                        break;
                    case "<":
                        bool = a < b;
                        break;
                    case "!=":
                        bool = a != b;
                        break;
                    case "&&":
                        bool = a && b;
                        break;
                    case "||":
                        bool = a || b;
                        break;
                    case "contains":
                        if (a && b) {
                            bool = a.includes(b);
                        }
                        else {
                            bool = false;
                        }
                        break;
                    default:
                        throw "Unknown operator " + operator;
                }
                if (bool) {
                    return opts.fn(this);
                }
                else {
                    return opts.inverse(this);
                }
            });
            Handlebars.registerHelper('switch', function (value, options) {
                this.switch_value = value;
                return options.fn(this);
            });
            Handlebars.registerHelper('case', function (value, options) {
                if (value == this.switch_value) {
                    return options.fn(this);
                }
            });
            return [2 /*return*/];
        });
    });
};
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
function itemsOfType(items, type) {
    return items.filter(function (elem) { return getActorData(elem).type == type; });
}
function itemsOfGeartype(items, geartype) {
    return items.filter(function (elem) { return getSystemData(elem).type == geartype; });
}
function skillPointsNotZero(skills) {
    return Object.keys(skills)
        .filter(function (key) { return skills[key].points > 0; })
        .reduce(function (res, key) { return (res[key] = skills[key], res); }, {});
}
function itemNotInList(items, item) {
    var bool = true;
    items.forEach(function (elem) {
        if (getSystemData(elem).subtype == item) {
            bool = false;
        }
    });
    return bool;
}
function itemTypeInList(items, type) {
    var bool = false;
    items.forEach(function (elem) {
        if (getActorData(elem).type == type) {
            bool = true;
        }
    });
    return bool;
}
function getSkillAttribute(key) {
    var skillDef = CONFIG.SR6.ATTRIB_BY_SKILL.get(key);
    if (skillDef) {
        var myElem = skillDef.attrib;
        return myElem;
    }
    else {
        return "??";
    }
}
function getSkillPool(skillId, skillSpec, actor) {
    return actor._getSkillPool(skillId, skillSpec);
}
function getSubtypes(key) {
    if (CONFIG.SR6.GEAR_SUBTYPES.get(key)) {
        var myElem = CONFIG.SR6.GEAR_SUBTYPES.get(key);
        return myElem;
    }
    else {
        return [];
    }
}
function getRitualFeatures(ritual) {
    var ret = [];
    var i18n = game.i18n;
    if (ritual.features.material_link)
        ret.push(i18n.localize("shadowrun6.ritualfeatures.material_link"));
    if (ritual.features.anchored)
        ret.push(i18n.localize("shadowrun6.ritualfeatures.anchored"));
    if (ritual.features.minion)
        ret.push(i18n.localize("shadowrun6.ritualfeatures.minion"));
    if (ritual.features.spell)
        ret.push(i18n.localize("shadowrun6.ritualfeatures.spell"));
    if (ritual.features.spotter)
        ret.push(i18n.localize("shadowrun6.ritualfeatures.spotter"));
    return ret.join(", ");
}
function getSpellFeatures(spell) {
    var ret = [];
    var i18n = game.i18n;
    if (spell.features) {
        if (spell.features.area)
            ret.push(i18n.localize("shadowrun6.spellfeatures.area"));
        if (spell.features.direct)
            ret.push(i18n.localize("shadowrun6.spellfeatures.direct"));
        if (spell.features.indirect)
            ret.push(i18n.localize("shadowrun6.spellfeatures.indirect"));
        if (spell.features.sense_single)
            ret.push(i18n.localize("shadowrun6.spellfeatures.sense_single"));
        if (spell.features.sense_multi)
            ret.push(i18n.localize("shadowrun6.spellfeatures.sense_multi"));
    }
    return ret.join(", ");
}
function getMatrixActionPool(key, actor) {
    var action = CONFIG.SR6.MATRIX_ACTIONS[key];
    var skill = getSystemData(actor).skills[action.skill];
    var pool = 0;
    if (skill) {
        pool = skill.points + skill.modifier;
        if (skill.expertise == action.specialization) {
            pool += 3;
        }
        else if (skill.specialization == action.specialization) {
            pool += 2;
        }
    }
    if (action.attrib) {
        var attrib = getSystemData(actor).attributes[action.attrib];
        pool += attrib.pool;
    }
    return pool;
}
