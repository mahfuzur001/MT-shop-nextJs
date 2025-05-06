import React from 'react'

const TopSellers = () => {
  return (
    <ul className="list bg-base-100    mt-6 ">
    <li className="p-4 pb-2 text-center opacity-60 tracking-wide text-2xl">
      Most sell product this week
    </li>

    <div className="max-w-full  ms-4  mb-8 border rounded-xl p-2  md:shadow-2xl md:rounded-4xl grid grid-cols-2 md:grid-cols-4 ">
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
            className="size-10 rounded-full "
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
  )
}

export default TopSellers