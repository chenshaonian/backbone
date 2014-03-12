(function(){

window.App = {
	Models:{},
	Views:{},
	Collections:{},
	Data:{}
};

window.template = function(id){
	alert(id);
	alert($('#'+id).html());
	return _.template( $('#'+id).html() );
};


App.Models.Task = Backbone.Model.extend({
	default:{
		title:''
	},

	initialize:function(){
		console.log('you create me with the title : ' + 
					this.get('title'));
	}

});

App.Views.Task = Backbone.View.extend({
	tagName: 'li',


	template:template('taskTemplate'), 

	render:function(){
		console.log(this.model);
		var title = this.model.get('title');
		console.log(this.model.toJSON());

		// var template = t his.template(this.model.toJSON());

		this.$el.html(template);
		// this.$el.html(template(title).toJSON());
	}
});

var task = new App.Models.Task({title: 'go to wc..'},this);

var view = new App.Views.Task({model: task});

view.render();









})()