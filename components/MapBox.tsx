import React from "react";

function MapDetail() {
  return (
    <section className="text-gray-600 body-font relative" id="contact-us">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.347372580868!2d75.89073069999999!3d22.7524864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302a856dcc5d7%3A0xae4aca96c99bff54!2sMy%20Tours%20%26%20Travels!5e0!3m2!1sen!2sin!4v1675621890220!5m2!1sen!2sin"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
          {/* <!-- <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.347372580868!2d75.89073069999999!3d22.7524864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302a856dcc5d7%3A0xae4aca96c99bff54!2sMy%20Tours%20%26%20Travels!5e0!3m2!1sen!2sin!4v1675621890220!5m2!1sen!2sin"
          width="100" height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe> --> */}
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1 text-sm">
                LG-3, Royal Glory, Plot No.GF 29-30, Side Walking Rd, Opposite
                Hotel Sayaji,Scheme No.54, Suyash Vihar, Vijay Nagar, Indore,
                Madhya Pradesh 452010
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-primary-blue leading-relaxed">
                mttindore@gmail.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">+91 99935 34100</p>
              <p className="leading-relaxed">+91 731 4077400</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Let's Connect and Cruise
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Ready to hit the road with ease and style? Drop us a line! Our team
            of rental pros is waiting to hear from you and help make your car
            rental dreams a reality.
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button className="text-white bg-primary-blue border-0 py-2 px-6 focus:outline-none rounded-2xl text-lg">
            Send
          </button>
          <p className="text-xs text-gray-500 mt-3">
            If there is any problem sending queries through htmlForm, please
            contact us on +91 99935 34100
          </p>
        </div>
      </div>
    </section>
  );
}

export default MapDetail;
