(function(){


window.App = {
	Models: {},
	Views: {},
	Collections: {},
	Helper:{}
};

window.template = function(id){
	return _.template( $('#'+id).html() );
};





App.Models.Task = Backbone.Model.extend({
	validate:function(attrs){
		if( !$.trim(attrs.title) ){
			return 'name cant be null'
		}
	}
});

App.Collections.Tasks = Backbone.Collection.extend({
	model: App.Models.Task
});

App.Views.Tasks = Backbone.View.extend({
	tagName: 'ul',

	initialize:function(){
		this.collection.on('add', this.addOne, this);
	},

	render: function(){

		this.collection.each(this.addOne, this);
		return this;
	},
	addOne: function(task){
		//create a new child view
		var taskview = new App.Views.Task({ model: task });
		//append to the root element
		this.$el.append(taskview.render().el);

	}
})

App.Views.Task = Backbone.View.extend({
	tagName: 'li',

	template:template('taskTemplate'), 

	//bind model and view
	initialize:function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events:{
		'click .edit':'editTask',
		'click .delete':'destroy'
	},
	editTask:function(){
		// alert('you click me.');
		var newTask = prompt('what do you want to change?');
		this.model.set('title',newTask);
	},
	destroy:function(){
		this.model.destroy();
	},
	remove:function()
	{
		this.$el.remove();
	},

	render :function(){
		var template = this.template(this.model.toJSON());
		this.$el.html( template );
		return this;
	}
});
App.Views.AddTask = Backbone.View.extend({
	el:'#addTask',

	events:{
		'submit':'submit'
	},
	submit:function(e){
		console.log(123);
		e.preventDefault();
		var newTitle = $('.title').val();
		console.log(newTitle);
		var newPriority = $('.priority').val();
		var newTask = new App.Models.Task({
			title:newTitle,
			priority:newPriority
		});
		// console.log(newTask.toJSON());
		// var newTaskView = new App.Views.Task({model: newTask});
		// newTaskView.render();
		this.collection.add(newTask);
	},

	initialize:function(){

	}



});

window.taskCollection = new App.Collections.Tasks([
{
	title: 'go to store',
	priority: 4
},
{
	title: 'go to store2',
	priority: 5
},
{
	title: 'go to store3',
	priority: 2
}

]);
// var taskView = new App.Views.Task({ model: task });
console.log(taskCollection);

var newTaskView = new App.Views.AddTask({ collection: taskCollection});

var tasksView = new App.Views.Tasks({ collection: taskCollection});
tasksView.render();
$('#taskdiv').html(tasksView.el);
// console.log(tasksView.el)




})();


















// window.log = function(msg){
// 	this.console.log(msg);

// };





// //person model
//  App.Models.Person = Backbone.Model.extend({
// 	defaults: {
// 		name: 'John Doe',
// 		age: 30,
// 		occupation: 'worker'
// 	},

// 	validate: function(attrs) {
// 		if ( attrs.age < 0 ) {
// 			return 'Age must be positive, stupid.';
// 		}

// 		if ( ! attrs.name ) {
// 			return 'Every person must have a name, fool.';
// 		}
// 	},

// 	work: function() {
// 		return this.get('name') + ' is working.';
// 	}
// });
// //A list of people
//  App.Collections.People = Backbone.Collection.extend({

// 	model: App.Models.Person



// });

// //view of all people
//  App.Views.People = Backbone.View.extend({
// 	tagName: 'ul',

// 	initialize: function(){

// 	},

// 	render: function(){
// 		//filter through all items in a collection
// 		this.collection.each(function(person){
// 		//for each ,create a new personview
// 			var personView = new App.Views.Person({ model: person })
// 		//append to root element
// 			this.$el.append(personView.render().el);
// 		}, this);

// 		return this;


// 	}

// })














//  App.Views.Person = Backbone.View.extend({
// 	tagName:'li',

// 	template: _.template( template('personTemplate') ),

// 	initialize:function(){
// 		this.render();
// 	},

// 	render:function(){
// 		this.$el.html(this.template(this.model.toJSON()) );
// 		return this;
// 	}

// });
// var person = new App.Models.Person;
// var personView = new App.Views.Person({ model: person });

// var peopleCollection = new App.Collections.People();

// var person2 = new App.Models.Person({ name:'bernie', age:32 });
// var personView2 = new App.Views.Person({ model: person2 });

// peopleCollection.add( person2 );
// peopleCollection.add( person );

// var peopleview = new App.Views.People({ collection: peopleCollection });

// $(document.body).html( peopleview.render().el );

