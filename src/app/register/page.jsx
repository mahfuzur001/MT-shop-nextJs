import Link from 'next/link'; // Make sure you import Link from 'next/link'

export default function Register() {
  return (
    <>
      <div className="h-[65vh] p-6 bg-white   shadow-4xl w-[450px] m-auto">
        <form className="space-y-4 p-8 shadow-xl  hover:shadow-2xl rounded-4xl">
          <h3 className="text-2xl font-bold mb-4 text-center">LOGIN FORM</h3>

          <label>User name</label>
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
          <label>Email</label>
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />

          <label>Password</label>
          <input type="password" placeholder="Your Password" className="w-full p-2 border rounded-lg" />

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800">
            Login
          </button>

          <div className="text-center">
            <Link href="/login" className="hover:text-blue-300 text-blue-500 border-b-2">
              Have an account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
