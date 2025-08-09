import './App.css'
import Text from './components/Text/Text'
import Button from './components/Button/Button'

function App() {

  return (
    <>
      <div className="app-container">

        <header className="app-header">
          <Text variant="h1" size="3xl" weight="bold" color="primary" align="center">
            Job Application Tracker
          </Text>
        </header>

        <main className="app-main">
          <Text variant="p" size="md" weight="normal" color="secondary" align="left">
            Keep track of your job applications with ease.
          </Text>

          <Button variant="primary" size="lg" fullWidth onClick={() => alert('Button Clicked!')}>
            Add New Application
          </Button>

          <Button variant="secondary" size="md" className="mt-4">
            View Applications
          </Button>
        </main>

        <aside className="app-sidebar">
          <Text variant="h2" size="xl" weight="semibold" color="primary" align="left">
            Quick Links
          </Text>
          <ul className="sidebar-links">
            <li><Button variant="ghost" size="sm">Dashboard</Button></li>
            <li><Button variant="ghost" size="sm">Settings</Button></li>
            <li><Button variant="ghost" size="sm">Help</Button></li>
          </ul>
        </aside>

        <div className="app-content">
          <Text variant="h3" size="lg" weight="medium" color="success" align="left">
            Recent Applications
          </Text>
          <Text variant="p" size="sm" weight="normal" color="muted" align="left">
            No applications found. Start adding your job applications!
          </Text>
        </div>

        
        <footer className="app-footer">
          <Text variant="p" size="sm" weight="light" color="muted" align="center">
            © 2023 My App. All rights reserved.
          </Text>
        </footer>

      </div> 


    </>
  )
}

export default App
