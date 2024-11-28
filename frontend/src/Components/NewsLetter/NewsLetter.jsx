import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Oferte Speciale</h1>
        <p>Inscriete pentru a primi ofertele</p>
        <div>
            <input type="email" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
