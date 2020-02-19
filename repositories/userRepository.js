const User = require('../models/users');

class userRepository {
    constructor(model) {
      this.model = model;
    }
    // create a new User
    create(first, last, email, age) {
      const newUser = { first, last, email, age };
      const User = new this.model(newUser);
      return User.save();
    }
    deleteById(id) {
      return this.model.findByIdAndDelete(id);//mongoose call
    }
    findAll() {
      return this.model.find();
    }
    search(query) {
      return this.model.find({ $or: [ {first:query }, { last:query }, { email:query } ] })
    }
    updateById(id, object) {
      // const query = { last: id };
      return this.model.findByIdAndUpdate(id, { $set: { 
        first: object.first, 
        last: object.last,
        email: object.email,
         age: object.age } 
        } );
    }
    locate(id) {
      return this.model.findById(id)
    }
    sortBy(how, by) {
      if(how === "ascending") {
        if (by === "first") {
          return this.model.find({}).sort({'first': 1})
        }
        if (by === "last") {
          return this.model.find({}).sort({'last': 1})
        }
        
      }
      if(how === "descending") {
        if (by === "first") {
          return this.model.find({}).sort({'first': -1})
        }
        if (by === "last") {
          return this.model.find({}).sort({'last': -1})
        }
      }
      else {
        return this.model.find();
      }
    }
  }
  module.exports = new userRepository(User);