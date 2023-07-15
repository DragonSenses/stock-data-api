export default async function testPost(req, res) {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
}