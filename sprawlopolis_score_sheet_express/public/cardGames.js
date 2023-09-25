//----------Cards for each game----------

export const sprawlopolis = {
    "name": "Sprawlopolis",
    "blocks": [
        {"name": "residential", "modifier": 1},
        {"name": "commercial", "modifier": 1},
        {"name": "industrial", "modifier": 1},
        {"name": "parks", "modifier": 1},
        {"name": "roads", "modifier": -1}
    ],
    "scoringCards": [
        {"name": "The Outskirts", "id": "sprawl1", "description": "1 point per road that DOES NOT end at the edge of the city; -1 point per road that ends at the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Bloom Boom", "id": "sprawl2", "description": "1 point/each row and column with exactly three Park blocks in it; -1 point for each row and column with exactly 0 Park blocks in it.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Go Green", "id": "sprawl3", "description": "1 point per Park block in your city; -3 points per Industrial block in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Industrial Blocks", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Block Party", "id": "sprawl4", "description": "Score points per group of 4 'corner-tocorner' blocks of the same type. You may score multiple groups of the same type and a block may apply to more than one group.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -8, "max-score": 7,  "startingTotal": -8},
        {"name": "Stacks and Scrapers", "id": "sprawl5", "description": "2 points per Industrial block adjacent to only Commercial or Industrial blocks", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Master Planned", "id": "sprawl6", "description": "Subtract the number of blocks in your largest Industrial group from the number of blocks in your largest Residential group. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Central Perks", "id": "sprawl7", "description": "1 point per Park block located on the interior of the city; -2 points per Park block on the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "The Burbs", "id": "sprawl8", "description": "1 point per Park block adjacent to your largest group of Residential blocks; -2 points per Industrial block adjacent to your largest group of Residential blocks.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Concrete Jungle", "id": "sprawl9", "description": "1 point per Industrial block that shares a corner with at least 1 other Industrial block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "The Strip", "id": "sprawl10", "description": "1 point per Commercial block in any 1 row or column of your choice. You may only score for 1 row or column.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Mini Marts", "id": "sprawl11", "description": "2 points per Commercial block directly between two Residential blocks with the same road connecting all three blocks. Blocks may be a straight line or in a 'stepped' pattern.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Superhighway", "id": "sprawl12", "description": "1 point per every 2 Road sections (rounded down) that are part of your longest road.", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Park Hopping", "id": "sprawl13", "description": "3 points per Road that begins at one Park and ends at different Park.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Looping Lanes", "id": "sprawl14", "description": "1 point per Road section in a completed loop. You may acore multiple loops in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Skid Row", "id": "sprawl15", "description": "2 points per Residential block adjacent to 2 or more Industrial blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Morning Commute", "id": "sprawl16", "description": "2 points per Road that passes through both a Resdential block and a Commercial block.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Tourist Traps", "id": "sprawl17", "description": "1 point per Commercial block on the edge of the city; Additional 1 point per Commercial block on a corner edge.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Sprawlopolis", "id": "sprawl18", "description": "Add the number of blocks in your longest column (skipping any gaps); Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0}
    ]
};

export const agropolis = {
    "name": "Agropolis",
    "blocks": [
        {"name": "cornfields", "modifier": 1},
        {"name": "orchards", "modifier": 1},
        {"name": "vineyards", "modifier": 1},
        {"name": "livestock", "modifier": 1},
        {"name": "roads", "modifier": -1}
    ],
    "scoringCards": [
        {"name": "Wine Seller", "id": "ag1", "description": "1 point per Road taht passes through 2 or more Vineyard blocks; -1 point per road that passes through 0 or 1 Vineyards.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads passing through multiple Vineyards.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads that pass through 1 or fewer Vineyards.", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Big Country", "id": "ag2", "description": "Score points based on the largest completed square group of blocks.", "img": 0, "colOne": createMultiInput("ag2", 3), "colOneMulti": 1, "colOneName": "What size is your largest completed square group of blocks?", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 2, "min-score": -5, "max-score": 5, "startingTotal": -5},
        {"name": "Udderly Impossible", "id": "ag3", "description": "1 point per Cow Pen not in the same row or column as any other Livestock block; -2 points per Cow Pen in the same row or column as any other Livestock block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Cow Pens not in same row/column as other Livestock.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cow Pens in same row/column as other Livestock.", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Count Your Chickens", "id": "ag4", "description": "1 point per Chicken Pen directly across a straight road segment from at least 1 other Chicken Pen; -4 points if none of your Chicken Pens score as described above.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Chicken Pens across a straight road segment form 1 or more Chicken Pens.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -4, "max-score": 99, "startingTotal": -4},
        {"name": "All the Way Home", "id": "ag5", "description": "1 point per Pig Pen adjacent to your longest road; -1 point per Pig Pen not adjacent to your longest Road.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to longest Road.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Pig Pens not adjacent to longest Road.", "target": 5, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Fruitful Endeavor", "id": "ag6", "description": "1 point per Row or columns with 1 or more Vineyard blocks and 1 or more Orchard blocks; -1 point per row or column without both a Vineyard block and an Orchard block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Row/column with 1+ Vineyard and 1+ Orchard blocks.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Row/column without BOTH a Vineyard and Orchard block.", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Cornfed", "id": "ag7", "description": "2 points per single Cow Pen block adjacent to 2 or more Cornfield blocks; 2 points per double Cow Pen block adjacent to 3 or more Cornfield blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Single Cow Pens adjacent to 2+ Cornfield blocks.", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Double Cow Pen blocks adjacent to 3 or more Cornfield blocks.", "target": 7, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Coops and Loops", "id": "ag8", "description": "2 points per Chicken Pen inside each completed Road loop.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Chicken Pens inside completed Road loops.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 8, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Happy Cows", "id": "ag9", "description": "2 points per Cow Pen adjacent to 0 or 1 Roads; -1 point per Cow Pen adjacent to 2 or more Roads.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cow Pens adjacent to 0-1 Roads.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Cow Pens adjacent to 2+ Roads.", "target": 9, "min-score": -99, "max-score": 98, "startingTotal": 0},
        {"name": "Swine Country", "id": "ag10", "description": "2 points per Pig Pen adjacent to your largest Vineyard group; -2 points per Pig Pen not adjacent to your largest Vineyard group.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Pig Pens adjacent to largest Vineyard group.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Pig Pens not adjacent to largest Vineyard group.", "target": 10, "min-score": -98, "max-score": 98, "startingTotal": 0},
        {"name": "Tractor Tours", "id": "ag11", "description": "Count the number of left and right turns on your longest Road and score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Number of turns on longest Road.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Country Roads", "id": "ag12", "description": "2 points per Road that passes more Cornfield blocks that any other block type.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass through more Cornfield blocks than any other kind.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Polyominorchards", "id": "ag13", "description": "Score points for each Orchard group of a given size, regardless of shape.", "img": 0, "colOne": createMultiInput("ag13", 3), "colOneMulti": 1, "colOneName": "Select each size of Orchard group present on your map.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 9, "startingTotal": 0},
        {"name": "Bacon and Eggs", "id": "ag14", "description": "1 point per Pig Pen adjacent to 1 or more Chicken Blocks but not to another Pig Block; 1 point per Chicken Pen adjacent to 1 or more Pig Blocks but not to another Chicken Block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to Chicken Blocks bot not Pig Blocks.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Chicken Pens adjacent to Pig Blocks but not Chicken Blocks.", "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Cornercopia", "id": "ag15", "description": "2 points per Cornfield Block on a corner; -2 points per Cornfield Block not on a corner.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cornfield blocks on a corner.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cornfield blocks not on a corner.", "target": 15, "min-score": -98, "max-score": 98, "startingTotal": 0},
        {"name": "Them Apples", "id": "ag16", "description": "3 points per Orchard group with a different number of blocks than any other Orchard group; BONUS: 5 points if every Orchard group has a different number of blocks.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Orchard groups with different numbers of blocks.", "colTwo": themApplesCheckBox(), "colTwoMulti": 1, "colTwoName": "Does every Orchard group have a different number of blocks?", "target": 16, "min-score": 0, "max-score": 20, "startingTotal": 0},
        {"name": "Noah's Farm", "id": "ag17", "description": "3 points per Livestock group that contains an even number of pens and at least 2 different Livestock types.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Livestock group containing an even number of pens and 2+ different Livestock types.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Agropolis", "id": "ag18", "description": "Count all of the Livestock Pens in your longest row and in your longest column. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "All Livestock Pens in longest row.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "All Livestock Pens in longest column.", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0},
    ]
};

export const naturopolis = {
    "name": "Naturopolis",
    "blocks": [
        {"name": "forests", "modifier": 1},
        {"name": "lakes", "modifier": 1},
        {"name": "meadows", "modifier": 1},
        {"name": "mountains", "modifier": 1},
        {"name": "roads", "modifier": -2}
    ],
    "scoringCards": [
        {"name": "Trees in Threes", "id": "nat1", "description": "1 point per Forest group with exactly 3 blocks; -1 point per Forest block that is not in a group of 3", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Forest groups with 3 blocks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Forest blocks NOT in a group of 3", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Lake Mistakes", "id": "nat2", "description": "1 point per Lake connected to at least 1 Road or River; -2 points per Lake group with no connections to Roads or Rivers", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Lake groups connected to Roads or Rivers", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Lake groups with no Road or River connections", "target": 2, "min-score": -98, "max-score": 99, "startingTotal": 0},
        {"name": "A River Runs Through It", "id": "nat3", "description": "1 point per River that connects only to map edges; -1 point per River that connects to a block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rivers that only connect to map edges", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "River that connects to a block", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
        {"name": "Natural Selection", "id": "nat4", "description": "Score points based on the number of blocks in the longest row or column with 0 Roads.", "img": 0, "colOne": createMultiInput("nat4", 4), "colOneMulti": 1, "colOneName": "Number of blocks in longest row or column with no Roads", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -2, "max-score": 7, "startingTotal": -2},
        {"name": "Straight and Narrow", "id": "nat5", "description": "1 point per Road section in one straightaway (a continuous stretch of roadway with no turns).", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in longest straightaway", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Drivin' Daisies", "id": "nat6", "description": "2 points per Meadow block on your longest Road; -1 point per Meadow block not on that Road.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Meadow blocks on longest Road", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Meadow blocks not on longest Road", "target": 6, "min-score": -99, "max-score": 98, "startingTotal": 0},
        {"name": "Second Nature", "id": "nat7", "description": "1 point per Meadow block in your second largest Meadow group (which must be smaller than your largest Meadow group); Additional 1 point per Campsite in that group.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Meadow blocks in second largest Meadow group", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Campsites in second largest Meadow group", "target": 7, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Waterways and Means", "id": "nat8", "description": "2 points per River with a different number of sections than any other River.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Rivers with different number of sections than any other River", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 8, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Patchwork Park", "id": "nat9", "description": "1 point per Campsite adjacent to another Campsite on a different block type.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Campsites adjacent to other Campsites on different blocks types.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Twin Peaks", "id": "nat10", "description": "2 points per Mountain group with exactly 2 blocks, where either or both blocks have Campsites or both do not.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Mountain groups with 2 blocks, both with Campsites", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Mountain groups with 2 blocks, neither with Campsites", "target": 10, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Run Forest Run", "id": "nat11", "description": "1 point per River section in 1 River that begins and ends within Forest blocks (it may pass through other Forest blocks).", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "River sections of 1 River beginning and ending in Forest blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Happy Campers", "id": "nat12", "description": "2 points per Campsite along 1 River or Road of your choice.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Campsites along 1 River or Road, your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Bigfoot Country", "id": "nat13", "description": "2 points per Forest block that does not have a Campsite and is not on a map edge.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Forest blocks without Campsites and not on map's edge", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Sniff or Swim", "id": "nat14", "description": "Choose one: [2 points per block in your largest Meadow group; -2 points per Lake block adjacent to that group.] OR [2 points per block in your largest Lake group; -2 points per Meadow block adjacent to that group.]", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Blocks in your largest Meadow/Lake group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Lake/Meadow blocks adjacent to that group", "target": 14, "min-score": -98, "max-score": 98, "startingTotal": 0},
        {"name": "Impressive Range", "id": "nat15", "description": "2 points per Mountain block along any 1 diagonal of your choice; Additional 1 point per Mountain Campsite on that diagonal.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Mountain blocks along 1 diagonal", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Mountain Campsites along that diagonal", "target": 15, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Dream Streams", "id": "nat16", "description": "3 points per straight River section directly between 2 adjacent Lake blocks but connected to neither of them.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Straight River sections between 2 adjacent Lake blocks, not connected to either.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 99, "startingTotal": 0},
        {"name": "Summit Up", "id": "nat17", "description": "2 points per Mountain group with 2 or more blocks; Additional 2 points if that group is in a different shape or orientation than any other Mountain group.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Mountain groups of 2+ blocks", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Mountain groups of 2+ blocks in a different shape or orientation than any other Mountain group", "target": 17, "min-score": 0, "max-score": 98, "startingTotal": 0},
        {"name": "Naturopolis", "id": "nqt18", "description": "Count all of the Campsites in the longest row and in the longest column. Score twice that many points.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Campsites in longest row", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Campsites in longest column", "target": 18, "min-score": 0, "max-score": 98, "startingTotal": 0},
    ]
};

//----------Card specific functions----------

function themApplesCheckBox() {
    const bonusCheck = document.createElement("input");
    const bonusLabel = document.createElement("label");
    bonusCheck.type = "checkbox";
    bonusCheck.id = "themApplesBonus";
    bonusCheck.value = "5";
    bonusLabel.for = "themApplesBonus";
    bonusLabel.innerText = "5 point bonus!";
    return [bonusCheck, bonusLabel];
};

function createMultiInput(card, numInputs) {
    const inputs = [];
    const labels = [];
    for (let i = 0; i < numInputs; i++) {
        const newInput = document.createElement("input");
        const newLabel = document.createElement("label");
        inputs.push(newInput);
        labels.push(newLabel);
    };
    if (card === "ag13") {
        const checkElements = checkPolyominorchards(inputs, labels);
        return checkElements;
    } else if (card === "ag2") {
        const radioElements = radioBigCountry(inputs, labels);
        return radioElements;
    } else if (card === "nat4") {
        const radioElements = radioNaturalSelection(inputs, labels);
        return radioElements;
    };
};

function checkPolyominorchards(checks, labels) {
    const length = checks.length;
    const values = [1, 3, 5];
    const blocks = ["2", "3", "4"];
    for (let i = 0; i < length; i++) {
        checks[i].type = "checkbox";
        checks[i].id = `polyCheck${String(values[i])}`;
        checks[i].value = values[i];
        labels[i].for = `polyCheck${String(values[i])}`;
        labels[i].innerText = `Exactly ${blocks[i]} blocks (${String(values[i])} points)`;
    };
    return [checks, labels];
};

function radioBigCountry(radios, labels) {
    const length = radios.length;
    const values = [-5, 7, 10];
    const blocks = ["4x4 or less", "5x5", "6x6 or more"];
    for (let i = 0; i < length; i++) {
        radios[i].type = "radio";
        radios[i].id = `BCCheck${String(values[i])}`;
        radios[i].value = values[i];
        radios[i].name = "bigCountryRadio"
        labels[i].for = `BCCheck${String(values[i])}`;
        labels[i].innerText = `${blocks[i]}`;
    };
    return [radios, labels];
};

function radioNaturalSelection(radios, labels) {
    const length = radios.length;
    const values = [-2, 3, 6, 9];
    const blocks = ["0-4", "5-8", "9-11", "12+"];
    for (let i = 0; i < length; i++) {
        radios[i].type = "radio";
        radios[i].id = `NatSel${String(values[i])}`;
        radios[i].value = values[i];
        radios[i].name = "NaturalSelectionRadio";
        labels[i].for = `NatSel${String(values[i])}`;
        labels[i].innerText = `${blocks[i]}`;
    };
    return [radios, labels];
};
