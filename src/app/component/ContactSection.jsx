export default function ContactSection() {
    return (
        <div>
        <div className="grid w-full gap-4 mt-6 max-w-full py-20 px-10 grid-cols-1 md:grid-cols-2">
          <div className="card bg-base-300 rounded-box grid grow place-items-center relative w-full h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475324.8263480138!2d91.7166636107998!3d22.341900457746076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd881b346bb01%3A0x5d01bdbb0f1928f6!2sChattogram!5e0!3m2!1sen!2sbd!4v1682427512271!5m2!1sen!2sbd"
              width="40%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0 w-full h-full rounded-2xl border"
            
            />
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl">
  <h3 className="text-2xl font-bold mb-4 text-center">Contact Us</h3>
  <form className="space-y-4 ">
    <label >Name</label>
    <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg" />
    <label >Number</label>
    <input type="text" placeholder="Your Number" className="w-full p-2 border rounded-lg" />
    <label >Email</label>
    <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800">
      Send Message
    </button>
  </form>
</div>

        </div>
      </div>
    );
  }
  