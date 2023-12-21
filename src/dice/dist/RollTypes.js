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
exports.SR6ChatMessageData = exports.ConfiguredRoll = exports.ConfiguredWeaponRollData = exports.VehicleRoll = exports.MatrixActionRoll = exports.WeaponRoll = exports.ComplexFormRoll = exports.SpellRoll = exports.SkillRoll = exports.SoakRoll = exports.DefenseRoll = exports.PreparedRoll = exports.TokenData = exports.ReallyRoll = exports.InitiativeType = exports.SoakType = exports.RollType = void 0;
var config_js_1 = require("../config.js");
var RollType;
(function (RollType) {
    RollType["Common"] = "common";
    RollType["Weapon"] = "weapon";
    RollType["Skill"] = "skill";
    RollType["Spell"] = "spell";
    RollType["Ritual"] = "ritual";
    RollType["Vehicle"] = "vehicle";
    RollType["ComplexForm"] = "complexform";
    RollType["MatrixAction"] = "matrix";
    /** Defense is a way to reduce netto hits */
    RollType["Defense"] = "defense";
    /** Reduce netto damage */
    RollType["Soak"] = "soak";
    /** Directly apply the given damage */
    RollType["Damage"] = "damage";
    RollType["Initiative"] = "initiative";
})(RollType = exports.RollType || (exports.RollType = {}));
var SoakType;
(function (SoakType) {
    SoakType["DAMAGE_STUN"] = "damage_stun";
    SoakType["DAMAGE_PHYSICAL"] = "damage_phys";
    SoakType["DRAIN"] = "drain";
    SoakType["FADING"] = "fading";
})(SoakType = exports.SoakType || (exports.SoakType = {}));
var InitiativeType;
(function (InitiativeType) {
    InitiativeType["PHYSICAL"] = "physical";
    InitiativeType["ASTRAL"] = "astral";
    InitiativeType["MATRIX"] = "matrix";
})(InitiativeType = exports.InitiativeType || (exports.InitiativeType = {}));
var ReallyRoll;
(function (ReallyRoll) {
    ReallyRoll[ReallyRoll["ROLL"] = 0] = "ROLL";
    ReallyRoll[ReallyRoll["AUTOHITS"] = 1] = "AUTOHITS";
})(ReallyRoll = exports.ReallyRoll || (exports.ReallyRoll = {}));
var TokenData = /** @class */ (function () {
    function TokenData(token) {
        this.id = token.id;
        this.name = token.name;
        this.sceneId = token.scene.id;
        if (token.actor)
            this.actorId = token.actor.id;
    }
    return TokenData;
}());
exports.TokenData = TokenData;
var CommonRollData = /** @class */ (function () {
    function CommonRollData() {
        /* Use a wild die */
        this.useWildDie = 0;
    }
    Object.defineProperty(CommonRollData.prototype, "isOpposed", {
        get: function () {
            return this.defendWith != undefined;
        },
        enumerable: false,
        configurable: true
    });
    CommonRollData.prototype.copyFrom = function (copy) {
        this.speaker = copy.speaker;
        this.actor = copy.actor;
        this.title = copy.title;
        this.actionText = copy.actionText;
        this.checkText = copy.checkText;
        this.rollType = copy.rollType;
        this.defendWith = copy.defendWith;
        this.threshold = copy.threshold;
        this.useWildDie = copy.useWildDie;
        this.pool = copy.pool;
    };
    return CommonRollData;
}());
var PoolUsage;
(function (PoolUsage) {
    PoolUsage[PoolUsage["OneForOne"] = 0] = "OneForOne";
    PoolUsage[PoolUsage["OneForAll"] = 1] = "OneForAll";
})(PoolUsage || (PoolUsage = {}));
/**
 * The data fro a roll known before presenting a roll dialog
 */
var PreparedRoll = /** @class */ (function (_super) {
    __extends(PreparedRoll, _super);
    function PreparedRoll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreparedRoll.prototype.copyFrom = function (copy) {
        _super.prototype.copyFrom.call(this, copy);
        this.allowBuyHits = copy.allowBuyHits;
        this.freeEdge = copy.freeEdge;
        this.edge = copy.edge;
        this.edgeBoosts = copy.edgeBoosts;
        this.performer = copy.performer;
    };
    return PreparedRoll;
}(CommonRollData));
exports.PreparedRoll = PreparedRoll;
var DefenseRoll = /** @class */ (function (_super) {
    __extends(DefenseRoll, _super);
    function DefenseRoll(threshold) {
        var _this = _super.call(this) || this;
        _this.rollType = RollType.Defense;
        _this.threshold = threshold;
        return _this;
    }
    return DefenseRoll;
}(PreparedRoll));
exports.DefenseRoll = DefenseRoll;
var SoakRoll = /** @class */ (function (_super) {
    __extends(SoakRoll, _super);
    // Eventually add effects
    function SoakRoll(threshold) {
        var _this = _super.call(this) || this;
        _this.rollType = RollType.Soak;
        _this.threshold = threshold;
        return _this;
    }
    return SoakRoll;
}(PreparedRoll));
exports.SoakRoll = SoakRoll;
var SkillRoll = /** @class */ (function (_super) {
    __extends(SkillRoll, _super);
    /**
     * @param skillVal {Skill}   The actors instance of that skill
     */
    function SkillRoll(actor, skillId) {
        var _this = _super.call(this) || this;
        _this.rollType = RollType.Skill;
        _this.skillId = skillId;
        _this.skillDef = CONFIG.SR6.ATTRIB_BY_SKILL.get(skillId);
        _this.skillValue = actor.skills[skillId];
        _this.attrib = _this.skillDef.attrib;
        _this.performer = actor;
        return _this;
    }
    SkillRoll.prototype.copyFrom = function (copy) {
        _super.prototype.copyFrom.call(this, copy);
        this.skillId = copy.skillId;
        this.skillDef = copy.skillDef;
        this.skillValue = copy.skillValue;
        this.attrib = copy.attrib;
    };
    /**
     * Execute
     */
    SkillRoll.prototype.prepare = function (actor) { };
    return SkillRoll;
}(PreparedRoll));
exports.SkillRoll = SkillRoll;
var SpellRoll = /** @class */ (function (_super) {
    __extends(SpellRoll, _super);
    /**
     * @param skill {Skill}   The skill to roll upon
     */
    function SpellRoll(actor, item, itemId, spellItem) {
        var _this = _super.call(this, actor, "sorcery") || this;
        _this.rollType = RollType.Spell;
        /** Radius of spells with area effect - may be increased */
        _this.calcArea = 2;
        /** Damage of combat spells - may be amped up */
        _this.calcDamage = 0;
        _this.item = item;
        _this.itemId = itemId;
        _this.spell = spellItem;
        _this.skillSpec = "spellcasting";
        _this.canAmpUpSpell = spellItem.category === "combat";
        _this.canIncreaseArea = spellItem.range === "line_of_sight_area" || spellItem.range === "self_area";
        if (spellItem.category === "combat") {
            if (spellItem.type == "mana") {
                _this.defendWith = config_js_1.Defense.SPELL_DIRECT;
                //this.hasDamageResist = false;
            }
            else {
                _this.defendWith = config_js_1.Defense.SPELL_INDIRECT;
            }
        }
        else if (spellItem.category === "manipulation") {
            _this.defendWith = config_js_1.Defense.SPELL_OTHER;
        }
        else if (spellItem.category === "heal") {
            if (spellItem.withEssence) {
                _this.threshold = 5 - Math.ceil(actor.essence);
            }
        }
        _this.calcArea = 2;
        _this.calcDrain = spellItem.drain;
        return _this;
    }
    return SpellRoll;
}(SkillRoll));
exports.SpellRoll = SpellRoll;
var ComplexFormRoll = /** @class */ (function (_super) {
    __extends(ComplexFormRoll, _super);
    /**
     * @param skill {Skill}   The skill to roll upon
     */
    function ComplexFormRoll(actor, item, itemId, formItem) {
        var _this = _super.call(this, actor, "electronics") || this;
        _this.rollType = RollType.ComplexForm;
        _this.item = item;
        _this.itemId = itemId;
        _this.form = formItem;
        _this.skillSpec = "complex_forms";
        _this.attrib = "res";
        _this.calcFade = formItem.fading;
        return _this;
    }
    return ComplexFormRoll;
}(SkillRoll));
exports.ComplexFormRoll = ComplexFormRoll;
function isWeapon(obj) {
    return obj.attackRating != undefined;
}
function getSystemData(obj) {
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
var WeaponRoll = /** @class */ (function (_super) {
    __extends(WeaponRoll, _super);
    function WeaponRoll(actor, item, itemId, gear) {
        var _this = _super.call(this, actor, getSystemData(item).skill) || this;
        _this.rollType = RollType.Weapon;
        /** Effective attack rating after applying firing mode */
        _this.calcAttackRating = [0, 0, 0, 0, 0];
        _this.item = item;
        _this.itemId = itemId;
        _this.gear = gear;
        _this.skillSpec = _this.gear.skillSpec;
        if (isWeapon(gear)) {
            _this.weapon = gear;
            _this.rollType = RollType.Weapon;
            _this.defendWith = config_js_1.Defense.PHYSICAL;
        }
        _this.pool = gear.pool;
        return _this;
    }
    return WeaponRoll;
}(SkillRoll));
exports.WeaponRoll = WeaponRoll;
var MatrixActionRoll = /** @class */ (function (_super) {
    __extends(MatrixActionRoll, _super);
    function MatrixActionRoll(actor, action) {
        var _this = _super.call(this, actor, action.skill) || this;
        _this.rollType = RollType.MatrixAction;
        _this.action = action;
        _this.skillSpec = _this.action.spec;
        return _this;
    }
    return MatrixActionRoll;
}(SkillRoll));
exports.MatrixActionRoll = MatrixActionRoll;
var VehicleRoll = /** @class */ (function (_super) {
    __extends(VehicleRoll, _super);
    /**
     * @param skillVal {Skill}   The actors instance of that skill
     */
    function VehicleRoll(actor, skillId) {
        var _this = _super.call(this) || this;
        _this.rollType = RollType.Vehicle;
        _this.skillId = skillId;
        _this.skillDef = CONFIG.SR6.ATTRIB_BY_SKILL.get(skillId);
        _this.skillValue = actor.skills[skillId];
        return _this;
    }
    return VehicleRoll;
}(PreparedRoll));
exports.VehicleRoll = VehicleRoll;
var ConfiguredWeaponRollData = /** @class */ (function () {
    function ConfiguredWeaponRollData() {
        /** Effective attack rating after applying firing mode */
        this.calcAttackRating = [0, 0, 0, 0, 0];
    }
    return ConfiguredWeaponRollData;
}());
exports.ConfiguredWeaponRollData = ConfiguredWeaponRollData;
var ConfiguredRoll = /** @class */ (function (_super) {
    __extends(ConfiguredRoll, _super);
    function ConfiguredRoll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* This methods is a horrible crime - there must be a better solution */
    ConfiguredRoll.prototype.updateSpecifics = function (copy) {
        this.targetIds = copy.targets;
        // In case this was a WeaponRoll
        console.log("Copy WeaponRoll data to ConfiguredRoll");
        this.calcAttackRating = copy.calcAttackRating;
        this.calcDmg = copy.calcDmg;
        this.calcRounds = copy.calcRounds;
        this.fireMode = copy.fireMode;
        this.burstMode = copy.burstMode;
        this.faArea = copy.faArea;
        console.log("Copy SpellRoll data to ConfiguredRoll");
        this.spell = copy.spell;
        this.calcArea = copy.calcArea;
        this.calcDrain = copy.calcDrain;
        this.calcDamage = copy.calcDamage;
        this.canAmpUpSpell = copy.canAmpUpSpell;
        this.canIncreaseArea = copy.canIncreaseArea;
        this.defenseRating = copy.defenseRating;
        this.attackRating = copy.attackRating;
        this.spellDesc = copy.spellDesc;
        this.spellId = copy.spellId;
        this.spellName = copy.spellName;
        this.spellSrc = copy.spellSrc;
        console.log("Copy ComplexFormRoll data to ConfiguredRoll");
        this.form = copy.form;
        this.calcFade = copy.calcFade;
        this.defenseRating = copy.defenseRating;
        this.attackRating = copy.attackRating;
        this.formDesc = copy.formDesc;
        this.formId = copy.formId;
        this.formName = copy.formName;
        this.formSrc = copy.formSrc;
    };
    return ConfiguredRoll;
}(CommonRollData));
exports.ConfiguredRoll = ConfiguredRoll;
/**
 * Data to show in a ChatMessage
 */
var SR6ChatMessageData = /** @class */ (function () {
    function SR6ChatMessageData(copy) {
        console.log("####SR6ChatMessageData####1###", copy);
        this.speaker = copy.speaker;
        this.actor = copy.actor;
        this.actionText = copy.actionText;
        this.rollType = copy.rollType;
        this.defendWith = copy.defendWith;
        this.threshold = copy.threshold;
        this.pool = copy.pool;
        this.isOpposed = this.defendWith != undefined;
        this.edge_message = copy.edge_message;
        this.edge_use = copy.edge_use;
        this.edgeAction = copy.edgeAction;
        this.targets = copy.targetIds;
        console.log("####SR6ChatMessageData####2###", this);
    }
    return SR6ChatMessageData;
}());
exports.SR6ChatMessageData = SR6ChatMessageData;
