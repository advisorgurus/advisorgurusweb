"use client";
import Link from 'next/link';
import Image from 'next/image';

const GetStarted = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-900 py-10">
      
      {/* Adjusted padding-top for more space between header and first line */}
      <div className="text-center pt-32 animate-fadeIn">
        <h2 className="text-5xl font-extrabold mb-10 text-blue-900">Meet Advisor Gurus</h2>
      </div>

      {/* Image above Mission, Services, and Approach */}
      <div className="flex justify-center mb-10 px-6 md:px-20 lg:px-32">
        <Image
          src="https://drive.google.com/uc?export=view&id=1ojeHB4O6Xqhk3KOKSttFPhKZJkXij8cg" // assuming you're using the uploaded image.
          alt="Advisor Gurus"
          width={600}  // slightly larger width to expand
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Mission, Services, and Approach Section Side by Side */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-16 px-6 md:px-20 lg:px-32">
        {/* Our Mission */}
        <div className="flex flex-col items-center max-w-xs text-center">
          <h3 className="text-2xl font-bold mt-6 text-blue-700">Our Mission</h3>
          <p className="mt-4 text-gray-600 text-center">
            At Advisor Gurus, our mission is to help businesses thrive. We provide tailored consulting services to meet the unique needs of every client. Our goal is to exceed expectations with top-notch results.
          </p>
        </div>

        {/* Our Services */}
        <div className="flex flex-col items-center max-w-xs text-center">
          <h3 className="text-2xl font-bold mt-6 text-blue-700">Our Services</h3>
          <p className="mt-4 text-gray-600 text-center">
            We offer a variety of services, from project management to personal finance and marketing. Our expertise spans across agile, Scrum, and Kanban frameworks.
          </p>
        </div>

        {/* Our Approach */}
        <div className="flex flex-col items-center max-w-xs text-center">
          <h3 className="text-2xl font-bold mt-6 text-blue-700">Our Approach</h3>
          <p className="mt-4 text-gray-600 text-center">
            Our approach is collaborative, transparent, and results-driven. We work closely with clients to understand their challenges and offer custom solutions for success.
          </p>
        </div>
      </div>

      {/* Visit Us Section with Side by Side Map and Address */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 py-10 px-6 md:px-20 lg:px-32 mt-16 shadow-lg rounded-lg">
        {/* Address on the Left */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Visit Us</h3>
          <p className="text-lg text-gray-700 mb-2">
            3654 Thornton Avenue, Suite 1056 <br />
            Fremont, CA 94536
          </p>
          <p className="text-gray-600 text-sm">
            We're excited to welcome you to our office. Contact us for more information or to schedule an appointment.
          </p>
        </div>

        {/* Map on the Right
        <div className="md:w-1/2 h-64 sm:h-80 lg:h-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.085241176495!2d-121.994214!3d37.548539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc99c999c7ff9%3A0x22ae9174d8ea2f34!2s3654%20Thornton%20Ave%20Suite%201056%2C%20Fremont%2C%2094536!5e0!3m2!1sen!2sus!4v1663967325000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen={true}
            loading="lazy"
            className="border-0 shadow-lg rounded-lg"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default GetStarted;
