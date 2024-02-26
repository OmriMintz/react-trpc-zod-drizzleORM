import App from 'App'
import ReactDOM from 'react-dom/client'

import { Providers } from 'shared'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Providers>
      <App />
   </Providers>
)
