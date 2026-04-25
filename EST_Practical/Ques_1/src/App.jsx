import { useState } from 'react'

function App() {
  const [patientName, setPatientName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!patientName.trim() || !email.trim()) {
      setErrorMessage('Please fill in both fields before submitting.')
      return
    }

    console.log({ patientName, email })
    setPatientName('')
    setEmail('')
    setErrorMessage('')
  }

  return (
    <main>
      <section>
    

        <form onSubmit={handleSubmit}>
          <label>
            <span>Patient Name</span>
            <input
              type="text"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              placeholder="Enter patient name"
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email address"
            />
          </label>

          {errorMessage ? <p>{errorMessage}</p> : null}

          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  )
}

export default App