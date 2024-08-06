import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'
import Header from '../Header/Header'
import JobCard from '../JobCard/JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const apiJobConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Jobs extends Component {
  state = {
    jobType: [],
    minPackage: '',
    searchType: '',
    apiProfileStatus: apiProfileConstant.initial,
    apiJobStatus: apiJobConstant.initial,
    profileData: {},
    jobsDataList: [],
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({apiProfileStatus: apiProfileConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = ' https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const profileData = await response.json()
    const updatedProfileList = {
      profileImageUrl: profileData.profile_details.profile_image_url,
      name: profileData.profile_details.name,
      shortBio: profileData.profile_details.short_bio,
    }

    if (response.ok === true) {
      this.setState({
        profileData: updatedProfileList,
        apiProfileStatus: apiProfileConstant.success,
      })
    } else {
      this.setState({apiProfileStatus: apiProfileConstant.failure})
    }
  }

  getJobsData = async () => {
    this.setState({apiJobStatus: apiJobConstant.inProgress})
    const {jobType, minPackage, searchType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobType.join()}&minimum_package=${minPackage}&search=${searchType}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedJobsList = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    if (response.ok === true) {
      this.setState({
        jobsDataList: updatedJobsList,
        apiJobStatus: apiJobConstant.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobConstant.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryProfile = () => {
    this.getProfileData()
  }

  retryJobs = () => {
    this.getJobsData()
  }

  updatePackage = event => {
    this.setState({minPackage: event.target.id}, this.getJobsData)
  }

  updateEmploymentType = event => {
    const {jobType} = this.state
    if (jobType.includes(event.target.id)) {
      const newList = jobType.filter(each => each.id !== event.target.id)
      this.setState({jobType: newList})
    } else {
      this.setState(prevState => ({
        jobType: [...prevState.jobType, event.target.id],
      }))
    }
  }

  listOfEmploymentType = () => (
    <div>
      <h1 className="jobs-headings">Type of Employment</h1>
      <div>
        <ul className="type-lists">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="type-label">
              <div>
                <input
                  type="checkbox"
                  onChange={this.updateEmploymentType}
                  id={each.employmentTypeId}
                />
                <label htmlFor={each.employmentTypeId} className="type-label">
                  {each.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  radioMinimumPackage = () => (
    <div>
      <h1 className="jobs-headings">Salary Range</h1>
      <ul className="type-lists">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="type-label">
            <input
              type="radio"
              name="option"
              id={each.salaryRangeId}
              onChange={this.updatePackage}
            />
            <label htmlFor={each.salaryRangeId} className="type-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderProfileFailure = () => (
    <div className="profile-failure">
      <button type="button" onClick={this.retryProfile} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt="profilePic" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-txt">{shortBio}</p>
      </div>
    )
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retryJobs} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsDataList} = this.state

    if (jobsDataList.length === 0) {
      return (
        <div className="jobs-failure-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>we could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <div>
        <ul>
          {jobsDataList.map(each => (
            <JobCard key={each.id} ItemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  onRenderProfile = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiProfileConstant.inProgress:
        return this.renderLoading()
      case apiProfileConstant.success:
        return this.renderProfileSuccess()
      case apiProfileConstant.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  onRenderJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobConstant.inProgress:
        return this.renderLoading()
      case apiJobConstant.success:
        return this.renderJobsSuccess()
      case apiJobConstant.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  keyDowmSubmit = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  submitSearchInput = () => {
    this.getJobsData()
  }

  searchInputUpdate = event => {
    this.setState({searchType: event.target.value}, this.getJobsData)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-bg">
          <div>
            {this.onRenderProfile()}
            <hr />
            {this.listOfEmploymentType()}
            <hr />
            {this.radioMinimumPackage()}
          </div>
          <div>
            <div className="search-card">
              <input
                type="search"
                onKeyDown={this.keyDowmSubmit}
                placeholder="Search"
                className="search-box"
              />
              <IoMdSearch
                onClick={this.submitSearchInput}
                className="search-icon"
              />
            </div>
            <div>{this.onRenderJobs()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
