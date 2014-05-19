/**
 * PersonController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/person/create`
   */
   save: function (req, res) {
  	var params = _.extend(req.query || {}, req.params || {}, req.body || {});
  	 var id = req.param('id');
  	console.log('id ',id);
  	if (!id || id==0) {
  		Person.create(params, function  (err, person) {
  	        if (err) return res.send(err,500);
  			Person.publishCreate({
  			  id: person.id,
  			  person: person 
  			});
  			console.log('publish create ',person.id);
  			res.redirect('/Person/list');
  		});	 
  	 }else{
  		
  		Person.update(id, params, function  (err, person) {
  			 if (err) return res.send(err,500);
  			Person.findOne(id).done( function (err,person){
  				console.log('person.toJSON ',person.toJSON());
  				Person.publishUpdate( id,
  						{person:person.toJSON()}
  				);
		  	    /*Person.publishUpdate( 56, {
		  	      name: 'Amanda'
		  	    });*/
  			console.log('publish update ',id);
  			res.redirect('/Person/list');
  			});
  		});
  	
  	 }
  },
  edit: function (req,res) {
	  var id = req.param('id');
	  if (!id || id==0) {
		  //var person = new Person
		  //person.firstName="";
		  //person.lastName="";
		  /*Person.create({ 
	      firstName:"",
	      lastName:""
		  }).done(function(err, person) {*/
			  //console.log('person.firstName ',person.firstName);
			  res.view({
		        person: { id:0,firstName: '',lastName:''},
		      });
		  //});
	  }else{

	  	Person.findOne(id).done( function (err,person){
	      if (err) return res.send(err,500);
	      
	      res.view({
	        person: person
	      })
	    });
	  }
  },

  /**
   * Action blueprints:
   *    `/person/destroy`
   */
   destroy: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/person/tag`
   */
   tag: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/person/like`
   */
   like: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  list: function(req, res) {
	  	Person.find(function(err, people){
	  		res.view({
	  				people:people
                	})
        });
   },

welcome: function (req, res) {
    // Get all of the users
    Person.find(function(err, people){
console.log('subscribe');
      Person.subscribe(req.socket, Person);
      //Person.subscribe(req.socket, 7);
      Person.subscribe(req.socket, people);
return res.json(people);
    });
},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PersonController)
   */
  _config: {}

  
};
