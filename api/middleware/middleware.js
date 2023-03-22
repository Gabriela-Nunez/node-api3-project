const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const requestMethod = req.method;
  const requestUrl = req.originalUrl;
  console.log(`${timeStamp} method ${requestMethod} to ${requestUrl}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id);
    if(!user){
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  }catch(err){
    //comeback to this
    res.status(500).json({
      message: 'unnable to find user'
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try{
    const { name } = req.body;
    if(!name || !name.trim()) {
      res.status(400).json({
        message: "missing required name field"
      })
    } else {
      req.name = name.trim()
      next()
    }
  }catch(err){
    res.status(500).json({
      message: 'unnable to find user'
  })
}
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  try{
    if(!text || !text.trim()) {
      res.status(400).json({
        message: "missing required text field"
      })
    } else {
      req.text = text.trim()
      next()
    }
  }catch(err){
    res.status(500).json({
      message: 'unnable to find post'
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}