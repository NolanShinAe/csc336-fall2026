let roomRootDiv = document.querySelector("#roomRoot");

let rooms = {
    foyer: {
        name: "Foyer Room",
        description: "This is where the game starts! Quite empty isn't it...Play if you dare...Seriously play.",
        linkedRooms: ["throneRoom", "feastRoom"]
    },

    dungeonRoom: {
        name: "Dungeon Room",
        description: "This the dungeon room. Very musty and dirty. Green moss growing from the corners, and black stone walls on all four corners.",
        linkedRooms: ["magicRoom", "candyRoom"]
    },

    throneRoom: {
        name: "Throne Room",
        description: "Where his majesty and highness sit to relish their rule and listen to people talk. Big red chairs raised on platforms, side by side, but not really. Only one person has power...Or do they?",
        linkedRooms: ["consoleRoom", "statueRoom"]

    },

    candyRoom: {
        name: "Candy Room",
        description: "Lolipops, warheads, gummi bears and gummi worms, kit-kats, snicker bars, and jolly ranchers, too. Everything candy to eaten, can be found here.",
        linkedRooms:["foyer", "feastRoom"]
    },

    consoleRoom: {
        name: "Console Room",
        description: "A flat-screen tv, couch, and all types of video-game consoles. What's not to like? David likes it.",
        linkedRooms: ["dungeonRoom", "statueRoom"]
    },

    feastRoom: {
        name: "Feast Room",
        description: "If you can eat it, it is here. The ever cooking table of the Feast Room. Hunger doesn't exist here, only joy for food. How joyous to only eat and eat and eat and eat...",
        linkedRooms: ["throneRoom", "candyRoom"]
    },

    magicRoom: {
        name: "Magic Room",
        description: "Do you believe in magic? You don't? Get out.",
        linkedRooms: ["throneRoom", "consoleRoom"]
    },

    statueRoom: {
        name: "Statue Room",
        description: "It a room full of statues. They don't move or talk. Even one of the most famous,...",
        linkedRooms: ["foyer"]
    }
}

let currentRoom = rooms["foyer"];

function navButtonClicked(e) {
    console.log(e.target.innerHTML);
    currentRoom = rooms[e.target.innerHTML];
    visualizeRoom(currentRoom);
}

function visualizeRoom(room) {
    roomRootDiv.innerHTML = "";

    let roomHeading = document.createElement("h1");
    roomHeading.innerHTML = room.name;
    roomRootDiv.append(roomHeading);

    let descriptionParagraph = document.createElement("p");
    descriptionParagraph.innerHTML = room.description;
    roomRootDiv.append(descriptionParagraph);


    for (let i = 0; i < room.linkedRooms.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML = room.linkedRooms[i];
        navButton.addEventListener("click", navButtonClicked);
        roomRootDiv.append(navButton);
    }
}

visualizeRoom(currentRoom);