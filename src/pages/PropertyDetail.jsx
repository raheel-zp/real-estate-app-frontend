import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const placeholder = "/images/placeholder.jpg";

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await API.get(`/properties/${id}`);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property details", err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        {property.images && property.images.length > 0 ? (
          property.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img ? img : placeholder}
                alt={`Property ${index + 1}`}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src={placeholder}
              alt="No property"
              className="w-full h-96 object-cover"
            />
          </SwiperSlide>
        )}
      </Swiper>

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.location}</p>
        <p className="text-xl font-semibold mt-4">
          ${property.price?.toLocaleString()}
        </p>
        <p className="mt-4">{property.description}</p>
      </div>

      <div className="mt-10 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Contact about this property
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const inquiry = Object.fromEntries(formData.entries());

            try {
              await API.post(`/inquiries/${property._id}/inquire`, inquiry);
              alert("Your inquiry has been sent!");
              e.target.reset();
            } catch (err) {
              console.error("Error sending inquiry", err);
              alert("Failed to send inquiry. Please try again.");
            }
          }}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetail;
