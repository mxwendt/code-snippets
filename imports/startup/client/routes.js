// This is not needed at this version of the router: import { Router } from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', { main: "home" });
    }
});

FlowRouter.route('/array', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', { main: "array" });
    }
});