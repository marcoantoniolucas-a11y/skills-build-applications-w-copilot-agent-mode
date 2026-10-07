import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/activities">
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                className={({ isActive }) =>
                  `nav-link px-2${isActive ? ' active fw-semibold' : ''}`
                }
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <div className="alert alert-warning" role="status">
                Page not found. Use the navigation above to choose a section.
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
