import { createRoot } from 'react-dom/client'

// Minimal component for testing
const DebugComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: 'green' }}>
      <h1>Main.tsx is rendering successfully!</h1>
    </div>
  )
}

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container not found. Please ensure index.html contains <div id="root"></div>.')
}

// Render the debug component
createRoot(container).render(<DebugComponent />)

console.log('main.tsx is running!')
