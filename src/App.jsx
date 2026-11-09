
import { useState } from 'react'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [role, setRole] = useState('Intern')
  const [currentPage, setCurrentPage] = useState('auth')

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How does React useState work?',
      category: 'Programming',
      date: 'Nov 08, 2026',
      status: 'Answered',
      description: 'I want to understand the useState hook in React.'
    },
    {
      id: 2,
      title: 'Understanding REST API concepts',
      category: 'Web Development',
      date: 'Nov 07, 2026',
      status: 'In Review',
      description: 'I need help understanding REST APIs.'
    },
    {
      id: 3,
      title: 'How to use Git branches?',
      category: 'Tools',
      date: 'Nov 06, 2026',
      status: 'Open',
      description: 'How can I create and manage Git branches?'
    }
  ])

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

  const handleQuestionSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newQuestion = {
      id: Date.now(),
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      status: 'Open'
    }

    setQuestions((previousQuestions) => [
      newQuestion,
      ...previousQuestions
    ])

    event.currentTarget.reset()
    setCurrentPage('dashboard')
    alert('Your question has been submitted successfully!')
  }

  const openSubmitPage = () => {
    setCurrentPage('submit')
  }

  const renderQuestions = () => (
    <div className="question-table">
      <div className="table-row table-header">
        <span>QUESTION</span>
        <span>CATEGORY</span>
        <span>DATE</span>
        <span>STATUS</span>
      </div>

      {questions.map((question) => (
        <div className="table-row" key={question.id}>
          <strong>{question.title}</strong>
          <span>{question.category}</span>
          <span>{question.date}</span>
          <span className={`status ${
            question.status === 'Answered'
              ? 'answered'
              : question.status === 'In Review'
                ? 'review'
                : 'open'
          }`}>
            {question.status}
          </span>
        </div>
      ))}
    </div>
  )

  if (currentPage !== 'auth') {
    return (
      <div className="dashboard-page">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">M</div>
            <h2>MentorDesk</h2>
          </div>

          <p className="menu-label">MENU</p>

          <button
            className={`menu-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <span>▦</span> Dashboard
          </button>

          <button
            className={`menu-item ${currentPage === 'submit' ? 'active' : ''}`}
            onClick={openSubmitPage}
          >
            <span>＋</span> Submit Question
          </button>

          <button
            className={`menu-item ${currentPage === 'myQuestions' ? 'active' : ''}`}
            onClick={() => setCurrentPage('myQuestions')}
          >
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

            <button
              className="logout-button"
              onClick={() => setCurrentPage('auth')}
            >
              ↪ Log Out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <h1>
                {currentPage === 'dashboard'
                  ? 'Dashboard'
                  : currentPage === 'submit'
                    ? 'Submit Question'
                    : 'My Questions'}
              </h1>

              <p>
                {currentPage === 'dashboard'
                  ? "Welcome back! Here's your learning overview."
                  : currentPage === 'submit'
                    ? 'Ask your mentor for help with your learning.'
                    : 'View and track all your submitted questions.'}
              </p>
            </div>

            <div className="header-profile">
              <div className="avatar">I</div>
              <span>Intern User</span>
            </div>
          </header>

          {currentPage === 'dashboard' && (
            <>
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
                  <h2>{questions.length}</h2>
                  <small>All your submitted questions</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">◷</div>
                  <p>Open</p>
                  <h2>{questions.filter(q => q.status === 'Open').length}</h2>
                  <small>Waiting for mentor review</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon blue">◉</div>
                  <p>In Review</p>
                  <h2>{questions.filter(q => q.status === 'In Review').length}</h2>
                  <small>Currently being reviewed</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <p>Answered</p>
                  <h2>{questions.filter(q => q.status === 'Answered').length}</h2>
                  <small>Responses received</small>
                </div>
              </section>

              <section className="questions-section">
                <div className="section-heading">
                  <div>
                    <h2>Recent Questions</h2>
                    <p>Track the progress of your questions.</p>
                  </div>

                  <button
                    className="primary-button"
                    onClick={openSubmitPage}
                  >
                    + Ask a Question
                  </button>
                </div>

                {renderQuestions()}
              </section>
            </>
          )}

          {currentPage === 'submit' && (
            <section className="questions-section">
              <div className="section-heading">
                <div>
                  <h2>Ask a New Question</h2>
                  <p>Provide details so your mentor can help you.</p>
                </div>
              </div>

              <form
                className="question-form"
                onSubmit={handleQuestionSubmit}
              >
                <div className="form-group">
                  <label htmlFor="title">Question Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter your question title"
                    required
                    maxLength="120"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" required>
                    <option value="">Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Question Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Explain your question in detail..."
                    required
                    minLength="10"
                  />
                </div>

                <div className="question-form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setCurrentPage('dashboard')}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-button">
                    Submit Question
                  </button>
                </div>
              </form>
            </section>
          )}

          {currentPage === 'myQuestions' && (
            <section className="questions-section">
              <div className="section-heading">
                <div>
                  <h2>My Submitted Questions</h2>
                  <p>You have submitted {questions.length} questions.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={openSubmitPage}
                >
                  + Ask a Question
                </button>
              </div>

              {renderQuestions()}
            </section>
          )}
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
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                minLength="6"
                required
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  minLength="6"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="Intern">Intern</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>

            <button type="submit" className="login-button">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-switch">
            {isSignUp
              ? 'Already have an account?'
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
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
