key_codes = {
    37: 'left',
    39: 'right'
};

keys_down = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
};

window.addEventListener('keydown', function(e) {
    keys_down[key_codes[e.keyCode]] = true;
});

window.addEventListener('keyup', function(e) {
    keys_down[key_codes[e.keyCode]] = false;
});

module.exports = {
    keys_down: keys_down,
    key_codes: key_codes
};