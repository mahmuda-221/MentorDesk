
import { useState } from 'react'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [role, setRole] = useState('Intern')
  const [currentPage, setCurrentPage] = useState('auth')

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (isSignUp) {
      const name = formData.get('name')
      const confirmPassword = formData.get('confirmPassword')

      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        return
      }

      alert(`Demo account created successfully for ${name}!`)
      setIsSignUp(false)
      return
    }

    if (role === 'Intern') {
      setCurrentPage('dashboard')
    } else {
      alert(`Demo login submitted for ${email} as Mentor.`)
    }
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="dashboard-page">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">M</div>
            <h2>MentorDesk</h2>
          </div>

          <p className="menu-label">MENU</p>

          <button className="menu-item active">
            <span>▦</span> Dashboard
          </button>

          <button className="menu-item" onClick={() => alert('Submit Question page coming next!')}>
            <span>＋</span> Submit Question
          </button>

          <button className="menu-item" onClick={() => alert('My Questions page coming soon!')}>
            <span>☰</span> My Questions
          </button>

          <div className="sidebar-bottom">
            <div className="profile-mini">
              <div className="avatar">I</div>
              <div>
                <strong>Intern User</strong>
                <small>Intern</small>
              </div>
            </div>

            <button className="logout-button" onClick={() => setCurrentPage('auth')}>
              ↪ Log Out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your learning overview.</p>
            </div>
            <div className="header-profile">
              <div className="avatar">I</div>
              <span>Intern User</span>
            </div>
          </header>

          <section className="welcome-banner">
            <div>
              <h2>Welcome to MentorDesk! 👋</h2>
              <p>Ask questions, connect with mentors, and grow your skills.</p>
            </div>
            <div className="welcome-icon">🎓</div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">☰</div>
              <p>Total Questions</p>
              <h2>12</h2>
              <small>All your submitted questions</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">◷</div>
              <p>Open</p>
              <h2>4</h2>
              <small>Waiting for mentor review</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">◉</div>
              <p>In Review</p>
              <h2>3</h2>
              <small>Currently being reviewed</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">✓</div>
              <p>Answered</p>
              <h2>5</h2>
              <small>Responses received</small>
            </div>
          </section>

          <section className="questions-section">
            <div className="section-heading">
              <div>
                <h2>Recent Questions</h2>
                <p>Track the progress of your questions.</p>
              </div>
              <button className="primary-button" onClick={() => alert('Submit Question page coming next!')}>
                + Ask a Question
              </button>
            </div>

            <div className="question-table">
              <div className="table-row table-header">
                <span>QUESTION</span>
                <span>CATEGORY</span>
                <span>DATE</span>
                <span>STATUS</span>
              </div>

              <div className="table-row">
                <strong>How does React useState work?</strong>
                <span>Programming</span>
                <span>Nov 08, 2026</span>
                <span className="status answered">Answered</span>
              </div>

              <div className="table-row">
                <strong>Understanding REST API concepts</strong>
                <span>Web Development</span>
                <span>Nov 07, 2026</span>
                <span className="status review">In Review</span>
              </div>

              <div className="table-row">
                <strong>How to use Git branches?</strong>
                <span>Tools</span>
                <span>Nov 06, 2026</span>
                <span className="status open">Open</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="brand-section">
          <div className="brand-icon">M</div>
          <h1>MentorDesk</h1>
          <p>Learn, Ask, Grow Together.</p>
        </div>

        <div className="login-card">
          <h2>{isSignUp ? 'Create Your Account' : 'Welcome Back!'}</h2>
          <p className="login-subtitle">
            {isSignUp
              ? 'Join MentorDesk and start your learning journey.'
              : 'Sign in to continue to your account.'}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name"
                  placeholder="Enter your full name" required />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email"
                placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password"
                placeholder="Enter your password" minLength="6" required />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword"
                  name="confirmPassword" placeholder="Confirm your password"
                  minLength="6" required />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select id="role" name="role" value={role}
                onChange={(event) => setRole(event.target.value)}>
                <option value="Intern">Intern</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>

            <button type="submit" className="login-button">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-switch">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <p className="login-footer">
            MentorDesk — Your Learning Support Platform
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
