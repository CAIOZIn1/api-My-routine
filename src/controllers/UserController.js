const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res){
    const user = await User.findAll();

    return res.json(user);
  },

  async privateRoute(req, res){
    const id = req.params.id;

    const user = await User.findByPk(id,{
      attributes: ['id', 'name', 'email']
    });

    if(!user){
      return res.status(404).json({msg: 'Usuário não encontrado'});
    }

    return res.status(200).json({user});
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

    if(password !== confirmpassword){
      return res.status(422).json({msg: 'As senhas não conferem'});
    }

    const userExists = await User.findOne({where: {email}});

    if(userExists){
      return res.status(422).json({msg: 'Já existe um usuário com esse email'});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try{
      await User.create({name, email, password: passwordHash});

      return res.json('Usuário criado com sucesso!');
    } catch(err){
      console.log(err);

      return res.status(500).json({msg: 'Erro interno no servidor, não foi possível cadastrar o usuário'});
    }
  },

  async authenticate(req, res){
    const {email, password} = req.body;

    if(!email){
      return res.status(422).json({msg: 'O email do usuário é obrigatório'});
    }

    const user = await User.findOne({where: {email}});

    if(!password){
      return res.status(422).json({msg: 'A senha do usuário é obrigatória'});
    }

    if(!user){
      return res.status(422).json({msg: 'Usuário não encontrado'});
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if(!passwordIsValid){
      return res.status(422).json({msg: 'Email ou senha incorretos'});
    }

    try{
      const secret = process.env.SECRET_KEY;

      const token = jwt.sign(
        {
          id: user.id
        },
        secret,
        {
          expiresIn: 86400
        }
      );

      return res.status(200).json({msg: 'Login realizado com sucesso!', token});
    } catch(err){
      console.log(err);

      return res.status(500).json({msg: 'Erro interno no servidor, não foi possível realizar o login'});
    }
  }
}
