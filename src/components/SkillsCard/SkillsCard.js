import './index.css'

const SkillsCard = props => {
  const {Skills} = props

  return (
    <div>
      <ul className="skills-card">
        {Skills.map(each => (
          <div>
            <li key={each.name} className="skill-card">
              <img src={each.imageUrl} alt={each.name} className="skill-logo" />
              <h1 className="skill-text">{each.name}</h1>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default SkillsCard
