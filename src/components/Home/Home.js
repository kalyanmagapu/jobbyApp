import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-bg">
          <h1 className="home-heading">Find The Job That Fits Your List</h1>
          <p className="home-para">
            Millions of people are searching for jobs,salary information,
            company reviews.Find the job that fits you abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
