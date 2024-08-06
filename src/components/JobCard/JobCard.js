import {Link} from 'react-router-dom'
import {FaRegStar} from 'react-icons/fa'
import {MdBusinessCenter} from 'react-icons/md'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const JobCard = props => {
  const {ItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = ItemDetails

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-container">
        <div className="logo-text-card">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div>
            <h1 className="main-title">{title}</h1>
            <div className="logo-text-card">
              <FaRegStar className="icon-image" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="loco-package">
          <div className="loco-bag-card">
            <div className="loco-bag-card">
              <IoLocationOutline className="icon-image" />
              <p className="title">{location}</p>
            </div>
            <div className="loco-bag-card">
              <MdBusinessCenter className="icon-image" />
              <p className="title">{employmentType}</p>
            </div>
          </div>

          <div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1 className="second-title">Description</h1>
        <p className="second-para">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
