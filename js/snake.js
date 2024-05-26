let sn_head = document.getElementById("head");
let food = document.getElementById("food");
let body = document.getElementsByClassName("body");
let score_board = document.getElementById("s_b");
let direction = "d";
let pre_pos = { x: 0, y: 0 };
let position = { x: 1, y: 1 };
let food_pos = { x: 30, y: 30 };
let body_pos = {};
let score = 0;
let cp = 0;
let speed = 200;
alert("Start the game.");
let infinite = setInterval(function () {
    if (position["x"] > 0 && position["y"] > 0 && position["x"] < 21 && position["x"] < 21) {
        pre_pos["x"] = position["x"];
        pre_pos["y"] = position["y"];
        if (direction == "d") {
            position["x"] = position["x"] + 1;
        } else if (direction == "a") {
            position["x"] = position["x"] - 1;
        } else if (direction == "s") {
            position["y"] = position["y"] + 1;
        } else if (direction == "w") {
            position["y"] = position["y"] - 1;
        }
    } else {
        restart();
    }
    if (food_pos["x"] == position["x"] && food_pos["y"] == position["y"]) {
        food_placer();
        score = score + 1;
        body_inc();
    } else if (food_pos["x"] == 30 || food_pos["y"] == 30) {
        food_placer();
    }
    for (let i = Object.keys(body_pos).length; i > 0; i--) {
        if ((i - 1) == 0) {
            body_pos[i - 1]["x"] = pre_pos["x"];
            body_pos[i - 1]["y"] = pre_pos["y"];
        } else {
            body_pos[i - 1]["x"] = body_pos[i - 2]["x"];
            body_pos[i - 1]["y"] = body_pos[i - 2]["y"];
        }
        body[i - 1].setAttribute("style", "grid-area: " + body_pos[i - 1]["y"] + " / " + body_pos[i - 1]["x"] + " ;");
    }
    for (let i = 0; i < Object.keys(body_pos).length; i++) {
        if (body_pos[i]["x"] == position["x"] && body_pos[i]["y"] == position["y"]) {
            restart();
        }
    }
    speed = speed - ((speed * 5) / 100);
    score_board.innerHTML = score;
    sn_head.setAttribute("style", "grid-area: " + position["y"] + " / " + position["x"] + " ;");
}, speed);

function body_inc() {
    let body = document.createElement("div");
    let b_size = Object.keys(body_pos).length;
    body.classList.add("snake");
    body.classList.add("body");
    body.setAttribute("style", "grid-area: " + pre_pos["y"] + " / " + pre_pos["x"] + " ;");
    document.getElementById("box").appendChild(body);
    body_pos[b_size] = {};
}

document.addEventListener("keypress", function (e) {
    direction = e.key.toLowerCase();
});

function food_placer() {
    let food_pos = { x: Math.floor(Math.random() * (20 - 1) + 1), y: Math.floor(Math.random() * (20 - 1) + 1) };
    food.setAttribute("style", "grid-area: " + food_pos["y"] + " / " + food_pos["x"] + " ;");
}

function restart() {
    alert("Trai again");
    direction = "d";
    score = 0;
    pre_pos = { x: 0, y: 0 };
    position = { x: 1, y: 1 };
    food_pos = { x: 30, y: 30 };
    body_pos = {};
    let bodies = document.getElementsByClassName("body");
    while (bodies.length > 0) {
        bodies[0].parentNode.removeChild(bodies[0]);
    }
}