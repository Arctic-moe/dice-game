
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
    let flag = true;
    for(let i = 1; i < a; i++) {
        if(arr[0] != arr[i]) flag = false;
    }
    for(let i = a+1; i < a+b; i++) {
        if(arr[a] != arr[i]) flag = false;
    }
    if(flag) return flag;
    flag = false;
    { let tmp = b; b = a; a = tmp; }
    for(let i = 1; i < a; i++) {
        if(arr[0] != arr[i]) flag = false;
    }
    for(let i = a+1; i < a+b; i++) {
        if(arr[a] != arr[i]) flag = false;
    }
    return flag;
}

function ck_dome(mode) {
    if(mode == 0) {
        return check_a_and_b(3, 2);
    } else {
        if(!check_a_and_b(3, 2)) return false;
        clear_selected_dice();
        return true;
    }
}

// four of a kind
function ck_prospector(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(4);
    } else {
        if(!check_k_in_a_kind(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_shuttle(mode) {
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

function ck_replicant_robot(mode) {
    if(mode == 0) {
        return check_k_wild(2);
    } else {
        if(!check_k_wild(2)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_quantum_computer(mode) {
    if(mode == 0) {
        return check_a_and_b(2, 2);
    } else {
        if(!check_a_and_b(2, 2)) return false;
        clear_selected_dice();
        return true;
    }
}

function check_k_odd(k) {
    if(selected_dice.length != k) return false;
    for(let i = 0; i < k; ++i) {
        if(dice[selected_dice[i]].point %2 == 0) return false;
    }
    return true;
}

function check_all_odd(mode) {
    for(let i = 0; i < dice.length; ++i) {
        if(dice[i].point %2 == 0) return false;
    }
    return true;
}

function ck_monopole(mode) {
    if(mode == 0) {
        return check_k_odd(3) && check_all_odd();
    } else {
        if(!check_k_odd(3) || !check_all_odd()) return false;
        clear_selected_dice();
        return true;
    }
}

function check_sum(target) {
    let sum = 0;
    for(let i = 0; i < dice.length; ++i) {
        sum += dice[i].point;
    }
    return sum == target;
}

function ck_reactor20(mode) {
    if(mode == 0) {
        return check_sum(20);
    } else {
        if(!check_sum(20) || selected_dice.length != 1 || dice[selected_dice[0]].wild != 0) return false;
        dice.push({point: Math.floor(dice[selected_dice[0]].point / 2), active: 0, wild: 0, preserved: dice[selected_dice[0]].preserved});
        dice.push({point: Math.ceil(dice[selected_dice[0]].point / 2), active: 0, wild: 0, preserved: dice[selected_dice[0]].preserved});
        clear_selected_dice();
        return true;
    }
}

function ck_energy_saver(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(4);
    } else {
        if(!check_k_in_a_kind(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_recycing(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(3);
    } else {
        if(!check_k_in_a_kind(3)) return false;
        clear_selected_dice();
        return true;
    }
}

function check_array(x) {
    if(x.length != selected_dice.length) return false;
    let arr = [];
    selected_dice.forEach((i)=>{
        arr.push(dice[i].point);
    });
    arr.sort();
    x.sort();
    for(let i = 0; i < x.length; i++) {
        if(arr[i] != x[i]) return false;
    }
    return true;
}

function ck_tourist_attraction(mode) {
    if(mode == 0) {
        return check_array([1,2,3]);
    } else {
        if(!check_array([1,2,3])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_selfrepair_material(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(4);
    } else {
        if(!check_k_in_a_kind(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_observatory(mode) {
    if(mode == 0) {
        return check_array([4,5,6]);
    } else {
        if(!check_array([4,5,6])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_dormant_chamber(mode) {
    if(mode == 0) {
        return check_array([1,3,5]);
    } else {
        if(!check_array([1,3,5])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_prototype(mode) {
    if(mode == 0) {
        return check_k_in_a_row(3);
    } else {
        if(!check_k_in_a_row(3)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_reactor25(mode) {
    if(mode == 0) {
        return check_sum(25);
    } else {
        if(!check_sum(25)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_extractor(mode) {
    if(mode == 0) {
        return check_array([4,5,6]);
    } else {
        if(!check_array([4,5,6])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_settlement(mode) {
    if(mode == 0) {
        return check_k_in_a_row(4);
    } else {
        if(!check_k_in_a_row(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_bionic_robot(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(4);
    } else {
        if(!check_k_in_a_kind(4)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_threeD_printer(mode) {
    if(mode == 0) {
        return check_array([1,2,3]);
    } else {
        if(!check_array([1,2,3])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_transporter(mode) {
    if(mode == 0) {
        return check_array([2,4,6]);
    } else {
        if(!check_array([2,4,6])) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_OMNI(mode) {
    if(mode == 0) {
        return check_k_in_a_kind(5);
    } else {
        if(!check_k_in_a_kind(5)) return false;
        clear_selected_dice();
        return true;
    }
}

function ck_reactor16(mode) {
    if(mode == 0) {
        return check_sum(16);
    } else {
        if(!check_sum(16)) return false;
        clear_selected_dice();
        return true;
    }
}

let all_blueprints = [
    {
        id: 0,
        name: "Minor Settlement",
        cost: "three in a row",
        effect: "Start of even round: Roll a Basic die",
        checkFunc: ck_minor_settlement,
        consumeFunc: ()=>{
            const col_id = 5;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: getRandomInt(1,6), active: 0, wild: 0, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 4,
        used: false,
        shown: false,
    },
    {
        id: 1,
        name: "Clone Machine",
        cost: "five in a row",
        effect: "Click: Select a die, generate a fixed copy of it",
        checkFunc: ck_clone_machine,
        consumeFunc: ()=>{
            const col_id = 6;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            if(selected_dice.length != 1) return;
            dice.push({point: dice[selected_dice[0]].point, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 2,
        used: false,
        shown: false,
    },
    {
        id: 2,
        name: "Drone6",
        cost: "6, 6, 6",
        effect: "Start of turn: Gain a fixed 6",
        checkFunc: ck_drone6,
        consumeFunc: ()=>{
            const col_id = 7;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 6, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 3,
        name: "Drone5",
        cost: "5, 5, 5",
        effect: "Start of turn: Gain a fixed 5",
        checkFunc: ck_drone5,
        consumeFunc: ()=>{
            const col_id = 8;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 5, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 4,
        name: "Drone4",
        cost: "4, 4, 4",
        effect: "Start of turn: Gain a fixed 4",
        checkFunc: ck_drone4,
        consumeFunc: ()=>{
            const col_id = 9;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 4, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 5,
        name: "Drone3",
        cost: "3, 3, 3",
        effect: "Start of turn: Gain a fixed 3",
        checkFunc: ck_drone3,
        consumeFunc: ()=>{
            const col_id = 10;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 3, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 6,
        name: "Drone2",
        cost: "2, 2, 2",
        effect: "Start of turn: Gain a fixed 2",
        checkFunc: ck_drone2,
        consumeFunc: ()=>{
            const col_id = 11;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 2, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 7,
        name: "Drone1",
        cost: "1, 1, 1",
        effect: "Start of turn: Gain a fixed 1",
        checkFunc: ck_drone1,
        consumeFunc: ()=>{
            const col_id = 12;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 1, active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 8,
        name: "Dome",
        cost: "fullhouse",
        effect: "Start of turn: Roll a basic dice and preserve it",
        checkFunc: ck_dome,
        consumeFunc: ()=>{
            const col_id = 13;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 5, active: 0, wild: 0, preserved: 1});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 9,
        name: "Prospector",
        cost: "four of a kind",
        effect: "Start of turn: Roll a die, fix and preserve it",
        checkFunc: ck_prospector,
        consumeFunc: ()=>{
            const col_id = 14;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: getRandomInt(1, 6), active: 0, wild: 2, preserved: 1});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 10,
        name: "Shuttle",
        cost: "three of a kind",
        effect: "Enter play: +2 M.O.D. You may mod 6 into 1 or 1 into 6",
        checkFunc: ck_shuttle,
        consumeFunc: ()=>{
            const col_id = 15;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: getRandomInt(1, 6), active: 0, wild: 2, preserved: 1});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 0, //不知道enter play是什么阶段
        used: false,
        shown: false,
    },
    {
        id: 11,
        name: "Replicant Robot",
        cost: "two wild",
        effect: "Start of turn: Gain a wild die",
        checkFunc: ck_replicant_robot,
        consumeFunc: ()=>{
            const col_id = 16;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: 3, active: 0, wild: 0, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 12,
        name: "Quantum Computer",
        cost: "two pairs in a row",
        effect: "Click: Reroll all selected basic dice.",
        checkFunc: ck_quantum_computer,
        consumeFunc: ()=>{
            const col_id = 17;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            selected_dice.forEach((idx)=>{
                if(dice[idx].wild == 0) {
                    dice[idx] = {point: getRandomInt(1, 6), active: 0, wild: 0, preserved: dice[idx].preserved};
                }
            });
            self.used = 1;
            update_dice();
            update_colonies();
        },
        type: 2,
        used: false,
        shown: false,
    },
    {
        id: 13,
        name: "Monopole",
        cost: "three odd. All your other dice must be odd",
        effect: "Start of turn: Gain a fixed die of odd value.",
        checkFunc: ck_monopole,
        consumeFunc: ()=>{
            const col_id = 18;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            dice.push({point: getRandomInt(1, 3) * 2 -1 , active: 0, wild: 2, preserved: 0});
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 14,
        name: "Reactor20",
        cost: "sum=20",
        effect: "Click: 1 dice>Split its value into 2 dice",
        checkFunc: ck_reactor20,
        consumeFunc: ()=>{
            const col_id = 19;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 2,
        used: false,
        shown: false,
    },
    {
        id: 15,
        name: "Energy Saver",
        cost: "four of a kind",
        effect: "End of turn: If you have two more dice, roll two extra in the next turn",
        checkFunc: ck_energy_saver,
        consumeFunc: ()=>{
            const col_id = 20;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            if(dice.length > 2) global.extra_roll += 2;
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 3,
        used: false,
        shown: false,
    },
    {
        id: 16,
        name: "Recycing",
        cost: "three of a kind",
        effect: "when you spend a wild die, roll an extra at the start of next round.",
        checkFunc: ck_recycing,
        consumeFunc: (k)=>{
            const col_id = 21;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            global.extra_roll++;
            self.used = 1;
            update_colonies();
        },
        type: 5, // trigger at spend a wild die
        used: false,
        shown: false,
    },
    {
        id: 17,
        name: "Tourist Attraction",
        cost: "1, 2, 3",
        effect: "Start of turn: Roll one extra dice per project built",
        checkFunc: ck_tourist_attraction,
        consumeFunc: ()=>{
            const col_id = 22;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            global.extra_roll += projects.length;
            self.used = 1;
            update_colonies();
        },
        type: 1,
        used: false,
        shown: false,
    },
    {
        id: 18,
        name: "Selfrepair Material",
        cost: "four of a kind",
        effect: "End of turn: If you have no non-preserved dice, roll two more in the next turn",
        checkFunc: ck_selfrepair_material,
        consumeFunc: ()=>{
            const col_id = 23;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            let cnt = 0;
            dice.forEach((item)=>{
                if(item.preserved == 1) cnt++;
            });
            if(cnt == 0) global.extra_roll += 2;
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 3, // end of turn
        used: false,
        shown: false,
    },
    {
        id: 19,
        name: "Observatory",
        cost: "4, 5, 6",
        effect: "Enter play: draw a card. Gain 1 more M.O.D. when you discard a card",
        checkFunc: ck_observatory,
        consumeFunc: ()=>{
            const col_id = 24;
            let self = check_colony(col_id);
            if(typeof(self) == 'undefined') return;
            self.used = 1;
            update_colonies();
            update_dice();
        },
        type: 0, // enter play?
        used: false,
        shown: false,
    },
    {
        id: 20,
        name: "Dormant Chamber",
        cost: "1, 3, 5",
        effect: "Click: A die > fix and preserve it.",
        checkFunc: ck_dormant_chamber,
        used: false,
        shown: false,
    },
    {
        id: 21,
        name: "Prototype",
        cost: "three in a row",
        effect: "Start of turn: Gain a fixed die of random value.",
        checkFunc: ck_prototype,
        used: false,
        shown: false,
    },
    {
        id: 22,
        name: "Reactor25",
        cost: "Sum=25",
        effect: "Click: 1 die > a die of its value + 1 and a die of its value - 1",
        checkFunc: ck_reactor25,
        used: false,
        shown: false,
    },
    {
        id: 23,
        name: "Extractor",
        cost: "4, 5, 6",
        effect: "Click: A pair > A Preserved Wild",
        checkFunc: ck_extractor,
        used: false,
        shown: false,
    },
    {
        id: 24,
        name: "Settlement",
        cost: "four in a row",
        effect: "Start of turn: Roll a basic die",
        checkFunc: ck_settlement,
        used: false,
        shown: false,
    },
    {
        id: 25,
        name: "Bionic Robot",
        cost: "four of a kind",
        effect: "When reroll: If exactly one die is rerolled, gain a basic die",
        checkFunc: ck_bionic_robot,
        used: false,
        shown: false,
    },
    {
        id: 26,
        name: "ThreeD Printer",
        cost: "1, 2, 3",
        effect: "Click: 1 > A wild die",
        checkFunc: ck_threeD_printer,
        used: false,
        shown: false,
    },
    {
        id: 27,
        name: "Transporter",
        cost: "2, 4, 6",
        effect: "Start of turn: +1 M.O.D.",
        checkFunc: ck_transporter,
        used: false,
        shown: false,
    },
    {
        id: 28,
        name: "OMNI",
        cost: "five of a kind ",
        effect: "Start of turn: gain and preserve a wild die.",
        checkFunc: ck_OMNI,
        used: false,
        shown: false,
    },
    {
        id: 29,
        name: "Reactor16",
        cost: "Sum=16",
        effect: "2 dice>equally distribute their value",
        checkFunc: ck_reactor16,
        used: false,
        shown: false,
    }
];
