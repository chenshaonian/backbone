(function(){


window.App = {
	Models: {},
	Views: {},
	Collections: {},
	Helper:{},
	Router:{}
};

var vent = _.extend( { }, Backbone.Events );

App.Views.Appointment = Backbone.View.extend({
	
	initialize: function(){
		vent.on('appointment:show', this.appointmentshow, this);
	},
	appointmentshow:function(){
		console.log('appointmentshow!!!');
	}

});

App.Router =  Backbone.Router.extend({
	routes:{
		'':'index',
		'appointment':'showappointment'
	},
	index: function(){

	},
	showappointment: function(appointmentId){
		vent.trigger('appointment:show','appointmentId');
	}
});

new App.Views.Appointment;

new App.Router;

Backbone.history.start();

})();
