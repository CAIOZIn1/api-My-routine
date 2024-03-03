require("dotenv").config();

const jwt = require("jsonwebtoken");

function checkToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({msg: 'Acesso negado'});
  }

  try{
    const secret = process.env.SECRET_KEY;

    jwt.verify(token, secret);

    next();
  } catch(err){
    console.log(err);

    return res.status(500).json({msg: 'Erro interno no servidor, não foi possível realizar o login'});
  }
}

module.exports = checkToken;
