'use client';
import { useState } from 'react';
// import axios from '@/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {

  return (
    <>
    <div className="h-[65vh] p-6 bg-white  rounded-2xl shadow-4xl w-[450] m-auto">
    <form className="space-y-4  p-16 shadow-xl hover:shadow-2xl  rounded-4xl">
    <h3 className="text-2xl font-bold mb-4 text-center">LOGIN FORM</h3>
      <label >Email</label>
      <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
      <label >Password</label>
      <input type="password" placeholder="Your password" className="w-full p-2 border rounded-lg" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800">
        <h3>Login</h3>
      </button>
      <Link  href="/register" className="hover:text-blue-300 text-blue-500 border-b-2">create an account</Link>
    </form>
  </div>
  </>
  );
}
