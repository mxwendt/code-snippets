// This is not needed at this version of the router: import { Router } from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log("root");
    }
});

FlowRouter.route('/test', {
    action: function(params, queryParams) {
        console.log("test");
    }
});