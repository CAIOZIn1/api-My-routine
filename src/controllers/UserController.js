const User = require('../models/User');

module.exports = {
  async index(req, res){
    const user = await User.findAll();

    return res.json(user);
  },

  async store(req, res){
    const {name, email, password, confirmpassword} = req.body;

    if(!name){
      return res.status(422).json({msg: 'O nome do usuário é obrigatório'});
    }

    if(!email){
      return res.status(422).json({msg: 'O email do usuário é obrigatório'});
    }

    if(!password){
      return res.status(422).json({msg: 'A senha do usuário é obrigatória'});
    }

    const user = await User.create({name, email, password});

    return res.json(user);
  }
}
