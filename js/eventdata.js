// This file is to make this stuff easy to maintain

var EVENT_PLACE = [
    "Misc",
    "PressConference",
    "CardinalMeeting",
    "Conversation",
    "Balcony",
    "Sleeping",
    "Praying",
    "Letters"
];

var EVENT_STATS = [
	"Hope",
	"Love",
	"Faith",
	"PopeHappiness",
	"CardinalHappiness",
	"Piety"
];

var EVENT_FIELDS = [
    "eventname",
    "place",
    "text",
    "prereqs",
	"prereqday",
	"prereqtime",
	"prereqstat",
	"prereqmod",
	"prereqamount",
	"eventchance",
	"loadlevel"
];

var RESPONSE_FIELDS = [
	"responsetext",
	"nextevent",
	"headline",
	"subheadline"
]

var EFFECT_FIELDS = [
	"effectchance",
	"effectstat",
	"effectmod",
	"effectamount"
]