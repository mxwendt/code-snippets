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

    // State Changes

    'input input#vectorX': function(e) {
        Session.set('vectorX', e.target.value);
        addLineHighlights('.vectorX');
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
    },

    // Focus Mode

    'mousedown input#vectorX': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOn('vectorX');
        }
    },
    'mouseup input#vectorX': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOff();
        }
    },
    'mousedown input#vectorY': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOn('vectorY');
        }
    },
    'mouseup input#vectorY': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOff();
        }
    },
    'mousedown input#gridW': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOn('gridW');
        }
    },
    'mouseup input#gridW': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOff();
        }
    },
    'mousedown input#gridH': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOn('gridH');
        }
    },
    'mouseup input#gridH': function (e) {
        if (document.getElementById('focusChange').checked) {
            focusOff();
        }
    }
});

function focusOn(selector) {
    // Hide all uneffected comments
    for (var comment of document.querySelectorAll('.comment')) {
        if (! comment.classList.contains(selector + 'Comment')) {
            comment.classList.add('is-hidden');
        }
    }
    // Hide all uneffected lines of code
    for (var loc of document.querySelectorAll('.code')) {
        if (! loc.classList.contains(selector + 'Code')) {
            loc.classList.add('is-hidden');
        }
    }
}

function focusOff() {
    // Show all comments and lines of code again
    for (var elem of document.querySelectorAll('.comment')) {
        if (elem.classList.contains('is-hidden')) elem.classList.remove('is-hidden');
    }
    for (var elem of document.querySelectorAll('.code')) {
        if (elem.classList.contains('is-hidden')) elem.classList.remove('is-hidden');
    }
}

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