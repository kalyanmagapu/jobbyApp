import {FaRegStar} from 'react-icons/fa'
import {MdBusinessCenter} from 'react-icons/md'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const SimilarJobCard = props => {
  const {CardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = CardDetails

  return (
    <div className="similar-job-card">
      <div className="logo-text">
        <img src={companyLogoUrl} alt={title} className="job-company-logo" />
        <div>
          <h1 className="card-title">{title}</h1>
          <div className="logo-text">
            <FaRegStar />
            <p className="about-para">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="card-title">Description</h1>
      <p className="about-para">{jobDescription}</p>
      <div className="bottom-card">
        <div className="logo-text">
          <MdBusinessCenter />
          <p className="about-para">{location}</p>
        </div>
        <div className="logo-text">
          <IoLocationOutline />
          <p className="about-para">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
