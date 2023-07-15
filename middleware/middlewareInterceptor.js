export default function middlewareInterceptor(req, res, next) {
  console.log('I AM THE MIDDLE MAN');
  const { password } = req.query;

  if(password !== '1234') { 
    // Forbid access if password is not correct
    return res.sendStatus(403);
  }

  // Pass control to the next middleware function or next defined function
  next();
}