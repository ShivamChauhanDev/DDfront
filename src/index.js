import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { disableReactDevTools} from '@fvilers/disable-react-devtools'

if(Process.env.NODE_ENV === 'production') disableReactDevTools()
createRoot(document.getElementById('root')).render(<App />);
