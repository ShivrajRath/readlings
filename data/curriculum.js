/* ==========================================================================
   Readlings — Curriculum data
   --------------------------------------------------------------------------
   A plain JavaScript object so the site stays 100% static and GitHub Pages
   friendly. Add a new level/book/chapter by following the shapes below.

   Level:
     id, category, name, color, soft, ink, icon, description, focus, guidance

   Book:
     id, title, kicker, blurb, emoji, skills, chapters[]
     (optional featured: true to show the book on the homepage)

   Chapter:
     id, title, summary, minutes, paragraphs[]
   ========================================================================== */

window.READLINGS_CURRICULUM = {
  meta: {
    name: "Readlings",
    tagline: "Step-by-step reading adventures for early learners",
    version: 3,
    updated: "2026-11-11"
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
      featured: true,
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
    },
    {
      id: "tam-and-the-jam",
      level: 0,
      title: "Tam and the Jam",
      kicker: "A sticky little tale",
      blurb: "Tam finds a pot of sweet red jam. One big dip turns into a happy, sticky mess.",
      emoji: "🍓",
      skills: ["short a", "CVC words", "sight words"],
      chapters: [
        {
          id: "the-jam-pot",
          title: "The Jam Pot",
          summary: "Tam finds a pot of sweet red jam.",
          minutes: 1,
          paragraphs: [
            "Tam has a pot.",
            "The pot has jam.",
            "The jam is red.",
            "Tam dips a bun."
          ]
        },
        {
          id: "a-sticky-mess",
          title: "A Sticky Mess",
          summary: "One big dip sends jam everywhere.",
          minutes: 1,
          paragraphs: [
            "Tam dips and dips.",
            "The jam tips out.",
            "Jam lands on the cat.",
            "The cat licks its paw."
          ]
        },
        {
          id: "a-nap-for-two",
          title: "A Nap for Two",
          summary: "A sticky cat, a clean rag, and a cosy nap.",
          minutes: 1,
          paragraphs: [
            "Tam gets a rag.",
            "Tam wipes the cat.",
            "The cat licks the rag.",
            "Tam and the cat nap."
          ]
        }
      ]
    },
    {
      id: "bens-red-pen",
      level: 0,
      title: "Ben’s Red Pen",
      kicker: "A drawing adventure",
      blurb: "Ben draws with a red pen. A real hen wants to join the fun.",
      emoji: "🖊️",
      skills: ["short e", "CVC words", "rhythm"],
      chapters: [
        {
          id: "a-red-pen",
          title: "A Red Pen",
          summary: "Ben has a red pen and a big idea.",
          minutes: 1,
          paragraphs: [
            "Ben has a red pen.",
            "Ben draws a hen.",
            "The hen is red.",
            "Ben grins."
          ]
        },
        {
          id: "ten-red-dots",
          title: "Ten Red Dots",
          summary: "Ten little dots make the page bright.",
          minutes: 1,
          paragraphs: [
            "Ben draws ten dots.",
            "The dots are red.",
            "Ben draws a jet.",
            "The jet has ten dots."
          ]
        },
        {
          id: "the-hen-helps",
          title: "The Hen Helps",
          summary: "A real hen adds the best red dot of all.",
          minutes: 1,
          paragraphs: [
            "A hen hops in.",
            "The hen sees the pen.",
            "The hen pecks the pen.",
            "Ben gets a red dot!"
          ]
        }
      ]
    },
    {
      id: "the-hot-pot",
      level: 0,
      title: "The Hot Pot",
      kicker: "Soup, steam, and a careful cook",
      blurb: "Mum’s pot is hot. Dot wants to help, but soup can splash.",
      emoji: "🍲",
      skills: ["short o", "CVC words", "safety"],
      chapters: [
        {
          id: "the-hot-pot",
          title: "The Hot Pot",
          summary: "A red pot sits on the hob.",
          minutes: 1,
          paragraphs: [
            "Mum has a hot pot.",
            "The pot is red.",
            "The pot has a lid.",
            "The lid is hot."
          ]
        },
        {
          id: "stir-and-sniff",
          title: "Stir and Sniff",
          summary: "Dot stirs the pot and takes a big sniff.",
          minutes: 1,
          paragraphs: [
            "Mum stirs the pot.",
            "Dot stirs it too.",
            "Sniff, sniff!",
            "The pot smells good."
          ]
        },
        {
          id: "mop-the-top",
          title: "Mop the Top",
          summary: "A drip on the hob means two helpers with mops.",
          minutes: 1,
          paragraphs: [
            "Soup drips on the top.",
            "Mum gets a mop.",
            "Mum mops the top.",
            "Dot gets a mop too."
          ]
        },
        {
          id: "a-hot-bun",
          title: "A Hot Bun",
          summary: "A bun, a dip, and a happy Dot.",
          minutes: 1,
          paragraphs: [
            "Mum fills a bun.",
            "Dot gets one too.",
            "Dot dips the bun.",
            "Dip, dip, dip!"
          ]
        }
      ]
    },
    {
      id: "nat-and-the-big-pig",
      level: 0,
      title: "Nat and the Big Pig",
      kicker: "A muddy little friend",
      blurb: "Nat meets a big pig with a muddy snout and a very happy oink.",
      emoji: "🐷",
      skills: ["short a", "short i", "CVC words"],
      chapters: [
        {
          id: "a-big-pig",
          title: "A Big Pig",
          summary: "A big pig sits in the mud.",
          minutes: 1,
          paragraphs: [
            "Nat sees a pig.",
            "The pig is big.",
            "The pig is in the mud.",
            "Nat grins at the pig."
          ]
        },
        {
          id: "mud-on-the-hat",
          title: "Mud on the Hat",
          summary: "One happy kick sends mud flying.",
          minutes: 1,
          paragraphs: [
            "The pig kicks mud.",
            "Mud lands on Nat.",
            "Mud is on his hat.",
            "“Oh no!” says Nat."
          ]
        },
        {
          id: "a-dip-for-nat",
          title: "A Dip for Nat",
          summary: "Nat joins the pig in the soft, squishy mud.",
          minutes: 1,
          paragraphs: [
            "Nat sits in the mud.",
            "The mud is soft.",
            "The pig oinks at Nat.",
            "Nat and the pig dig."
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
      featured: true,
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
    },
    {
      id: "the-snack-shack",
      level: 1,
      title: "The Snack Shack",
      kicker: "A little stand with a big line",
      blurb: "Mia and Sal open a snack shack. When the buns go missing, a small customer has a clue.",
      emoji: "🧃",
      skills: ["blends", "short vowels", "story sense"],
      chapters: [
        {
          id: "the-snack-shack",
          title: "The Snack Shack",
          summary: "Mia and Sal set up a stand at the end of the lane.",
          minutes: 2,
          paragraphs: [
            "Mia and Sal set up a snack shack at the end of the lane. They stack buns, jam, and crisp red apples on a small table.",
            "Sal paints a sign: SNACKS! Mia finds a tin for the coins. The first customer is already waiting.",
            "“What will you have?” asks Mia. The customer points at the buns and grins."
          ]
        },
        {
          id: "the-missing-buns",
          title: "The Missing Buns",
          summary: "A trail of crumbs leads away from the stall.",
          minutes: 2,
          paragraphs: [
            "Mia turns to fetch the jam. When she looks back, the bun basket is empty.",
            "“Did you eat them?” asks Sal. Mia shakes her head. They hunt under the table and behind the sign.",
            "A trail of crumbs leads past the gate. At the end of the trail sits a small brown dog with a very full tum."
          ]
        },
        {
          id: "open-for-business",
          title: "Open for Business",
          summary: "The thief becomes the shack’s best customer.",
          minutes: 2,
          paragraphs: [
            "The little dog belongs to the neighbour. She laughs and pays for two buns.",
            "Mia and Sal make a new sign: ONE BUN FOR THE DOG. Soon there is a line at the shack.",
            "By noon, the tin is full of coins and the dog has a bun of his own. “Best snack shack ever,” says Sal."
          ]
        }
      ]
    },
    {
      id: "the-lost-sock",
      level: 1,
      title: "The Lost Sock",
      kicker: "A match-day mystery",
      blurb: "Ash needs his lucky sock before the big match. A smelly search turns up a bumpy surprise.",
      emoji: "🧦",
      skills: ["digraphs", "blends", "story sense"],
      chapters: [
        {
          id: "sock-hunt",
          title: "Sock Hunt",
          summary: "Ash has one boot, one sock, and a match to reach.",
          minutes: 2,
          paragraphs: [
            "Ash is ready for the soccer match. He has his boots, his shorts, and one red sock.",
            "The other sock is missing. “We have to find it!” says Ash. He hops on one foot and checks the clock.",
            "Mum joins the hunt. They look in the wash basket and under the bed."
          ]
        },
        {
          id: "under-the-bed",
          title: "Under the Bed",
          summary: "A ball, a book, and a brush — but no sock.",
          minutes: 2,
          paragraphs: [
            "Under the bed, Ash finds a ball, a book, and a brush. No sock.",
            "They check the bag by the door. They check the box of toys. Still no sock.",
            "“Try the dog’s bed,” says Mum. Ash peeks inside and spots something red."
          ]
        },
        {
          id: "the-sock-in-the-bed",
          title: "The Sock in the Bed",
          summary: "A sleepy pup has made a nest of the lucky sock.",
          minutes: 2,
          paragraphs: [
            "The missing sock is curled up in the dog’s bed. A sleepy pup is chewing the toe.",
            "“That is my lucky sock!” Ash laughs. The toe has a small hole, but he pulls it on.",
            "Ash scores a goal with his lucky sock, and one very happy dog watches from the side."
          ]
        }
      ]
    },
    {
      id: "the-backyard-boat",
      level: 1,
      title: "The Backyard Boat",
      kicker: "Setting sail on a rainy day",
      blurb: "A big box, a broom, and a rainy garden make the perfect voyage.",
      emoji: "⛵",
      skills: ["blends", "short vowels", "dialogue"],
      chapters: [
        {
          id: "a-box-and-a-plan",
          title: "A Box and a Plan",
          summary: "Jade and Leo find the perfect boat in the shed.",
          minutes: 2,
          paragraphs: [
            "Jade and Leo find a big box in the shed. It is just right for a boat.",
            "They tape a broom to the box for a mast. Leo adds a paper sail with a bright red stripe.",
            "“Ready, captain?” asks Jade. Leo grins. “Ready when the rain comes.”"
          ]
        },
        {
          id: "the-rainy-river",
          title: "The Rainy River",
          summary: "The garden path becomes a rushing river.",
          minutes: 2,
          paragraphs: [
            "The rain comes after lunch. Water rushes down the garden path and past the shed.",
            "Jade and Leo set the boat in the stream. The box bobs and spins.",
            "“Hold on tight!” shouts Leo. They race along the path after the little boat."
          ]
        },
        {
          id: "the-leaky-boat",
          title: "The Leaky Boat",
          summary: "A soggy box starts to sink.",
          minutes: 2,
          paragraphs: [
            "The boat drifts toward the fence. Water starts to seep through the soggy box.",
            "“It is sinking!” cries Jade. Leo grabs a flat stone and plugs the gap.",
            "The patch holds. The boat wobbles on, but it is losing speed."
          ]
        },
        {
          id: "a-safe-harbour",
          title: "A Safe Harbour",
          summary: "One quick hook saves the voyage.",
          minutes: 2,
          paragraphs: [
            "The boat stops by the garden gate. Jade hooks it with a stick before it can slip under.",
            "They carry the soggy box back to the shed and set it by the wall to dry.",
            "“We will fix it tomorrow,” says Leo. Jade nods. “A good captain always dries the boat first.”"
          ]
        }
      ]
    },
    {
      id: "the-kite-in-the-tree",
      level: 1,
      title: "The Kite in the Tree",
      kicker: "A windy rescue",
      blurb: "Kit’s new kite soars high, until a gust sends it into the tallest tree in the park.",
      emoji: "🪁",
      skills: ["blends", "short vowels", "story sense"],
      chapters: [
        {
          id: "a-kite-for-kit",
          title: "A Kite for Kit",
          summary: "A flat box hides a bright red kite.",
          minutes: 2,
          paragraphs: [
            "Kit finds a flat box by the shed. Inside is a red kite with a long ribbon tail.",
            "She runs to the hill with her dog, Pip. The wind is fresh and strong.",
            "Kit holds the string tight and lets the kite go."
          ]
        },
        {
          id: "up-up-away",
          title: "Up, Up, Away",
          summary: "A gust lifts the kite high above the grass.",
          minutes: 2,
          paragraphs: [
            "A gust of wind grabs the kite and lifts it high. It dips and spins above the trees.",
            "Kit runs across the grass and lets out more string. Pip barks and races beside her.",
            "Then the wind stops. The kite drops toward the park."
          ]
        },
        {
          id: "stuck-in-the-tree",
          title: "Stuck in the Tree",
          summary: "A tall oak catches the kite, and Dad brings a long stick.",
          minutes: 2,
          paragraphs: [
            "The kite lands in the top of a tall oak. Kit can see its red tail waving.",
            "Dad brings a long stick and hooks the string. He pulls, and the kite slips free.",
            "Kit runs back up the hill and sails it again. This time, she keeps it close."
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
      featured: true,
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
    },
    {
      id: "june-and-the-blue-flute",
      level: 2,
      title: "June and the Blue Flute",
      kicker: "A lake-light melody",
      blurb: "A dusty blue flute in the attic carries one small request: play me by the lake at sunset.",
      emoji: "🎶",
      skills: ["long vowels", "silent e", "imagery"],
      chapters: [
        {
          id: "the-flute-in-the-attic",
          title: "The Flute in the Attic",
          summary: "A slim blue flute hides a folded note.",
          minutes: 3,
          paragraphs: [
            "June found a slim blue flute in a dusty attic case. A folded note inside said: Play me by the lake at sunset.",
            "She polished the silver keys until they shone. At dinner she told no one about the flute. She tucked it under her coat and waited for the sun to slide low."
          ]
        },
        {
          id: "a-tune-for-the-lake",
          title: "A Tune for the Lake",
          summary: "The notes rise like pale fireflies over the water.",
          minutes: 3,
          paragraphs: [
            "June sat on a smooth flat stone and played a slow tune. The notes rose over the lake like pale fireflies.",
            "The water rippled, and a silver fish rose to listen. It hummed back in a voice like glass. June played again, and the whole lake seemed to hold its breath."
          ]
        },
        {
          id: "the-moonlight-song",
          title: "The Moonlight Song",
          summary: "A path of light opens across the water.",
          minutes: 3,
          paragraphs: [
            "The moon climbed above the pines, and the lake turned bright as a mirror. June played one last note, and a path of light opened across the water.",
            "The fish sang until the sky grew pale. June walked home with the flute warm in her pocket. Every evening after that, she played by the lake."
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
      featured: true,
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
    },
    {
      id: "the-treehouse-team",
      level: 3,
      title: "The Treehouse Team",
      kicker: "A backyard build",
      blurb: "A pile of old planks and a toolbox become the best treehouse in the neighbourhood.",
      emoji: "🌳",
      featured: true,
      skills: ["compound words", "dialogue", "teamwork"],
      chapters: [
        {
          id: "the-backyard-plan",
          title: "The Backyard Plan",
          summary: "Milo and Ruby draw a plan on the back of a cereal box.",
          minutes: 4,
          paragraphs: [
            "“We could build a treehouse,” said Milo. He pointed at the old oak in the backyard. Ruby looked at the pile of planks behind the shed.",
            "“Do we have a toolbox?” asked Ruby. Milo lifted a tin box and rattled it. “Hammer, nails, and one very bent screwdriver,” he said.",
            "“Then we have everything we need,” said Ruby. They drew a plan on the back of a cereal box and taped it to the trunk."
          ]
        },
        {
          id: "up-in-the-branches",
          title: "Up in the Branches",
          summary: "Planks, wind, and a little help from Gran.",
          minutes: 4,
          paragraphs: [
            "Ruby held the ladder while Milo climbed. They passed planks up one by one and nailed them across the strongest branches.",
            "“Hold that corner!” called Milo. The wind took the plank and wobbled it. Ruby caught it just in time.",
            "Gran came out with lemonade and a longer ladder. “A good treehouse needs three builders,” she said. They raised the last wall together."
          ]
        },
        {
          id: "supper-in-the-treetops",
          title: "Supper in the Treetops",
          summary: "A picnic under the fireflies, with one job left for tomorrow.",
          minutes: 4,
          paragraphs: [
            "At sunset, the treehouse had a floor, three walls, and a roof that nearly fit. They carried up a picnic blanket and a basket of buns.",
            "“Best treehouse ever,” said Ruby. Milo looked at the wobbly rail. “It still needs a door,” he said.",
            "Fireflies blinked in the branches as they ate. Below them, the kitchen light glowed. “Tomorrow,” said Gran, “we build the door.”"
          ]
        }
      ]
    },
    {
      id: "the-midnight-market",
      level: 3,
      title: "The Midnight Market",
      kicker: "A moonlit treasure trade",
      blurb: "Milo and Aunt Bea follow a trail of lanterns to a market that only opens after dark.",
      emoji: "🏮",
      skills: ["compound words", "dialogue", "expression"],
      chapters: [
        {
          id: "the-lantern-trail",
          title: "The Lantern Trail",
          summary: "A trail of tiny lanterns leads past the garden gate.",
          minutes: 4,
          paragraphs: [
            "Milo could not sleep. A trail of tiny lanterns glowed across the backyard.",
            "“Aunt Bea,” he whispered, “the garden is full of lights.” Aunt Bea pulled on her coat. “Then we had better follow them,” she said. “Moonlight markets do not wait.”",
            "They followed the lanterns past the gatepost and down a winding footpath. At the end stood a wooden stall stacked with paper stars."
          ]
        },
        {
          id: "the-paper-star",
          title: "The Paper Star",
          summary: "The stallkeeper asks for something Milo no longer needs.",
          minutes: 4,
          paragraphs: [
            "The stallkeeper had a wide smile and a telescope. “One paper star,” she said, “for something you no longer need.”",
            "Milo dug in his pocket. He found a smooth blue marble, a bottle cap, and a stub of chalk. “The marble,” he said. “I have outgrown it.”",
            "The stallkeeper nodded and handed him a folded paper star. “Keep it dry,” she said, “and it will light your way home.”"
          ]
        },
        {
          id: "home-before-sunrise",
          title: "Home Before Sunrise",
          summary: "A paper star guides two night travellers home.",
          minutes: 4,
          paragraphs: [
            "The star glowed brighter with every step. Milo and Aunt Bea hurried past the sleeping houses and through the back gate.",
            "At sunrise, the star folded itself into a tiny paper boat. Milo set it on the windowsill, where it caught the light.",
            "“Same time next month?” asked Aunt Bea. Milo grinned. “Only if we bring more marbles.”"
          ]
        }
      ]
    },
    {
      id: "the-garden-detective",
      level: 3,
      title: "The Garden Detective",
      kicker: "A berry mystery",
      blurb: "Ruby’s strawberries keep disappearing, so she sets a trap and finds a feathery thief.",
      emoji: "🍓",
      skills: ["compound words", "dialogue", "story sense"],
      chapters: [
        {
          id: "something-is-missing",
          title: "Something Is Missing",
          summary: "Three berries vanish, then five more.",
          minutes: 4,
          paragraphs: [
            "Ruby checked the strawberry patch every morning. On Monday, three berries were gone. On Tuesday, five more had vanished.",
            "“A snail?” asked Dad. Ruby shook her head. “Snails do not leave feathers.”",
            "She found a black feather beside the watering can. “A garden detective needs a notebook,” she said, and she began to write down every clue."
          ]
        },
        {
          id: "the-strawberry-trap",
          title: "The Strawberry Trap",
          summary: "A scarecrow with shiny spoons keeps watch.",
          minutes: 4,
          paragraphs: [
            "Ruby built a scarecrow from a broomstick and Dad’s old shirt. She tied a shiny spoon to each sleeve.",
            "That evening, she hid behind the shed and waited. The sky turned pink, then purple, then dark.",
            "A rustle came from the hedge. A blackbird hopped onto the scarecrow’s hat, then dropped down beside the berries."
          ]
        },
        {
          id: "a-fair-trade",
          title: "A Fair Trade",
          summary: "Ruby decides a hungry thief deserves a snack of his own.",
          minutes: 4,
          paragraphs: [
            "Ruby jumped up. “Caught you!” The blackbird flew to the fence and squawked.",
            "Dad laughed. “He has been eating well.” Ruby looked at the half-eaten berry in the bird’s beak. “Maybe he is hungry,” she said.",
            "They built a small berry basket on the fence post. The next morning, the strawberries were safe, and the blackbird was singing."
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
    },
    {
      id: "the-museum-of-lost-sounds",
      level: 4,
      title: "The Museum of Lost Sounds",
      kicker: "A house of borrowed voices",
      blurb: "Elio finds a brass key that opens a museum where forgotten sounds are kept in glass jars.",
      emoji: "🔑",
      featured: true,
      skills: ["rich vocabulary", "inference", "chapter book"],
      chapters: [
        {
          id: "the-key-in-the-dust",
          title: "The Key in the Dust",
          summary: "A warm brass key waits in a shoebox of buttons.",
          minutes: 5,
          paragraphs: [
            "Elio found the key in a shoebox of buttons and bottle caps. It was brass and warm, as if someone had just put it down, and its tag read: Sounds, Lost & Found.",
            "His grandmother said the box had been in the attic for years. She did not look at the key when she said it. Elio slipped it into his pocket and climbed the narrow stairs after supper.",
            "At the back of the attic, behind a curtain of cobwebs, he found a door with a small brass lock. The key turned without a sound."
          ]
        },
        {
          id: "the-quiet-hall",
          title: "The Quiet Hall",
          summary: "Glass jars line the hall, each holding a shimmer of sound.",
          minutes: 5,
          paragraphs: [
            "Beyond the door stretched a long hall of glass jars. Each jar held a faint shimmer: a kettle whistling, a bicycle bell, a baby’s first laugh. Labels were written in careful ink.",
            "Elio lifted one jar and heard his own name, spoken by a voice he could not place. He set it down quickly. The shelves went on and on, and every jar seemed to be waiting.",
            "At the far end, a woman in a grey coat sat at a desk. “Visitors bring back what was lost,” she said. “But lately, the sounds have been fading.”"
          ]
        },
        {
          id: "the-empty-jar",
          title: "The Empty Jar",
          summary: "One jar is dark, and its label reads: The sound of home.",
          minutes: 5,
          paragraphs: [
            "The woman led Elio to a shelf where the jars were dim as old lamps. One jar was completely dark. Its label read: The sound of home.",
            "“No one has found that one,” she said. “Most people look in places. Home is not a place you can point to.”",
            "Elio thought of his grandmother’s kitchen, the radio humming, the back door clicking shut. He thought of the way she said his name when she was glad to see him."
          ]
        },
        {
          id: "a-sound-for-the-shelf",
          title: "A Sound for the Shelf",
          summary: "A hum fills the dark jar and lights the whole shelf.",
          minutes: 5,
          paragraphs: [
            "Elio ran home and found his grandmother at the kitchen table. “Hum the song you used to sing,” he said. She laughed, then hummed it softly, and the room seemed to grow warmer.",
            "Back in the museum, he opened the dark jar and let the hum drift inside. Light spread across the shelf like sunrise. The grey-coated woman smiled for the first time.",
            "“You found it,” she said. Elio looked at the key in his hand. “It was never lost,” he said. “I just had to bring it back.”"
          ]
        }
      ]
    },
    {
      id: "the-map-that-wouldnt-stay-still",
      level: 4,
      title: "The Map That Wouldn’t Stay Still",
      kicker: "A town that moves at dusk",
      blurb: "Every evening, the streets on Iris’s map rearrange themselves. The town is trying to tell her something.",
      emoji: "🗺️",
      skills: ["rich vocabulary", "inference", "chapter book"],
      chapters: [
        {
          id: "the-unruly-map",
          title: "The Unruly Map",
          summary: "A lane curls on its own and points toward the river.",
          minutes: 5,
          paragraphs: [
            "Iris inherited the map from her grandfather, along with his brass compass and a warning: Never trust the streets after sunset.",
            "The map showed the town of Bellwether in careful ink. On the first evening, a lane curled like a question mark and pointed toward the river.",
            "By morning it was straight again. Iris told herself she had imagined it."
          ]
        },
        {
          id: "a-street-without-a-name",
          title: "A Street Without a Name",
          summary: "A new street leads from the bakery to the clock tower.",
          minutes: 5,
          paragraphs: [
            "On the second evening, the map grew a street that did not exist. It began at the bakery and ended at the old clock tower.",
            "Iris followed it at dusk. The bakery was closed, but a warm light burned in the tower window.",
            "She climbed the spiral stairs. At the top sat her grandfather’s empty chair, still turned toward the town."
          ]
        },
        {
          id: "the-clockmakers-riddle",
          title: "The Clockmaker’s Riddle",
          summary: "A note explains why Bellwether will not sit still.",
          minutes: 5,
          paragraphs: [
            "A note lay on the chair: The town moves because someone forgot to wind the clock.",
            "Iris found the clock mechanism behind a loose panel. One gear was missing, and the hands had stopped at a quarter past seven.",
            "She searched her pockets and found the brass compass. Its back plate was held by three tiny screws. Inside lay a small brass gear, wrapped in a scrap of paper that read: For the clock."
          ]
        },
        {
          id: "a-town-held-still",
          title: "A Town Held Still",
          summary: "Iris winds the clock and the streets settle home.",
          minutes: 5,
          paragraphs: [
            "Iris wound the clock with trembling hands. Below her, the streets settled into their proper places, one by one.",
            "The map in her pocket grew warm. When she unfolded it, a new line had appeared: You found the way.",
            "She walked home beneath steady lamps. Bellwether was still, but Iris no longer felt lost."
          ]
        }
      ]
    },
    {
      id: "the-orchard-at-the-edge-of-winter",
      level: 4,
      title: "The Orchard at the Edge of Winter",
      kicker: "A frost, a promise, and a garden",
      blurb: "When an early frost threatens Grandma’s orchard, Tomas must find a way to keep the blossoms warm.",
      emoji: "🍎",
      skills: ["rich vocabulary", "inference", "chapter book"],
      chapters: [
        {
          id: "the-first-frost",
          title: "The First Frost",
          summary: "Pale blossoms curl as a hard frost approaches.",
          minutes: 5,
          paragraphs: [
            "Tomas spent every spring at Grandma’s orchard. The trees stood in long, orderly rows, and the air smelled of blossoms and rain.",
            "One morning, the grass sparkled with frost. The apple trees had opened their flowers early, and the pale petals were already curling at the edges.",
            "Grandma studied the sky. “A hard frost is coming,” she said. “If it takes the blossoms, there will be no apples this autumn.”"
          ]
        },
        {
          id: "a-blanket-for-the-trees",
          title: "A Blanket for the Trees",
          summary: "Every sheet in the house becomes a coat for the smallest trees.",
          minutes: 5,
          paragraphs: [
            "Tomas and Grandma gathered every sheet and blanket in the house. They wrapped the smallest trees like sleepy children.",
            "The wind pulled the corners loose. Tomas tied them with twine while Grandma hauled the ladder from the barn.",
            "By evening, the orchard looked like a patchwork quilt. “It may not be enough,” Grandma said quietly."
          ]
        },
        {
          id: "the-smudge-pots",
          title: "The Smudge Pots",
          summary: "Old pots and warm smoke hold the frost at bay.",
          minutes: 5,
          paragraphs: [
            "Tomas remembered the old smudge pots in the barn. Grandpa had used them to keep the frost away.",
            "They filled the pots with dry wood and set them between the rows. Smoke drifted through the branches and hung there like a warm gray blanket.",
            "All night, Tomas and Grandma took turns tending the fires. The frost crept close, then hesitated, then retreated."
          ]
        },
        {
          id: "an-orchard-of-apples",
          title: "An Orchard of Apples",
          summary: "Autumn arrives heavy with red and gold fruit.",
          minutes: 5,
          paragraphs: [
            "When summer arrived, the orchard was thick with leaves. By autumn, the branches hung heavy with red and gold apples.",
            "Grandma cut two slices of pie and sat with Tomas beneath the oldest tree. “The frost taught us something,” she said.",
            "“What?” asked Tomas. “That a little warmth can be shared,” she said. The orchard rustled in the breeze."
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
    },
    {
      id: "i-can-help",
      level: 5,
      title: "I Can Help",
      kicker: "Helping hands",
      blurb: "I can help at home and at school. Read the sight words that make helping easy.",
      emoji: "🤝",
      skills: ["sight words", "helping words", "confidence"],
      chapters: [
        {
          id: "help-at-home",
          title: "Help at Home",
          summary: "Small jobs that make a big difference.",
          minutes: 1,
          paragraphs: [
            "I can help at home.",
            "I can put toys away.",
            "I can feed the pet.",
            "We work together."
          ]
        },
        {
          id: "help-at-school",
          title: "Help at School",
          summary: "Helping friends makes the day bright.",
          minutes: 1,
          paragraphs: [
            "I can help at school.",
            "I can share my book.",
            "I can pick up pencils.",
            "My friends say thank you."
          ]
        },
        {
          id: "i-am-proud",
          title: "I Am Proud",
          summary: "Helping feels good.",
          minutes: 1,
          paragraphs: [
            "I am proud of me.",
            "I can do it.",
            "I can help again tomorrow.",
            "We are a team."
          ]
        }
      ]
    },
    {
      id: "look-at-me",
      level: 5,
      title: "Look at Me",
      kicker: "Show and tell",
      blurb: "Look at me run, jump, and play. Every page is packed with everyday sight words.",
      emoji: "🌟",
      skills: ["sight words", "action words", "fluency"],
      chapters: [
        {
          id: "i-can-run",
          title: "I Can Run",
          summary: "Running fast and feeling strong.",
          minutes: 1,
          paragraphs: [
            "Look at me run.",
            "I run and run.",
            "I am fast.",
            "I like to run."
          ]
        },
        {
          id: "i-can-jump",
          title: "I Can Jump",
          summary: "Jumping high with a smile.",
          minutes: 1,
          paragraphs: [
            "Look at me jump.",
            "I jump up high.",
            "I jump down low.",
            "I can jump again."
          ]
        },
        {
          id: "i-can-play",
          title: "I Can Play",
          summary: "Play with me and have fun.",
          minutes: 1,
          paragraphs: [
            "Look at me play.",
            "We play together.",
            "We have fun.",
            "I am happy."
          ]
        }
      ]
    },
    {
      id: "where-is-it",
      level: 5,
      title: "Where Is It?",
      kicker: "A find-it game",
      blurb: "Where is the toy? Where is the shoe? Hunt for sight words on every page.",
      emoji: "🔍",
      skills: ["sight words", "question words", "position words"],
      chapters: [
        {
          id: "find-the-toy",
          title: "Find the Toy",
          summary: "The toy is hiding somewhere.",
          minutes: 1,
          paragraphs: [
            "Where is the toy?",
            "Is it in the box?",
            "Is it under the bed?",
            "Here it is!"
          ]
        },
        {
          id: "find-the-shoe",
          title: "Find the Shoe",
          summary: "A shoe is not where it should be.",
          minutes: 1,
          paragraphs: [
            "Where is my shoe?",
            "Is it by the door?",
            "Is it in the bag?",
            "Yes, here it is."
          ]
        },
        {
          id: "all-found",
          title: "All Found",
          summary: "Everything is back in place.",
          minutes: 1,
          paragraphs: [
            "We found the toy.",
            "We found the shoe.",
            "Now we can play.",
            "Good job!"
          ]
        }
      ]
    },
    {
      id: "my-family",
      level: 5,
      title: "My Family",
      kicker: "People we love",
      blurb: "Meet my family. These pages use the sight words we see every day.",
      emoji: "👨‍👩‍👧",
      skills: ["sight words", "family words", "belonging"],
      chapters: [
        {
          id: "mom-and-dad",
          title: "Mom and Dad",
          summary: "Mom and Dad are here.",
          minutes: 1,
          paragraphs: [
            "This is my mom.",
            "This is my dad.",
            "They love me.",
            "We are a family."
          ]
        },
        {
          id: "brothers-and-sisters",
          title: "Brothers and Sisters",
          summary: "We play and learn together.",
          minutes: 1,
          paragraphs: [
            "I have a brother.",
            "I have a sister.",
            "We play together.",
            "We help each other."
          ]
        },
        {
          id: "family-day",
          title: "Family Day",
          summary: "A day with the people I love.",
          minutes: 1,
          paragraphs: [
            "We go out today.",
            "We eat together.",
            "We laugh together.",
            "I love my family."
          ]
        }
      ]
    },
    {
      id: "the-big-blue-bus",
      level: 5,
      title: "The Big Blue Bus",
      kicker: "A ride to anywhere",
      blurb: "The bus is big and blue. We get on, sit down, and ride to see our friends.",
      emoji: "🚌",
      featured: true,
      skills: ["sight words", "high-frequency words", "repetition"],
      chapters: [
        {
          id: "the-bus-is-here",
          title: "The Bus Is Here",
          summary: "A big blue bus stops for us.",
          minutes: 1,
          paragraphs: [
            "The bus is here.",
            "It is big and blue.",
            "We get on the bus.",
            "We sit down."
          ]
        },
        {
          id: "on-the-bus",
          title: "On the Bus",
          summary: "We look out and wave to a dog.",
          minutes: 1,
          paragraphs: [
            "We look out the window.",
            "We see a dog.",
            "The dog can run.",
            "We wave to the dog."
          ]
        },
        {
          id: "here-we-are",
          title: "Here We Are",
          summary: "The bus stops and our friends are waiting.",
          minutes: 1,
          paragraphs: [
            "The bus stops here.",
            "We get off the bus.",
            "We see our friends.",
            "We are happy!"
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
      featured: true,
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
    },
    {
      id: "pie-and-tie",
      level: 6,
      title: "Pie and Tie",
      kicker: "The ie sound sings",
      blurb: "A pie, a tie, and a try. Every page plays with the ie vowel team.",
      emoji: "🥧",
      skills: ["ie", "vowel teams", "decoding"],
      chapters: [
        {
          id: "a-pie-and-a-tie",
          title: "A Pie and a Tie",
          summary: "A pie on a plate and a tie on a coat.",
          minutes: 1,
          paragraphs: [
            "I bake a pie.",
            "I wear a tie.",
            "The pie is on the plate.",
            "The tie is on my coat."
          ]
        },
        {
          id: "flies-in-the-sky",
          title: "Flies in the Sky",
          summary: "Flies buzz near the pie.",
          minutes: 1,
          paragraphs: [
            "Flies fly by the pie.",
            "A fly sits on the tie.",
            "I wave the fly away.",
            "The pie is safe."
          ]
        },
        {
          id: "try-a-slice",
          title: "Try a Slice",
          summary: "A sweet slice and a tidy tie.",
          minutes: 1,
          paragraphs: [
            "I try a slice of pie.",
            "It is sweet and nice.",
            "I tie my tie again.",
            "What a day!"
          ]
        }
      ]
    },
    {
      id: "blue-glue-true",
      level: 6,
      title: "Blue Glue True",
      kicker: "The ue sound sticks",
      blurb: "Blue glue, a true clue, and a shoe. The ue team shines on every page.",
      emoji: "🔵",
      skills: ["ue", "vowel teams", "decoding"],
      chapters: [
        {
          id: "blue-glue",
          title: "Blue Glue",
          summary: "Blue glue and a true clue.",
          minutes: 1,
          paragraphs: [
            "I have blue glue.",
            "I glue a clue.",
            "The clue is true.",
            "I like blue glue."
          ]
        },
        {
          id: "glue-the-shoe",
          title: "Glue the Shoe",
          summary: "Blue glue fixes a shoe.",
          minutes: 1,
          paragraphs: [
            "I glue the shoe.",
            "The glue is blue.",
            "It sticks like glue.",
            "True!"
          ]
        },
        {
          id: "a-blue-clue",
          title: "A Blue Clue",
          summary: "Find the blue clue.",
          minutes: 1,
          paragraphs: [
            "Find the blue clue.",
            "The clue is true.",
            "I knew it too.",
            "Blue glue wins!"
          ]
        }
      ]
    },
    {
      id: "moon-and-spoon",
      level: 6,
      title: "Moon and Spoon",
      kicker: "The long oo sound",
      blurb: "Moon, spoon, soon, and room. Long oo glows on every page.",
      emoji: "🌙",
      skills: ["oo (long)", "vowel teams", "decoding"],
      chapters: [
        {
          id: "moon-and-spoon",
          title: "Moon and Spoon",
          summary: "A moon in the sky and a spoon in the room.",
          minutes: 1,
          paragraphs: [
            "See the moon.",
            "Use a spoon.",
            "The spoon is in the room.",
            "The moon is in the sky."
          ]
        },
        {
          id: "soon-the-bloom",
          title: "Soon the Bloom",
          summary: "A flower blooms soon.",
          minutes: 1,
          paragraphs: [
            "Soon the flower will bloom.",
            "The moon shines on the bloom.",
            "I use my spoon.",
            "I eat my soup soon."
          ]
        },
        {
          id: "room-for-two",
          title: "Room for Two",
          summary: "Room for two under the moon.",
          minutes: 1,
          paragraphs: [
            "There is room for two.",
            "The moon and I.",
            "We sit in the room.",
            "Good night, moon."
          ]
        }
      ]
    },
    {
      id: "book-and-cook",
      level: 6,
      title: "Book and Cook",
      kicker: "The short oo sound",
      blurb: "Book, cook, look, and took. Short oo pops up on every page.",
      emoji: "📚",
      skills: ["oo (short)", "vowel teams", "decoding"],
      chapters: [
        {
          id: "a-book-to-read",
          title: "A Book to Read",
          summary: "A good book to look at.",
          minutes: 1,
          paragraphs: [
            "I read a book.",
            "The book is good.",
            "I look at the book.",
            "I took the book home."
          ]
        },
        {
          id: "cook-the-food",
          title: "Cook the Food",
          summary: "Cooking with a look and a hook.",
          minutes: 1,
          paragraphs: [
            "I cook the food.",
            "I look in the pot.",
            "I took a hook.",
            "I hang the hook."
          ]
        },
        {
          id: "look-and-cook",
          title: "Look and Cook",
          summary: "Look, I cook!",
          minutes: 1,
          paragraphs: [
            "Look, I cook!",
            "The book says how.",
            "I took my time.",
            "The food is good."
          ]
        }
      ]
    },
    {
      id: "coin-and-toy",
      level: 6,
      title: "Coin and Toy",
      kicker: "oi and oy joy",
      blurb: "Coin, toy, and joy. oi and oy sparkle on every page.",
      emoji: "🪙",
      skills: ["oi / oy", "vowel teams", "decoding"],
      chapters: [
        {
          id: "a-coin-and-a-toy",
          title: "A Coin and a Toy",
          summary: "A coin and a toy to enjoy.",
          minutes: 1,
          paragraphs: [
            "I have a coin.",
            "I have a toy.",
            "The coin is in my pocket.",
            "The toy is in my hand."
          ]
        },
        {
          id: "join-the-joy",
          title: "Join the Joy",
          summary: "Join in the joy.",
          minutes: 1,
          paragraphs: [
            "Boys and girls join in.",
            "We point to the toy.",
            "We enjoy the joy.",
            "What a toy!"
          ]
        },
        {
          id: "point-to-the-coin",
          title: "Point to the Coin",
          summary: "Point and enjoy.",
          minutes: 1,
          paragraphs: [
            "Point to the coin.",
            "The coin joins the toy.",
            "I enjoy my play.",
            "Joy all day."
          ]
        }
      ]
    },
    {
      id: "cloud-and-cow",
      level: 6,
      title: "Cloud and Cow",
      kicker: "ou and ow sounds",
      blurb: "Cloud, cow, and how. ou and ow rumble on every page.",
      emoji: "🐄",
      skills: ["ou / ow", "vowel teams", "decoding"],
      chapters: [
        {
          id: "cloud-in-the-sky",
          title: "Cloud in the Sky",
          summary: "A loud cloud in the sky.",
          minutes: 1,
          paragraphs: [
            "A cloud is in the sky.",
            "The cloud is loud.",
            "I found a cloud.",
            "How big!"
          ]
        },
        {
          id: "the-cow-says-moo",
          title: "The Cow Says Moo",
          summary: "A cow says moo.",
          minutes: 1,
          paragraphs: [
            "The cow says moo.",
            "The cow is down now.",
            "How does she do it?",
            "Moo, moo, moo."
          ]
        },
        {
          id: "found-and-down",
          title: "Found and Down",
          summary: "Found the cow down low.",
          minutes: 1,
          paragraphs: [
            "I found the cow.",
            "She lies down now.",
            "The cloud goes by.",
            "How now, brown cow?"
          ]
        }
      ]
    },
    {
      id: "claw-and-saw",
      level: 6,
      title: "Claw and Saw",
      kicker: "aw and au sounds",
      blurb: "Claw, saw, and haul. aw and au roar on every page.",
      emoji: "🐻",
      skills: ["aw / au", "vowel teams", "decoding"],
      chapters: [
        {
          id: "claw-and-saw",
          title: "Claw and Saw",
          summary: "A claw and a saw.",
          minutes: 1,
          paragraphs: [
            "The bear has a claw.",
            "I use a saw.",
            "I saw the wood.",
            "The claw is sharp."
          ]
        },
        {
          id: "draw-and-haul",
          title: "Draw and Haul",
          summary: "Draw a paw and haul a log.",
          minutes: 1,
          paragraphs: [
            "I draw a paw.",
            "I haul the log.",
            "The claw marks the tree.",
            "I saw it fall."
          ]
        },
        {
          id: "caught-in-the-claw",
          title: "Caught in the Claw",
          summary: "Caught a ball in the claw.",
          minutes: 1,
          paragraphs: [
            "The cat caught a ball.",
            "The claw holds it all.",
            "I saw it fall.",
            "Draw a paw."
          ]
        }
      ]
    },
    {
      id: "car-and-star",
      level: 6,
      title: "Car and Star",
      kicker: "The ar sound",
      blurb: "Car, star, and far. The ar team drives on every page.",
      emoji: "🚗",
      skills: ["ar", "r-controlled", "decoding"],
      chapters: [
        {
          id: "car-and-star",
          title: "Car and Star",
          summary: "A car and a star.",
          minutes: 1,
          paragraphs: [
            "I drive a car.",
            "I see a star.",
            "The car goes far.",
            "The star is far."
          ]
        },
        {
          id: "park-in-the-dark",
          title: "Park in the Dark",
          summary: "Park the car in the dark.",
          minutes: 1,
          paragraphs: [
            "I park the car.",
            "It is dark.",
            "The star shines.",
            "I start the car."
          ]
        },
        {
          id: "hard-and-far",
          title: "Hard and Far",
          summary: "A hard road, a far star.",
          minutes: 1,
          paragraphs: [
            "The road is hard.",
            "The star is far.",
            "The car goes far.",
            "We are a star."
          ]
        }
      ]
    },
    {
      id: "fork-and-corn",
      level: 6,
      title: "Fork and Corn",
      kicker: "The or sound",
      blurb: "Fork, corn, and born. The or team shines on every page.",
      emoji: "🌽",
      skills: ["or", "r-controlled", "decoding"],
      chapters: [
        {
          id: "fork-and-corn",
          title: "Fork and Corn",
          summary: "A fork and some corn.",
          minutes: 1,
          paragraphs: [
            "I use a fork.",
            "I eat corn.",
            "The fork is on the plate.",
            "The corn is hot."
          ]
        },
        {
          id: "born-to-run",
          title: "Born to Run",
          summary: "A horse born to run.",
          minutes: 1,
          paragraphs: [
            "A horse is born.",
            "The horse runs for corn.",
            "I hold the fork.",
            "The corn is for the horse."
          ]
        },
        {
          id: "for-you-and-me",
          title: "For You and Me",
          summary: "For you and for me.",
          minutes: 1,
          paragraphs: [
            "The fork is for you.",
            "The corn is for me.",
            "The horse eats corn.",
            "We share."
          ]
        }
      ]
    },
    {
      id: "her-bird-turns",
      level: 6,
      title: "Her Bird Turns",
      kicker: "er, ir, and ur",
      blurb: "Her, bird, and turn. er, ir, and ur sing on every page.",
      emoji: "🐦",
      skills: ["er / ir / ur", "r-controlled", "decoding"],
      chapters: [
        {
          id: "her-bird",
          title: "Her Bird",
          summary: "Her bird can sing.",
          minutes: 1,
          paragraphs: [
            "Her bird can sing.",
            "The bird has fur.",
            "I turn the page.",
            "The bird turns too."
          ]
        },
        {
          id: "turn-and-learn",
          title: "Turn and Learn",
          summary: "Turn and learn a word.",
          minutes: 1,
          paragraphs: [
            "I turn the knob.",
            "I learn a word.",
            "The bird turns its head.",
            "Her bird is first."
          ]
        },
        {
          id: "first-and-third",
          title: "First and Third",
          summary: "First and third.",
          minutes: 1,
          paragraphs: [
            "First the bird, then the worm.",
            "Third comes the turn.",
            "The bird learns to fly.",
            "Her bird is fine."
          ]
        }
      ]
    },
    {
      id: "day-and-play",
      level: 6,
      title: "Day and Play",
      kicker: "The ay sound",
      blurb: "Day, play, and may. The ay team brightens every page.",
      emoji: "☀️",
      skills: ["ay", "vowel teams", "decoding"],
      chapters: [
        {
          id: "day-and-play",
          title: "Day and Play",
          summary: "A bright day to play.",
          minutes: 1,
          paragraphs: [
            "It is a new day.",
            "We play all day.",
            "The day is bright.",
            "We play and play."
          ]
        },
        {
          id: "may-i-play",
          title: "May I Play?",
          summary: "May I play today?",
          minutes: 1,
          paragraphs: [
            "May I play today?",
            "Yes, you may.",
            "We play in May.",
            "What a day!"
          ]
        },
        {
          id: "stay-and-play",
          title: "Stay and Play",
          summary: "Stay and play today.",
          minutes: 1,
          paragraphs: [
            "Stay and play today.",
            "We stay all day.",
            "The day is gay.",
            "We play and play."
          ]
        }
      ]
    },
    {
      id: "leaf-and-read",
      level: 6,
      title: "Leaf and Read",
      kicker: "The ea sound",
      blurb: "Leaf, read, and team. The ea team greens every page.",
      emoji: "🍃",
      skills: ["ea", "vowel teams", "decoding"],
      chapters: [
        {
          id: "leaf-and-read",
          title: "Leaf and Read",
          summary: "A leaf and a book to read.",
          minutes: 1,
          paragraphs: [
            "I read a book.",
            "I see a leaf.",
            "The leaf is green.",
            "I read about leaves."
          ]
        },
        {
          id: "mean-and-clean",
          title: "Mean and Clean",
          summary: "Keep it clean and green.",
          minutes: 1,
          paragraphs: [
            "Keep it clean.",
            "The leaf is mean? No.",
            "The leaf is green.",
            "I read and read."
          ]
        },
        {
          id: "team-and-dream",
          title: "Team and Dream",
          summary: "A team that dreams.",
          minutes: 1,
          paragraphs: [
            "We are a team.",
            "We dream of leaves.",
            "I read to my team.",
            "Dream and read."
          ]
        }
      ]
    },
    {
      id: "night-and-light",
      level: 6,
      title: "Night and Light",
      kicker: "The igh sound",
      blurb: "Night, light, and sight. The igh team glows on every page.",
      emoji: "✨",
      skills: ["igh", "vowel teams", "decoding"],
      chapters: [
        {
          id: "night-and-light",
          title: "Night and Light",
          summary: "A light in the night.",
          minutes: 1,
          paragraphs: [
            "It is night.",
            "I turn on the light.",
            "The light is bright.",
            "The night is dark."
          ]
        },
        {
          id: "high-and-bright",
          title: "High and Bright",
          summary: "High and bright in the sky.",
          minutes: 1,
          paragraphs: [
            "The light is high.",
            "The stars are bright.",
            "I see the night sky.",
            "High up high."
          ]
        },
        {
          id: "sight-in-the-night",
          title: "Sight in the Night",
          summary: "Good sight in the night.",
          minutes: 1,
          paragraphs: [
            "I have good sight.",
            "I see in the night.",
            "The light helps me.",
            "Night and sight."
          ]
        }
      ]
    },
    {
      id: "new-news-and-dew",
      level: 6,
      title: "New News and Dew",
      kicker: "The ew sound is new",
      blurb: "New, few, dew, and grew. The ew team sprouts on every page.",
      emoji: "🌱",
      skills: ["ew", "vowel teams", "decoding"],
      chapters: [
        {
          id: "new-news",
          title: "New News",
          summary: "New news and a few friends on a new bench.",
          minutes: 1,
          paragraphs: [
            "I have new news.",
            "A few friends came.",
            "We sat on the new bench.",
            "The wind blew and blew."
          ]
        },
        {
          id: "the-dew-grew",
          title: "The Dew Grew",
          summary: "Dew grows on a leaf in the new sun.",
          minutes: 1,
          paragraphs: [
            "The sun is new.",
            "The dew grew on the leaf.",
            "A few drops fell.",
            "I drew the dew."
          ]
        },
        {
          id: "the-crew-chews",
          title: "The Crew Chews",
          summary: "The crew chews a few buns and knows they are good.",
          minutes: 1,
          paragraphs: [
            "The crew sat down.",
            "Each one chewed a few buns.",
            "We knew they were good.",
            "What new news!"
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
