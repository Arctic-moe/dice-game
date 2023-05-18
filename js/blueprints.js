
function check_k_in_a_row(k) {
    if( selected_dice.length != k ) return false;
    let arr = [];
    selected_dice.forEach((i)=>{
        arr.push(dice[i].point);
    });
    arr.sort();
    for(let i = 1; i < k; i++) {
        if(arr[i-1] != arr[i]-1) return false;
    }
    return true;
}

function check_k_in_a_kind(k, x) {
    if( selected_dice.length != k ) return false;
    if(typeof(x) != undefined && dice[selected_dice[0]].point != x) return false;
    for(let i = 2; i < k; i++) {
        if(dice[selected_dice[0]].point != dice[selected_dice[i]].point) return false;
    }
    return true;
}

function clear_selected_dice() {
    selected_dice.sort();
    for(let i = selected_dice.length-1; i >= 0; i--) {
        dice.splice(selected_dice[i], 1);
    }
}

// if mode is 0, then check, else buy
// three in a row
function ck_minor_settlement(mode) {
    if(mode == 0) {
        return check_k_in_a_row(3);
    } else {
        if(!check_k_in_a_row(3)) return false;
        clear_selected_dice();
        return true;
    }
}

// five in a row
function ck_clone_machine(mode) {
    if(mode == 0) {
        return check_k_in_a_row(5);
    } else {
        if(!check_k_in_a_row(5)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone6(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 6);
    } else {
        if(!check_k_in_a_kind(3, 6)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone5(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 5);
    } else {
        if(!check_k_in_a_kind(3, 5)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone4(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 4);
    } else {
        if(!check_k_in_a_kind(3, 4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone3(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 3);
    } else {
        if(!check_k_in_a_kind(3, 3)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone2(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 2);
    } else {
        if(!check_k_in_a_kind(3, 2)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_drone1(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3, 1);
    } else {
        if(!check_k_in_a_kind(3, 1)) return false;
        clear_selected_dice();
        return true;
    }
}

function check_a_and_b(a, b) {
    if(selected_dice.length != a+b) return false;
    let arr = [];
    selected_dice.forEach((i)=>{
        arr.push(dice[i].point);
    });
    arr.sort();
    if(a > b) { let tmp = b; b = a; a = tmp; }
    if(arr[0] == arr[a-1]) {

    } else if(arr[0] == arr[b-1]) {

    }
    if(arr[0] == arr[1] && arr[0] == arr[2] && arr[3] == arr[4]) return true;
    else if(arr[0] == arr[1] && arr[2] == arr[3] && arr[2] == arr[4]) return true;
    else return false;
}

function ck_dome(mode) {
    if(mode == 0) {
        return check_three_and_two();
    } else {
        if(!check_three_and_two()) return false;
        clear_selected_dice();
        return true;
    }
}

// four of a kind
function ck_prospector() {
    if(mode == 0) {
        return check_k_in_a_kind(4);
    } else {
        if(!check_k_in_a_kind(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_shuttle() {
    if(mode == 0) {
        return check_k_in_a_kind(3);
    } else {
        if(!check_k_in_a_kind(3)) return false;
        clear_selected_dice();
        return true;
    }
}

function check_k_wild(k) {
    if(selected_dice.length != k) return false;
    for(let i = 0; i < k; ++i) {
        if(dice[selected_dice[i]].wild == 0) return false;
    }
    return true;
}

function ck_replicant_robot() {
    if(mode == 0) {
        return check_k_wild(2);
    } else {
        if(!check_k_wild(2)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_quantum_computer() {

}

let all_blueprints = [
    {
        id: 0,
        name: "Minor Settlement",
        cost: "three in a row",
        effect: "Start of even round: Roll a Basic die",
        checkFunc: ck_minor_settlement,
        used: false,
        shown: false,
    },
    {
        id: 1,
        name: "Clone Machine",
        cost: "five in a row",
        effect: "Click: Select a die, generate a fixed copy of it",
        checkFunc: ck_clone_machine,
        used: false,
        shown: false,
    },
    {
        id: 2,
        name: "Drone6",
        cost: "6, 6, 6",
        effect: "Start of turn: Gain a fixed 6",
        checkFunc: ck_drone6,
        used: false,
        shown: false,
    },
    {
        id: 3,
        name: "Drone5",
        cost: "5, 5, 5",
        effect: "Start of turn: Gain a fixed 5",
        checkFunc: ck_drone5,
        used: false,
        shown: false,
    },
    {
        id: 4,
        name: "Drone4",
        cost: "4, 4, 4",
        effect: "Start of turn: Gain a fixed 4",
        checkFunc: ck_drone4,
        used: false,
        shown: false,
    },
    {
        id: 5,
        name: "Drone3",
        cost: "3, 3, 3",
        effect: "Start of turn: Gain a fixed 3",
        checkFunc: ck_drone3,
        used: false,
        shown: false,
    },
    {
        id: 6,
        name: "Drone2",
        cost: "2, 2, 2",
        effect: "Start of turn: Gain a fixed 2",
        checkFunc: ck_drone2,
        used: false,
        shown: false,
    },
    {
        id: 7,
        name: "Drone1",
        cost: "1, 1, 1",
        effect: "Start of turn: Gain a fixed 1",
        checkFunc: ck_drone1,
        used: false,
        shown: false,
    },
    {
        id: 8,
        name: "Dome",
        cost: "fullhouse",
        effect: "Start of turn: Roll a basic dice and preserve it",
        checkFunc: ck_dome,
        used: false,
        shown: false,
    },
    {
        id: 9,
        name: "Prospector",
        cost: "four of a kind",
        effect: "Start of turn: Roll a die, fix and preserve it",
        checkFunc: ck_prospector,
        used: false,
        shown: false,
    },
    {
        id: 10,
        name: "Shuttle",
        cost: "three of a kind",
        effect: "Enter play: +2 M.O.D. You may mod 6 into 1 or 1 into 6",
        checkFunc: ck_shuttle,
        used: false,
        shown: false,
    },
    {
        id: 11,
        name: "Replicant Robot",
        cost: "two wild",
        effect: "Start of turn: Gain a wild die",
        checkFunc: ck_replicant_robot,
        used: false,
        shown: false,
    },
    {
        id: 12,
        name: "Quantum Computer",
        cost: "two pairs in a row",
        effect: "Click: Reroll all selected basic dice.",
        checkFunc: ck_quantum_computer;
        used: false,
        shown: false,
    },
    {
        id: 13,
        name: "Monopole",
        cost: "three odd. All your other dices must be odd",
        effect: "Start of turn: Gain a fixed die of odd value.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 14,
        name: "Reactor20",
        cost: "sum=20",
        effect: "Click: 1 dice>Split its value into 2 dice",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 15,
        name: "Energy Saver",
        cost: "four of a kind",
        effect: "End of turn: If you have two more dice, roll two extra in the next turn",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 16,
        name: "Recycing",
        cost: "three of a kind",
        effect: "when you spend a wild die, roll an extra at the start of next round.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 17,
        name: "Tourist Attraction",
        cost: "1, 2, 3",
        effect: "Start of turn: Roll one extra dice per project built",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 18,
        name: "Selfrepair Material",
        cost: "four of a kind",
        effect: "End of turn: If you have no non-preserved dice, roll two more in the next turn",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 19,
        name: "Observatory",
        cost: "4, 5, 6",
        effect: "Enter play: draw a card. Gain 1 more M.O.D. when you discard a card",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 20,
        name: "Dormant Chamber",
        cost: "1, 3, 5",
        effect: "Click: A die > fix and preserve it.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 21,
        name: "Prototype",
        cost: "three in a row",
        effect: "Start of turn: Gain a fixed die of random value.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 22,
        name: "Reactor25",
        cost: "Sum=25",
        effect: "Click: 1 die > a die of its value + 1 and a die of its value - 1",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 23,
        name: "Extractor",
        cost: "4, 5, 6",
        effect: "Click: A pair > A Preserved Wild",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 24,
        name: "Settlement",
        cost: "four in a row",
        effect: "Start of turn: Roll a basic die",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 25,
        name: "Bionic Robot",
        cost: "four of a kind ",
        effect: "When reroll: If exactly one die is rerolled, gain a basic die",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 26,
        name: "ThreeD Printer",
        cost: "1, 2, 3",
        effect: "Click: 1 > A wild die",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 27,
        name: "Transporter",
        cost: "2, 4, 6",
        effect: "Start of turn: +1 M.O.D.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 28,
        name: "OMNI",
        cost: "five of a kind ",
        effect: "Start of turn: gain and preserve a wild die.",
        checkFunc: 
        used: false,
        shown: false,
    },
    {
        id: 29,
        name: "Reactor16",
        cost: "Sum=16",
        effect: "2 dice>equally distribute their value",
        checkFunc: 
        used: false,
        shown: false,
    }
];
