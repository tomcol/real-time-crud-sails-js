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
   create: function (req, res) {
  	var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	Person.create(params, function userCreated (err, createdUser) {
        if (err) return res.send(err,500);
Person.publishCreate({
  id: createdUser.id,
  person: createdUser 
});
console.log('publish create ',createdUser.id);
Person.find(function(err, people){
        res.view({
people:people
                })
        });
	});
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
return res.json(people);
    });
},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PersonController)
   */
  _config: {}

  
};
