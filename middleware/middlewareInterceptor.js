export default function middlewareInterceptor(req, res, next) {
  console.log('I AM THE MIDDLE MAN');
  const { password } = req.query;

  if(!password) { 
    // Forbid access if no password is present
    return res.sendStatus(403);
  }

  // Check for password
  switch(password){
    case 1234 :
      console.log("Welcome");
      res.sendStatus(200);
      break;
    
    default:
      return res.sendStatus(403);
  }

  // Pass control to the next middleware function or next defined function
  next();
}