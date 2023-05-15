'use client'; 

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
        <div className="container">

        <Link className="text-2xl font-semibold line-hei" href="/">Meme Creator</Link>
        </div>

    </div>
  )
}

export default Navbar