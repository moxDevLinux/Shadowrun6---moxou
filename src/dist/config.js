"use strict";
exports.__esModule = true;
exports.SR6 = exports.SR6Config = exports.MonitorType = exports.Defense = void 0;
var DefinitionTypes_js_1 = require("./DefinitionTypes.js");
var ItemTypes_js_1 = require("./ItemTypes.js");
var Defense;
(function (Defense) {
    Defense["PHYSICAL"] = "physical";
    Defense["SPELL_DIRECT"] = "spells_direct";
    Defense["SPELL_INDIRECT"] = "spells_indirect";
    Defense["SPELL_OTHER"] = "spells_other";
    Defense["TOXIN"] = "toxins";
    Defense["DAMAGE"] = "damage";
    Defense["DRAIN"] = "drain";
    Defense["FADING"] = "fading";
})(Defense = exports.Defense || (exports.Defense = {}));
var MonitorType;
(function (MonitorType) {
    MonitorType["PHYSICAL"] = "physical";
    MonitorType["STUN"] = "stun";
    MonitorType["SOCIAL"] = "social";
})(MonitorType = exports.MonitorType || (exports.MonitorType = {}));
var SR6Config = /** @class */ (function () {
    function SR6Config() {
        this.PRIMARY_ATTRIBUTES = ["bod", "agi", "rea", "str", "wil", "log", "int", "cha"];
        this.SECONDARY_ATTRIBUTES = ["mag", "res", "edg", "ess", "ini", "inim", "inia", "dr"];
        this.ATTRIBUTES = ["bod", "agi", "rea", "str", "wil", "log", "int", "cha", "mag", "res"];
        this.NPC_ATTRIBUTES = ["bod", "agi", "rea", "str", "wil", "log", "int", "cha", "mag", "res", "ess"];
        this.QUALITY_CATEGORIES = ["ADVANTAGE", "DISADVANTAGE"];
        this.GEAR_TYPES = [
            "ACCESSORY",
            "ARMOR",
            "ARMOR_ADDITION",
            "BIOWARE",
            "CYBERWARE",
            "TOOLS",
            "ELECTRONICS",
            "NANOWARE",
            "GENETICS",
            "WEAPON_CLOSE_COMBAT",
            "WEAPON_RANGED",
            "WEAPON_FIREARMS",
            "WEAPON_SPECIAL",
            "AMMUNITION",
            "CHEMICALS",
            "SOFTWARE",
            "SURVIVAL",
            "BIOLOGY",
            "VEHICLES",
            "DRONES",
            "MAGICAL"
        ];
        this.GEAR_SUBTYPES = new Map([
            ["ACCESSORY", []],
            ["ARMOR", ["ARMOR_BODY", "ARMOR_HELMET", "ARMOR_SHIELD"]],
            ["ARMOR_ADDITION", []],
            ["BIOWARE", ["BIOWARE_STANDARD", "BIOWARE_CULTURED", "BIOWARE_IMPLANT_WEAPON"]],
            [
                "CYBERWARE",
                [
                    "CYBER_HEADWARE",
                    "CYBERJACK",
                    "CYBER_EYEWARE",
                    "CYBER_BODYWARE",
                    "CYBER_EARWARE",
                    "CYBER_IMPLANT_WEAPON",
                    "CYBER_LIMBS",
                    "COMMLINK",
                    "CYBERDECK"
                ]
            ],
            ["TOOLS", ["TOOLS"]],
            [
                "ELECTRONICS",
                [
                    "COMMLINK",
                    "CYBERDECK",
                    "ELECTRONIC_ACCESSORIES",
                    "RIGGER_CONSOLE",
                    "RFID",
                    "COMMUNICATION",
                    "ID_CREDIT",
                    "IMAGING",
                    "OPTICAL",
                    "AUDIO",
                    "SENSOR_HOUSING",
                    "SECURITY",
                    "BREAKING",
                    "TAC_NET"
                ]
            ],
            ["NANOWARE", []],
            ["GENETICS", []],
            ["SOFTWARE", ["AUTOSOFT"]],
            ["WEAPON_CLOSE_COMBAT", ["BLADES", "CLUBS", "WHIPS", "UNARMED", "OTHER_CLOSE"]],
            ["WEAPON_RANGED", ["BOWS", "CROSSBOWS", "THROWING"]],
            [
                "WEAPON_FIREARMS",
                [
                    "TASERS",
                    "HOLDOUTS",
                    "PISTOLS_LIGHT",
                    "MACHINE_PISTOLS",
                    "PISTOLS_HEAVY",
                    "SUBMACHINE_GUNS",
                    "SHOTGUNS",
                    "RIFLE_ASSAULT",
                    "RIFLE_HUNTING",
                    "RIFLE_SNIPER",
                    "LMG",
                    "MMG",
                    "HMG",
                    "ASSAULT_CANNON"
                ]
            ],
            ["WEAPON_SPECIAL", ["LAUNCHERS", "THROWERS", "OTHER_SPECIAL"]],
            ["AMMUNITION", ["AMMUNITION", "ROCKETS", "MISSILES", "EXPLOSIVES", "GRENADES"]],
            ["CHEMICALS", ["INDUSTRIAL_CHEMICALS", "TOXINS", "DRUGS", "BTL"]],
            ["SURVIVAL", ["SURVIVAL_GEAR", "GRAPPLE_GUN"]],
            ["BIOLOGY", ["BIOTECH", "SLAP_PATCHES"]],
            ["VEHICLES", ["BIKES", "CARS", "TRUCKS", "BOATS", "SUBMARINES", "FIXED_WING", "ROTORCRAFT", "VTOL", "WALKER"]],
            ["DRONES", ["MICRODRONES", "MINIDRONES", "SMALL_DRONES", "MEDIUM_DRONES", "LARGE_DRONES"]],
            ["MAGICAL", ["MAGIC_SUPPLIES"]]
        ]);
        this.GEAR_SUBTYPES2 = {
            ELECTRONICS: [
                "COMMLINK",
                "CYBERDECK",
                "ELECTRONIC_ACCESSORIES",
                "RIGGER_CONSOLE",
                "RFID",
                "COMMUNICATION",
                "ID_CREDIT",
                "IMAGING",
                "OPTICAL",
                "AUDIO",
                "SENSOR_HOUSING",
                "SECURITY",
                "BREAKING",
                "TAC_NET"
            ]
        };
        this.SKILLS_WEAPON = ["firearms", "close_combat", "exotic_weapons", "athletics"];
        this.MATRIX_INITIATIVE_TYPES = ["ar", "vrcold", "vrhot"];
        this.MOR_TYPES = ["mundane", "magician", "mysticadept", "technomancer", "adept", "aspectedmagician"];
        this.MOR_DEFINITIONS = {
            mundane: new DefinitionTypes_js_1.MagicOrResonanceDefinition(),
            magician: new DefinitionTypes_js_1.MagicOrResonanceDefinition(true, false, true, false),
            mysticadept: new DefinitionTypes_js_1.MagicOrResonanceDefinition(true, false, true, true),
            technomancer: new DefinitionTypes_js_1.MagicOrResonanceDefinition(false, true, false, false),
            adept: new DefinitionTypes_js_1.MagicOrResonanceDefinition(true, false, false, true),
            aspectedmagician: new DefinitionTypes_js_1.MagicOrResonanceDefinition(true, false, true, false)
        };
        this.NPC_SUBTYPES = ["npc", "critter", "spirit", "sprite"];
        this.SPIRIT_TYPES = ["air", "beasts", "earth", "fire", "kin", "plant", "water"];
        this.ATTRIB_BY_SKILL = new Map([
            ["astral", new DefinitionTypes_js_1.SkillDefinition("int", false)],
            ["athletics", new DefinitionTypes_js_1.SkillDefinition("agi", true)],
            ["biotech", new DefinitionTypes_js_1.SkillDefinition("log", false)],
            ["close_combat", new DefinitionTypes_js_1.SkillDefinition("agi", true)],
            ["con", new DefinitionTypes_js_1.SkillDefinition("cha", true)],
            ["conjuring", new DefinitionTypes_js_1.SkillDefinition("mag", false)],
            ["cracking", new DefinitionTypes_js_1.SkillDefinition("log", false)],
            ["electronics", new DefinitionTypes_js_1.SkillDefinition("log", true)],
            ["enchanting", new DefinitionTypes_js_1.SkillDefinition("mag", false)],
            ["engineering", new DefinitionTypes_js_1.SkillDefinition("log", true)],
            ["exotic_weapons", new DefinitionTypes_js_1.SkillDefinition("agi", false)],
            ["firearms", new DefinitionTypes_js_1.SkillDefinition("agi", true)],
            ["influence", new DefinitionTypes_js_1.SkillDefinition("cha", true)],
            ["outdoors", new DefinitionTypes_js_1.SkillDefinition("int", true)],
            ["perception", new DefinitionTypes_js_1.SkillDefinition("int", true)],
            ["piloting", new DefinitionTypes_js_1.SkillDefinition("rea", true)],
            ["sorcery", new DefinitionTypes_js_1.SkillDefinition("mag", false)],
            ["stealth", new DefinitionTypes_js_1.SkillDefinition("agi", true)],
            ["tasking", new DefinitionTypes_js_1.SkillDefinition("res", false)]
        ]);
        this.EDGE_BOOSTS = [
            new DefinitionTypes_js_1.EdgeBoost(1, "reroll_one", "POST"),
            new DefinitionTypes_js_1.EdgeBoost(1, "plus_3_ini", "ANYTIME"),
            new DefinitionTypes_js_1.EdgeBoost(2, "plus_1_roll", "POST"),
            new DefinitionTypes_js_1.EdgeBoost(2, "give_ally_1_edge", "ANYTIME"),
            new DefinitionTypes_js_1.EdgeBoost(2, "negate_1_edge", "PRE"),
            new DefinitionTypes_js_1.EdgeBoost(3, "buy_auto_hit", "ANYTIME"),
            new DefinitionTypes_js_1.EdgeBoost(3, "heal_1_stun", "ANYTIME"),
            new DefinitionTypes_js_1.EdgeBoost(4, "add_edge_pool", "PRE"),
            new DefinitionTypes_js_1.EdgeBoost(4, "heal_1_physic", "ANYTIME"),
            new DefinitionTypes_js_1.EdgeBoost(4, "reroll_failed", "POST"),
            new DefinitionTypes_js_1.EdgeBoost(5, "count_2_glitch", "PRE"),
            new DefinitionTypes_js_1.EdgeBoost(5, "create_special", "ANYTIME")
        ];
        this.EDGE_ACTIONS = [
            new DefinitionTypes_js_1.EdgeAction(4, "anticipation", "COMBAT"),
            new DefinitionTypes_js_1.EdgeAction(4, "big_speech", "SOCIAL", "influence"),
            new DefinitionTypes_js_1.EdgeAction(2, "bring_the_drama", "SOCIAL", "con"),
            new DefinitionTypes_js_1.EdgeAction(5, "called_shot_disarm", "COMBAT"),
            new DefinitionTypes_js_1.EdgeAction(5, "called_shot_vitals", "COMBAT"),
            new DefinitionTypes_js_1.EdgeAction(2, "fire_from_cover", "COMBAT"),
            new DefinitionTypes_js_1.EdgeAction(2, "knockout_blow", "COMBAT"),
            new DefinitionTypes_js_1.EdgeAction(1, "shank", "COMBAT")
        ];
        this.FIRING_OPTIONS = new Map([
            ["SS", ["single_shot"]],
            ["SA", ["single_shot", "double_shot"]],
            ["BF", ["narrow_burst", "wide_burst"]],
            ["FA", ["multi_shot"]]
        ]);
        this.icons = {
            adeptpower: {
                "default": "systems/shadowrun6-eden/icons/van-damme-split.svg"
            },
            critterpower: {
                "default": "systems/shadowrun6-eden/icons/wolf-howl.svg"
            },
            gear: {
                "default": "systems/shadowrun6-eden/icons/pistol-gun.svg"
            },
            martialartstyle: {
                "default": "systems/shadowrun6-eden/icons/kimono.svg"
            },
            martialarttech: {
                "default": "systems/shadowrun6-eden/icons/nunchaku.svg"
            },
            quality: {
                "default": "systems/shadowrun6-eden/icons/skills.svg"
            },
            spell: {
                "default": "systems/shadowrun6-eden/icons/bolt-spell-cast.svg"
            }
        };
        this.spell_range = {
            line_of_sight: "shadowrun6.spell.range_line_of_sight",
            line_of_sight_area: "shadowrun6.spell.range_line_of_sight_area",
            touch: "shadowrun6.spell.range_touch",
            self: "shadowrun6.spell.range_self",
            self_area: "shadowrun6.spell.range_self_area"
        };
        this.spell_category = {
            combat: "shadowrun6.spell.category_combat",
            detection: "shadowrun6.spell.category_detection",
            health: "shadowrun6.spell.category_health",
            illusion: "shadowrun6.spell.category_illusion",
            manipulation: "shadowrun6.spell.category_manipulation"
        };
        this.spell_type = {
            physical: "shadowrun6.spell.type_physical",
            mana: "shadowrun6.spell.type_mana"
        };
        this.spell_duration = {
            instantaneous: "shadowrun6.spell.duration_instantaneous",
            sustained: "shadowrun6.spell.duration_sustained",
            permanent: "shadowrun6.spell.duration_permanent",
            limited: "shadowrun6.spell.duration_limited",
            always: "shadowrun6.spell.duration_always",
            special: "shadowrun6.spell.duration_special"
        };
        this.spell_damage = {
            physical: "shadowrun6.spell.damage_physical",
            stun: "shadowrun6.spell.damage_stun",
            physical_special: "shadowrun6.spell.damage_physical_special",
            stun_special: "shadowrun6.spell.damage_stun_special"
        };
        this.tradition_attributes = {
            log: "attrib.log",
            cha: "attrib.cha",
            int: "attrib.int"
        };
        this.adeptpower_activation = {
            passive: "shadowrun6.adeptpower.activation_passive",
            minor_action: "shadowrun6.adeptpower.activation_minor",
            major_action: "shadowrun6.adeptpower.activation_major"
        };
        this.critterpower_action = {
            auto: "shadowrun6.critterpower.action.auto",
            minor: "shadowrun6.critterpower.action.minor",
            major: "shadowrun6.critterpower.action.major"
        };
        this.skill_special = {
            astral: {
                astral_combat: "shadowrun6.special.astral.astral_combat",
                astral_signatures: "shadowrun6.special.astral.astral_signatures",
                emotional_stress: "shadowrun6.special.astral.emotional_stress",
                spirit_types: "shadowrun6.special.astral.spirit_types"
            },
            athletics: {
                climbing: "shadowrun6.special.athletics.climbing",
                flying: "shadowrun6.special.athletics.flying",
                gymnastics: "shadowrun6.special.athletics.gymnastics",
                sprinting: "shadowrun6.special.athletics.sprinting",
                swimming: "shadowrun6.special.athletics.swimming",
                throwing: "shadowrun6.special.athletics.throwing",
                archery: "shadowrun6.special.athletics.archery"
            },
            biotech: {
                biotechnology: "shadowrun6.special.biotech.biotechnology",
                cybertechnology: "shadowrun6.special.biotech.cybertechnology",
                first_aid: "shadowrun6.special.biotech.first_aid",
                medicine: "shadowrun6.special.biotech.medicine"
            },
            close_combat: {
                blades: "shadowrun6.special.close_combat.blades",
                clubs: "shadowrun6.special.close_combat.clubs",
                unarmed: "shadowrun6.special.close_combat.unarmed"
            },
            con: {
                acting: "shadowrun6.special.con.acting",
                disguise: "shadowrun6.special.con.disguise",
                impersonation: "shadowrun6.special.con.impersonation",
                performance: "shadowrun6.special.con.performance"
            },
            conjuring: {
                banishing: "shadowrun6.special.conjuring.banishing",
                summoning: "shadowrun6.special.conjuring.summoning"
            },
            cracking: {
                cybercombat: "shadowrun6.special.cracking.cybercombat",
                electronic_warfare: "shadowrun6.special.cracking.electronic_warfare",
                hacking: "shadowrun6.special.cracking.hacking"
            },
            electronics: {
                computer: "shadowrun6.special.electronics.computer",
                hardware: "shadowrun6.special.electronics.hardware",
                software: "shadowrun6.special.electronics.software",
                complex_forms: "shadowrun6.special.electronics.complex_forms"
            },
            enchanting: {
                alchemy: "shadowrun6.special.enchanting.alchemy",
                artificing: "shadowrun6.special.enchanting.artificing",
                disenchanting: "shadowrun6.special.enchanting.disenchanting"
            },
            engineering: {
                aeronautics_mechanic: "shadowrun6.special.engineering.aeronautics_mechanic",
                armorer: "shadowrun6.special.engineering.armorer",
                automotive_mechanic: "shadowrun6.special.engineering.automotive_mechanic",
                demolitions: "shadowrun6.special.engineering.demolitions",
                gunnery: "shadowrun6.special.engineering.gunnery",
                industrial_mechanic: "shadowrun6.special.engineering.industrial_mechanic",
                lockpicking: "shadowrun6.special.engineering.lockpicking",
                nautical_mechanic: "shadowrun6.special.engineering.nautical_mechanic"
            },
            exotic_weapons: {},
            firearms: {
                tasers: "shadowrun6.special.firearms.tasers",
                holdouts: "shadowrun6.special.firearms.holdouts",
                pistols_light: "shadowrun6.special.firearms.pistols_light",
                pistols_heavy: "shadowrun6.special.firearms.pistols_heavy",
                machine_pistols: "shadowrun6.special.firearms.machine_pistols",
                submachine_guns: "shadowrun6.special.firearms.submachine_guns",
                rifles: "shadowrun6.special.firearms.rifles",
                shotguns: "shadowrun6.special.firearms.shotguns",
                assault_cannons: "shadowrun6.special.firearms.assault_cannons"
            },
            influence: {
                etiquette: "shadowrun6.special.influence.etiquette",
                instruction: "shadowrun6.special.influence.instruction",
                intimidation: "shadowrun6.special.influence.intimidation",
                leadership: "shadowrun6.special.influence.leadership",
                negotiation: "shadowrun6.special.influence.negotiation"
            },
            outdoors: {
                navigation: "shadowrun6.special.outdoors.navigation",
                survival: "shadowrun6.special.outdoors.survival",
                tracking_woods: "shadowrun6.special.outdoors.tracking_woods",
                tracking_desert: "shadowrun6.special.outdoors.tracking_desert",
                tracking_urban: "shadowrun6.special.outdoors.tracking_urban",
                tracking_other: "shadowrun6.special.outdoors.tracking_other"
            },
            perception: {
                visual: "shadowrun6.special.perception.visual",
                aural: "shadowrun6.special.perception.aural",
                tactile: "shadowrun6.special.perception.tactile",
                scent: "shadowrun6.special.perception.scent",
                taste: "shadowrun6.special.perception.taste",
                perception_woods: "shadowrun6.special.perception.perception_woods",
                perception_desert: "shadowrun6.special.perception.perception_desert",
                perception_urban: "shadowrun6.special.perception.perception_urban",
                perception_other: "shadowrun6.special.perception.perception_other"
            },
            piloting: {
                ground_craft: "shadowrun6.special.piloting.ground_craft",
                aircraft: "shadowrun6.special.piloting.aircraft",
                watercraft: "shadowrun6.special.piloting.watercraft"
            },
            sorcery: {
                counterspelling: "shadowrun6.special.sorcery.counterspelling",
                ritual_spellcasting: "shadowrun6.special.sorcery.ritual_spellcasting",
                spellcasting: "shadowrun6.special.sorcery.spellcasting"
            },
            stealth: {
                disguise: "shadowrun6.special.stealth.disguise",
                palming: "shadowrun6.special.stealth.palming",
                sneaking: "shadowrun6.special.stealth.sneaking",
                camouflage: "shadowrun6.special.stealth.camouflage"
            },
            tasking: {
                compiling: "shadowrun6.special.tasking.compiling",
                decompiling: "shadowrun6.special.tasking.decompiling",
                registering: "shadowrun6.special.tasking.registering"
            }
        };
        this.VEHICLE_TYPE = {
            GROUND: "shadowrun6.vehicle.type.groundcraft",
            WATER: "shadowrun6.vehicle.type.watercraft",
            AIR: "shadowrun6.vehicle.type.aircraft"
        };
        this.VEHICLE_MODE = {
            manual: "shadowrun6.vehicle.mode.manual",
            riggedAR: "shadowrun6.vehicle.mode.riggedAR",
            riggedVR: "shadowrun6.vehicle.mode.riggedVR",
            rcc: "shadowrun6.vehicle.mode.rcc",
            autonomous: "shadowrun6.vehicle.mode.autonomous"
        };
        this.CONTROL_RIG_RATING = {
            "0": "shadowrun6.label.not_present",
            "1": "shadowrun6.label.rating1",
            "2": "shadowrun6.label.rating2",
            "3": "shadowrun6.label.rating3"
        };
        this.MATRIX_ACTIONS = {
            backdoor_entry: new DefinitionTypes_js_1.MatrixAction("backdoor_entry", "cracking", "hacking", "log", true, true, true, false, false, "wil", "f"),
            brute_force: new DefinitionTypes_js_1.MatrixAction("brute_force", "cracking", "cybercombat", "log", true, true, true, true, true, "wil", "f"),
            change_icon: new DefinitionTypes_js_1.MatrixAction("change_icon", null, null, null, false, false, false, true, true, undefined, null, -1),
            check_os: new DefinitionTypes_js_1.MatrixAction("check_os", "cracking", "electronic_warfare", "log", true, true, false, false, true, null, null, 4),
            control_device: new DefinitionTypes_js_1.MatrixAction("control_device", "electronics", "software", "log", false, true, false, true, true, "wil", "f"),
            crack_file: new DefinitionTypes_js_1.MatrixAction("crack_file", "cracking", "hacking", "log", true, true, false, true, true, undefined, null, 99),
            crash_program: new DefinitionTypes_js_1.MatrixAction("crash_program", "cracking", "cybercombat", "log", true, true, false, false, true, "d", "dr"),
            data_spike: new DefinitionTypes_js_1.MatrixAction("data_spike", "cracking", "cybercombat", "log", true, true, false, true, true, "d", "f"),
            disarm_data_bomb: new DefinitionTypes_js_1.MatrixAction("disarm_data_bomb", "electronics", "software", "log", false, true, false, true, true, "dr", "dr"),
            edit_file: new DefinitionTypes_js_1.MatrixAction("edit_file", "electronics", "computer", "log", false, true, false, true, true, "int", "f"),
            encrypt_file: new DefinitionTypes_js_1.MatrixAction("encrypt_file", "electronics", "computer", "log", false, true, false, true, true, null, null),
            enter_host: new DefinitionTypes_js_1.MatrixAction("enter_host", null, null, "log", false, true, true, true, true, null, null),
            erase_matrix_signature: new DefinitionTypes_js_1.MatrixAction("erase_matrix_signature", "electronics", "computer", "log", true, true, false, true, true, "wil", "f"),
            format_device: new DefinitionTypes_js_1.MatrixAction("format_device", "electronics", "computer", "log", true, true, false, false, true, "wil", "f"),
            full_matrix_defense: new DefinitionTypes_js_1.MatrixAction("full_matrix_defense", null, null, "log", false, true, true, true, true, null, null),
            hash_check: new DefinitionTypes_js_1.MatrixAction("hash_check", "cracking", "hacking", "log", true, true, false, true, false, null, null),
            hide: new DefinitionTypes_js_1.MatrixAction("hide", "cracking", "electronic_warfare", "int", true, true, true, true, false, "int", "d"),
            jack_out: new DefinitionTypes_js_1.MatrixAction("jack_out", "electronics", "software", "wil", false, true, true, true, true, "cha", "d"),
            jam_signals: new DefinitionTypes_js_1.MatrixAction("jam_signals", "cracking", "electronic_warfare", "log", true, true, false, false, true, null, null),
            jump_rigged: new DefinitionTypes_js_1.MatrixAction("jump_rigged", "electronics", "software", "log", false, true, false, true, true, "wil", "f"),
            matrix_perception: new DefinitionTypes_js_1.MatrixAction("matrix_perception", "electronics", "computer", "int", false, true, false, true, true, "wil", "s"),
            matrix_search: new DefinitionTypes_js_1.MatrixAction("matrix_search", "electronics", "computer", "int", false, true, true, true, true, null, null),
            probe: new DefinitionTypes_js_1.MatrixAction("probe", "cracking", "hacking", "log", true, true, true, true, false, "wil", "f"),
            reboot_device: new DefinitionTypes_js_1.MatrixAction("reboot_device", "electronics", "software", "log", false, true, false, false, true, "log", "wil"),
            reconfigure: new DefinitionTypes_js_1.MatrixAction("reconfigure", null, null, null, false, false, false, false, true, null, null),
            send_message: new DefinitionTypes_js_1.MatrixAction("send_message", null, null, null, false, false, false, false, true, null, null),
            set_data_bomb: new DefinitionTypes_js_1.MatrixAction("set_data_bomb", "electronics", "software", "log", true, true, false, false, true, "dr", "dr"),
            snoop: new DefinitionTypes_js_1.MatrixAction("snoop", "cracking", "electronic_warfare", "log", true, true, true, true, true, "d", "f"),
            spoof_command: new DefinitionTypes_js_1.MatrixAction("spoof_command", "cracking", "hacking", "log", true, true, true, true, true, "d", "f"),
            switch_ifmode: new DefinitionTypes_js_1.MatrixAction("switch_ifmode", null, null, null, false, false, false, false, true, null, null),
            tarpit: new DefinitionTypes_js_1.MatrixAction("tarpit", "cracking", "cybercombat", "log", true, true, false, true, true, "d", "f"),
            trace_icon: new DefinitionTypes_js_1.MatrixAction("trace_icon", "electronics", "software", "int", true, true, false, false, true, "wil", "s")
        };
        this.COMPLEX_FORMS = {
            cleaner: new ItemTypes_js_1.ComplexForm("electronics", null, null),
            diffusion: new ItemTypes_js_1.ComplexForm("electronics", "wil", "f"),
            editor: new ItemTypes_js_1.ComplexForm(null, null, null),
            emulate: new ItemTypes_js_1.ComplexForm(null, null, null),
            infusion: new ItemTypes_js_1.ComplexForm("electronics", null, null, 4),
            mirrored_persona: new ItemTypes_js_1.ComplexForm("electronics", null, null),
            pulse_storm: new ItemTypes_js_1.ComplexForm("electronics", "log", "d"),
            puppeteer: new ItemTypes_js_1.ComplexForm(null, null, null),
            resonance_channel: new ItemTypes_js_1.ComplexForm("electronics", null, null),
            resonance_spike: new ItemTypes_js_1.ComplexForm("cracking", "wil", "f"),
            resonance_veil: new ItemTypes_js_1.ComplexForm("electronics", "int", "d"),
            static_bomb: new ItemTypes_js_1.ComplexForm("electronics", "int", "d"),
            static_veil: new ItemTypes_js_1.ComplexForm("electronics", "f", "f"),
            stitches: new ItemTypes_js_1.ComplexForm("electronics", null, null),
            tattletale: new ItemTypes_js_1.ComplexForm("electronics", null, null)
        };
        this.PROGRAMS = [
            // Legal
            new DefinitionTypes_js_1.Program("browse", 0),
            new DefinitionTypes_js_1.Program("baby_monitor", 0),
            new DefinitionTypes_js_1.Program("configurator", 0),
            new DefinitionTypes_js_1.Program("edit", 0),
            new DefinitionTypes_js_1.Program("encryption", 0),
            new DefinitionTypes_js_1.Program("signal_scrubber", 0),
            new DefinitionTypes_js_1.Program("toolbox", 0),
            new DefinitionTypes_js_1.Program("virtual_machine", 0),
            // Hacking
            new DefinitionTypes_js_1.Program("armor", 1),
            new DefinitionTypes_js_1.Program("biofeedback", 1),
            new DefinitionTypes_js_1.Program("biofeedback_filter", 1),
            new DefinitionTypes_js_1.Program("blackout", 1),
            new DefinitionTypes_js_1.Program("decryption", 1),
            new DefinitionTypes_js_1.Program("defuse", 1),
            new DefinitionTypes_js_1.Program("exploit", 1),
            new DefinitionTypes_js_1.Program("fork", 1),
            new DefinitionTypes_js_1.Program("lockdown", 1),
            new DefinitionTypes_js_1.Program("overclock", 1),
            new DefinitionTypes_js_1.Program("stealth", 1),
            new DefinitionTypes_js_1.Program("trace", 1)
        ];
        this.LIFESTYLE_TYPE = {
            street: "shadowrun6.lifestyle.street",
            squatter: "shadowrun6.lifestyle.squatter",
            low: "shadowrun6.lifestyle.low",
            middle: "shadowrun6.lifestyle.middle",
            high: "shadowrun6.lifestyle.high",
            luxury: "shadowrun6.lifestyle.luxury"
        };
        this.SIN_QUALITY = {
            REAL_SIN: "shadowrun6.sin.real_sin",
            ANYONE: "shadowrun6.sin.anyone",
            ROUGH_MATCH: "shadowrun6.sin.rough_match",
            GOOD_MATCH: "shadowrun6.sin.good_match",
            SUPERFICIALLY_PLAUSIBLE: "shadowrun6.sin.superficially_plausible",
            HIGHLY_PLAUSIBLE: "shadowrun6.sin.highly_plausible",
            SECOND_LIFE: "shadowrun6.sin.second_life"
        };
    }
    return SR6Config;
}());
exports.SR6Config = SR6Config;
exports.SR6 = new SR6Config();
