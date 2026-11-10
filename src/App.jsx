
import { useState } from 'react'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [role, setRole] = useState('Intern')
  const [currentPage, setCurrentPage] = useState('auth')
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How does React useState work?',
      category: 'Programming',
      date: 'Nov 08, 2026',
      status: 'Answered',
      description: 'I want to understand the useState hook in React.',
      answer:
        'The useState hook is a React Hook that allows functional components to manage state. It returns an array containing the current state value and a function to update that value.',
      feedback:
        'Good question! Keep practicing with small React projects to understand state management better.',
      mentor: 'Demo Mentor',
    },
    {
      id: 2,
      title: 'Understanding REST API concepts',
      category: 'Web Development',
      date: 'Nov 07, 2026',
      status: 'In Review',
      description: 'I need help understanding REST APIs.',
      answer: '',
      feedback: '',
      mentor: '',
    },
    {
      id: 3,
      title: 'How to use Git branches?',
      category: 'Tools',
      date: 'Nov 06, 2026',
      status: 'Open',
      description: 'How can I create and manage Git branches?',
      answer: '',
      feedback: '',
      mentor: '',
    },
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
      setCurrentPage('mentorDashboard')
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
        year: 'numeric',
      }),
      status: 'Open',
      answer: '',
      feedback: '',
      mentor: '',
    }

    setQuestions((previousQuestions) => [
      newQuestion,
      ...previousQuestions,
    ])

    event.currentTarget.reset()
    setCurrentPage('dashboard')
    alert('Your question has been submitted successfully!')
  }

  const handleMentorResponse = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const updatedQuestion = {
      ...selectedQuestion,
      answer: formData.get('answer'),
      feedback: formData.get('feedback'),
      status: formData.get('status'),
      mentor: 'Demo Mentor',
    }

    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === updatedQuestion.id
          ? updatedQuestion
          : question
      )
    )

    setSelectedQuestion(updatedQuestion)
    alert('Your response has been submitted successfully!')
  }

  const openQuestionDetails = (question) => {
    setSelectedQuestion(question)
    setCurrentPage('details')
  }

  const goToRoleDashboard = () => {
    setCurrentPage(
      role === 'Mentor' ? 'mentorDashboard' : 'dashboard'
    )
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
        <div
          className="table-row clickable-row"
          key={question.id}
          role="button"
          tabIndex={0}
          onClick={() => openQuestionDetails(question)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openQuestionDetails(question)
            }
          }}
        >
          <strong>{question.title}</strong>
          <span>{question.category}</span>
          <span>{question.date}</span>

          <span
            className={`status ${
              question.status === 'Answered' ||
              question.status === 'Resolved'
                ? 'answered'
                : question.status === 'In Review'
                  ? 'review'
                  : 'open'
            }`}
          >
            {question.status}
          </span>
        </div>
      ))}

      {questions.length === 0 && (
        <p className="empty-message">No questions available yet.</p>
      )}
    </div>
  )

  if (currentPage !== 'auth') {
    const isMentor = role === 'Mentor'

    const pageTitle =
      currentPage === 'dashboard'
        ? 'Dashboard'
        : currentPage === 'mentorDashboard'
          ? 'Mentor Dashboard'
          : currentPage === 'submit'
            ? 'Submit Question'
            : currentPage === 'myQuestions'
              ? 'My Questions'
              : 'Question Details'

    const pageDescription =
      currentPage === 'dashboard'
        ? "Welcome back! Here's your learning overview."
        : currentPage === 'mentorDashboard'
          ? 'Review intern questions and provide helpful responses.'
          : currentPage === 'submit'
            ? 'Ask your mentor for help with your learning.'
            : currentPage === 'myQuestions'
              ? 'View and track your submitted questions.'
              : 'View the complete details of this question.'

    return (
      <div className="dashboard-page">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">M</div>
            <h2>MentorDesk</h2>
          </div>

          <p className="menu-label">MENU</p>

          {isMentor ? (
            <button
              className={`menu-item ${
                currentPage === 'mentorDashboard' ||
                currentPage === 'details'
                  ? 'active'
                  : ''
              }`}
              onClick={() => setCurrentPage('mentorDashboard')}
            >
              <span>▦</span> Dashboard
            </button>
          ) : (
            <>
              <button
                className={`menu-item ${
                  currentPage === 'dashboard' ? 'active' : ''
                }`}
                onClick={() => setCurrentPage('dashboard')}
              >
                <span>▦</span> Dashboard
              </button>

              <button
                className={`menu-item ${
                  currentPage === 'submit' ? 'active' : ''
                }`}
                onClick={() => setCurrentPage('submit')}
              >
                <span>＋</span> Submit Question
              </button>

              <button
                className={`menu-item ${
                  currentPage === 'myQuestions' ||
                  currentPage === 'details'
                    ? 'active'
                    : ''
                }`}
                onClick={() => setCurrentPage('myQuestions')}
              >
                <span>☰</span> My Questions
              </button>
            </>
          )}

          <div className="sidebar-bottom">
            <div className="profile-mini">
              <div className="avatar">{isMentor ? 'M' : 'I'}</div>
              <div>
                <strong>{isMentor ? 'Demo Mentor' : 'Intern User'}</strong>
                <small>{role}</small>
              </div>
            </div>

            <button
              className="logout-button"
              onClick={() => {
                setCurrentPage('auth')
                setSelectedQuestion(null)
              }}
            >
              ↪ Log Out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <h1>{pageTitle}</h1>
              <p>{pageDescription}</p>
            </div>

            <div className="header-profile">
              <div className="avatar">{isMentor ? 'M' : 'I'}</div>
              <span>{isMentor ? 'Demo Mentor' : 'Intern User'}</span>
            </div>
          </header>

          {/* INTERN DASHBOARD */}
          {currentPage === 'dashboard' && !isMentor && (
            <>
              <section className="welcome-banner">
                <div>
                  <h2>Welcome to MentorDesk! 👋</h2>
                  <p>
                    Ask questions, connect with mentors, and grow your
                    skills.
                  </p>
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
                  <h2>
                    {questions.filter((q) => q.status === 'Open').length}
                  </h2>
                  <small>Waiting for mentor review</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon blue">◉</div>
                  <p>In Review</p>
                  <h2>
                    {questions.filter((q) => q.status === 'In Review').length}
                  </h2>
                  <small>Currently being reviewed</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <p>Answered</p>
                  <h2>
                    {questions.filter(
                      (q) =>
                        q.status === 'Answered' ||
                        q.status === 'Resolved'
                    ).length}
                  </h2>
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
                    onClick={() => setCurrentPage('submit')}
                  >
                    + Ask a Question
                  </button>
                </div>

                {renderQuestions()}
              </section>
            </>
          )}

          {/* MENTOR DASHBOARD */}
          {currentPage === 'mentorDashboard' && isMentor && (
            <>
              <section className="welcome-banner">
                <div>
                  <h2>Welcome, Mentor! 👋</h2>
                  <p>
                    Review intern questions, share your knowledge, and
                    support their learning.
                  </p>
                </div>
                <div className="welcome-icon">🎓</div>
              </section>

              <section className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon purple">☰</div>
                  <p>Total Questions</p>
                  <h2>{questions.length}</h2>
                  <small>Questions submitted by interns</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">◷</div>
                  <p>Open</p>
                  <h2>
                    {questions.filter((q) => q.status === 'Open').length}
                  </h2>
                  <small>Waiting for review</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon blue">◉</div>
                  <p>In Review</p>
                  <h2>
                    {questions.filter((q) => q.status === 'In Review').length}
                  </h2>
                  <small>Under review</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <p>Answered</p>
                  <h2>
                    {questions.filter(
                      (q) =>
                        q.status === 'Answered' ||
                        q.status === 'Resolved'
                    ).length}
                  </h2>
                  <small>Responses submitted</small>
                </div>
              </section>

              <section className="questions-section">
                <div className="section-heading">
                  <div>
                    <h2>All Intern Questions</h2>
                    <p>
                      Select a question to review and submit your response.
                    </p>
                  </div>
                </div>

                {renderQuestions()}
              </section>
            </>
          )}

          {/* SUBMIT QUESTION */}
          {currentPage === 'submit' && !isMentor && (
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
                  <label htmlFor="description">
                    Question Description
                  </label>
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
                    onClick={goToRoleDashboard}
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

          {/* INTERN MY QUESTIONS */}
          {currentPage === 'myQuestions' && !isMentor && (
            <section className="questions-section">
              <div className="section-heading">
                <div>
                  <h2>My Submitted Questions</h2>
                  <p>You have submitted {questions.length} questions.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setCurrentPage('submit')}
                >
                  + Ask a Question
                </button>
              </div>

              {renderQuestions()}
            </section>
          )}

          {/* QUESTION DETAILS */}
          {currentPage === 'details' && selectedQuestion && (
            <section className="questions-section">
              <div className="section-heading">
                <div>
                  <h2>Question Details</h2>
                  <p>
                    {isMentor
                      ? 'Review the question and provide your response.'
                      : 'View your complete question information.'}
                  </p>
                </div>

                <button
                  className="secondary-button"
                  onClick={goToRoleDashboard}
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="question-details-card">
                <div className="details-top">
                  <span className="details-label">QUESTION TITLE</span>

                  <span
                    className={`status ${
                      selectedQuestion.status === 'Answered' ||
                      selectedQuestion.status === 'Resolved'
                        ? 'answered'
                        : selectedQuestion.status === 'In Review'
                          ? 'review'
                          : 'open'
                    }`}
                  >
                    {selectedQuestion.status}
                  </span>
                </div>

                <h2>{selectedQuestion.title}</h2>

                <div className="details-info">
                  <div>
                    <small>Category</small>
                    <strong>{selectedQuestion.category}</strong>
                  </div>

                  <div>
                    <small>Submission Date</small>
                    <strong>{selectedQuestion.date}</strong>
                  </div>
                </div>

                <div className="details-description">
                  <h3>Question Description</h3>
                  <p>{selectedQuestion.description}</p>
                </div>

                {/* MENTOR RESPONSE FORM */}
                {isMentor ? (
                  <div className="mentor-response-section">
                    <div className="response-heading">
                      <span className="response-icon">✦</span>
                      <div>
                        <h3>Submit Your Response</h3>
                        <p>Write an answer and feedback for the intern.</p>
                      </div>
                    </div>

                    <form
                      className="question-form"
                      onSubmit={handleMentorResponse}
                    >
                      <div className="form-group">
                        <label htmlFor="answer">Mentor Answer</label>
                        <textarea
                          id="answer"
                          name="answer"
                          rows="6"
                          placeholder="Write your answer here..."
                          defaultValue={selectedQuestion.answer}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="feedback">
                          Feedback for Intern
                        </label>
                        <textarea
                          id="feedback"
                          name="feedback"
                          rows="4"
                          placeholder="Write helpful feedback..."
                          defaultValue={selectedQuestion.feedback}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="status">Update Question Status</label>
                        <select
                          id="status"
                          name="status"
                          defaultValue={
                            selectedQuestion.status === 'Open'
                              ? 'In Review'
                              : selectedQuestion.status
                          }
                          required
                        >
                          <option value="Open">Open</option>
                          <option value="In Review">In Review</option>
                          <option value="Answered">Answered</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div className="question-form-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={goToRoleDashboard}
                        >
                          Cancel
                        </button>

                        <button type="submit" className="primary-button">
                          Submit Response
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="mentor-response-section">
                      <div className="response-heading">
                        <span className="response-icon">✦</span>
                        <div>
                          <h3>Mentor Answer</h3>
                          <p>Response from your assigned mentor</p>
                        </div>
                      </div>

                      {selectedQuestion.answer ? (
                        <div className="mentor-answer">
                          <div className="mentor-name">
                            <div className="avatar">M</div>
                            <div>
                              <strong>
                                {selectedQuestion.mentor || 'Mentor'}
                              </strong>
                              <small>Assigned Mentor</small>
                            </div>
                          </div>
                          <p>{selectedQuestion.answer}</p>
                        </div>
                      ) : (
                        <div className="waiting-response">
                          <span>◷</span>
                          <div>
                            <strong>Waiting for mentor response</strong>
                            <p>
                              Your mentor has not submitted an answer yet.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedQuestion.feedback && (
                      <div className="mentor-feedback-section">
                        <h3>Mentor Feedback</h3>
                        <p>{selectedQuestion.feedback}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    )
  }

  // LOGIN AND SIGN UP PAGE
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
