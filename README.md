# PS2014 Event Creator

 * Papal Simulator? This has to be some kind of joke. _Good, keep believing that._

```
EVENT
string "eventname" -- event name (required)
string "place" -- event place (required, acceptable input: Misc, PressConference, CardinalMeeting, Conversation, Balcony, Sleeping, Praying, Letters)
string "text" -- text of event (required)
string[] "prereqs" -- list of event dependencies (optional)
string "prereqday" -- day that the event can fire on (optional)
float[] "prereqtime" -- time event can take place in, in format [min time, max time] (optional)
string "prereqstat"
char "prereqmod" 
float "prereqamount" -- event won't fire unless this is true (i.e. faith > 50, love < 25, etc.) (optional)
float "eventchance" -- chance of event happening, from 1 to 100 (optional)
Response[] responses -- all responses to this event (optional; no responses puts "OK" button)

RESPONSE
string "responsetext" -- response text (required)
string "nextevent" -- next event in response chain (optional)
string "headline" -- newspaper headline associated with response (optional)
string "subheadline" -- newspaper subheadline associated with response (optional)
Effect[] effects -- list of various effects which happen when this event is chosen (optional)

EFFECT
float[] "effectchance" -- (required) the chance of this effect happening, from 1 to 100. If index 0 fails, we move onto index 1, then index 2, etc. until we hit the array bounds.
Whichever index is chosen will be used for the remainder of the effect.
This lets us do things like have 20% chance of one effect happening, then if that doesn't happen 50% chance of another thing happening, etc.
string[] "effectstat" -- the stat which this effect will affect (required, acceptable input: Hope, Love, Faith, PopeHappiness, CardinalHappiness, Piety, GameOver)
char[] "effectmod" -- how the stat will be modified (required, acceptable input: +, -, =, *, /)
float[] "effectamount" -- the amount to modifiy the stat by (required)
```