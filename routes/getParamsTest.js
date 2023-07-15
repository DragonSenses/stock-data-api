export default function getParamsTest(req, res){
  const { bananaParameter } = req.params;

  console.log('The banana parameter is: ' + bananaParameter);

  res.sendStatus(200);
}