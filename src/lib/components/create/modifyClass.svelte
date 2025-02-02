<script>
	import ClassOptionSelect from './ClassOptionSelect.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import EquipmentOptionSelect from './EquipmentOptionSelect.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import ComboSelect from './ComboSelect.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import EquipmentSelect from './EquipmentSelect.svelte';
	import SpellSelect from './SpellSelect.svelte';

	const { classData, levelData, equipment,form, proficiencies, features } = $props();

	$form['hit_die'] = classData['hit_die'];

	//form['hit_die'] = 0

	const spells = {
  "count": 204,
  "results": [
    {
      "index": "acid-splash",
      "name": "Acid Splash",
      "level": 0,
      "url": "/api/spells/acid-splash"
    },
    {
      "index": "chill-touch",
      "name": "Chill Touch",
      "level": 0,
      "url": "/api/spells/chill-touch"
    },
    {
      "index": "dancing-lights",
      "name": "Dancing Lights",
      "level": 0,
      "url": "/api/spells/dancing-lights"
    },
    {
      "index": "fire-bolt",
      "name": "Fire Bolt",
      "level": 0,
      "url": "/api/spells/fire-bolt"
    },
    {
      "index": "light",
      "name": "Light",
      "level": 0,
      "url": "/api/spells/light"
    },
    {
      "index": "mage-hand",
      "name": "Mage Hand",
      "level": 0,
      "url": "/api/spells/mage-hand"
    },
    {
      "index": "mending",
      "name": "Mending",
      "level": 0,
      "url": "/api/spells/mending"
    },
    {
      "index": "message",
      "name": "Message",
      "level": 0,
      "url": "/api/spells/message"
    },
    {
      "index": "minor-illusion",
      "name": "Minor Illusion",
      "level": 0,
      "url": "/api/spells/minor-illusion"
    },
    {
      "index": "poison-spray",
      "name": "Poison Spray",
      "level": 0,
      "url": "/api/spells/poison-spray"
    },
    {
      "index": "prestidigitation",
      "name": "Prestidigitation",
      "level": 0,
      "url": "/api/spells/prestidigitation"
    },
    {
      "index": "ray-of-frost",
      "name": "Ray of Frost",
      "level": 0,
      "url": "/api/spells/ray-of-frost"
    },
    {
      "index": "shocking-grasp",
      "name": "Shocking Grasp",
      "level": 0,
      "url": "/api/spells/shocking-grasp"
    },
    {
      "index": "true-strike",
      "name": "True Strike",
      "level": 0,
      "url": "/api/spells/true-strike"
    },
    {
      "index": "alarm",
      "name": "Alarm",
      "level": 1,
      "url": "/api/spells/alarm"
    },
    {
      "index": "burning-hands",
      "name": "Burning Hands",
      "level": 1,
      "url": "/api/spells/burning-hands"
    },
    {
      "index": "charm-person",
      "name": "Charm Person",
      "level": 1,
      "url": "/api/spells/charm-person"
    },
    {
      "index": "color-spray",
      "name": "Color Spray",
      "level": 1,
      "url": "/api/spells/color-spray"
    },
    {
      "index": "comprehend-languages",
      "name": "Comprehend Languages",
      "level": 1,
      "url": "/api/spells/comprehend-languages"
    },
    {
      "index": "detect-magic",
      "name": "Detect Magic",
      "level": 1,
      "url": "/api/spells/detect-magic"
    },
    {
      "index": "disguise-self",
      "name": "Disguise Self",
      "level": 1,
      "url": "/api/spells/disguise-self"
    },
    {
      "index": "expeditious-retreat",
      "name": "Expeditious Retreat",
      "level": 1,
      "url": "/api/spells/expeditious-retreat"
    },
    {
      "index": "false-life",
      "name": "False Life",
      "level": 1,
      "url": "/api/spells/false-life"
    },
    {
      "index": "feather-fall",
      "name": "Feather Fall",
      "level": 1,
      "url": "/api/spells/feather-fall"
    },
    {
      "index": "find-familiar",
      "name": "Find Familiar",
      "level": 1,
      "url": "/api/spells/find-familiar"
    },
    {
      "index": "floating-disk",
      "name": "Floating Disk",
      "level": 1,
      "url": "/api/spells/floating-disk"
    },
    {
      "index": "fog-cloud",
      "name": "Fog Cloud",
      "level": 1,
      "url": "/api/spells/fog-cloud"
    },
    {
      "index": "grease",
      "name": "Grease",
      "level": 1,
      "url": "/api/spells/grease"
    },
    {
      "index": "hideous-laughter",
      "name": "Hideous Laughter",
      "level": 1,
      "url": "/api/spells/hideous-laughter"
    },
    {
      "index": "identify",
      "name": "Identify",
      "level": 1,
      "url": "/api/spells/identify"
    },
    {
      "index": "illusory-script",
      "name": "Illusory Script",
      "level": 1,
      "url": "/api/spells/illusory-script"
    },
    {
      "index": "jump",
      "name": "Jump",
      "level": 1,
      "url": "/api/spells/jump"
    },
    {
      "index": "longstrider",
      "name": "Longstrider",
      "level": 1,
      "url": "/api/spells/longstrider"
    },
    {
      "index": "mage-armor",
      "name": "Mage Armor",
      "level": 1,
      "url": "/api/spells/mage-armor"
    },
    {
      "index": "magic-missile",
      "name": "Magic Missile",
      "level": 1,
      "url": "/api/spells/magic-missile"
    },
    {
      "index": "protection-from-evil-and-good",
      "name": "Protection from Evil and Good",
      "level": 1,
      "url": "/api/spells/protection-from-evil-and-good"
    },
    {
      "index": "shield",
      "name": "Shield",
      "level": 1,
      "url": "/api/spells/shield"
    },
    {
      "index": "silent-image",
      "name": "Silent Image",
      "level": 1,
      "url": "/api/spells/silent-image"
    },
    {
      "index": "sleep",
      "name": "Sleep",
      "level": 1,
      "url": "/api/spells/sleep"
    },
    {
      "index": "thunderwave",
      "name": "Thunderwave",
      "level": 1,
      "url": "/api/spells/thunderwave"
    },
    {
      "index": "unseen-servant",
      "name": "Unseen Servant",
      "level": 1,
      "url": "/api/spells/unseen-servant"
    },
    {
      "index": "acid-arrow",
      "name": "Acid Arrow",
      "level": 2,
      "url": "/api/spells/acid-arrow"
    },
    {
      "index": "alter-self",
      "name": "Alter Self",
      "level": 2,
      "url": "/api/spells/alter-self"
    },
    {
      "index": "arcane-lock",
      "name": "Arcane Lock",
      "level": 2,
      "url": "/api/spells/arcane-lock"
    },
    {
      "index": "arcanists-magic-aura",
      "name": "Arcanist's Magic Aura",
      "level": 2,
      "url": "/api/spells/arcanists-magic-aura"
    },
    {
      "index": "blindness-deafness",
      "name": "Blindness/Deafness",
      "level": 2,
      "url": "/api/spells/blindness-deafness"
    },
    {
      "index": "blur",
      "name": "Blur",
      "level": 2,
      "url": "/api/spells/blur"
    },
    {
      "index": "continual-flame",
      "name": "Continual Flame",
      "level": 2,
      "url": "/api/spells/continual-flame"
    },
    {
      "index": "darkness",
      "name": "Darkness",
      "level": 2,
      "url": "/api/spells/darkness"
    },
    {
      "index": "darkvision",
      "name": "Darkvision",
      "level": 2,
      "url": "/api/spells/darkvision"
    },
    {
      "index": "detect-thoughts",
      "name": "Detect Thoughts",
      "level": 2,
      "url": "/api/spells/detect-thoughts"
    },
    {
      "index": "enlarge-reduce",
      "name": "Enlarge/Reduce",
      "level": 2,
      "url": "/api/spells/enlarge-reduce"
    },
    {
      "index": "flaming-sphere",
      "name": "Flaming Sphere",
      "level": 2,
      "url": "/api/spells/flaming-sphere"
    },
    {
      "index": "gentle-repose",
      "name": "Gentle Repose",
      "level": 2,
      "url": "/api/spells/gentle-repose"
    },
    {
      "index": "gust-of-wind",
      "name": "Gust of Wind",
      "level": 2,
      "url": "/api/spells/gust-of-wind"
    },
    {
      "index": "hold-person",
      "name": "Hold Person",
      "level": 2,
      "url": "/api/spells/hold-person"
    },
    {
      "index": "invisibility",
      "name": "Invisibility",
      "level": 2,
      "url": "/api/spells/invisibility"
    },
    {
      "index": "knock",
      "name": "Knock",
      "level": 2,
      "url": "/api/spells/knock"
    },
    {
      "index": "levitate",
      "name": "Levitate",
      "level": 2,
      "url": "/api/spells/levitate"
    },
    {
      "index": "locate-object",
      "name": "Locate Object",
      "level": 2,
      "url": "/api/spells/locate-object"
    },
    {
      "index": "magic-mouth",
      "name": "Magic Mouth",
      "level": 2,
      "url": "/api/spells/magic-mouth"
    },
    {
      "index": "magic-weapon",
      "name": "Magic Weapon",
      "level": 2,
      "url": "/api/spells/magic-weapon"
    },
    {
      "index": "mirror-image",
      "name": "Mirror Image",
      "level": 2,
      "url": "/api/spells/mirror-image"
    },
    {
      "index": "misty-step",
      "name": "Misty Step",
      "level": 2,
      "url": "/api/spells/misty-step"
    },
    {
      "index": "ray-of-enfeeblement",
      "name": "Ray of Enfeeblement",
      "level": 2,
      "url": "/api/spells/ray-of-enfeeblement"
    },
    {
      "index": "rope-trick",
      "name": "Rope Trick",
      "level": 2,
      "url": "/api/spells/rope-trick"
    },
    {
      "index": "scorching-ray",
      "name": "Scorching Ray",
      "level": 2,
      "url": "/api/spells/scorching-ray"
    },
    {
      "index": "see-invisibility",
      "name": "See Invisibility",
      "level": 2,
      "url": "/api/spells/see-invisibility"
    },
    {
      "index": "shatter",
      "name": "Shatter",
      "level": 2,
      "url": "/api/spells/shatter"
    },
    {
      "index": "spider-climb",
      "name": "Spider Climb",
      "level": 2,
      "url": "/api/spells/spider-climb"
    },
    {
      "index": "suggestion",
      "name": "Suggestion",
      "level": 2,
      "url": "/api/spells/suggestion"
    },
    {
      "index": "web",
      "name": "Web",
      "level": 2,
      "url": "/api/spells/web"
    },
    {
      "index": "animate-dead",
      "name": "Animate Dead",
      "level": 3,
      "url": "/api/spells/animate-dead"
    },
    {
      "index": "bestow-curse",
      "name": "Bestow Curse",
      "level": 3,
      "url": "/api/spells/bestow-curse"
    },
    {
      "index": "blink",
      "name": "Blink",
      "level": 3,
      "url": "/api/spells/blink"
    },
    {
      "index": "clairvoyance",
      "name": "Clairvoyance",
      "level": 3,
      "url": "/api/spells/clairvoyance"
    },
    {
      "index": "counterspell",
      "name": "Counterspell",
      "level": 3,
      "url": "/api/spells/counterspell"
    },
    {
      "index": "dispel-magic",
      "name": "Dispel Magic",
      "level": 3,
      "url": "/api/spells/dispel-magic"
    },
    {
      "index": "fear",
      "name": "Fear",
      "level": 3,
      "url": "/api/spells/fear"
    },
    {
      "index": "fireball",
      "name": "Fireball",
      "level": 3,
      "url": "/api/spells/fireball"
    },
    {
      "index": "fly",
      "name": "Fly",
      "level": 3,
      "url": "/api/spells/fly"
    },
    {
      "index": "gaseous-form",
      "name": "Gaseous Form",
      "level": 3,
      "url": "/api/spells/gaseous-form"
    },
    {
      "index": "glyph-of-warding",
      "name": "Glyph of Warding",
      "level": 3,
      "url": "/api/spells/glyph-of-warding"
    },
    {
      "index": "haste",
      "name": "Haste",
      "level": 3,
      "url": "/api/spells/haste"
    },
    {
      "index": "hypnotic-pattern",
      "name": "Hypnotic Pattern",
      "level": 3,
      "url": "/api/spells/hypnotic-pattern"
    },
    {
      "index": "lightning-bolt",
      "name": "Lightning Bolt",
      "level": 3,
      "url": "/api/spells/lightning-bolt"
    },
    {
      "index": "magic-circle",
      "name": "Magic Circle",
      "level": 3,
      "url": "/api/spells/magic-circle"
    },
    {
      "index": "major-image",
      "name": "Major Image",
      "level": 3,
      "url": "/api/spells/major-image"
    },
    {
      "index": "nondetection",
      "name": "Nondetection",
      "level": 3,
      "url": "/api/spells/nondetection"
    },
    {
      "index": "phantom-steed",
      "name": "Phantom Steed",
      "level": 3,
      "url": "/api/spells/phantom-steed"
    },
    {
      "index": "protection-from-energy",
      "name": "Protection From Energy",
      "level": 3,
      "url": "/api/spells/protection-from-energy"
    },
    {
      "index": "remove-curse",
      "name": "Remove Curse",
      "level": 3,
      "url": "/api/spells/remove-curse"
    },
    {
      "index": "sending",
      "name": "Sending",
      "level": 3,
      "url": "/api/spells/sending"
    },
    {
      "index": "sleet-storm",
      "name": "Sleet Storm",
      "level": 3,
      "url": "/api/spells/sleet-storm"
    },
    {
      "index": "slow",
      "name": "Slow",
      "level": 3,
      "url": "/api/spells/slow"
    },
    {
      "index": "stinking-cloud",
      "name": "Stinking Cloud",
      "level": 3,
      "url": "/api/spells/stinking-cloud"
    },
    {
      "index": "tiny-hut",
      "name": "Tiny Hut",
      "level": 3,
      "url": "/api/spells/tiny-hut"
    },
    {
      "index": "tongues",
      "name": "Tongues",
      "level": 3,
      "url": "/api/spells/tongues"
    },
    {
      "index": "vampiric-touch",
      "name": "Vampiric Touch",
      "level": 3,
      "url": "/api/spells/vampiric-touch"
    },
    {
      "index": "water-breathing",
      "name": "Water Breathing",
      "level": 3,
      "url": "/api/spells/water-breathing"
    },
    {
      "index": "arcane-eye",
      "name": "Arcane Eye",
      "level": 4,
      "url": "/api/spells/arcane-eye"
    },
    {
      "index": "banishment",
      "name": "Banishment",
      "level": 4,
      "url": "/api/spells/banishment"
    },
    {
      "index": "black-tentacles",
      "name": "Black Tentacles",
      "level": 4,
      "url": "/api/spells/black-tentacles"
    },
    {
      "index": "blight",
      "name": "Blight",
      "level": 4,
      "url": "/api/spells/blight"
    },
    {
      "index": "confusion",
      "name": "Confusion",
      "level": 4,
      "url": "/api/spells/confusion"
    },
    {
      "index": "conjure-minor-elementals",
      "name": "Conjure Minor Elementals",
      "level": 4,
      "url": "/api/spells/conjure-minor-elementals"
    },
    {
      "index": "control-water",
      "name": "Control Water",
      "level": 4,
      "url": "/api/spells/control-water"
    },
    {
      "index": "dimension-door",
      "name": "Dimension Door",
      "level": 4,
      "url": "/api/spells/dimension-door"
    },
    {
      "index": "fabricate",
      "name": "Fabricate",
      "level": 4,
      "url": "/api/spells/fabricate"
    },
    {
      "index": "faithful-hound",
      "name": "Faithful Hound",
      "level": 4,
      "url": "/api/spells/faithful-hound"
    },
    {
      "index": "fire-shield",
      "name": "Fire Shield",
      "level": 4,
      "url": "/api/spells/fire-shield"
    },
    {
      "index": "greater-invisibility",
      "name": "Greater Invisibility",
      "level": 4,
      "url": "/api/spells/greater-invisibility"
    },
    {
      "index": "hallucinatory-terrain",
      "name": "Hallucinatory Terrain",
      "level": 4,
      "url": "/api/spells/hallucinatory-terrain"
    },
    {
      "index": "ice-storm",
      "name": "Ice Storm",
      "level": 4,
      "url": "/api/spells/ice-storm"
    },
    {
      "index": "locate-creature",
      "name": "Locate Creature",
      "level": 4,
      "url": "/api/spells/locate-creature"
    },
    {
      "index": "phantasmal-killer",
      "name": "Phantasmal Killer",
      "level": 4,
      "url": "/api/spells/phantasmal-killer"
    },
    {
      "index": "polymorph",
      "name": "Polymorph",
      "level": 4,
      "url": "/api/spells/polymorph"
    },
    {
      "index": "private-sanctum",
      "name": "Private Sanctum",
      "level": 4,
      "url": "/api/spells/private-sanctum"
    },
    {
      "index": "resilient-sphere",
      "name": "Resilient Sphere",
      "level": 4,
      "url": "/api/spells/resilient-sphere"
    },
    {
      "index": "secret-chest",
      "name": "Secret Chest",
      "level": 4,
      "url": "/api/spells/secret-chest"
    },
    {
      "index": "stone-shape",
      "name": "Stone Shape",
      "level": 4,
      "url": "/api/spells/stone-shape"
    },
    {
      "index": "stoneskin",
      "name": "Stoneskin",
      "level": 4,
      "url": "/api/spells/stoneskin"
    },
    {
      "index": "wall-of-fire",
      "name": "Wall of Fire",
      "level": 4,
      "url": "/api/spells/wall-of-fire"
    },
    {
      "index": "animate-objects",
      "name": "Animate Objects",
      "level": 5,
      "url": "/api/spells/animate-objects"
    },
    {
      "index": "arcane-hand",
      "name": "Arcane Hand",
      "level": 5,
      "url": "/api/spells/arcane-hand"
    },
    {
      "index": "cloudkill",
      "name": "Cloudkill",
      "level": 5,
      "url": "/api/spells/cloudkill"
    },
    {
      "index": "cone-of-cold",
      "name": "Cone of Cold",
      "level": 5,
      "url": "/api/spells/cone-of-cold"
    },
    {
      "index": "conjure-elemental",
      "name": "Conjure Elemental",
      "level": 5,
      "url": "/api/spells/conjure-elemental"
    },
    {
      "index": "contact-other-plane",
      "name": "Contact Other Plane",
      "level": 5,
      "url": "/api/spells/contact-other-plane"
    },
    {
      "index": "creation",
      "name": "Creation",
      "level": 5,
      "url": "/api/spells/creation"
    },
    {
      "index": "dominate-person",
      "name": "Dominate Person",
      "level": 5,
      "url": "/api/spells/dominate-person"
    },
    {
      "index": "dream",
      "name": "Dream",
      "level": 5,
      "url": "/api/spells/dream"
    },
    {
      "index": "geas",
      "name": "Geas",
      "level": 5,
      "url": "/api/spells/geas"
    },
    {
      "index": "hold-monster",
      "name": "Hold Monster",
      "level": 5,
      "url": "/api/spells/hold-monster"
    },
    {
      "index": "legend-lore",
      "name": "Legend Lore",
      "level": 5,
      "url": "/api/spells/legend-lore"
    },
    {
      "index": "mislead",
      "name": "Mislead",
      "level": 5,
      "url": "/api/spells/mislead"
    },
    {
      "index": "modify-memory",
      "name": "Modify Memory",
      "level": 5,
      "url": "/api/spells/modify-memory"
    },
    {
      "index": "passwall",
      "name": "Passwall",
      "level": 5,
      "url": "/api/spells/passwall"
    },
    {
      "index": "planar-binding",
      "name": "Planar Binding",
      "level": 5,
      "url": "/api/spells/planar-binding"
    },
    {
      "index": "scrying",
      "name": "Scrying",
      "level": 5,
      "url": "/api/spells/scrying"
    },
    {
      "index": "seeming",
      "name": "Seeming",
      "level": 5,
      "url": "/api/spells/seeming"
    },
    {
      "index": "telekinesis",
      "name": "Telekinesis",
      "level": 5,
      "url": "/api/spells/telekinesis"
    },
    {
      "index": "telepathic-bond",
      "name": "Telepathic Bond",
      "level": 5,
      "url": "/api/spells/telepathic-bond"
    },
    {
      "index": "teleportation-circle",
      "name": "Teleportation Circle",
      "level": 5,
      "url": "/api/spells/teleportation-circle"
    },
    {
      "index": "wall-of-force",
      "name": "Wall of Force",
      "level": 5,
      "url": "/api/spells/wall-of-force"
    },
    {
      "index": "wall-of-stone",
      "name": "Wall of Stone",
      "level": 5,
      "url": "/api/spells/wall-of-stone"
    },
    {
      "index": "chain-lightning",
      "name": "Chain Lightning",
      "level": 6,
      "url": "/api/spells/chain-lightning"
    },
    {
      "index": "circle-of-death",
      "name": "Circle of Death",
      "level": 6,
      "url": "/api/spells/circle-of-death"
    },
    {
      "index": "contingency",
      "name": "Contingency",
      "level": 6,
      "url": "/api/spells/contingency"
    },
    {
      "index": "create-undead",
      "name": "Create Undead",
      "level": 6,
      "url": "/api/spells/create-undead"
    },
    {
      "index": "disintegrate",
      "name": "Disintegrate",
      "level": 6,
      "url": "/api/spells/disintegrate"
    },
    {
      "index": "eyebite",
      "name": "Eyebite",
      "level": 6,
      "url": "/api/spells/eyebite"
    },
    {
      "index": "flesh-to-stone",
      "name": "Flesh to Stone",
      "level": 6,
      "url": "/api/spells/flesh-to-stone"
    },
    {
      "index": "freezing-sphere",
      "name": "Freezing Sphere",
      "level": 6,
      "url": "/api/spells/freezing-sphere"
    },
    {
      "index": "globe-of-invulnerability",
      "name": "Globe of Invulnerability",
      "level": 6,
      "url": "/api/spells/globe-of-invulnerability"
    },
    {
      "index": "guards-and-wards",
      "name": "Guards and Wards",
      "level": 6,
      "url": "/api/spells/guards-and-wards"
    },
    {
      "index": "instant-summons",
      "name": "Instant Summons",
      "level": 6,
      "url": "/api/spells/instant-summons"
    },
    {
      "index": "irresistible-dance",
      "name": "Irresistible Dance",
      "level": 6,
      "url": "/api/spells/irresistible-dance"
    },
    {
      "index": "magic-jar",
      "name": "Magic Jar",
      "level": 6,
      "url": "/api/spells/magic-jar"
    },
    {
      "index": "mass-suggestion",
      "name": "Mass Suggestion",
      "level": 6,
      "url": "/api/spells/mass-suggestion"
    },
    {
      "index": "move-earth",
      "name": "Move Earth",
      "level": 6,
      "url": "/api/spells/move-earth"
    },
    {
      "index": "programmed-illusion",
      "name": "Programmed Illusion",
      "level": 6,
      "url": "/api/spells/programmed-illusion"
    },
    {
      "index": "sunbeam",
      "name": "Sunbeam",
      "level": 6,
      "url": "/api/spells/sunbeam"
    },
    {
      "index": "true-seeing",
      "name": "True Seeing",
      "level": 6,
      "url": "/api/spells/true-seeing"
    },
    {
      "index": "wall-of-ice",
      "name": "Wall of Ice",
      "level": 6,
      "url": "/api/spells/wall-of-ice"
    },
    {
      "index": "arcane-sword",
      "name": "Arcane Sword",
      "level": 7,
      "url": "/api/spells/arcane-sword"
    },
    {
      "index": "delayed-blast-fireball",
      "name": "Delayed Blast Fireball",
      "level": 7,
      "url": "/api/spells/delayed-blast-fireball"
    },
    {
      "index": "etherealness",
      "name": "Etherealness",
      "level": 7,
      "url": "/api/spells/etherealness"
    },
    {
      "index": "finger-of-death",
      "name": "Finger of Death",
      "level": 7,
      "url": "/api/spells/finger-of-death"
    },
    {
      "index": "forcecage",
      "name": "Forcecage",
      "level": 7,
      "url": "/api/spells/forcecage"
    },
    {
      "index": "magnificent-mansion",
      "name": "Magnificent Mansion",
      "level": 7,
      "url": "/api/spells/magnificent-mansion"
    },
    {
      "index": "mirage-arcane",
      "name": "Mirage Arcane",
      "level": 7,
      "url": "/api/spells/mirage-arcane"
    },
    {
      "index": "plane-shift",
      "name": "Plane Shift",
      "level": 7,
      "url": "/api/spells/plane-shift"
    },
    {
      "index": "prismatic-spray",
      "name": "Prismatic Spray",
      "level": 7,
      "url": "/api/spells/prismatic-spray"
    },
    {
      "index": "project-image",
      "name": "Project Image",
      "level": 7,
      "url": "/api/spells/project-image"
    },
    {
      "index": "reverse-gravity",
      "name": "Reverse Gravity",
      "level": 7,
      "url": "/api/spells/reverse-gravity"
    },
    {
      "index": "sequester",
      "name": "Sequester",
      "level": 7,
      "url": "/api/spells/sequester"
    },
    {
      "index": "simulacrum",
      "name": "Simulacrum",
      "level": 7,
      "url": "/api/spells/simulacrum"
    },
    {
      "index": "symbol",
      "name": "Symbol",
      "level": 7,
      "url": "/api/spells/symbol"
    },
    {
      "index": "teleport",
      "name": "Teleport",
      "level": 7,
      "url": "/api/spells/teleport"
    },
    {
      "index": "antimagic-field",
      "name": "Antimagic Field",
      "level": 8,
      "url": "/api/spells/antimagic-field"
    },
    {
      "index": "antipathy-sympathy",
      "name": "Antipathy/Sympathy",
      "level": 8,
      "url": "/api/spells/antipathy-sympathy"
    },
    {
      "index": "clone",
      "name": "Clone",
      "level": 8,
      "url": "/api/spells/clone"
    },
    {
      "index": "control-weather",
      "name": "Control Weather",
      "level": 8,
      "url": "/api/spells/control-weather"
    },
    {
      "index": "demiplane",
      "name": "Demiplane",
      "level": 8,
      "url": "/api/spells/demiplane"
    },
    {
      "index": "dominate-monster",
      "name": "Dominate Monster",
      "level": 8,
      "url": "/api/spells/dominate-monster"
    },
    {
      "index": "feeblemind",
      "name": "Feeblemind",
      "level": 8,
      "url": "/api/spells/feeblemind"
    },
    {
      "index": "incendiary-cloud",
      "name": "Incendiary Cloud",
      "level": 8,
      "url": "/api/spells/incendiary-cloud"
    },
    {
      "index": "maze",
      "name": "Maze",
      "level": 8,
      "url": "/api/spells/maze"
    },
    {
      "index": "mind-blank",
      "name": "Mind Blank",
      "level": 8,
      "url": "/api/spells/mind-blank"
    },
    {
      "index": "power-word-stun",
      "name": "Power Word Stun",
      "level": 8,
      "url": "/api/spells/power-word-stun"
    },
    {
      "index": "sunburst",
      "name": "Sunburst",
      "level": 8,
      "url": "/api/spells/sunburst"
    },
    {
      "index": "astral-projection",
      "name": "Astral Projection",
      "level": 9,
      "url": "/api/spells/astral-projection"
    },
    {
      "index": "foresight",
      "name": "Foresight",
      "level": 9,
      "url": "/api/spells/foresight"
    },
    {
      "index": "gate",
      "name": "Gate",
      "level": 9,
      "url": "/api/spells/gate"
    },
    {
      "index": "imprisonment",
      "name": "Imprisonment",
      "level": 9,
      "url": "/api/spells/imprisonment"
    },
    {
      "index": "meteor-swarm",
      "name": "Meteor Swarm",
      "level": 9,
      "url": "/api/spells/meteor-swarm"
    },
    {
      "index": "power-word-kill",
      "name": "Power Word Kill",
      "level": 9,
      "url": "/api/spells/power-word-kill"
    },
    {
      "index": "prismatic-wall",
      "name": "Prismatic Wall",
      "level": 9,
      "url": "/api/spells/prismatic-wall"
    },
    {
      "index": "shapechange",
      "name": "Shapechange",
      "level": 9,
      "url": "/api/spells/shapechange"
    },
    {
      "index": "time-stop",
      "name": "Time Stop",
      "level": 9,
      "url": "/api/spells/time-stop"
    },
    {
      "index": "true-polymorph",
      "name": "True Polymorph",
      "level": 9,
      "url": "/api/spells/true-polymorph"
    },
    {
      "index": "weird",
      "name": "Weird",
      "level": 9,
      "url": "/api/spells/weird"
    },
    {
      "index": "wish",
      "name": "Wish",
      "level": 9,
      "url": "/api/spells/wish"
    }
  ]
}

	let choices = [];
	for (let key in classData) {
		if (key.endsWith('choices')) {
			choices.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}

	let options = [];
	for (let key in classData) {
		if (key.endsWith('options')) {
			options.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<h2 class="text-xl font-bold">Class Defaults</h2>
	</Card.Header>
	<Card.Content>
		<Label for="name">Class</Label>
		<Input name="name" value={classData.name} type="text" disabled />

		<h3>Proficiency Bonus: {levelData.prof_bonus}</h3>
		<h3>Ability Score Bonus: {levelData.ability_score_bonuses}</h3>

		<Label for='hit_die'>Hit Die</Label>
		<Select.Root name='hit_die' bind:value={$form['hit_die']} type='single'>
			<Select.Trigger class="w-[180px]">
				{$form['hit_die']}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each [4,6,8,10,12,20] as die}
						<Select.Item value={die} label={die}>{die}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		<ComboSelect
			formInputName='features'
			formDisplayName='Features'
			{form}
			things={features}
			raceData={levelData}/>

		<ComboSelect
			formInputName="proficiencies"
			formDisplayName="Proficiencies"
			{form}
			things={proficiencies}
			raceData={classData}
		/>

		<ComboSelect 
			formInputName='saving_throws'
			formDisplayName='Saving Throws'
			{form}
			things={{results:[
				{
				  "index": "cha",
				  "name": "CHA",
				  "url": "/api/ability-scores/cha"
				},
				{
				  "index": "con",
				  "name": "CON",
				  "url": "/api/ability-scores/con"
				},
				{
				  "index": "dex",
				  "name": "DEX",
				  "url": "/api/ability-scores/dex"
				},
				{
				  "index": "int",
				  "name": "INT",
				  "url": "/api/ability-scores/int"
				},
				{
				  "index": "str",
				  "name": "STR",
				  "url": "/api/ability-scores/str"
				},
				{
				  "index": "wis",
				  "name": "WIS",
				  "url": "/api/ability-scores/wis"
				}
			  ]}}
			raceData={classData}/>

		<EquipmentSelect allThings={equipment} {form} formDisplayName='Starting Equipment' formInputName='starting_equipment' classData={classData}/>

	</Card.Content>
</Card.Root>

{#if choices.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Choices</h2>
		</Card.Header>
		<Card.Content>
			{#each choices as thing (thing.key)}
				{#each thing.data as option, index}
					<ClassOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						{form}
						choices={option}
						classIndex={index}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}


{#if options.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Options</h2>
		</Card.Header>
		<Card.Content>
			{#each options as thing (thing.key)}
				{#each thing.data as option, equipIndex}
					<EquipmentOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						form={form}
						choices={option}
						equipIndex={equipIndex}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}

{#if classData.spellcasting !== null}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Spellcasting</h2>
		</Card.Header>
		<Card.Content>
			<h3>Casting Level: {classData.spellcasting.level}</h3>
			<h3>Spell Casting Ability: {classData.spellcasting.spellcasting_ability.name}</h3>
			
			{#each classData.spellcasting.info as info}
				<h4 class='text-lg font-bold'>{info.name}</h4>
				<p>{info.desc}</p>
				
			{/each}

			{#each Object.entries(levelData.spellcasting) as [key, value], spellLevel}
				{#if value > 0}
					<SpellSelect choices={{choose: value, results: spells.results.filter((s) => s.level == spellLevel)}} 
						{form} formDisplayName={key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} formInputName={key}/>
				{/if}
			{/each}

			
		</Card.Content>
		<Card.Footer>

		</Card.Footer>
	</Card.Root>
	
{/if}
