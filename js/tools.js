
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min+0.999999999)) + min;
}

function getKRandom(k, min, max) {
    var randoms = new Array();
    for(let i = 0; i < k; i++) {
        let cur_random;
        do {
            cur_random = getRandomInt(min, max);
        } while(randoms.indexOf(cur_random) != -1);
        randoms[i] = cur_random;
    }
    return randoms;
}
