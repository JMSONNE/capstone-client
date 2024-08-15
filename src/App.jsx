import { useState } from 'react'
import Router from './Components/Router/Router'
import Navbar from './Components/Navbar'
import { Footer } from './Components/Footer'

function App() {


  return (
    <>
      <main>
        <Navbar />
        <Router />
      </main>

      <Footer />
    </>
  )
}

export default App
