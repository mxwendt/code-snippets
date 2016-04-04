import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

import './elife-code.html';

Template.elifeCode.onRendered(function() {
    for (var elem of document.querySelectorAll('.comment, .output, .focusChangeWrapper')) {
        elem.classList.add('is-hidden');
    }

    Session.set('vectorX', 0);
    Session.set('vectorY', 0);
    Session.set('vectorOtherX', 0);
    Session.set('vectorOtherY', 0);
    Session.set('gridW', 5);
    Session.set('gridH', 5);
    Session.set('gridInsideVectorX', 0);
    Session.set('gridInsideVectorY', 0);
    Session.set('gridGetVectorX', 0);
    Session.set('gridGetVectorY', 0);
    Session.set('gridSetVectorX', 0);
    Session.set('gridSetVectorY', 0);
    Session.set('gridSetValue', '#');
});

Template.elifeCode.helpers({
    showState: function() {
        return document.getElementById('showState').checked;
    },
    vectorX: function() {
        return Session.get('vectorX');
    },
    vectorY: function() {
        return Session.get('vectorY');
    },
    vectorOtherX: function() {
        return Session.get('vectorOtherX');
    },
    vectorOtherY: function() {
        return Session.get('vectorOtherY');
    },
    vectorReturn: function () {
        return '{ x: ' + (Number(Session.get('vectorX')) + Number(Session.get('vectorOtherX'))) + ', y: ' + (Number(Session.get('vectorY')) + Number(Session.get('vectorOtherY'))) + ' }';
    },
    gridW: function() {
        return Session.get('gridW');
    },
    gridH: function() {
        return Session.get('gridH');
    },
    gridSpace: function () {
        return '[' + (Number(Session.get('gridW')) * Number(Session.get('gridH'))) + ']';
    },
    gridInsideVectorX: function() {
        return Session.get('gridInsideVectorX');
    },
    gridInsideVectorY: function() {
        return Session.get('gridInsideVectorY');
    },
    gridInsideCondition: function() {
        return '( ' + Session.get('gridInsideVectorX') + ' >= 0 && ' + Session.get('gridInsideVectorX') + ' < ' + Session.get('gridW') + ' && ' + Session.get('gridInsideVectorY') + ' >= 0 && ' + Session.get('gridInsideVectorY') + ' < ' + Session.get('gridH') + ' ) ';
    },
    gridInsideReturn: function() {
        return String(eval(Session.get('gridInsideVectorX') + ' >= 0 &&' + Session.get('gridInsideVectorX') + ' < ' + Session.get('gridW') + ' && ' + Session.get('gridInsideVectorY') + ' >= 0 && ' + Session.get('gridInsideVectorY') + ' < ' + Session.get('gridH')));
    },
    gridGetVectorX: function() {
        return Session.get('gridGetVectorX');
    },
    gridGetVectorY: function() {
        return Session.get('gridGetVectorY');
    },
    gridGetReturn: function () {
        return '?';
    },
    gridSetVectorX: function() {
        return Session.get('gridSetVectorX');
    },
    gridSetVectorY: function() {
        return Session.get('gridSetVectorY');
    },
    gridSetValue: function () {
        return Session.get('gridSetValue');
    },
    gridSetValueSpace: function() {
        return (Number(Session.get('gridSetVectorX')) + Number(Session.get('gridW')) * Number(Session.get('gridSetVectorY')));
    }
});

Template.elifeCode.events({
    'change input#showState': function (e) {
        for (var elem of document.querySelectorAll('.comment, .output, .focusChangeWrapper')) {
            elem.classList.toggle('is-hidden');
        }
        removeLineHighlights();
    },
    'input input#vectorX': function(e) {
        Session.set('vectorX', e.target.value);
        addLineHighlights('.vectorX');
    },
    'focusin input#vectorX, focusin input#vectorY': function (e) {
        if (document.getElementById('focusChange').checked) {
            for (var elem of document.querySelectorAll('.comment')) {
                if (! elem.classList.contains('vectorX')) {
                    elem.classList.add('is-hidden');
                }
            }
            for (var elem of document.querySelectorAll('.code')) {
                if (! elem.classList.contains('vectorX')) {
                    elem.classList.add('is-hidden');
                }
                if (elem.classList.contains('vectorX')) {
                    console.log(elem.previousElementSibling);
                    elem.previousElementSibling.classList.remove('is-hidden');
                    console.log(elem.nextElementSibling);
                    elem.nextElementSibling.classList.remove('is-hidden');
                }
            }
        }
    },
    'focusout input#vectorX, focusout input#vectorY': function (e) {
        if (document.getElementById('focusChange').checked) {
            for (var elem of document.querySelectorAll('.comment')) {
                elem.classList.remove('is-hidden');
            }
        }
    },
    'input input#vectorY': function(e) {
        Session.set('vectorY', e.target.value);
        addLineHighlights('.vectorY');
    },
    'input input#vectorOtherX': function(e) {
        Session.set('vectorOtherX', e.target.value);
        addLineHighlights('.vectorOtherX');
    },
    'input input#vectorOtherY': function(e) {
        Session.set('vectorOtherY', e.target.value);
        addLineHighlights('.vectorOtherY');
    },
    'input input#gridW': function(e) {
        Session.set('gridW', e.target.value);
        addLineHighlights('.gridW');
    },
    'input input#gridH': function(e) {
        Session.set('gridH', e.target.value);
        addLineHighlights('.gridH');
    },
    'input input#gridInsideVectorX': function(e) {
        Session.set('gridInsideVectorX', e.target.value);
        addLineHighlights('.gridInsideVectorX');
    },
    'input input#gridInsideVectorY': function(e) {
        Session.set('gridInsideVectorY', e.target.value);
        addLineHighlights('.gridInsideVectorY');
    },
    'input input#gridGetVectorX': function(e) {
        Session.set('gridGetVectorX', e.target.value);
        addLineHighlights('.gridGetVectorX');
    },
    'input input#gridGetVectorY': function(e) {
        Session.set('gridGetVectorY', e.target.value);
        addLineHighlights('.gridGetVectorY');
    },
    'input input#gridSetVectorX': function(e) {
        Session.set('gridSetVectorX', e.target.value);
        addLineHighlights('.gridSetVectorX');
    },
    'input input#gridSetVectorY': function(e) {
        Session.set('gridSetVectorY', e.target.value);
        addLineHighlights('.gridSetVectorY');
    },
    'input select#gridSetValue': function (e) {
        Session.set('gridSetValue', e.target.value);
        addLineHighlights('.gridSetValue');
    }
});

function addLineHighlights(selector) {
    removeLineHighlights();
    for (var line of document.querySelectorAll(selector)) {
        line.classList.add('is-highlighted');
    }
    for (var line of document.querySelectorAll(selector + 'Dep')) {
        line.classList.add('is-highlighted--dep');
    }
}

function removeLineHighlights() {
    for (var line of document.querySelectorAll('.is-highlighted')) {
        line.classList.remove('is-highlighted');
    }
    for (var line of document.querySelectorAll('.is-highlighted--dep')) {
        line.classList.remove('is-highlighted--dep');
    }
}

/*
var plan = ["############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"];

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

var directions = {
    "n":  new Vector( 0, -1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0,  1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {type: "move", direction: this.direction};
};

function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new Vector(x, y),
                elementFromChar(legend, line[x]));
    });
}

function charFromElement(element) {
    if (element == null)
        return " ";
    else
        return element.originChar;
}

World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};

function Wall() {}

var world = new World(plan, {"#": Wall,
    "o": BouncingCritter});
//   #      #    #      o      ##
//   #                          #
//   #          #####           #
//   ##         #   #    ##     #
//   ###           ##     #     #
//   #           ###      #     #
//   #   ####                   #
//   #   ##       o             #
//   # o  #         o       ### #
//   #    #                     #
//   ############################
*/