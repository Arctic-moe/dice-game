
function update_colonies() {
    var colonies_bar = document.getElementById("colonies-bar");
    colonies_bar.innerHTML = "";
    for(let i = 0; i < colonies.length; ++i) {
        let new_child = document.createElement('button');
        if (colonies[i].used == 0 && colonies[i].active == 1) {
            console.log(i, colonies[i].used, colonies[i].active, colonies[i].name);
            new_child.setAttribute('class','card active');
        } else {
            new_child.setAttribute('class','card');
        }
        if (colonies[i].type == 2) {
            
            new_child.onclick = colonies[i].event;
            // console.log('bind!' , i, new_child.onclick);
        }
        let child_1 = document.createElement('div');
        child_1.setAttribute('class', 'panel-heading');
        child_1.innerHTML = `${colonies[i].name}`;
        let child_2 = document.createElement('div');
        child_2.setAttribute('class', 'panel-body');
        child_2.innerHTML = `${colonies[i].effect}`;
        new_child.appendChild(child_1);
        new_child.appendChild(child_2);
        colonies_bar.appendChild(new_child);

        if(colonies[i].type == 1) {
            start_of_turn.push(colonies[i].event);
        } else if (colonies[i].type == 3) {
            end_of_turn.push(colonies[i].event);
        }
    }
}

function update_blueprints() {
    var blueprints_bar = document.getElementById("blueprints-bar");
    blueprints_bar.innerHTML = "";
    for(let i = 0; i < blueprints.length; ++i) {
        let new_child = document.createElement('button');
        new_child.setAttribute('class', 'card');
        new_child.setAttribute('idx', blueprints[i].id);
        new_child.onclick = (event)=>{
            let id = event.target.getAttribute('idx');
            let idx = -1;
            for(let i = 0; i < blueprints.length; i++) {
                if(id == blueprints[i].id) {
                    idx = i;
                    break;
                }
            }
            if(idx < 0) return;
            let item = blueprints[i];
            if(!item.checkFunc()) return;
            item.comsumeFunc();
            colonies.push({id: item.id+5, name: item.name, effect: item.effect, type: item.type, event: item.type, used: 0, active: 1});
            blueprints.splice(i, 1);
            update_all();
        };
        new_child.innerHTML = `${blueprints[i].name}<br><br>${blueprints[i].effect}<br><br>cost: ${blueprints[i].cost}`
        blueprints_bar.appendChild(new_child);
    }
}

function update_projects() {
    var projects_bar = document.getElementById("projects-bar");
    projects_bar.innerHTML = "";
    for(let i = 0; i < projects.length; ++i) {
        let new_child = document.createElement('button');
        new_child.setAttribute('class','card');
        new_child.innerHTML = `${all_projects[projects[i]].name}<br><br>cost: ${all_projects[projects[i]].cost}`

        projects_bar.appendChild(new_child);
    }
}

function update_dice() {
    var dice_bar = document.getElementById("dice-bar");
    var wild_dice_bar = document.getElementById("wild-dice-bar");
    dice_bar.innerHTML = "";
    wild_dice_bar.innerHTML = "";
    selected_dice = [];
    for(let i = 0; i < dice.length; ++i) {
        dice[i].active = 0; 
        let new_child = document.createElement('button');
        new_child.setAttribute('class','dice');
        if(dice[i].wild == 1) {
            new_child.classList.add('wild');
        }
        new_child.onclick = (event)=> {
            dice[i].active = (dice[i].active == 1 ? 0: 1);
            if(selected_dice.indexOf(i) != -1 && dice[i].active == 0) {
                selected_dice.splice(selected_dice.indexOf(i), 1);
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active');
                }
            }
            if(selected_dice.indexOf(i) == -1 && dice[i].active == 1) {
                selected_dice.push(i);
                if (!event.target.classList.contains('active')) {
                    event.target.classList.add('active');
                }
            }
            console.log(selected_dice);
        };
        new_child.innerHTML = `${dice[i].point}`

        if(dice[i].wild == 0) {
            dice_bar.appendChild(new_child);
        } else {
            wild_dice_bar.appendChild(new_child);
        }
    }
}

function update_energy() {
    document.getElementById('energy-panel').innerHTML = global.energy;
}

function update_all() {
    update_colonies();
    update_blueprints();
    update_projects();
    update_dice();
    update_energy();
}

// data
var blueprints = [];
var projects = [];
var selected_dice = [];
var dice = [];
var wild_dice = [];

var start_of_turn = new Array();
var end_of_turn = new Array();

const max_turn = 10;

var global = {
    now_trun: 0,
    energy: 100
}

function active_colony() {
    colonies.forEach((item)=>{
        item.used = 0;
    });
}

function run_round() {
    for(let i = 0; i < end_of_turn.length; ++i) {
        end_of_turn[i]();
    }
    global.now_trun++;
    start_of_turn = [];
    end_of_turn = [];
    update_all();
    active_colony();
    for(let i = 0; i < start_of_turn.length; ++i) {
        start_of_turn[i]();
    }
    update_all();
}

function main() {
    let tmp_array = getKRandom(3, 0, 29);
    tmp_array.sort();
    tmp_array.forEach((i)=>{
        blueprints.push(all_blueprints[i]);
    });
    for(let i = tmp_array.length-1; i >= 0; i--) {
        console.log(tmp_array[i]);
        all_blueprints.splice(tmp_array[i], 1);
    }

    projects = getKRandom(4, 0, 9);

    document.getElementById('plus-btn').onclick = ()=>{
        let cnt = 0;
        selected_dice.forEach((idx)=>{
            if(dice[idx].wild == 0 && dice[idx].point < 6) cnt++;
        });
        if(cnt > global.energy) {
            return;
        }
        selected_dice.forEach((idx)=>{
            if(dice[idx].wild == 0 && dice[idx].point < 6) {
                global.energy--;
                dice[idx].point++;
            } else if(dice[idx].wild == 1 && dice[idx].point < 6) {
                dice[idx].point++;
            }
        });
        update_dice();
        update_energy();
    };

    document.getElementById('minus-btn').onclick = ()=>{
        let cnt = 0;
        selected_dice.forEach((idx)=>{
            if(dice[idx].wild == 0 && dice[idx].point > 1) cnt++;
        });
        if(cnt > global.energy) {
            return;
        }
        selected_dice.forEach((idx)=>{
            if(dice[idx].wild == 0 && dice[idx].point > 1) {
                global.energy--;
                dice[idx].point--;
            } else if(dice[idx].wild == 1 && dice[idx].point > 1) {
                dice[idx].point--;
            }
        });
        update_dice();
        update_energy();
    };

    run_round();
}

main();