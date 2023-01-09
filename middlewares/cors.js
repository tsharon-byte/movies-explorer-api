const allowedCors = [
  'http://diploma.tsharon.nomoredomains.club',
  'https://diploma.tsharon.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];
const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, POST');
    return res.status(200).json({});
  }
  return next();
};
module.exports = cors;
