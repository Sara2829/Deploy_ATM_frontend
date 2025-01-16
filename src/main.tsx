import { createRoot } from 'react-dom/client'

// Minimal component for testing
const DebugComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: 'green' }}>
      <h1>Main.tsx is rendering successfully!</h1>
    </div>
  )
}

// Ensure root element exists and assert its type
const container = document.getElementById('root') as HTMLElement

// Render the debug component
createRoot(container).render(<DebugComponent />)

console.log('main.tsx is running!')
