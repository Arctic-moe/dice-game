function check_colony(col_id) {
    let self;
    colonies.forEach((item)=>{
        if(item.id == col_id) {
            self = item;
        }
    });
    console.log(self);
    if((typeof(self) == 'undefined') || (self.used == 1)) {
        return;
    }
    else {
        return self;
    }
}

function evt_headquarter() {
    const col_id = 1;
    let self = check_colony(col_id);
    if(typeof(self) == 'undefined') return;
    let new_dice = getKRandom(4, 1, 6);
    new_dice.forEach((idx)=>{
        dice.push({point: idx, active: 0, wild: 0});
    });
    self.used = 1;
    console.log(dice);
}

function evt_command_center() {
    const col_id = 2;
    let self = check_colony(col_id);
    console.log(self);
    if(typeof(self) == 'undefined') return;
    if(selected_dice.length == 0) return;
    console.log('reroll');
    selected_dice.forEach((idx)=>{
        if(dice[idx].wild == 0) {
            dice[idx] = {point: getRandomInt(1, 6), active: 0, wild: 0};
        }
    });
    self.used = 1;
    update_dice();
    update_colonies();
}

function evt_laboratory() {
    const col_id = 3;
    let self = check_colony(col_id);
    if(typeof(self) == 'undefined') return;
    if(selected_dice.length != 2) return;
    let x = selected_dice[0], y = selected_dice[1];
    console.log(dice[x].point, dice[y].point);
    if(dice[x].point != dice[y].point) return;
    self.used = 1;
    if(x > y) {
        let tmp = y;
        y = x;
        x = tmp;
    }
    dice.splice(y, 1);
    dice.splice(x, 1);
    update_dice();
    update_colonies();
    let k = getRandomInt(0, all_blueprints.length-1);
    blueprints.push(all_blueprints[k]);
    blueprints.splice(k, 1);
    update_blueprints();
    console.log(dice);
}

function evt_forge() {
    const col_id = 4;
    let self = check_colony(col_id);
    if(typeof(self) == 'undefined') return;
    if(selected_dice.length != 3) return;
    let arr = [];
    for(var i = 0; i < 3; ++i) {
        arr.push(dice[selected_dice[i]].point);
    }
    arr.sort();
    console.log(arr);
    if(arr[0] != arr[1] -1 || arr[0] != arr[2] -2 ) return;
    self.used = 1;
    console.log('hello');
    selected_dice.sort();
    for(let i = selected_dice.length-1; i >= 0; i--) {
        console.log( dice.splice(selected_dice[i], 1) );
        console.log(selected_dice[i]);
    }
    dice.push({point:3, active:0, wild: 1});
    update_dice();
    update_colonies();
    
    console.log(colonies);
}

let colonies = [
    {
        "id": 1,
        "name": "Headquarter",
        "effect": "Start of turn: Roll 4 Basic dice",
        type: 1,
        event: evt_headquarter,
        used: 0,
        active: 1
    },
    {
        "id": 2,
        "name": "Command Center",
        "effect": "Click: Reroll all selected basic dice",
        type: 2,
        event: evt_command_center,
        used: 0,
        active: 1
    },
    {
        "id": 3,
        "name": "Laboratory",
        "effect": "A pair > Draw a Blueprint.",
        type: 2,
        event: evt_laboratory,
        used: 0,
        active: 1
    },
    {
        "id": 4,
        "name": "Forge",
        "effect": "Click: Three in a row > Gain a perserved Wild die",
        type: 2,
        event: evt_forge,
        used: 0,
        active: 1
    }
];
