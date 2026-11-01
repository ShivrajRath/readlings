/* ==========================================================================
   Readlings — Curriculum data
   --------------------------------------------------------------------------
   A plain JavaScript object so the site stays 100% static and GitHub Pages
   friendly. Add a new level/book/chapter by following the shapes below.

   Level:
     id, category, name, color, soft, ink, icon, description, focus, guidance

   Book:
     id, title, kicker, blurb, emoji, skills, chapters[]

   Chapter:
     id, title, summary, minutes, paragraphs[]
   ========================================================================== */

window.READLINGS_CURRICULUM = {
  meta: {
    name: "Readlings",
    tagline: "Step-by-step reading adventures for early learners",
    version: 1,
    updated: "2026-10-31"
  },

  levels: [
    {
      id: 0,
      category: "Pre-Reader",
      name: "Sunbeam Starters",
      shortName: "Sunbeams",
      color: "#FFB800",
      soft: "#FFF4CC",
      ink: "#6A4300",
      icon: "sun",
      description: "Sound out CVC words with huge type, gentle repetition, and one joyful sentence at a time.",
      focus: ["CVC words", "Short vowels", "Sight words"],
      guidance: "Point beneath each word as you read. Pause after every sentence so your child can join in."
    },
    {
      id: 1,
      category: "Emergent",
      name: "Puddle Jumpers",
      shortName: "Puddle Jumpers",
      color: "#FF6B6B",
      soft: "#FFE7E7",
      ink: "#6D1F1F",
      icon: "leaf",
      description: "Blends, short-vowel word play, and a few friendly sentences to build reading confidence.",
      focus: ["Consonant blends", "Short vowels", "Story sense"],
      guidance: "Take turns reading a sentence. Celebrate sounded-out words, even when they need a second try."
    },
    {
      id: 2,
      category: "Early Reader",
      name: "Moon Readers",
      shortName: "Moon Readers",
      color: "#06B6D4",
      soft: "#DFF9FD",
      ink: "#064C5C",
      icon: "moon",
      description: "Long vowels, silent e, and two short paragraphs per chapter for growing reading stamina.",
      focus: ["Long vowels", "Silent e", "Fluency"],
      guidance: "Ask one wondering question before you read: What might happen next?"
    },
    {
      id: 3,
      category: "Transitional",
      name: "Story Sailors",
      shortName: "Story Sailors",
      color: "#10B981",
      soft: "#DFF8EE",
      ink: "#075744",
      icon: "compass",
      description: "Compound words, lively dialogue, and complete three-chapter mini-books.",
      focus: ["Compound words", "Dialogue", "Expression"],
      guidance: "Try reading the talking parts in different voices. Talk about how each character feels."
    },
    {
      id: 4,
      category: "Chapter Books",
      name: "Starlight Chapters",
      shortName: "Starlight Chapters",
      color: "#8B5CF6",
      soft: "#EEE6FF",
      ink: "#3F2572",
      icon: "book-open",
      description: "Richer vocabulary and four-chapter stories for readers ready to live inside a book.",
      focus: ["Rich vocabulary", "Inference", "Chapter books"],
      guidance: "After a chapter, ask your reader to retell the story in three quick words or pictures."
    }
  ],

  /* ------------------------------------------------------------------------
     Level 0 — Pre-Reader
     --------------------------------------------------------------------- */
  booksAtLevel0: [
    {
      id: "pip-and-the-red-ball",
      level: 0,
      title: "Pip and the Red Ball",
      kicker: "A bouncy little adventure",
      blurb: "Pip’s bright red ball gets a big kick. Can a new pup help bring it home?",
      emoji: "🔴",
      skills: ["short i", "CVC words", "sight words"],
      chapters: [
        {
          id: "the-red-ball",
          title: "The Red Ball",
          summary: "Pip has a big red ball and a very big kick.",
          minutes: 1,
          paragraphs: [
            "Pip has a red ball.",
            "The ball is big.",
            "Pip kicks the ball.",
            "The ball rolls away."
          ]
        },
        {
          id: "look-and-find",
          title: "Look and Find",
          summary: "Where can a rolling red ball hide?",
          minutes: 1,
          paragraphs: [
            "Pip looks in a box.",
            "The ball is not in the box.",
            "Pip looks in a pot.",
            "The ball is not in the pot."
          ]
        },
        {
          id: "a-new-pal",
          title: "A New Pal",
          summary: "Someone small and waggy has found the ball.",
          minutes: 1,
          paragraphs: [
            "A pup has the ball.",
            "The pup wags its tail.",
            "Pip and the pup play.",
            "Pip has fun!"
          ]
        }
      ]
    },
    {
      id: "sams-cat-nap",
      level: 0,
      title: "Sam’s Cat Nap",
      kicker: "A cosy cat tale",
      blurb: "Sam the cat wants a soft spot for a nap. A bouncy bug has other ideas.",
      emoji: "🐱",
      skills: ["short a", "CVC words", "rhythm"],
      chapters: [
        {
          id: "a-soft-spot",
          title: "A Soft Spot",
          summary: "Sam finds the perfect mat for a little rest.",
          minutes: 1,
          paragraphs: [
            "Sam is a cat.",
            "Sam sees a mat.",
            "The mat is soft.",
            "Sam naps on the mat."
          ]
        },
        {
          id: "a-big-bug",
          title: "A Big Bug",
          summary: "A little bug makes Sam’s nap a wiggly one.",
          minutes: 1,
          paragraphs: [
            "A bug hops by.",
            "Sam taps the bug.",
            "The bug hops up.",
            "Sam wants to nap."
          ]
        },
        {
          id: "nap-time",
          title: "Nap Time",
          summary: "A snug box makes the perfect cat bed.",
          minutes: 1,
          paragraphs: [
            "Sam finds a box.",
            "The box is snug.",
            "Sam curls up.",
            "Zzz! Sam naps."
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 1 — Emergent
     --------------------------------------------------------------------- */
  booksAtLevel1: [
    {
      id: "the-mud-puddle-club",
      level: 1,
      title: "The Mud Puddle Club",
      kicker: "Boots on, umbrellas up!",
      blurb: "Tess and Finn start a very muddy club on a very rainy day.",
      emoji: "🥾",
      skills: ["blends", "short vowels", "dialogue"],
      chapters: [
        {
          id: "boots-on",
          title: "Boots On",
          summary: "Rain, red boots, and a plan for puddle patrol.",
          minutes: 2,
          paragraphs: [
            "Rain taps the roof all morning. The garden is wet and green.",
            "Tess and Finn pull on their red boots. It is time for puddle patrol.",
            "They stomp down the path. Splish, splash, splosh!"
          ]
        },
        {
          id: "the-biggest-puddle",
          title: "The Biggest Puddle",
          summary: "The path ends at the biggest, sploshiest puddle of all.",
          minutes: 2,
          paragraphs: [
            "At the end of the path sits the biggest puddle.",
            "Tess jumps in with both feet. Mud splats her socks and Finn laughs.",
            "Finn jumps next. Two muddy friends grin at the mess."
          ]
        },
        {
          id: "the-club-sign",
          title: "The Club Sign",
          summary: "Every good club needs a sign, a little paint, and a snail.",
          minutes: 2,
          paragraphs: [
            "The friends find a flat plank by the shed. Finn finds a pot of green paint.",
            "Tess paints: THE MUD PUDDLE CLUB. Finn adds a wobbly rainbow.",
            "A snail slides over the sign. It leaves a shiny trail right through the club name."
          ]
        }
      ]
    },
    {
      id: "bens-big-dig",
      level: 1,
      title: "Ben’s Big Dig",
      kicker: "A garden mystery",
      blurb: "Ben and Max dig for worms and find something smooth, green, and surprising.",
      emoji: "🪴",
      skills: ["digraphs", "short vowels", "prediction"],
      chapters: [
        {
          id: "a-job-for-ben",
          title: "A Job for Ben",
          summary: "A red spade and a small dog start a big dig.",
          minutes: 2,
          paragraphs: [
            "Ben grabs his red spade. Max, his small dog, grabs a stick.",
            "They dig in the soft garden mud. Max digs faster than Ben.",
            "Clink! Ben’s spade hits something hard."
          ]
        },
        {
          id: "the-green-bottle",
          title: "The Green Bottle",
          summary: "Something shiny is hiding in the mud.",
          minutes: 2,
          paragraphs: [
            "Ben digs with care. A smooth green bottle peeks out of the dirt.",
            "He rinses it with the hose. The glass shines in the sun.",
            "Max sniffs the bottle and sneezes. Achoo!"
          ]
        },
        {
          id: "a-garden-treasure",
          title: "A Garden Treasure",
          summary: "A bottle becomes a tiny home for a garden treasure.",
          minutes: 2,
          paragraphs: [
            "Grandad says the bottle is very old. It once held lemonade for a summer picnic.",
            "Ben plants a daisy inside it. A tiny garden grows in a bottle.",
            "Max digs one more hole. He finds a bone, not a treasure!"
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 2 — Early Reader
     --------------------------------------------------------------------- */
  booksAtLevel2: [
    {
      id: "maya-and-the-moon-garden",
      level: 2,
      title: "Maya and the Moon Garden",
      kicker: "A midnight mystery",
      blurb: "A tiny silver seed grows into a garden that only blooms under the moon.",
      emoji: "🌙",
      skills: ["long vowels", "silent e", "imagery"],
      chapters: [
        {
          id: "the-silver-seed",
          title: "The Silver Seed",
          summary: "A mysterious seed comes with one moonlight instruction.",
          minutes: 3,
          paragraphs: [
            "Maya found a silver seed in her grandma’s garden shed. It was no bigger than a pea, with a tiny note that read: Plant me when the moon is bright.",
            "That night, Maya chose a quiet spot beside the gate. She made a little bed of soil, pressed the seed in, and whispered a secret wish."
          ]
        },
        {
          id: "a-path-of-light",
          title: "A Path of Light",
          summary: "A glowing vine reveals a gate Maya has never seen.",
          minutes: 3,
          paragraphs: [
            "By the next evening, a vine had climbed the garden gate. Its leaves glowed pale green, and its buds looked like tiny white lanterns.",
            "Maya followed the glowing vine past the rose bushes. It wound behind the shed and stopped at a gate she had never seen before."
          ]
        },
        {
          id: "the-moonlight-bloom",
          title: "The Moonlight Bloom",
          summary: "Patience, cocoa, and a whole garden full of light.",
          minutes: 3,
          paragraphs: [
            "When the moon rose high, the buds opened one by one. Each flower shone like a little dish of milk.",
            "Grandma stepped out with two cups of cocoa. “Moonflowers only bloom for patient gardeners,” she said. Maya smiled. She had waited, and the whole garden was glowing."
          ]
        }
      ]
    },
    {
      id: "the-kite-that-grew",
      level: 2,
      title: "The Kite That Grew",
      kicker: "A wish on the wind",
      blurb: "Rosa writes one small wish on her kite’s tail. The wind has a surprising plan.",
      emoji: "🪁",
      skills: ["long vowels", "silent e", "cause & effect"],
      chapters: [
        {
          id: "rosas-wish",
          title: "Rosa’s Wish",
          summary: "Rosa builds a kite and writes a very unusual wish.",
          minutes: 3,
          paragraphs: [
            "Rosa made a kite from pale blue paper and a thin bamboo cane. On its tail she wrote one wish in silver ink: GROW.",
            "Her grandpa smiled. “Kites don’t grow,” he said. Rosa tied the string tight. “This one might,” she replied."
          ]
        },
        {
          id: "a-ride-on-the-wind",
          title: "A Ride on the Wind",
          summary: "The little blue kite dances all the way up to the clouds.",
          minutes: 3,
          paragraphs: [
            "The wind lifted the kite high above the apple trees. It danced past a white cloud and over the sleeping lake.",
            "Rosa let out more string. The tiny kite grew smaller and smaller, until it looked like a blue star in the sky. Then a sudden gust tugged hard."
          ]
        },
        {
          id: "a-garden-of-kites",
          title: "A Garden of Kites",
          summary: "A seed from the sky grows into something extraordinary.",
          minutes: 3,
          paragraphs: [
            "At sunset, the kite floated home with a seed caught in its tail. Rosa planted the seed beside the gate and named it Kite Flower.",
            "By summer, a tall vine bloomed with blue, diamond-shaped flowers. “See?” Rosa told her grandpa. “It grew.” He laughed and hung a tiny kite in the vine."
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 3 — Transitional
     --------------------------------------------------------------------- */
  booksAtLevel3: [
    {
      id: "the-button-boat",
      level: 3,
      title: "The Button Boat",
      kicker: "A rainy-day rescue",
      blurb: "A shoebox, a spoon, and two brave buttons set sail down Gutter River.",
      emoji: "⛵",
      skills: ["compound words", "dialogue", "expression"],
      chapters: [
        {
          id: "a-rainy-day-plan",
          title: "A Rainy Day Plan",
          summary: "Boredom turns into a boat-building adventure upstairs.",
          minutes: 4,
          paragraphs: [
            "“I’m bored,” said Milo, flopping onto the sofa. Raindrops raced down the window.",
            "Gran fetched a shoebox from the bedroom. She handed Milo a wooden spoon and a tin of buttons. “Boredom is just a toolbox waiting for a good idea,” she said.",
            "Together they cut a sail from an old shirt. Milo chose a blue button for the wheel and a silver one for the flag. Gran sewed them on tight."
          ]
        },
        {
          id: "the-gutter-river",
          title: "The Gutter River",
          summary: "The button boat launches into the rushing street.",
          minutes: 4,
          paragraphs: [
            "“Ready for a launch?” asked Milo. Gran opened the front door and the rain swept in.",
            "The little button boat sailed down the street in the rushing gutter. It spun past a boot, bobbed under a bicycle, and raced toward the corner drain.",
            "“Hurry!” cried Milo. “If it reaches the drain, it will disappear!” They dashed after the boat, splashing through every puddle."
          ]
        },
        {
          id: "the-great-rescue",
          title: "The Great Rescue",
          summary: "One umbrella, one quick hook, and a brand-new story.",
          minutes: 4,
          paragraphs: [
            "At the last second, Gran hooked the boat with her umbrella. The tiny mast wobbled, but the button wheel stayed safe.",
            "“You saved it!” Milo cheered. Gran grinned. “Every good captain needs a first mate.”",
            "They carried the boat home and set it on the shelf. Outside the rain kept falling, but Milo had a story to tell and a boat that could sail another day."
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 4 — Chapter Books
     --------------------------------------------------------------------- */
  booksAtLevel4: [
    {
      id: "the-lantern-keepers-map",
      level: 4,
      title: "The Lantern Keeper’s Map",
      kicker: "A luminous island mystery",
      blurb: "Nia has one summer evening to return four lost lights to the bay.",
      emoji: "🏮",
      skills: ["rich vocabulary", "inference", "chapter book"],
      chapters: [
        {
          id: "the-letter-in-the-lighthouse",
          title: "The Letter in the Lighthouse",
          summary: "A silver-inked letter sends Nia into the mist.",
          minutes: 5,
          paragraphs: [
            "On the last evening of summer, eleven-year-old Nia found a letter tucked beneath the lighthouse door. The envelope smelled of salt and cedar, and her name was written in silver ink.",
            "Inside was a map of the bay, its edges soft as cloth. Three islands floated in the painted sea, each marked with a tiny golden lantern. At the bottom, someone had written: Return the lights before the autumn tide.",
            "Nia had polished every lantern in the tower for three summers. She knew each one by heart. But she had never seen these islands, and the map showed a fourth lantern glowing beneath the waves."
          ]
        },
        {
          id: "across-the-whispering-water",
          title: "Across the Whispering Water",
          summary: "A red rowboat, three islands, and a path of returning light.",
          minutes: 5,
          paragraphs: [
            "At dawn, Nia rowed her grandfather’s red boat into the mist. The water whispered against the hull, and gulls followed her like curious neighbors.",
            "The first island appeared at sunrise, no larger than a rowboat. A golden lantern stood in its center, unlit. Nia struck a match; the flame caught, and the island hummed a low, grateful note.",
            "Two more islands waited beyond the reef. With every lantern she lit, the fog grew thinner. By dusk, a path of light stretched across the bay toward home."
          ]
        },
        {
          id: "the-island-of-small-lights",
          title: "The Island of Small Lights",
          summary: "The third island asks Nia to listen instead of search.",
          minutes: 5,
          paragraphs: [
            "The third island was not empty. Hundreds of fireflies drifted among the grasses, blinking in patterns Nia almost understood.",
            "An old woman sat in a rocking chair beside the unlit lantern. “Most people come for treasure,” she said. “You came to give light back.” Nia held out the match; the woman nodded.",
            "“The fourth lantern is beneath the waves,” Nia said. The woman smiled. “Then you must listen, not dive.”"
          ]
        },
        {
          id: "home-by-starlight",
          title: "Home by Starlight",
          summary: "The last light rises, and the lighthouse beam finds its way.",
          minutes: 5,
          paragraphs: [
            "Nia leaned over the side of the boat and listened. Beneath the water, a steady glow pulsed like a heartbeat.",
            "She tapped the lantern three times with the oar. The sea opened in a circle of silver bubbles, and the drowned lantern rose, blazing with pale blue fire. The entire bay shimmered.",
            "When Nia rowed home, the lighthouse beam reached farther than it ever had. Grandfather was waiting on the steps. “You found the last light,” he said. Nia held up the map, now blank. “No,” she said. “I found the way back.”"
          ]
        }
      ]
    }
  ]
};

/* --------------------------------------------------------------------------
   Neaten the working shape used by the app. The curriculum is authored in
   small level-specific groups above so it stays easy to edit; the public
   object gathers each level's books in reading order.
   -------------------------------------------------------------------------- */
window.READLINGS_CURRICULUM.levels.forEach(function (level) {
  var key = "booksAtLevel" + level.id;
  level.books = window.READLINGS_CURRICULUM[key] || [];
  delete window.READLINGS_CURRICULUM[key];
});
