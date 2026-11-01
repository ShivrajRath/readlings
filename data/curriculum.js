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
    },
    {
      id: 5,
      category: "Sight Words",
      name: "Sight Word Stars",
      shortName: "Sight Word Stars",
      color: "#F59E0B",
      soft: "#FEF3C7",
      ink: "#78350F",
      icon: "glasses",
      description: "High-frequency words that appear again and again, taught through short, joyful, repeated sentences.",
      focus: ["Sight words", "High-frequency words", "Fluency"],
      guidance: "Point to each word, say it together, then let your child read it alone. Celebrate instant recognition."
    },
    {
      id: 6,
      category: "Phonics Patterns",
      name: "Pattern Pioneers",
      shortName: "Pattern Pioneers",
      color: "#EC4899",
      soft: "#FCE7F3",
      ink: "#831843",
      icon: "sparkle",
      description: "Common vowel teams and sound patterns (ee, ai, oa and friends) practised inside tiny stories.",
      focus: ["Vowel teams", "ee / ai / oa", "Decoding"],
      guidance: "Stretch the target sound together, then blend the whole word. Hunt for the pattern on every page."
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
    },
    {
      id: "dot-and-the-dog",
      level: 0,
      title: "Dot and the Dog",
      kicker: "A bouncy new friend",
      blurb: "Dot finds a big floppy dog who loves to run, fetch, and wag.",
      emoji: "🐶",
      skills: ["CVC words", "short o", "sight words"],
      chapters: [
        {
          id: "a-new-dog",
          title: "A New Dog",
          summary: "Dot finds a big, floppy friend.",
          minutes: 1,
          paragraphs: [
            "Dot has a dog.",
            "The dog is big.",
            "Dot and the dog run.",
            "The dog has fun!"
          ]
        },
        {
          id: "the-ball",
          title: "The Ball",
          summary: "A game of fetch for two friends.",
          minutes: 1,
          paragraphs: [
            "Dot brings a ball.",
            "The dog sees the ball.",
            "The dog runs for the ball.",
            "The dog gets the ball!"
          ]
        },
        {
          id: "good-dog",
          title: "Good Dog",
          summary: "A silly game with a happy pup.",
          minutes: 1,
          paragraphs: [
            "Dot says sit.",
            "The dog sits.",
            "The dog rolls over.",
            "Dot claps. The dog wags."
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
    },
    {
      id: "wrens-snow-day",
      level: 1,
      title: "Wren's Snow Day",
      kicker: "A chilly friendship",
      blurb: "Wren wakes to a world of snow and builds a frosty friend for the whole valley.",
      emoji: "⛄",
      skills: ["blends", "short vowels", "weather"],
      chapters: [
        {
          id: "the-first-snow",
          title: "The First Snow",
          summary: "Wren wakes to a world turned white.",
          minutes: 2,
          paragraphs: [
            "Wren wakes to snow.",
            "The trees wear white hats.",
            "Wren catches a snowflake.",
            "The snow is soft!"
          ]
        },
        {
          id: "snow-friend",
          title: "Snow Friend",
          summary: "Wren packs a frosty friend out of snow.",
          minutes: 2,
          paragraphs: [
            "Wren packs a ball of snow.",
            "Wren rolls it to the tree.",
            "The snow friend waves.",
            "Wren says hi!"
          ]
        },
        {
          id: "snow-day-play",
          title: "Snow Day Play",
          summary: "Sledding, snowballs, and warm cocoa.",
          minutes: 2,
          paragraphs: [
            "Wren finds a sled.",
            "Wren slides down the hill.",
            "The snow goes swish, swish.",
            "Warm cocoa waits inside."
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
    },
    {
      id: "the-rainbow-bridge",
      level: 2,
      title: "The Rainbow Bridge",
      kicker: "A bridge of colours",
      blurb: "Ana and Bea build a bridge from every colour they can find — and cross it together.",
      emoji: "🌈",
      skills: ["long vowels", "silent e", "colour words"],
      chapters: [
        {
          id: "the-rainbow",
          title: "The Rainbow",
          summary: "A bridge needs a hundred colours.",
          minutes: 3,
          paragraphs: [
            "Ana and Bea found a box of crayons.",
            "The box was full of colours.",
            "Ana drew a red road.",
            "Bea drew a blue sky."
          ]
        },
        {
          id: "the-bridge",
          title: "The Bridge",
          summary: "They build a bridge over the stream.",
          minutes: 3,
          paragraphs: [
            "The stream goes splash, splash.",
            "Ana and Bea build a bridge.",
            "The red planks go on.",
            "The blue planks go on."
          ]
        },
        {
          id: "the-big-walk",
          title: "The Big Walk",
          summary: "They cross and cheer for every colour.",
          minutes: 3,
          paragraphs: [
            "One, two, three — cross!",
            "They walk over the bridge.",
            "Red, blue, green — they made it!",
            "The stream goes splish, splash."
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
    },
    {
      id: "the-backyard-rocket",
      level: 3,
      title: "The Backyard Rocket",
      kicker: "A launch from the lawn",
      blurb: "Two neighbours build a rocket and count down to a very backyard adventure.",
      emoji: "🚀",
      skills: ["compound words", "dialogue", "expression"],
      chapters: [
        {
          id: "the-backyard-plan",
          title: "The Backyard Plan",
          summary: "Blueprints, tape, and a very important countdown.",
          minutes: 4,
          paragraphs: [
            "“I’m building a rocket,” said Sam.",
            "“From what?” asked Jo.",
            "“From the backyard,” said Sam. “It’s the biggest launch pad in town.”",
            "They taped cardboard fins to a big box."
          ]
        },
        {
          id: "the-launch",
          title: "The Launch",
          summary: "Three, two, one — blast off into the bushes.",
          minutes: 4,
          paragraphs: [
            "“Ready?” said Jo.",
            "“Ready,” said Sam.",
            "They counted together. “Three, two, one, blast off!”",
            "The rocket lifted off — straight into the bushes."
          ]
        },
        {
          id: "the-real-launch",
          title: "The Real Launch",
          summary: "A cardboard rocket still deserves the biggest countdown ever.",
          minutes: 4,
          paragraphs: [
            "“Okay, real launch,” said Sam. “Three, two, one.”",
            "Jo held the box tight. The rocket rose over the sandbox.",
            "“We did it!” they shouted. The backyard cheered in cardboard."
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
    },
    {
      id: "the-paper-kingdom",
      level: 4,
      title: "The Paper Kingdom",
      kicker: "A kingdom of folded things",
      blurb: "When the river that fed the kingdom runs dry, the smallest citizens learn to fold a new world.",
      emoji: "📜",
      skills: ["rich vocabulary", "inference", "chapter book"],
      chapters: [
        {
          id: "the-paper-kingdom",
          title: "The Paper Kingdom",
          summary: "The kingdom is built from folded paper.",
          minutes: 5,
          paragraphs: [
            "The kingdom of Lumen was built from folded paper.",
            "Every tower began as a single square.",
            "The queen folded the first roof herself. The people called it the Paper Kingdom, though the wind often called it a rumour."
          ]
        },
        {
          id: "the-rising-river",
          title: "The Rising River",
          summary: "The river that fed the kingdom begins to fade.",
          minutes: 5,
          paragraphs: [
            "The river that watered Lumen slowed to a whisper.",
            "The gardens curled brown at the edges, and the millers grumbled about the drought."
          ]
        },
        {
          id: "the-fold",
          title: "The Fold",
          summary: "The kingdom learns to make water from memory.",
          minutes: 5,
          paragraphs: [
            "The oldest mapmaker folded a valley of blue paper and set it beside the hollow hills.",
            "The river returned, quiet as a held breath, and the fields drank."
          ]
        },
        {
          id: "the-new-kingdom",
          title: "The New Kingdom",
          summary: "A kingdom rebuilt, one fold at a time.",
          minutes: 5,
          paragraphs: [
            "They folded new rivers, new fields, new homes.",
            "And the smallest paper citizen folded a door just big enough for a story."
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 5 — Sight Words
     --------------------------------------------------------------------- */
  booksAtLevel5: [
    {
      id: "sam-and-the-big-red-box",
      level: 5,
      title: "Sam and the Big Red Box",
      kicker: "Sight words in a cosy box",
      blurb: "Sam finds a big red box. What is inside? Read along and spot the words we see every day.",
      emoji: "📦",
      skills: ["sight words", "high-frequency words", "repetition"],
      chapters: [
        {
          id: "the-big-box",
          title: "The Big Box",
          summary: "Sam has a big red box and a very good look inside.",
          minutes: 1,
          paragraphs: [
            "Sam has a big red box.",
            "The box is in the room.",
            "Sam can see the box.",
            "What is in the box?"
          ]
        },
        {
          id: "what-is-inside",
          title: "What Is Inside?",
          summary: "A toy car makes Sam smile.",
          minutes: 1,
          paragraphs: [
            "Sam opens the box.",
            "A toy is in the box.",
            "The toy is a car.",
            "Sam and the car go vroom."
          ]
        },
        {
          id: "play-time",
          title: "Play Time",
          summary: "Sam and a friend play all day.",
          minutes: 1,
          paragraphs: [
            "Sam and I play.",
            "We play all day.",
            "The car goes up and down.",
            "Sam has fun!"
          ]
        }
      ]
    },
    {
      id: "we-go-to-the-park",
      level: 5,
      title: "We Go to the Park",
      kicker: "A day of play",
      blurb: "We run, jump, and play. Every page is full of the words we meet most often.",
      emoji: "🌳",
      skills: ["sight words", "repetition", "confidence"],
      chapters: [
        {
          id: "ready-to-go",
          title: "Ready to Go",
          summary: "A sunny day and a walk to the park.",
          minutes: 1,
          paragraphs: [
            "We go to the park.",
            "It is a sunny day.",
            "I can see the trees.",
            "The trees are big."
          ]
        },
        {
          id: "play-and-play",
          title: "Play and Play",
          summary: "Running, jumping, and a blue ball.",
          minutes: 1,
          paragraphs: [
            "We run and jump.",
            "We play with a ball.",
            "The ball is blue.",
            "I like to play."
          ]
        },
        {
          id: "home-again",
          title: "Home Again",
          summary: "A tired, happy walk home.",
          minutes: 1,
          paragraphs: [
            "We go home.",
            "I am tired.",
            "I had fun.",
            "See you again!"
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     Level 6 — Common Patterns (ee, ai, oa, …)
     --------------------------------------------------------------------- */
  booksAtLevel6: [
    {
      id: "the-green-tree-and-the-bee",
      level: 6,
      title: "The Green Tree and the Bee",
      kicker: "The ee sound sings",
      blurb: "See the green tree, the deep sea, and a sleepy bee. Every page hums with the ee sound.",
      emoji: "🐝",
      skills: ["ee", "long e", "vowel teams"],
      chapters: [
        {
          id: "the-green-tree",
          title: "The Green Tree",
          summary: "A bee sits in a green tree.",
          minutes: 1,
          paragraphs: [
            "See the green tree.",
            "A bee is in the tree.",
            "The bee can see me.",
            "I see the bee."
          ]
        },
        {
          id: "the-deep-sea",
          title: "The Deep Sea",
          summary: "A free fish in the deep green sea.",
          minutes: 1,
          paragraphs: [
            "The bee and I go to the sea.",
            "The sea is deep and green.",
            "We see a fish.",
            "The fish is free."
          ]
        },
        {
          id: "sleepy-bee",
          title: "Sleepy Bee",
          summary: "The bee sleeps in the tree.",
          minutes: 1,
          paragraphs: [
            "The bee is sleepy.",
            "It sleeps in the tree.",
            "I see it sleep.",
            "Good night, bee."
          ]
        }
      ]
    },
    {
      id: "rain-snail-and-goat",
      level: 6,
      title: "Rain, Snail and Goat",
      kicker: "ai and oa in action",
      blurb: "Rain on the trail, a snail on the rail, a boat and a goat. ai and oa shine on every page.",
      emoji: "🐌",
      skills: ["ai", "oa", "vowel teams"],
      chapters: [
        {
          id: "rain-on-the-trail",
          title: "Rain on the Trail",
          summary: "Rain falls on a snail on the rail.",
          minutes: 1,
          paragraphs: [
            "The rain falls on the trail.",
            "A snail is on the rail.",
            "The rain is on the snail.",
            "The snail has a tail."
          ]
        },
        {
          id: "the-boat-and-the-goat",
          title: "The Boat and the Goat",
          summary: "A goat rides a boat in a coat.",
          minutes: 1,
          paragraphs: [
            "A boat floats on the lake.",
            "A goat rides in the boat.",
            "The goat wears a coat.",
            "The boat is in the moat."
          ]
        },
        {
          id: "all-day-play",
          title: "All Day Play",
          summary: "A bright day of play for all.",
          minutes: 1,
          paragraphs: [
            "The day is bright.",
            "The rain goes away.",
            "The snail and the goat play.",
            "We see them all day."
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
