import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const userLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <ul className="header-item">
        <div>
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="header-logo"
              />
            </Link>
          </li>
        </div>

        <div className="link-card">
          <div>
            <li>
              <Link to="/">
                <p className="textLink">Home</p>
              </Link>
            </li>
          </div>

          <div>
            <li>
              <Link to="/jobs">
                <p className="textLink">Jobs</p>
              </Link>
            </li>
          </div>
        </div>

        <div>
          <li>
            <button type="button" className="logout-btn" onClick={userLogout}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default withRouter(Header)
