let roomRootDiv = document.querySelector("#roomRoot");

let rooms = {
    foyer: {
        name: "Foyer Room",
        description: "This is where the game starts! Quite empty isn't it...Play if you dare...Seriously play.",
        linkedRooms: [
            {label: "Visit the King and Queen", destination: "throneRoom"}, 
            {label: "Time for dinner!", destination: "feastRoom"}]
    },

    dungeonRoom: {
        name: "Dungeon Room",
        description: "This is the dungeon room. Very musty and dirty. Green moss growing from the corners, and black stone walls on all four corners.",
        linkedRooms: [
            {label: "Dreams are Made Possible", destination: "magicRoom"},
            {label: "Cavities Await", destination: "candyRoom"}]
    },

    throneRoom: {
        name: "Throne Room",
        description: "Where his majesty and highness sit to relish their rule and listen to people talk. Big red chairs raised on platforms, side by side, but not really. Only one person has power...Or do they?",
        linkedRooms: [
            {label: "Games Upon Games", destination: "consoleRoom"}, 
            {label: "Still and Life-Sized, Come and See", destination: "statueRoom"}]

    },

    candyRoom: {
        name: "Candy Room",
        description: "Lollipops, warheads, gummi bears and gummi worms, kit-kats, snicker bars, and jolly ranchers, too. Every candy to eaten, can be found here.",
        linkedRooms:[
            {label: "The Beginning of the End", destination: "foyer"}, 
            {label:"More dinner time!", destination: "feastRoom"}]
    },

    consoleRoom: {
        name: "Console Room",
        description: "A flat-screen tv, couch, and all types of video-game consoles. What's not to like? David likes it.",
        linkedRooms: [
            {label: "Dark and Grungy, Don't Go", destination: "dungeonRoom"}, 
            {label: "Still still, Observe", destination: "statueRoom"}]
    },

    feastRoom: {
        name: "Feast Room",
        description: "If you can eat it, it is here. The ever cooking table of the Feast Room. Hunger doesn't exist here, only joy for food. How joyous to only eat and eat and eat and eat...",
        linkedRooms: [
            {label: "Off With Your Head", destination: "throneRoom"}, 
            {label: "Time for the Dentist", destination: "candyRoom"}]
    },

    magicRoom: {
        name: "Magic Room",
        description: "Do you believe in magic? You don't? Get out.",
        linkedRooms: [
            {label: "Make Your Complaints, They Might Listen", destination: "throneRoom"}, 
            {label: "Come Play", destination: "consoleRoom"}]
    },

    statueRoom: {
        name: "Statue Room",
        description: "It is a room full of statues. They don't move or talk. Even one of the most famous,...",
        linkedRooms: [{label: "The End of the Beginning", destination: "foyer"}]
    },

    secretRoom: {
        name: "Secret Room",
        description: "You made it to the secret room. That's it. Goodbye. Waste of time, wasn't it? It's about the journey and the friends, we made along the way. Oh wait, there wasn't anybody, except David.",
        linkedRooms: [
            {label: "Goodbye!", destination: "statueRoom"}
        ]
    }
}


let currentRoom = rooms["foyer"];

function navButtonClicked(e) {
    let destination = e.target.dataset.destination;
    currentRoom = rooms[destination];
    visualizeRoom(currentRoom);
}


let passwordInput;
let passwordButton;

function checkPassword(e) {
    if (passwordInput.value === "David") {
        roomRootDiv.innerHTML = "Correct password! The secret room is unlocked!";
        let secretButton = document.createElement("button");
                secretButton.innerHTML = "Welcome...";
                secretButton.dataset.destination = "secretRoom";

                secretButton.addEventListener("click", navButtonClicked);
                roomRootDiv.append(secretButton);
    } else {
        roomRootDiv.innerHTML = "Incorrect password. Refresh and journey again.";
    }
}

function passwordHint() {
    let hintParagraph = document.createElement("p");
    hintParagraph.innerHTML = "Hint: The friends along the way...or not";
    roomRootDiv.append(hintParagraph);
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

        navButton.innerHTML = room.linkedRooms[i].label;
        navButton.dataset.destination = room.linkedRooms[i].destination;

        navButton.addEventListener("click", navButtonClicked);
        roomRootDiv.append(navButton);
    }

    if (room.name === "Statue Room") {
        passwordInput = document.createElement("input");
        passwordInput.type = "text";
        passwordInput.addEventListener("mouseover", passwordHint);
        roomRootDiv.append(passwordInput);

        passwordButton = document.createElement("button");
        passwordButton.innerHTML = "Enter";
        passwordButton.addEventListener("click", checkPassword);
        roomRootDiv.append(passwordButton);
    }
}

visualizeRoom(currentRoom);

