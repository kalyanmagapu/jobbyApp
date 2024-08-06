import {Component} from 'react'
import {FaRegStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdBusinessCenter} from 'react-icons/md'
import {IoLocationOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/Header'
import SkillsCard from '../SkillsCard/SkillsCard'
import SimilarJobCard from '../SimilarJobCard/SimilarJobCard'
import './index.css'

const apiJobConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class AboutJob extends Component {
  state = {jobData: {}, similarJobs: {}, apiStatus: apiJobConstant.initial}

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiJobConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const mainJob = data.job_details
      const similarJobs = data.similar_jobs

      const jobDetail = {
        companyLogoUrl: mainJob.company_logo_url,
        companyWebsiteUrl: mainJob.company_website_url,
        employmentType: mainJob.employment_type,
        id: mainJob.id,
        jobDescription: mainJob.job_description,
        location: mainJob.location,
        rating: mainJob.rating,
        title: mainJob.title,
        packagePerAnnum: mainJob.package_per_annum,
        lifeAtCompany: {
          description: mainJob.life_at_company.description,
          imageUrl: mainJob.life_at_company.image_url,
        },
        skills: mainJob.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }

      const similarJobDetails = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobData: jobDetail,
        similarJobs: similarJobDetails,
        apiStatus: apiJobConstant.success,
      })
    } else {
      this.setState({apiStatus: apiJobConstant.failure})
    }
  }

  tryAgain = () => {
    this.getJobData()
  }

  renderLoading = () => (
    <div className="jobs-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobData

    return (
      <>
        <Header />

        <div className="about-job-bg">
          <div className="about-job-card">
            <div className="with-logo">
              <img src={companyLogoUrl} alt={title} className="company-logo" />
              <div>
                <h1 className="about-heading">{title}</h1>
                <div className="card">
                  <FaRegStar className="icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>

            <div className="align-card">
              <div className="card">
                <div className="card">
                  <IoLocationOutline className="icon" />
                  <p>{location}</p>
                </div>
                <div className="card">
                  <MdBusinessCenter className="icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>

            <hr />

            <div className="align-card">
              <h1 className="about-heading">Description</h1>
              <div>
                <a href={companyWebsiteUrl} className="card">
                  <p>Visit</p>
                  <FaExternalLinkAlt className="link-icon" />
                </a>
              </div>
            </div>
            <p className="about-text">{jobDescription}</p>

            <div className="card-skills">
              <h1 className="about-heading">Skills</h1>
              <SkillsCard key={id} Skills={skills} />
            </div>

            <h1 className="about-heading">Life at Company</h1>

            <div className="life-card">
              <p className="life-text">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.imageUrl} alt={title} />
            </div>
          </div>
          <h1 className="about-heading">Similar Jobs</h1>
          <div>
            <ul className="similar-cards">
              {similarJobs.map(each => (
                <SimilarJobCard key={each.id} CardDetails={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to to find the page you are looking for.</p>
      <button type="button" onClick={this.tryAgain} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderAboutJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiJobConstant.inProgress:
        return this.renderLoading()
      case apiJobConstant.success:
        return this.renderSuccess()
      case apiJobConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAboutJob()}</div>
  }
}

export default AboutJob
