import { createRoot } from 'react-dom/client'

// Minimal component for testing
const DebugComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: 'green' }}>
      <h1>Main.tsx is rendering successfully!</h1>
    </div>
  )
}

// Locate the root element
const container = document.getElementById('root')

// Render the debug component if the container exists
if (container) {
  createRoot(container).render(<DebugComponent />)
}
