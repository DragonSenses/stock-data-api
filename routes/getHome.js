export default async function getHome(req, res) {
  res.status(200).send({ message: 'Thanks for trying our API' })
}