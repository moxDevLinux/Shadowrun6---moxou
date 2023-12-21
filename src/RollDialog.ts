import { ChatSpeakerDataProperties } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatSpeakerData";
import { Lifeform } from "./ActorTypes";
import { SYSTEM_NAME } from "./constants.js";
import { ConfiguredRoll, WeaponRoll, PreparedRoll, SpellRoll, SR6ChatMessageData, SkillRoll } from "./dice/RollTypes.js";
import { Gear, Spell, Weapon } from "./ItemTypes";
import { Shadowrun6Actor } from "./Shadowrun6Actor";
import Shadowrun6Combat from "./Shadowrun6Combat";

function isLifeform(obj: any): obj is Lifeform {
	return obj.attributes != undefined;
}
function isGear(obj: any): obj is Gear {
	return obj.skill != undefined;
}
function isWeapon(obj: any): obj is Weapon {
	return obj.attackRating != undefined;
}
function isSpell(obj: any): obj is Spell {
	return obj.drain != undefined;
}
function attackRatingToString(val: number[]): string {
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
function isItemRoll(obj: any): obj is WeaponRoll {
	return obj.rollType != undefined;
}
function isSkillRoll(obj: any): obj is SkillRoll {
	return obj.skillId != undefined;
}
function getSystemData(obj: any): any {
	if ((game as any).release.generation >= 10) return obj.system;
	return obj.data.data;
}
function getActorData(obj: any): Shadowrun6Actor {
	if ((game as any).release.generation >= 10) return obj;
	return obj.data;
}

export interface SR6RollDialogOptions extends DialogOptions {
	actor: Shadowrun6Actor;
	prepared: PreparedRoll;
	dialogResult: ConfiguredRoll;
}
/**
 * Special Shadowrun 6 instance of the RollDialog
 */
export class RollDialog extends Dialog {
	html: JQuery;
	actor: Shadowrun6Actor;
	prepared: PreparedRoll;
	/** This field is used to return all settings made in the roll dialog */
	dialogResult: ConfiguredRoll;

	/** Edge after applying gain and boost cost */
	edge: number = 0;
	/** Dice added or substracted to the pool */
	modifier: number = 0;

	constructor(data: Dialog.Data, options?: Partial<DialogOptions>) {
		super(data, options);
		let rOptions: SR6RollDialogOptions = options as SR6RollDialogOptions;
		console.log("In RollDialog<init>()", rOptions);
		this.actor = rOptions.actor;
		this.prepared = rOptions.prepared;
		this.dialogResult = rOptions.dialogResult;

		this.edge = this.actor ? (getSystemData(this.actor) as Lifeform).edge.value : 0;
	}

	/********************************************
	 * React to changes on the dialog
	 ********************************************/
	activateListeners(html: JQuery): void {
		super.activateListeners(html);
		this.html = html;

		// React to attack/defense rating changes
		//    	html.find('.calc-edge').show(this._onCalcEdge.bind(this));

		html.find("select[name='distance']").change(this._recalculateBaseAR.bind(this));
		html.find("select[name='fireMode']").change(this._onFiringModeChange.bind(this));
		html.find("select[name='bfType']").change(this._onBurstModeChange.bind(this));
		html.find("select[name='fullAutoArea']").change(this._onAreaChange.bind(this));
		/*
	if (!this.data.target) {
	  html.find('.calc-edge').show(this._onNoTarget.bind(this));
	}
	*/
		html.find(".calc-edge-edit").change(this._onCalcEdge.bind(this));
		html.find(".calc-edge-edit").keyup(this._onCalcEdge.bind(this));
		html.show(this._onCalcEdge.bind(this));

		// React to changed edge boosts and actions
		html.find(".edgeBoosts").change(this._onEdgeBoostActionChange.bind(this));
		html.find(".edgeBoosts").keyup(this._onEdgeBoostActionChange.bind(this));
		html.find(".edgeActions").change(this._onEdgeBoostActionChange.bind(this));
		html.find(".edgeActions").keyup(this._onEdgeBoostActionChange.bind(this));
		html.show(this._onFiringModeChange.bind(this));

		// React to changed amp up
		html.find("#ampUp").change(this._onSpellConfigChange.bind(this));

		// React to changed amp up
		html.find("#incArea").change(this._onSpellConfigChange.bind(this));

		this._recalculateBaseAR();

		// React to attribute change
		html.find(".rollAttributeSelector").change(this._onAttribChange.bind(this));

		// React to Wound Modifier checkbox
		html.find("#useWoundModifier").change(this._updateDicePool.bind(this));
		// React to change in modifier
		html.find("#modifier").change(this._updateDicePool.bind(this));
	}

	//-------------------------------------------------------------
	_recalculateBaseAR() {
		const options: SR6RollDialogOptions = this.options as any as SR6RollDialogOptions;
		let prepared: PreparedRoll = options.prepared!;

		const distanceElement: HTMLSelectElement = document.getElementById("distance") as HTMLSelectElement;
		if (!distanceElement) return;

		let ar = parseInt(distanceElement.value);
		const arElement: HTMLLabelElement = document.getElementById("baseAR") as HTMLLabelElement;
		arElement.textContent = ar.toString();

		(prepared as any).baseAR = ar;

		this._onCalcEdge(event);
	}

	//-------------------------------------------------------------
	/*
	 * Called when something edge gain relevant changes on the
	 * HTML form
	 */
	_onCalcEdge(event) {
		let configured: ConfiguredRoll = this.dialogResult;
		let prepared: PreparedRoll = this.prepared;
		if (!configured.actor) return;

		try {
			configured.edgePlayer = 0;
			configured.edgeTarget = 0;

			// Check situational edge
			const situationA: HTMLInputElement | null = document.getElementById("situationalEdgeA") as HTMLInputElement;
			if (situationA && situationA.checked) {
				configured.edgePlayer++;
			}
			const situationD: HTMLInputElement | null = document.getElementById("situationalEdgeD") as HTMLInputElement;
			if (situationD && situationD.checked) {
				configured.edgeTarget++;
			}

			const drElement: HTMLInputElement | null = document.getElementById("dr") as HTMLInputElement;
			if (drElement) {
				const dr: number = parseInt(drElement.value);
				const arModElem: HTMLInputElement = document.getElementById("arMod") as HTMLInputElement;

				if (isItemRoll(prepared)) {
					const arElement: HTMLLabelElement = document.getElementById("baseAR") as HTMLLabelElement;
					let ar = arElement.textContent ? parseInt(arElement.textContent) : 0;
					//					let ar = parseInt( (arElement.children[arElement.selectedIndex] as HTMLOptionElement).value );
					if (arModElem.value && parseInt(arModElem.value) != 0) {
						ar += parseInt(arModElem.value);
					}

					let finalAR: number = ar;
					let result = ar - dr;
					if (result >= 4) {
						configured.edgePlayer++;
					} else if (result <= -4) {
						configured.edgeTarget++;
					}
				} else {
					let ar: number = (prepared as WeaponRoll).calcAttackRating[0];
					if (arModElem.value && parseInt(arModElem.value) != 0) {
						ar += parseInt(arModElem.value);
					}
					let result = ar - dr;
					if (result >= 4) {
						configured.edgePlayer++;
					} else if (result <= -4) {
						configured.edgeTarget++;
					}
				}
			}

			// Set new edge value
			let actor: Lifeform = getSystemData(configured.actor) as Lifeform;

			let capped: boolean = false;
			// Limit the maximum edge
			let max: number = (game as Game).settings.get(SYSTEM_NAME, "maxEdgePerRound") as number;
			let combat: StoredDocument<Shadowrun6Combat> | null = (game as Game).combat as StoredDocument<Shadowrun6Combat> | null;
			if (combat) {
				max = combat.getMaxEdgeGain(configured.actor);
			}
			// Check if the gained edge would be more than the player may get per round
			if (configured.edgePlayer > max) {
				console.log("Reduce edge gain of attacker to " + max);
				configured.edgePlayer = Math.min(configured.edgePlayer, max);
				capped = true;
			}
			// Check if new Edge value would be >7
			if (actor.edge.value + configured.edgePlayer > 7) {
				configured.edgePlayer = Math.max(0, 7 - actor.edge.value);
				capped = true;
			}

			this.edge = Math.min(7, actor.edge.value + configured.edgePlayer);
			// Update in dialog
			let edgeValue: HTMLLabelElement = this._element![0].getElementsByClassName("edge-value")[0] as HTMLLabelElement;
			if (edgeValue) {
				edgeValue.innerText = this.edge.toString();
			}
			// Update selection of edge boosts
			this._updateEdgeBoosts(this._element![0].getElementsByClassName("edgeBoosts")[0] as HTMLSelectElement, this.edge);
			let newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter((boost) => boost.when == "PRE" && boost.cost <= this.edge);

			// Prepare text for player
			let innerText = "";

			let speaker: ChatSpeakerDataProperties = configured.speaker;
			if (configured.edgePlayer) {
				if (capped) {
					configured.edgePlayer = max;
					innerText = (game as Game).i18n.format("shadowrun6.roll.edge.gain_player_capped", {
						name: speaker.alias,
						value: configured.edgePlayer,
						capped: max
					});
				} else {
					innerText = (game as Game).i18n.format("shadowrun6.roll.edge.gain_player", { name: speaker.alias, value: configured.edgePlayer });
				}
			}
			if (configured.edgeTarget != 0) {
				//configured.targets
				let targetName = "To Do"; //this.targetName ? this.targetName : (game as Game).i18n.localize("shadowrun6.roll.target");
				innerText += "  " + (game as Game).i18n.format("shadowrun6.roll.edge.gain_player", { name: targetName, value: configured.edgeTarget });
			}

			if (configured.edgePlayer == 0 && configured.edgeTarget == 0) {
				innerText += "  " + (game as Game).i18n.localize("shadowrun6.roll.edge.no_gain");
			}

			configured.edge_message = innerText;

			let edgeLabel = document.getElementById("edgeLabel");
			if (edgeLabel) {
				edgeLabel.innerText = innerText;
			}
		} catch (err) {
			console.log("Oh NO! " + err.stack);
		}
	}

	//-------------------------------------------------------------
	_updateEdgeBoosts(elem: HTMLSelectElement, available: number) {
		let newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter((boost) => boost.when == "PRE" && boost.cost <= available);

		// Node for inserting new data before
		let insertBeforeElem: Node;
		// Remove previous data
		var array = Array.from(elem.children);

		array.forEach((child) => {
			if ((child as any).value != "none" && (child as any).value != "edge_action") {
				elem.removeChild(child);
			}
			if ((child as any).value == "edge_action") {
				insertBeforeElem = child;
			}
		});

		// Add new data
		newEdgeBoosts.forEach((boost) => {
			let opt = document.createElement("option");
			opt.setAttribute("value", boost.id);
			opt.setAttribute("data-item-boostid", boost.id);
			let cont = document.createTextNode((game as Game).i18n.localize("shadowrun6.edge_boost." + boost.id) + " - (" + boost.cost + ")");
			opt.appendChild(cont);
			elem.insertBefore(opt, insertBeforeElem);
		});
	}

	//-------------------------------------------------------------
	_updateEdgeActions(elem, available) {
		let newEdgeActions = CONFIG.SR6.EDGE_ACTIONS.filter((action) => action.cost <= available);

		// Remove previous data
		var array = Array.from(elem.children);
		array.forEach((child) => {
			/*
			if (child.value!="none") {
				elem.removeChild(child)
			}
					*/
		});

		// Add new data
		newEdgeActions.forEach((action) => {
			let opt = document.createElement("option");
			opt.setAttribute("value", action.id);
			opt.setAttribute("data-item-actionid", action.id);
			let cont = document.createTextNode((game as Game).i18n.localize("shadowrun6.edge_action." + action.id) + " - (" + action.cost + ")");
			opt.appendChild(cont);
			elem.appendChild(opt);
		});
	}

	//-------------------------------------------------------------
	/*
	 * Called when a change happens in the Edge Action or Edge Action
	 * selection.
	 */
	_onEdgeBoostActionChange(event) {
		console.log("_onEdgeBoostActionChange");
		console.log("_onEdgeBoostActionChange  this=", this);

		let actor: Shadowrun6Actor = (this.options as any).actor;
		let prepared: PreparedRoll = (this.options as any).prepared;
		let configured: ConfiguredRoll = this.dialogResult;

		// Ignore this, if there is no actor
		if (!actor) {
			return;
		}
		if (!event || !event.currentTarget) {
			return;
		}

		if (event.currentTarget.name === "edgeBoost") {
			const boostsSelect = event.currentTarget;
			let boostId = boostsSelect.children[boostsSelect.selectedIndex].dataset.itemBoostid;
			console.log(" boostId = " + boostId);

			configured.edgeBoost = boostId;
			if (boostId === "edge_action") {
				this._updateEdgeActions(this._element![0].getElementsByClassName("edgeActions")[0], this.edge);
			} else {
				this._updateEdgeActions(this._element![0].getElementsByClassName("edgeActions")[0], 0);
			}
			if (boostId != "none") {
				configured.edge_use = (game as Game).i18n.localize("shadowrun6.edge_boost." + boostId);
			} else {
				configured.edge_use = "";
			}
			this._performEdgeBoostOrAction(configured, boostId);
		} else if (event.currentTarget.name === "edgeAction") {
			const actionSelect = event.currentTarget;
			let actionId = actionSelect.children[actionSelect.selectedIndex].dataset.itemActionid;
			console.log(" actionId = " + actionId);

			configured.edgeAction = actionId;
			configured.edge_use = (game as Game).i18n.localize("shadowrun6.edge_action." + actionId);
			this._performEdgeBoostOrAction(configured, actionId);
		}
	}

	//-------------------------------------------------------------
	_updateDicePool(data: ConfiguredRoll) {
		// Get the value of the user entered modifier ..
		let userModifier: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
		// .. and update the roll
		this.modifier = userModifier ? userModifier : 0;
		// Get the value of the checkbox if the calculated wound penality should be used
		let useWoundModifier: boolean = (document.getElementById("useWoundModifier") as HTMLInputElement).checked;

		// Calculate new sum
		console.log("updateDicePool: ", this);
		let woundMod = (this.actor) ? this.actor.getWoundModifier() : 0;
		if (this.actor) {
			console.log("updateDicePool2: ", this.prepared.pool, this.modifier, woundMod);
		}
		//this.prepared.calcPool = this.prepared.pool + this.modifier - (useWoundModifier?woundMod:0);

		$("label[name='dicePool']")[0].innerText = this.prepared.calcPool.toString();
	}

	//-------------------------------------------------------------
	_performEdgeBoostOrAction(data: ConfiguredRoll, boostOrActionId) {
		console.log("ToDo: performEgdeBoostOrAction " + boostOrActionId);
		if (boostOrActionId == "edge_action") {
			return;
		}

		data.explode = false;
		this.modifier = 0;

		switch (boostOrActionId) {
			case "add_edge_pool":
				data.explode = true;
				this.modifier = (getSystemData(data.actor) as Lifeform).edge.max;
				break;
		}

		// Update content on dialog
		($("input[name='modifier']")[0] as HTMLInputElement).value = this.modifier.toString();
		//($("input[name='explode' ]")[0] as HTMLInputElement).value = data.explode;
		($("input[name='explode' ]")[0] as HTMLInputElement).checked = data.explode;
		this._updateDicePool(data);
	}

	//-------------------------------------------------------------
	_onSpellConfigChange() {
		let ampUpElement: HTMLSelectElement = document.getElementById("ampUp") as HTMLSelectElement;
		let incElement: HTMLSelectElement = document.getElementById("incArea") as HTMLSelectElement;

		let prepared: SpellRoll = (this.options as any).prepared;
		if (!isLifeform(getSystemData(prepared.actor))) return;
		let lifeform: Lifeform = getSystemData(prepared.actor);

		const baseMagic = lifeform.attributes.mag.pool;

		let ampUpSelect: number = ampUpElement ? parseInt(ampUpElement.value) : 0;
		let incSelect: number = incElement ? parseInt(incElement.value) : 0;
		prepared.calcDamage = (prepared.spell.damage === "physical" || prepared.spell.damage === "physical_special" ? baseMagic / 2 : 0) + ampUpSelect;
		prepared.calcDrain = (+prepared.spell.drain + +ampUpSelect * 2 + +incSelect) as number;
		prepared.calcArea = 2 + incSelect * 2;

		this.html.find("td[id='spellDrain']").text(prepared.calcDrain.toString());
		this.html.find("span[id='spellDmg']").text(prepared.calcDamage.toString());
		this.html.find("span[id='spellArea']").text(prepared.calcArea.toString());
	}

	//-------------------------------------------------------------
	_onFiringModeChange(event: Event) {
		let prepared: WeaponRoll = (this.options as any).prepared;

		let fireModeElement: HTMLSelectElement = document.getElementById("fireMode") as HTMLSelectElement;
		if (!fireModeElement) return;

		let newMode = fireModeElement.value;
		let poolMod: number = 0;
		let arMod: number = 0;
		let dmgMod: number = 0;
		let rounds: number = 1;
		prepared.fireMode = newMode;
		switch (newMode) {
			case "SS":
				this.html.find(".onlyFA").css("display", "none");
				this.html.find(".onlyBF").css("display", "none");
				break;
			case "SA":
				this.html.find(".onlyFA").css("display", "none");
				this.html.find(".onlyBF").css("display", "none");
				rounds = 2;
				arMod = -2;
				dmgMod = 1;
				break;
			case "BF":
				this.html.find(".onlyFA").css("display", "none");
				this.html.find(".onlyBF").css("display", "table-cell");
				rounds = 4;
				arMod = -4;
				dmgMod = 2;
				break;
			case "FA":
				rounds = 10;
				arMod = -6;
				this.html.find(".onlyFA").css("display", "table-cell");
				this.html.find(".onlyBF").css("display", "none");
				break;
		}

		// Calculate reduced attack rating
		prepared.calcAttackRating = [...prepared.weapon.attackRating];
		prepared.calcAttackRating.forEach((element: number, index: number) => {
			prepared.calcAttackRating[index] = parseInt(element as any) + parseInt(arMod as any);
			if (prepared.calcAttackRating[index] <= 0) prepared.calcAttackRating[index] = 0;
		});
		this.html.find("td[name='calcAR']").text(attackRatingToString(prepared.calcAttackRating));
		// Update the range selector for attack rating
		this.html
			.find("select[name='distance']")
			.children("option")
			.each(function () {
				let idx = parseInt(this.getAttribute("name")!);
				this.setAttribute("data-item-ar", prepared.calcAttackRating[idx].toString());
				this.setAttribute("value", prepared.calcAttackRating[idx].toString());
				this.text = (game as Game).i18n.localize("shadowrun6.roll.ar_" + idx) + " (" + prepared.calcAttackRating[idx].toString() + ")";
			});
		this.html.find("select[name='distance']").change();

		// Calculate modified damage
		prepared.calcDmg = prepared.weapon.dmg + dmgMod;
		this.html.find("span[name='calcDmg']").text(prepared.calcDmg.toString());

		// Calculate modified pool
		prepared.calcPool = prepared.pool + poolMod;

		prepared.calcRounds = rounds;
		this.html.find("td[name='calcRounds']").text(prepared.calcRounds.toString());

		this._recalculateBaseAR();
	}

	//-------------------------------------------------------------
	_onBurstModeChange(event: Event) {
		console.log("ToDo: _onBurstModeChanged");
		let prepared: WeaponRoll = (this.options as any).prepared;

		let fireModeElement: HTMLSelectElement = document.getElementById("bfType") as HTMLSelectElement;
		if (!fireModeElement) return;

		prepared.burstMode = fireModeElement.value;
	}

	//-------------------------------------------------------------
	_onAreaChange(event: Event) {
		console.log("ToDo: _onAreaChanged");
		let prepared: WeaponRoll = (this.options as any).prepared;

		let fireModeElement: HTMLSelectElement = document.getElementById("fullAutoArea") as HTMLSelectElement;
		if (!fireModeElement) return;

		prepared.faArea = fireModeElement.value;
	}

	//-------------------------------------------------------------
	_onAttribChange(event) {
		console.log("_onAttribChange ", this.options);
		let actor: Shadowrun6Actor = (this.options as any).actor;
		let prepared: PreparedRoll = (this.options as any).prepared;
		let configured: ConfiguredRoll = (this.options as any).dialogResult;

		// Ignore this, if there is no actor
		if (!actor) {
			return;
		}
		if (!event || !event.currentTarget) {
			return;
		}

		if (isSkillRoll(prepared)) {
			console.log("isSkillRoll ", prepared.skillId);
			const attribSelect = event.currentTarget;
			let newAttrib = attribSelect.children[attribSelect.selectedIndex].value;
			console.log(" use attribute = " + newAttrib);
			prepared.attrib = newAttrib;
			actor.updateSkillRoll(prepared, newAttrib);
			prepared.actionText = prepared.checkText;
		}
		console.log("new check: " + prepared.checkText);
		console.log("new pool: " + prepared.pool);
		configured.checkText = prepared.checkText;
		configured.pool = prepared.pool;
		(document.getElementById("rolldia-checkText") as HTMLHeadingElement).textContent = prepared.checkText;
		this._updateDicePool(configured);
	}

	//-------------------------------------------------------------
	_onNoTarget() {
		document.getElementById("noTargetLabel")!.innerText = (game as Game).i18n.localize("shadowrun6.roll.notarget");
	}

	//-------------------------------------------------------------
	onClose(): SR6ChatMessageData {
		console.log("To Do: onClose()------------------------------------");
		const options: SR6RollDialogOptions = this.options as any as SR6RollDialogOptions;
		let prepared: PreparedRoll = options.prepared!;
		let configured: ConfiguredRoll = options.dialogResult!;
		return new SR6ChatMessageData(configured);
	}
}
