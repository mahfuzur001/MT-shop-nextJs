import Image from "next/image";


export default function Home() {
  return (
    <>
    <div className="max-[100vh] max-w-full bg-black text-white">
      <div className="relative w-full h-[600px]">
        <Image src="/product.png" fill alt="Picture of the author" />
        /*{" "}
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md ">
        <li className="p-4 pb-2 text-center opacity-60 tracking-wide text-2xl">
          Most sell product this week
        </li>

        <div className="max-w-full flex justify-around  border mb-8 opacity-40 shadow-amber-400">
          <li className="list-row m-3 ">
            <div>
              <img
                className="size-10 rounded-box rounded-full "
                src="https://img.daisyui.com/images/profile/demo/3@94.webp"
              />
            </div>
            <div>
              <div>Sabrino Gardener</div>
            </div>
          </li>
          <li className="list-row mt-3">
            <div>
              <img
                className="size-10 rounded-box  rounded-full"
                src="https://img.daisyui.com/images/profile/demo/3@94.webp"
              />
            </div>
            <div>
              <div>Sabrino Gardener</div>
            </div>
          </li>
          <li className="list-row mt-3">
            <div>
              <img
                className="size-10 rounded-box  rounded-full"
                src="https://img.daisyui.com/images/profile/demo/3@94.webp"
              />
            </div>
            <div>
              <div>Sabrino Gardener</div>
            </div>
          </li>
        </div>
      </ul>
      <div>
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img
              src="/ads.jpg"
              className="w-full  h-50 opacity-70 drop-shadow-amber-300"
            />
          </div>
        </div>
      </div>

      {/*  */}
      <h2 className="text-black text-4xl text-center m-6">PRODUCT LIST</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-full">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="card shadow-sm">
            <figure className="flex justify-center">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="w-[250]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">Product {index + 1}</h2>
              <p className="text-center m-8">
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*  */}
      <div>
        <div className="flex w-full gap-4 m-6 max-w-full">
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475324.8263480138!2d91.7166636107998!3d22.341900457746076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd881b346bb01%3A0x5d01bdbb0f1928f6!2sChattogram!5e0!3m2!1sen!2sbd!4v1682427512271!5m2!1sen!2sbd"
              width="60%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border rounded-4xl"
            />
          </div>

          <div className="card  bg-base-300 rounded-box grid h-20 grow place-items-center">
            <h3>CONTACT FORM</h3>
            <fieldset className="fieldset border p-6 rounded-2xl">
              <div>
                <legend className="fieldset-legend"> your name</legend>
                <input
                  type="text"
                  className="input border rounded-2xl pe-64 p-2"
                  placeholder="Type here"
                />
              </div>
              <div>
                <legend className="fieldset-legend">your number</legend>
                <input
                  type="text"
                  className="input border rounded-2xl  pe-64 p-2"
                  placeholder="Type here"
                />
              </div>
              <div>
                <legend className="fieldset-legend">your email </legend>
                <input
                  type="text"
                  className="input border rounded-2xl  pe-64 p-2"
                  placeholder="Type here"
                />
              </div>
              <button className=" pe-96 m-auto btn btn-success mt-4 border p-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-900 ">
                <h3 className="text-xl m-auto">contact us</h3>
              </button>
            </fieldset>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="bg-black text-white max-w-full">
  <footer className="flex justify-around text-center mt-6">
    <div>
      <h1 className="text-2xl mt-2">Services</h1>
      <ul>
        <li>Branding</li>
        <li>Design</li>
        <li>Marketing</li>
        <li>Advertisement</li>
      </ul>
    </div>
    <div>
      <h1 className="text-2xl mt-2">Services</h1>
      <ul>
        <li>Branding</li>
        <li>Design</li>
        <li>Marketing</li>
        <li>Advertisement</li>
      </ul>
    </div>
    <div>
      <h1 className="text-2xl mt-2">Services</h1>
      <ul>
        <li>Branding</li>
        <li>Design</li>
        <li>Marketing</li>
        <li>Advertisement</li>
      </ul>
    </div>

  </footer>
</div>
</div>
    </>
  );
}
