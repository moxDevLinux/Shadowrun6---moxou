"use strict";
exports.__esModule = true;
exports.NPC = exports.Attibute = void 0;
function skill_to_skill_id(skill) {
    skill = skill.toLowerCase();
    var SKILL_MAP = game.i18n.translations.skill;
    for (var id in SKILL_MAP) {
        if (SKILL_MAP[id].toLowerCase() == skill) {
            return id;
        }
    }
    throw new Error("Skill not found: " + skill);
}
function spec_to_spec_id(skill, spec) {
    spec = spec.toLowerCase();
    var SPECIALIZATION_MAP = game.i18n.translations.shadowrun6.special;
    if (skill != null) {
        for (var id in SPECIALIZATION_MAP[skill]) {
            for (var spec_id in SPECIALIZATION_MAP[skill]) {
                if (SPECIALIZATION_MAP[skill][spec_id].toLowerCase() == spec) {
                    return spec_id;
                }
            }
        }
    }
    else {
        for (var skill_1 in SPECIALIZATION_MAP) {
            for (var id in SPECIALIZATION_MAP[skill_1]) {
                for (var spec_id in SPECIALIZATION_MAP[skill_1]) {
                    if (SPECIALIZATION_MAP[skill_1][spec_id].toLowerCase() == spec) {
                        return spec_id;
                    }
                }
            }
        }
    }
    return undefined;
}
function pool_to_skill_lvl(attrs, skill, pool) {
    var _a, _b, _c, _d;
    switch (skill) {
        case "astral": {
            return pool - attrs.intuition.pool();
        }
        case "athletics": {
            return pool - attrs.agility.pool();
        }
        case "biotech": {
            return pool - attrs.logic.pool();
        }
        case "close_combat": {
            return pool - attrs.agility.pool();
        }
        case "con": {
            return pool - attrs.charisma.pool();
        }
        case "conjuring": {
            return pool - (((_a = attrs.special) === null || _a === void 0 ? void 0 : _a.pool()) || 0);
        }
        case "cracking": {
            return pool - attrs.logic.pool();
        }
        case "electronics": {
            return pool - attrs.logic.pool();
        }
        case "enchanting": {
            return pool - (((_b = attrs.special) === null || _b === void 0 ? void 0 : _b.pool()) || 0);
        }
        case "engineering": {
            return pool - attrs.logic.pool();
        }
        case "exotic_weapons waffen": {
            return pool - attrs.agility.pool();
        }
        case "firearms": {
            return pool - attrs.agility.pool();
        }
        case "influence": {
            return pool - attrs.charisma.pool();
        }
        case "outdoors": {
            return pool - attrs.intuition.pool();
        }
        case "perception": {
            return pool - attrs.intuition.pool();
        }
        case "piloting": {
            return pool - attrs.reaction.pool();
        }
        case "sorcery": {
            return pool - (((_c = attrs.special) === null || _c === void 0 ? void 0 : _c.pool()) || 0);
        }
        case "stealth": {
            return pool - attrs.agility.pool();
        }
        case "tasking": {
            return pool - (((_d = attrs.special) === null || _d === void 0 ? void 0 : _d.pool()) || 0);
        }
    }
    ;
    return pool;
}
var SectionType;
(function (SectionType) {
    SectionType[SectionType["None"] = 0] = "None";
    SectionType[SectionType["Meta"] = 1] = "Meta";
    SectionType[SectionType["Stats"] = 2] = "Stats";
    SectionType[SectionType["DRStats"] = 3] = "DRStats";
    SectionType[SectionType["StatsWithMagic"] = 4] = "StatsWithMagic";
    SectionType[SectionType["StatsWithResonance"] = 5] = "StatsWithResonance";
    SectionType[SectionType["StatsAlternate"] = 6] = "StatsAlternate";
    SectionType[SectionType["Status"] = 7] = "Status";
    SectionType[SectionType["Initiative"] = 8] = "Initiative";
    SectionType[SectionType["Actions"] = 9] = "Actions";
    SectionType[SectionType["Defense"] = 10] = "Defense";
    SectionType[SectionType["Skills"] = 11] = "Skills";
    SectionType[SectionType["SkillsPooled"] = 12] = "SkillsPooled";
    SectionType[SectionType["Equipment"] = 13] = "Equipment";
    SectionType[SectionType["Cyberware"] = 14] = "Cyberware";
    SectionType[SectionType["Weapons"] = 15] = "Weapons";
    SectionType[SectionType["Spells"] = 16] = "Spells";
    SectionType[SectionType["Vehicles"] = 17] = "Vehicles";
    SectionType[SectionType["AdeptPowers"] = 18] = "AdeptPowers";
    SectionType[SectionType["AstralInitiative"] = 19] = "AstralInitiative";
    SectionType[SectionType["ComplexForms"] = 20] = "ComplexForms";
    SectionType[SectionType["MetaMagic"] = 21] = "MetaMagic";
    SectionType[SectionType["Initiation"] = 22] = "Initiation";
    SectionType[SectionType["Languages"] = 23] = "Languages";
    SectionType[SectionType["Persona"] = 24] = "Persona";
    SectionType[SectionType["Power"] = 25] = "Power";
    SectionType[SectionType["Age"] = 26] = "Age";
    SectionType[SectionType["Influence"] = 27] = "Influence";
    SectionType[SectionType["Programs"] = 28] = "Programs";
    SectionType[SectionType["Description"] = 29] = "Description";
})(SectionType || (SectionType = {}));
var STATS_LINES = ["K G R S W L I C ESS", "K G R S W L I C EDG ESS", "B A R S W L I C ESS", "CON AGI RÉA FOR VOL LOG INT CHA ESS"];
var ALTERNATE_STATS_LNIE = ["K", "B"];
var STATS_MAGIC_LINES = ["K G R S W L I C M ESS", "K G R S W L I C EDG M ESS", "B A R S W L I C M ESS", "CON AGI RÉA FOR VOL LOG INT CHA MAG ESS"];
var STATS_RES_LINES = ["K G R S W L I C RES ESS", "K G R S W L I C EDG R ESS", "B A R S W L I C RS ESS", "CON AGI RÉA FOR VOL LOG INT CHA RES ESS"];
var DR_LINES = ["DR I/ID AC CM MOVE", "SD I/DI PA ME DÉPLACEMENT", "SD I/DI PA ME DÉPLACEMENT DRAIN", "SD I/DI PA ME DÉPLA. DRAIN", "SD I/DI PA ME DÉPLA.", "SD I/DI PA ME DÉPLA. TECHNO."]; // the french books are inconsistent
var INIT_LINES = ["Initiative:"]; // DE specific
var INIT_ASTRAL_LINES = ["Astrale Initiative:"]; // DE specific
var ACTIONS_LINE = ["Handlungen:"]; // DE specific
var STATUS_LINES = ["Zustandsmonitor:"]; // DE specific
var DEFENSE_LINES = ["Verteidigungswert:"]; // DE specific
var SKILLS_LINES = ["Fertigkeiten:", "Skills:", "Compétences :"];
var SKILLS_POOLED_LINES = ["Fertigkeiten (Würfelpools):"]; // DE specific extra books
var LANG_LINES = ["Sprachfertigkeiten:"]; // DE specific extra books
var GEAR_LINES = ["Ausrüstung:", "Gear:", "Équipement :"];
var CYBERWARE_LINES = ["Bodytech:", "Augmentations:", "Augmentations :", "Augmentations (alphaware) :"]; // FR specific alphaware
var WEAPON_LINES = ["Waffen:", "Weapons:", "Armes :"];
var SPELLS_LINES = ["Zauber:", "Spells:", "Sorts :"];
var VEHICLES_LINES = ["Fahrzeuge und Drohnen:", "Vehicles and Drones:", "Véhicules et drones :"];
var ADEPT_POWERS_LINES = ["Adeptenkräfte:", "Powers:", "Pouvoirs d’adepte :"];
var COMPLEX_FORMS_LINES = ["Komplexe Formen:", "Complex Forms:", "Formes complexes :"];
var METAMAGIC_LINES = ["Metamagie:", "Metamagics:", "Métamagies :"];
var INITIATION_LINES = ["Initiatengrad:", "Initiate Grade:", "Grade d’initié :"];
var PROGRAMS_LINES = ["Programme:", "Programs:"]; // FR rolls this into equipment
var PERSONA_LINES = ["Lebende Persona:"]; // DE specific
var POWERS_LINES = ["Kräfte:"]; // DE specific
var AGE_LINES = ["Alter"]; // DE specific extra books
var INFLUENCE_LINES = ["Einflussstufe"]; // DE specific extra books
var DESC_LINES = ["Bevorzugte Zahlungsmethode"]; // DE specific extra books
function isSectionStart(line) {
    if (line.match(/^(.*?\s+)?(Mensch|Zwerg|Ork|Troll|Elfe|Elf|Drache|Drachin|Geist)(in)?$/)) {
        return SectionType.Meta;
    }
    else if (ALTERNATE_STATS_LNIE.find(function (l) { return line == l; })) { // Note we check for equality here since this is an alternate table representation
        return SectionType.StatsAlternate;
    }
    else if (STATS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Stats;
    }
    else if (STATS_MAGIC_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.StatsWithMagic;
    }
    else if (STATS_RES_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.StatsWithResonance;
    }
    else if (DR_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.DRStats;
    }
    else if (INIT_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Initiative;
    }
    else if (INIT_ASTRAL_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.AstralInitiative;
    }
    else if (ACTIONS_LINE.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Actions;
    }
    else if (STATUS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Status;
    }
    else if (DEFENSE_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Defense;
    }
    else if (SKILLS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Skills;
    }
    else if (SKILLS_POOLED_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.SkillsPooled;
    }
    else if (LANG_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Languages;
    }
    else if (GEAR_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Equipment;
    }
    else if (CYBERWARE_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Cyberware;
    }
    else if (PROGRAMS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Programs;
    }
    else if (WEAPON_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Weapons;
    }
    else if (SPELLS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Spells;
    }
    else if (VEHICLES_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Vehicles;
    }
    else if (ADEPT_POWERS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.AdeptPowers;
    }
    else if (COMPLEX_FORMS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.ComplexForms;
    }
    else if (METAMAGIC_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.MetaMagic;
    }
    else if (INITIATION_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Initiation;
    }
    else if (PERSONA_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Persona;
    }
    else if (POWERS_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Power;
    }
    else if (AGE_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Age;
    }
    else if (INFLUENCE_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Influence;
    }
    else if (DESC_LINES.find(function (l) { return line.startsWith(l); })) {
        return SectionType.Description;
    }
    else {
        return SectionType.None;
    }
}
function nextSection(lines, i) {
    var type = isSectionStart(lines[i]);
    var content = "";
    if (type == SectionType.Meta || type == SectionType.Age || type == SectionType.StatsAlternate) {
        content = lines[i].trim();
    }
    else if (type == SectionType.Description) {
        content = lines[i] + "\n";
    }
    else if (type != SectionType.Stats && type != SectionType.StatsWithMagic && type != SectionType.StatsWithResonance && type != SectionType.DRStats) {
        content = lines[i].split(":", 2)[1].trim();
    }
    i++;
    while (i < lines.length && isSectionStart(lines[i]) == SectionType.None) {
        if (type == SectionType.Description) {
            content += lines[i] + "\n";
        }
        else {
            content += " " + lines[i].trim();
        }
        i++;
    }
    if (type == SectionType.StatsAlternate) {
        var header_1 = content.replace(/[^A-Z]+/g, " ").replace(/\s+/g, " ").trim();
        content = content.replace(/[A-Z]+/g, " ").replace(/\s+/g, " ").trim();
        if (STATS_LINES.find(function (l) { return header_1.startsWith(l); })) {
            type = SectionType.Stats;
        }
        else if (STATS_MAGIC_LINES.find(function (l) { return header_1.startsWith(l); })) {
            type = SectionType.StatsWithMagic;
        }
        else if (STATS_RES_LINES.find(function (l) { return header_1.startsWith(l); })) {
            type = SectionType.StatsWithResonance;
        }
        else {
            throw new Error("Invalid stats line: " + header_1);
        }
    }
    return new Section(type, i, content.trim());
}
var Skill = /** @class */ (function () {
    function Skill(def, attrs) {
        //                         1     2         3             4       5          6       7
        var matches = def.match(/(.*?) (\d+)(?:\((\d+)\))?(?: \((.*?) \+(\d+)(?:, (.*?) \+(\d+))?\))?/);
        if (matches != null) {
            this.id = skill_to_skill_id(matches[1]);
            this.value = parseInt(matches[2]);
            this.modified_value = this.value;
            if (matches[3] != null) {
                this.modified_value = parseInt(matches[3]);
            }
            ;
            if (matches[4] != null) {
                this.specialization = spec_to_spec_id(this.id, matches[4]);
            }
            if (matches[5] != null) {
                this.specialisation_value = parseInt(matches[5]);
            }
            if (matches[6] != null) {
                this.specialization = spec_to_spec_id(this.id, matches[6]);
            }
            if (matches[7] != null) {
                this.expertise_value = parseInt(matches[7]);
            }
            if (attrs) {
                this.value = pool_to_skill_lvl(attrs, this.id, this.value);
                this.modified_value = pool_to_skill_lvl(attrs, this.id, this.modified_value);
            }
            return this;
        }
        else {
            throw new Error("Invalid skill: " + def);
        }
    }
    /**
     * to_vtt
     */
    Skill.prototype.to_vtt = function (attrs) {
        var res = {
            "points": this.value,
            "augment": 0
        };
        if (this.modified_value) {
            res.modifier = this.modified_value - this.value;
        }
        if (this.specialization) {
            res.specialization = this.specialization;
        }
        if (this.expertise) {
            res.expertise = this.specialization;
        }
        return res;
    };
    return Skill;
}());
var Attibute = /** @class */ (function () {
    function Attibute(def) {
        var matches = def.match(/([\d,.]+)(?:\(([+]?)(\d+)\))?/);
        if (matches != null) {
            this.value = parseFloat(matches[1].replace(",", "."));
            if (matches[2] == "+" && matches[3] != null) {
                this.adjustment = parseInt(matches[3]);
            }
            else if (matches[3] != null) {
                this.modified_value = parseInt(matches[3]);
            }
        }
        else {
            throw new Error("Invalid attribute: " + def);
        }
    }
    /**
     * to_vtt
     */
    Attibute.prototype.to_vtt = function () {
        return {
            "base": this.value,
            "mod": this.pool() - this.value,
            "pool": this.pool(),
            "modString": this.adjustment ? this.adjustment.toString() : ""
        };
    };
    /**
     * pool
     */
    Attibute.prototype.pool = function () {
        return this.modified_value || this.value;
    };
    return Attibute;
}());
exports.Attibute = Attibute;
var Attributes = /** @class */ (function () {
    function Attributes(def, has_special) {
        if (has_special === void 0) { has_special = false; }
        def = def.replace(/\s+\(/g, "(");
        var parts = def.split(" ").map(function (def) {
            return new Attibute(def);
        });
        if (parts.length >= 9) {
            this.constitution = parts[0];
            this.agility = parts[1];
            this.reaction = parts[2];
            this.strength = parts[3];
            this.willpower = parts[4];
            this.logic = parts[5];
            this.intuition = parts[6];
            this.charisma = parts[7];
            if (parts.length == 9 && !has_special) {
                this.essence = parts[8];
            }
            else if (parts.length == 10 && !has_special) {
                this.edge = parts[8];
                this.essence = parts[9];
            }
            else if (parts.length == 10) {
                this.special = parts[8];
                this.essence = parts[9];
            }
            else if (parts.length == 11 && has_special) {
                this.edge = parts[8];
                this.special = parts[9];
                this.essence = parts[10];
            }
            else {
                throw new Error("Invalid attributes: " + def);
            }
        }
        else {
            throw new Error("Invalid attributes: " + def);
        }
    }
    /*
     * to_vtt
     */
    Attributes.prototype.to_vtt = function (mortype) {
        var _a, _b;
        var res = {
            "bod": this.constitution.to_vtt(),
            "agi": this.agility.to_vtt(),
            "rea": this.reaction.to_vtt(),
            "str": this.strength.to_vtt(),
            "wil": this.willpower.to_vtt(),
            "log": this.logic.to_vtt(),
            "int": this.intuition.to_vtt(),
            "cha": this.charisma.to_vtt()
        };
        switch (mortype) {
            case Special.Magic: {
                res["mag"] = (_a = this.special) === null || _a === void 0 ? void 0 : _a.to_vtt();
                break;
            }
            case Special.Resonance: {
                res["res"] = (_b = this.special) === null || _b === void 0 ? void 0 : _b.to_vtt();
                break;
            }
        }
        return res;
    };
    return Attributes;
}());
var Cyberware = /** @class */ (function () {
    function Cyberware(def) {
        def = def.trim();
        var matches = def.trim().match(/(.+?)\s*\[Stufe (\d+?)\],?/);
        if (matches != null) {
            this.name = matches[1];
            this.level = parseInt(matches[2]);
            return this;
        }
        matches = def.match(/(.+?)\s*\[Stufe (\d+?);(.*)\],?/);
        if (matches != null) {
            this.name = matches[1];
            this.level = parseInt(matches[2]);
            this.mods = matches[3].split(",").map(function (x) { return x.trim(); });
            return this;
        }
        matches = def.match(/(.+?)\s*\[(.+?)\],?/);
        if (matches != null) {
            this.name = matches[1];
            this.mods = matches[2].split(",").map(function (x) { return x.trim(); });
            return this;
        }
        matches = def.trim().match(/(.+?)\s+(\d+?),?/);
        if (matches != null) {
            this.name = matches[1];
            this.level = parseInt(matches[2]);
            return this;
        }
        this.name = def.replace(/,$/, "");
    }
    /**
     * to_vtt
     */
    Cyberware.prototype.to_vtt = function () {
        var _a;
        return {
            "name": this.name,
            "type": "gear",
            "data": {
                "type": "CYBERWARE",
                "accessories": ((_a = this.mods) === null || _a === void 0 ? void 0 : _a.join(", ")) || ""
            }
        };
    };
    return Cyberware;
}());
var Item = /** @class */ (function () {
    function Item(def) {
        def = def.trim();
        var matches = def.match(/(.+?)\s*\[(.+?)\],?/);
        if (matches != null) {
            this.name = matches[1];
            this.mods = matches[2].split(/[,;]/).map(function (x) { return x.trim(); });
            return this;
        }
        this.name = def.replace(/,$/, "");
    }
    /**
     * to_vtt
     */
    Item.prototype.to_vtt = function () {
        var _a;
        return this.guess_type({
            "name": this.name,
            "type": "gear",
            "data": {
                "accessories": ((_a = this.mods) === null || _a === void 0 ? void 0 : _a.join(", ")) || ""
            },
            "effects": []
        });
    };
    // Some minimal heuristics to group the items
    Item.prototype.guess_type = function (res) {
        if (this.name.match(/kommlink|commlink/i)) {
            res.data.type = "ELECTRONICS";
            res.data.subtype = "COMMLINK";
        }
        else if (this.name.match(/deck/i)) {
            res.data.type = "ELECTRONICS";
            res.data.subtype = "CYBERDECK";
        }
        else if (this.name.match(/panzer|armor/i)) {
            res.data.type = "ARMOR";
            res.data.subtype = "ARMOR_BODY";
        }
        else if (this.name.match(/helm|helmet/i)) {
            res.data.type = "ARMOR";
            res.data.subtype = "ARMOR_HELMET";
        }
        return res;
    };
    return Item;
}());
var WEAPON_MAPPING = {
    "Waffenlos": "waffenloser kampf",
    "Wurfwaffe": "werfen",
    "Gewehr": "gewehre",
    "Granate": "werfen"
};
var Weapon = /** @class */ (function () {
    function Weapon(name, attrs) {
        this.name = name;
        this.modi = [];
        this.attack_value = [0, 0, 0, 0, 0];
        this.mods = [];
        //  Fix possible issue with words being split by `-`
        attrs = attrs.replace(/([A-Za-z]+)-\s*([a-z]+)/, "$1$2");
        var data = attrs.split(/[|,]/).map(function (x) { return x.trim(); });
        this.type = data[0];
        // FIXME internationalize
        var damage = data[1].match(/(?:Schaden|DV) (\d+)(.*)/);
        if (damage == null) {
            this.damage = data[1];
        }
        else {
            this.damage = parseInt(damage[1]);
            this.damage_type = damage[2];
        }
        var i = 2;
        if (data[i] == null) {
            return;
        }
        // FIXME internationalize
        var detonation_range1 = data[i].match(/(:?Sprengwirkung|Blast) (\d+).*/);
        if (detonation_range1 !== null) {
            this.detonation_range = parseInt(detonation_range1[1]);
            i++;
        }
        if (data[i] == null) {
            return;
        }
        if (!data[i].startsWith("Angriffswerte")) {
            this.modi = data[i].split("/").map(function (x) { return x.trim(); });
            i++;
        }
        if (data[i] == null) {
            return;
        }
        // FIXME internationalize
        var attack_value = data[i].match(/(?:(?:Angriffswerte|Attack Ratings) )?(.+)/);
        if (attack_value !== null) {
            this.attack_value = attack_value[1].split("/").map(function (x) {
                if (x == "-") {
                    return 0;
                }
                else {
                    return parseInt(x) || 0;
                }
            });
            while (this.attack_value.length < 5) {
                this.attack_value.push(0);
            }
            i++;
        }
        if (data[i] == null) {
            return;
        }
        // FIXME internationalize
        var detonation_range = data[i].match(/Sprengwirkung (\d+).*/);
        if (detonation_range !== null) {
            this.detonation_range = parseInt(detonation_range[1]);
            i++;
        }
    }
    Weapon.prototype.skill = function () {
        // we need this to avoiud recursiuon
        var mapping = {
            "blades": "close_combat",
            "clubs": "close_combat",
            "unarmed": "close_combat",
            "gunnery": "engineering",
            "assault_cannons": "firearms",
            "holdouts": "firearms",
            "machine_pistols": "firearms",
            "pistols_heavy": "firearms",
            "pistols_light": "firearms",
            "rifles": "firearms",
            "shotguns": "firearms",
            "submachine_guns": "firearms",
            "tasers": "firearms",
            "whips": "firearms",
            "archery": "athletics",
            "throwing": "athletics"
        };
        // FIXME
        var spec_id = this.spec();
        if (spec_id == null) {
            return undefined;
        }
        else {
            return mapping[spec_id];
        }
    };
    Weapon.prototype.item_type = function () {
        var skill = this.skill();
        if (skill == null) {
            return "WEAPON_RANGED";
        }
        else {
            return "WEAPON_" + skill.toUpperCase();
        }
    };
    Weapon.prototype.item_subtype = function () {
        var spec = this.spec();
        if (spec == null) {
            return "THROWING";
        }
        else {
            return spec.toUpperCase();
        }
    };
    Weapon.prototype.spec = function () {
        // Check for normal sigular and plural forms as well
        return spec_to_spec_id(null, WEAPON_MAPPING[this.type] || this.type) ||
            spec_to_spec_id(null, this.type + "n") || spec_to_spec_id(null, this.type + "s");
    };
    Weapon.prototype.accessories = function () {
        return this.mods.join(", ");
    };
    /**
     * to_vtt
     */
    Weapon.prototype.to_vtt = function () {
        return {
            "name": this.name,
            "type": "gear",
            "data": {
                "dmgDef": this.damage.toString() + this.damage_type,
                "dmg": this.damage,
                "stun": this.damage_type != "S",
                "attackRating": this.attack_value,
                "modes": {
                    "BF": this.modi.includes("BF"),
                    "FA": this.modi.includes("FA"),
                    "SA": this.modi.includes("SA"),
                    "SS": this.modi.includes("SS")
                },
                "type": this.item_type(),
                "subtype": this.item_subtype(),
                "skill": this.skill(),
                "skillSpec": this.spec(),
                "accessories": this.accessories()
            },
            "effects": []
        };
    };
    return Weapon;
}());
var Spell = /** @class */ (function () {
    function Spell(name) {
        this.name = name;
    }
    /**
     * to_vtt
     */
    Spell.prototype.to_vtt = function () {
        return {
            "name": this.name,
            "type": "spell"
        };
    };
    return Spell;
}());
var Program = /** @class */ (function () {
    function Program(name) {
        this.name = name;
    }
    /**
     * to_vtt
     */
    Program.prototype.to_vtt = function () {
        return {
            "name": this.name,
            "type": "gear",
            "data": {
                // FIXME: we don't have a type/subtype for programs
                "type": "ELECTRONICS",
                "subtype": "ELECTRONIC_ACCESSORIES"
            }
        };
    };
    return Program;
}());
var Vehicles = /** @class */ (function () {
    function Vehicles(name) {
        this.name = name;
    }
    return Vehicles;
}());
var AdeptPower = /** @class */ (function () {
    function AdeptPower(name) {
        this.name = name;
    }
    /**
     * to_vtt
     */
    AdeptPower.prototype.to_vtt = function () {
        return {
            "name": this.name,
            "type": "quality",
            "data": {
                "category": "ADEPT_WAY",
                "level": false,
                "value": 1,
                "modifier": []
            },
            "effects": []
        };
    };
    return AdeptPower;
}());
var ComplexForm = /** @class */ (function () {
    function ComplexForm(name) {
        this.name = name;
    }
    return ComplexForm;
}());
var MetaMagic = /** @class */ (function () {
    function MetaMagic(name) {
        this.name = name;
    }
    return MetaMagic;
}());
var Language = /** @class */ (function () {
    function Language(name) {
        this.name = name;
    }
    /**
     * to_vtt
     */
    Language.prototype.to_vtt = function () {
        return {
            "name": this.name,
            "type": "skill",
            "data": {
                "genesisID": "language",
                "points": 1,
                "modifier": 0
            },
            "effects": []
        };
    };
    return Language;
}());
var Persona = /** @class */ (function () {
    function Persona(name) {
        this.name = name;
    }
    /**
     * to_vtt
     */
    Persona.prototype.to_vtt = function () {
        // FIXME
        return {
            "device": {
                "mod": {
                    "a": null,
                    "s": null,
                    "d": null,
                    "f": null
                }
            }
        };
    };
    return Persona;
}());
var Power = /** @class */ (function () {
    function Power(name) {
        this.name = name;
    }
    return Power;
}());
var MetaType = /** @class */ (function () {
    function MetaType(name) {
        this.name = name;
    }
    return MetaType;
}());
var Status = /** @class */ (function () {
    function Status(def) {
        var matches = def.match(/(\d+)(?:\/(\d+))?/);
        if (matches != null) {
            this.body = parseInt(matches[1]);
            if (matches[2] != null) {
                this.will = parseInt(matches[2]);
            }
            else {
                this.will = this.body;
            }
        }
        else {
            throw new Error("Could not parse status: " + def);
        }
    }
    return Status;
}());
var Initiative = /** @class */ (function () {
    function Initiative(def) {
        var matches = def.trim().match(/^(\d+)\s+[+]\s+(\d+)[WwDd]6/);
        if (matches == null) {
            this.initiative = parseInt(def);
        }
        else if (matches.length == 3) {
            this.initiative = parseInt(matches[1]);
            this.die = parseInt(matches[2]);
        }
        else {
            throw new Error("Invalid Initiative: " + def);
        }
    }
    /**
     * to_vtt
     */
    Initiative.prototype.to_vtt = function (base) {
        return {
            "mod": this.initiative - base,
            "dice": this.die || 0
        };
    };
    return Initiative;
}());
var Special;
(function (Special) {
    Special[Special["None"] = 0] = "None";
    Special[Special["Magic"] = 1] = "Magic";
    Special[Special["Resonance"] = 2] = "Resonance";
})(Special || (Special = {}));
var Section = /** @class */ (function () {
    function Section(type, end, content) {
        this.type = type;
        this.end = end;
        this.content = content;
    }
    return Section;
}());
var NPC = /** @class */ (function () {
    function NPC(data) {
        this.special = Special.None;
        this.initiative = new Initiative("0");
        this.status = new Status("0");
        this.defense = 0;
        this.skills = [];
        this.items = [];
        this.vehicles = [];
        this.weapons = [];
        var lines = data.trim().split("\n");
        this.name = lines[0];
        var i = 1;
        while (i < lines.length && isSectionStart(lines[i]) == SectionType.None) {
            this.name += " " + lines[i].trim();
            i++;
        }
        while (i < lines.length) {
            var section = nextSection(lines, i);
            i = section.end;
            switch (section.type) {
                case SectionType.Meta: {
                    this.meta_type = new MetaType(section.content);
                    break;
                }
                case SectionType.Age: {
                    var matcehs = section.content.match(/^Alter: (\d+)\s+Größe\/Gewicht: ([\d,]+) m\/(\d+) kg$/);
                    if (matcehs != null) {
                        this.age = parseInt(matcehs[1]);
                        this.size = parseFloat(matcehs[2].replace(",", "."));
                        this.weight = parseInt(matcehs[3]);
                    }
                    else {
                        this.age = parseInt(section.content);
                    }
                    break;
                }
                case SectionType.Influence: {
                    this.influence = parseInt(section.content);
                    break;
                }
                case SectionType.Description: {
                    this.desc = section.content;
                    break;
                }
                case SectionType.StatsWithMagic: {
                    this.special = Special.Magic;
                    this.attributes = new Attributes(section.content, true);
                    break;
                }
                case SectionType.StatsWithResonance: {
                    this.special = Special.Resonance;
                    this.attributes = new Attributes(section.content, true);
                    break;
                }
                case SectionType.Stats: {
                    this.attributes = new Attributes(section.content, false);
                    break;
                }
                case SectionType.DRStats: {
                    //                                       1        2           3      4                      5      8       9
                    //                                       2                    4    / 1     A1  ,   I2       9      10   / 15   /+  1
                    var matches_en = section.content.match(/(\d+)(?:\((\d+)\))?\s+(\d+)\/\d+\s+A\d+,\s*I\d+\s+(\d+)\s+\d+\/\d+\/\+\d+/);
                    // 9 12/1 (physique) 10/2 (astrale) MAJ 1, MIN 2 (physique) MAJ 1, MIN 3 (astrale) 11 10/15/+1 12
                    var matches_fr = section.content.match(/^(\d+)\s+(\d+)\/(\d+)(?:\s*\([^)]+\))?(?:\s*[^\/]+?\/.+?\s*\([^)]+\))*\s+MAJ\s+\d+,\s*MIN\s+\d+(?:\s*\([^)]+\))?(?:\s*MAJ\s*\d+,\s*MIN\s*\d+\s*\([^)]+\))*\s+(\d+)(?:\s+\([^)]+\))?(?:\s+\d+\s+\([^)]+\))*\s+\d+\/\s*\d+\/\s*\+\d(?:\s+\d+)?$/);
                    if (matches_en) {
                        this.defense = parseInt(matches_en[2]) || parseInt(matches_en[1]);
                        // This is a bit of a cheat
                        this.initiative = new Initiative(matches_en[3] + " + " + matches_en[4] + "W6");
                        this.status = new Status(matches_en[5]);
                    }
                    else if (matches_fr) {
                        this.defense = parseInt(matches_fr[1]);
                        // This is a bit of a cheat
                        this.initiative = new Initiative(matches_fr[2] + " + " + matches_fr[3] + "W6");
                        this.status = new Status(matches_fr[4]);
                    }
                    else {
                        throw new Error("Could not parse DR stats: " + section.content);
                    }
                    break;
                }
                case SectionType.Status: {
                    this.status = new Status(section.content);
                    break;
                }
                case SectionType.Initiation: {
                    this.initiation = parseInt(section.content);
                    break;
                }
                case SectionType.Initiative: {
                    this.initiative = new Initiative(section.content);
                    break;
                }
                case SectionType.AstralInitiative: {
                    this.astralInitiative = new Initiative(section.content);
                    break;
                }
                case SectionType.Defense: {
                    this.defense = parseInt(section.content);
                    break;
                }
                case SectionType.SkillsPooled:
                case SectionType.Skills: {
                    var attributes = (section.type == SectionType.SkillsPooled) ? this.attributes : undefined;
                    var j = 0;
                    var in_brackets = false;
                    var skill = "";
                    while (j < section.content.length) {
                        switch (section.content[j]) {
                            case "(": {
                                in_brackets = true;
                                break;
                            }
                            case ")": {
                                in_brackets = false;
                                break;
                            }
                            case ",": {
                                if (!in_brackets) {
                                    this.skills.push(new Skill(skill.trim(), attributes));
                                    skill = "";
                                    j++;
                                }
                                break;
                            }
                        }
                        skill += section.content[j];
                        j++;
                    }
                    this.skills.push(new Skill(skill.trim(), attributes));
                    break;
                }
                case SectionType.Languages: {
                    this.languageskills = section.content.split(",").map(function (x) { return x.trim(); }).map(function (x) { return new Language(x); });
                    break;
                }
                case SectionType.Equipment: {
                    var j = 0;
                    var in_brackets = false;
                    var item = "";
                    while (j < section.content.length) {
                        switch (section.content[j]) {
                            case "[": {
                                in_brackets = true;
                                break;
                            }
                            case "]": {
                                in_brackets = false;
                                break;
                            }
                            case ",": {
                                if (!in_brackets) {
                                    this.items.push(new Item(item.trim()));
                                    item = "";
                                    j++;
                                }
                                break;
                            }
                        }
                        item += section.content[j];
                        j++;
                    }
                    this.items.push(new Item(item.trim()));
                    break;
                }
                case SectionType.Cyberware: {
                    var matches = section.content.match(/\s*.+?(?:\[.*?\])?(?:,|$)/g);
                    if (matches !== null) {
                        this.bodytech = matches.map(function (x) { return new Cyberware(x.trim()); });
                    }
                    else {
                        throw new Error("Invalid bodytech: " + section.content);
                    }
                    break;
                }
                case SectionType.Weapons: {
                    var j = 0;
                    var in_brackets = false;
                    var expected_close = "]";
                    var name = "";
                    var attrs = "";
                    while (j < section.content.length) {
                        var c = section.content[j];
                        switch (c) {
                            case "[": {
                                if (!in_brackets) {
                                    expected_close = "]";
                                }
                                in_brackets = true;
                                j++;
                                continue;
                            }
                            case "(": {
                                if (!in_brackets) {
                                    expected_close = ")";
                                }
                                in_brackets = true;
                                j++;
                                continue;
                            }
                            case ")":
                            case "]": {
                                if (in_brackets && c == expected_close) {
                                    in_brackets = false;
                                    this.weapons.push(new Weapon(name, attrs));
                                    name = "";
                                    attrs = "";
                                }
                                j++;
                                continue;
                            }
                        }
                        if (in_brackets) {
                            attrs += c;
                        }
                        else {
                            name += c;
                        }
                        j++;
                    }
                    break;
                }
                case SectionType.Spells: {
                    this.spells = section.content.split(",").map(function (x) { return new Spell(x.trim()); });
                    break;
                }
                case SectionType.Vehicles: {
                    this.vehicles = section.content.split(",").map(function (x) { return new Vehicles(x.trim()); });
                    break;
                }
                case SectionType.AdeptPowers: {
                    this.adeptPowers = section.content.split(",").map(function (x) { return new AdeptPower(x.trim()); });
                    break;
                }
                case SectionType.Programs: {
                    this.programs = section.content.split(",").map(function (x) { return new Program(x.trim()); });
                    break;
                }
                case SectionType.ComplexForms: {
                    this.complexForms = section.content.split(",").map(function (x) { return new ComplexForm(x.trim()); });
                    break;
                }
                case SectionType.MetaMagic: {
                    this.metaMagic = section.content.split(",").map(function (x) { return new MetaMagic(x.trim()); });
                    break;
                }
                case SectionType.Persona: {
                    this.persona = new Persona(section.content);
                    break;
                }
                case SectionType.Power: {
                    this.powers = section.content.split(",").map(function (x) { return new Power(x.trim()); });
                    break;
                }
            }
        }
        if (!this.attributes) {
            throw new Error("Invalid stats block");
        }
    }
    NPC.prototype.skills_to_vtt = function () {
        var skills = {};
        for (var _i = 0, _a = this.skills; _i < _a.length; _i++) {
            var skill = _a[_i];
            skills[skill.id] = skill.to_vtt(this.attributes);
        }
        return skills;
    };
    NPC.prototype.defenserating = function () {
        return {};
    };
    NPC.prototype.mortype = function () {
        switch (this.special) {
            case Special.Magic:
                if (this.spells != undefined && this.adeptPowers != undefined) {
                    return "mysticadept";
                }
                else if (this.adeptPowers != undefined) {
                    return "adept";
                }
                else {
                    return "magician";
                }
            case Special.Resonance:
                return "technomancer";
            default:
                return "mundane";
        }
    };
    /**
     * to_vtt
     */
    NPC.prototype.to_vtt = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var physical = {
            "base": this.status.body,
            "value": this.status.body
        };
        var stun = {
            "base": this.status.will,
            "value": this.status.will
        };
        var edge = {
            "value": this.attributes.edge || 0,
            "max": this.attributes.edge || 0
        };
        var initiative = {
            "physical": this.initiative.to_vtt(this.attributes.reaction.pool() + this.attributes.intuition.pool())
        };
        if (this.astralInitiative && this.attributes.special) {
            initiative.astral = this.astralInitiative.to_vtt(this.attributes.special.pool());
        }
        var data = {
            "attributes": this.attributes.to_vtt(this.special),
            "metatype": this.meta_type,
            "gender": "",
            "physical": physical,
            "stun": stun,
            "edge": edge,
            "defenserating": this.defenserating(),
            "initiative": initiative,
            "skills": this.skills_to_vtt(),
            "name": this.name,
            "mortype": this.mortype(),
            "persona": ((_a = this.persona) === null || _a === void 0 ? void 0 : _a.to_vtt()) || {},
            "attackrating": {
                "physical": {
                    "mod": 0
                },
                "astral": {
                    "mod": 0
                },
                "matrix": {
                    "mod": 0
                }
            }
        };
        var items = [];
        items = items.concat(((_b = this.languageskills) === null || _b === void 0 ? void 0 : _b.map(function (x) { return x.to_vtt(); })) || []);
        items = items.concat(((_c = this.adeptPowers) === null || _c === void 0 ? void 0 : _c.map(function (x) { return x.to_vtt(); })) || []);
        items = items.concat(((_d = this.items) === null || _d === void 0 ? void 0 : _d.map(function (x) { return x.to_vtt(); })) || []);
        items = items.concat(((_e = this.weapons) === null || _e === void 0 ? void 0 : _e.map(function (x) { return x.to_vtt(); })) || []);
        items = items.concat(((_f = this.bodytech) === null || _f === void 0 ? void 0 : _f.map(function (x) { return x.to_vtt(); })) || []);
        items = items.concat(((_g = this.programs) === null || _g === void 0 ? void 0 : _g.map(function (x) { return x.to_vtt(); })) || []);
        return {
            "name": this.name,
            "type": "NPC",
            "items": items,
            "data": data
        };
    };
    return NPC;
}());
exports.NPC = NPC;
