import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import Home from './components/Home/Home'
import LoginForm from './components/LoginForm/LoginForm'
import Jobs from './components/AllJobs/Jobs'
import AboutJob from './components/AboutJob/AboutJob'
import NotFound from './components/NotFound/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectRoute exact path="/" component={Home} />
    <ProtectRoute exact path="/jobs" component={Jobs} />
    <ProtectRoute exact path="/jobs/:id" component={AboutJob} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
