import { Lifeform, Skill } from "../ActorTypes";
import { SkillDefinition } from "../DefinitionTypes";
import { GenesisData } from "../ItemTypes";
import { Shadowrun6Actor } from "../Shadowrun6Actor";
import Shadowrun6Combatant from "../Shadowrun6Combatant";

function isLifeform(obj: any): obj is Lifeform {
	return obj.attributes != undefined;
}

function deHTML(html: string): string {
	html = html.replace(/<br\/>/gi, "\n");
	html = html.replace(/<b>(.*?)<\/b>/gi, " $1");
	return html;
}

export function attackRatingToString(val: number[]): string {
	if (!val) return "NULL";
	return (
		val[0] +
		"/" +
		(val[1] != 0 ? val[1] : "-") +
		"/" +
		(val[2] != 0 ? val[2] : "-") +
		"/" +
		(val[3] != 0 ? val[3] : "-") +
		"/" +
		(val[4] != 0 ? val[4] : "-")
	);
}

export function fireModesToString(val: boolean[]): string {
	let list: string[] = [];
	if (val["SS"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_ss"));
	if (val["BF"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_bf"));
	if (val["FA"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_fa"));
	if (val["SA"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_sa"));
	return list.toString();
}

export const defineHandlebarHelper = async function () {
	Handlebars.registerHelper("attackrating", function (val) {
		if (!val) return "NULL";
		return (
			val[0] +
			"/" +
			(val[1] != 0 ? val[1] : "-") +
			"/" +
			(val[2] != 0 ? val[2] : "-") +
			"/" +
			(val[3] != 0 ? val[3] : "-") +
			"/" +
			(val[4] != 0 ? val[4] : "-")
		);
	});

	Handlebars.registerHelper("firemodes", function (val) {
		let list: string[] = [];
		if (val["SS"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_ss"));
		if (val["BF"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_bf"));
		if (val["FA"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_fa"));
		if (val["SA"]) list.push((game as Game).i18n.localize("shadowrun6.item.mode_sa"));
		return list.toString();
	});
	Handlebars.registerHelper("spellRangeName", function (val) {
		return (game as Game).i18n.localize(CONFIG.SR6.spell_range[val]);
	});
	Handlebars.registerHelper("spellTypeName", function (val) {
		return (game as Game).i18n.localize(CONFIG.SR6.spell_type[val] + "_short");
	});
	Handlebars.registerHelper("spellDurationName", function (val) {
		return (game as Game).i18n.localize(CONFIG.SR6.spell_duration[val] + "_short");
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
	Handlebars.registerHelper( 'getByKey', function ( map, key ) {
   	return map.get(key);
   });
	Handlebars.registerHelper( 'getIniType', function ( map, key ) {
   	return (map.get(key) as Shadowrun6Combatant).initiativeType;
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

	Handlebars.registerHelper("sr6_description", function (itemData: GenesisData, type) {
		let fallback: string = itemData.description;
		let key = type + "." + itemData.genesisID + ".desc";
		let name = (game as any).i18n.localize(key);
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
				} else {
					bool = false;
				}
				break;
			default:
				throw "Unknown operator " + operator;
		}

		if (bool) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}
	});

	Handlebars.registerHelper('switch', function(value, options) {
  		this.switch_value = value;
  		return options.fn(this);
	});

	Handlebars.registerHelper('case', function(value, options) {
  		if (value == this.switch_value) {
    		return options.fn(this);
  		}
	});
};

function getSystemData(obj: any): any {
	if ( (game as any).release.generation >= 10) return obj.system;
	return obj.data.data;
}
function getActorData(obj: any): Shadowrun6Actor {
	if ( (game as any).release.generation >= 10) return obj;
	return obj.data;
}
function itemsOfType(items, type) {
	return items.filter((elem) => getActorData(elem).type == type);
}

function itemsOfGeartype(items, geartype) {
	return items.filter((elem) => getSystemData(elem).type == geartype);
}

function skillPointsNotZero(skills){
	return Object.keys(skills)
		.filter((key) => skills[key].points > 0)
		.reduce((res, key) => (res[key] = skills[key], res), {});
}

function itemNotInList(items, item) {
	var bool = true;
	items.forEach((elem) => {
		if (getSystemData(elem).subtype == item) {
			bool = false;
		}
	})
	return bool;
}

function itemTypeInList(items, type){
	var bool = false;
	items.forEach((elem) => {
		if (getActorData(elem).type == type) {
			bool = true;
		}
	})
	return bool;
}

function getSkillAttribute(key) {
	let skillDef: SkillDefinition | undefined = CONFIG.SR6.ATTRIB_BY_SKILL.get(key);
	if (skillDef) {
		const myElem = skillDef.attrib;
		return myElem;
	} else {
		return "??";
	}
}

function getSkillPool(skillId: string, skillSpec: string, actor: Shadowrun6Actor): number {
	return actor._getSkillPool(skillId, skillSpec);
}

function getSubtypes(key) {
	if (CONFIG.SR6.GEAR_SUBTYPES.get(key)) {
		const myElem = CONFIG.SR6.GEAR_SUBTYPES.get(key);
		return myElem;
	} else {
		return [];
	}
}

function getRitualFeatures(ritual) {
	let ret: string[] = [];
	let i18n = (game as Game).i18n;
	if (ritual.features.material_link) ret.push(i18n.localize("shadowrun6.ritualfeatures.material_link"));
	if (ritual.features.anchored) ret.push(i18n.localize("shadowrun6.ritualfeatures.anchored"));
	if (ritual.features.minion) ret.push(i18n.localize("shadowrun6.ritualfeatures.minion"));
	if (ritual.features.spell) ret.push(i18n.localize("shadowrun6.ritualfeatures.spell"));
	if (ritual.features.spotter) ret.push(i18n.localize("shadowrun6.ritualfeatures.spotter"));
	return ret.join(", ");
}
function getSpellFeatures(spell) {
	let ret: string[] = [];
	let i18n = (game as Game).i18n;
	if (spell.features) {
		if (spell.features.area) ret.push(i18n.localize("shadowrun6.spellfeatures.area"));
		if (spell.features.direct) ret.push(i18n.localize("shadowrun6.spellfeatures.direct"));
		if (spell.features.indirect) ret.push(i18n.localize("shadowrun6.spellfeatures.indirect"));
		if (spell.features.sense_single) ret.push(i18n.localize("shadowrun6.spellfeatures.sense_single"));
		if (spell.features.sense_multi) ret.push(i18n.localize("shadowrun6.spellfeatures.sense_multi"));
	}
	return ret.join(", ");
}

function getMatrixActionPool(key, actor) {
	const action = CONFIG.SR6.MATRIX_ACTIONS[key];
	const skill = getSystemData(actor).skills[action.skill];
	let pool = 0;
	if (skill) {
		pool = skill.points + skill.modifier;
		if (skill.expertise == action.specialization) {
			pool += 3;
		} else if (skill.specialization == action.specialization) {
			pool += 2;
		}
	}
	if (action.attrib) {
		const attrib = getSystemData(actor).attributes[action.attrib];
		pool += attrib.pool;
	}
	return pool;
}
