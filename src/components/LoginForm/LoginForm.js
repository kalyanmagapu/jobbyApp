import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isValid: false, errormsg: ''}

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = ErrorMsg => {
    this.setState({isValid: true, errormsg: ErrorMsg})
  }

  inputUsername = event => {
    this.setState({username: event.target.value})
  }

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  submitLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }

    const response = await fetch(url, options)
    const userData = await response.json()

    if (response.ok === true) {
      this.submitSuccess(userData.jwt_token)
    } else {
      this.submitFailure(userData.error_msg)
    }
  }

  render() {
    const {isValid, errormsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="login-card">
          <form onSubmit={this.submitLogin}>
            <div className="image-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="login-logo"
              />
            </div>

            <div className="box-card">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="login-box"
                onChange={this.inputUsername}
              />
            </div>

            <div className="box-card">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="login-box"
                onChange={this.inputPassword}
              />
            </div>

            <div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
            {isValid && <p className="err-text">*{errormsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
