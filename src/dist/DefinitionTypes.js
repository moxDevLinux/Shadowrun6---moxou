"use strict";
exports.__esModule = true;
exports.Program = exports.MatrixAction = exports.EdgeAction = exports.EdgeBoost = exports.SkillDefinition = exports.MagicOrResonanceDefinition = void 0;
var MagicOrResonanceDefinition = /** @class */ (function () {
    function MagicOrResonanceDefinition(magic, resonance, useSpells, usePowers) {
        if (magic === void 0) { magic = false; }
        if (resonance === void 0) { resonance = false; }
        if (useSpells === void 0) { useSpells = false; }
        if (usePowers === void 0) { usePowers = false; }
        this.magic = magic;
        this.resonance = resonance;
        this.useSpells = useSpells;
        this.usePowers = usePowers;
    }
    return MagicOrResonanceDefinition;
}());
exports.MagicOrResonanceDefinition = MagicOrResonanceDefinition;
var SkillDefinition = /** @class */ (function () {
    function SkillDefinition(attribute, useUntrained) {
        this.attrib = attribute;
        this.useUntrained = useUntrained;
    }
    return SkillDefinition;
}());
exports.SkillDefinition = SkillDefinition;
var EdgeBoost = /** @class */ (function () {
    function EdgeBoost(cost, id, when) {
        this.cost = cost;
        this.id = id;
        this.when = when;
    }
    return EdgeBoost;
}());
exports.EdgeBoost = EdgeBoost;
var EdgeAction = /** @class */ (function () {
    function EdgeAction(cost, id, cat, skill) {
        if (skill === void 0) { skill = ""; }
        this.cost = cost;
        this.id = id;
        this.cat = cat;
        this.skill = skill;
    }
    return EdgeAction;
}());
exports.EdgeAction = EdgeAction;
var MatrixAction = /** @class */ (function () {
    function MatrixAction(id, skill, spec, attrib, illegal, major, outsider, user, admin, attr1, attr2, threshold) {
        if (threshold === void 0) { threshold = 0; }
        this.id = id;
        this.skill = skill;
        this.spec = spec;
        this.attrib = attrib;
        this.illegal = illegal;
        this.major = major;
        this.outsider = outsider;
        this.user = user;
        this.admin = admin;
        this.opposedAttr1 = attr1;
        this.opposedAttr2 = attr2;
        this.threshold = threshold;
    }
    return MatrixAction;
}());
exports.MatrixAction = MatrixAction;
var Program = /** @class */ (function () {
    function Program(id, type) {
        this.id = id;
        this.type = type;
    }
    return Program;
}());
exports.Program = Program;
