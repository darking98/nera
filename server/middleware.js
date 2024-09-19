export const expressMiddleware = (req, res, next) => {
  const userId = req.headers['user_id']

  if (!userId) {
    return res.status(400).json({ error: 'No se proveyó un ID de usuario' })
  }

  req.userId = userId
  next()
}
