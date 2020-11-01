import auth0 from './utils/auth0'

export default async function login(req, res) {
  try {
    await auth0.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.statusCode = error.status || 400
    res.end(error.message)
  }
}
