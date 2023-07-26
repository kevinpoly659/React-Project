// import React from 'react'
// import ReactDOM from 'react-dom/client'
import './index.css'


// ReactDOM.createRoot(document.getElementById('root')).render(
  //   <React.StrictMode>
  //     <ThemeProvider>
  //     <App />
  //     </ThemeProvider>
  //   </React.StrictMode>,
  // )
  
import { ThemeProvider } from "@material-tailwind/react";
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { extendTheme } from '@chakra-ui/react'
import store from './app/store';
import { Provider } from 'react-redux';


// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ThemeProvider>
      <Provider store={store}>
      <App />
      </Provider>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)