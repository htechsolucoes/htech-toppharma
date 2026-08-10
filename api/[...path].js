export default async function handler(req, res) {
  return res.status(200).json({
    message: "Function funcionando",
    method: req.method,
    query: req.query,
    url: req.url
  });
}