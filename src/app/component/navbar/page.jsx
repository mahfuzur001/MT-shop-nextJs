import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <ul>
            <li>
                <Link href="/home">home</Link>
            </li>
            <li>
                <Link href="/about">about</Link>
            </li>
            <li>
                <Link href="/contact">contact</Link>
            </li>
            <li>
                <Link href="/blog">blog</Link>
            </li>
        </ul>
    </div>
  )
}

export default page