import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../api/apiservice";
import restaurantFallback from "../assets/restaurant-fallback.jpg";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchRestaurants = async () => {
      try {
        const res = await getRestaurants();
        if (mounted) setRestaurants(res?.data?.results || []);
      } catch (err) {}
    };

    fetchRestaurants();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-[#F3F5E4] w-full max-w-[700px] justify-center mx-auto min-h-screen border">
      <div className="flex justify-between items-center p-[24px]">
        <div>
          <h2 className="text-[#9CA3AF] text-[12px] font-bold uppercase tracking-widest">
            Pre Order From
          </h2>
          <h1 className="text-[30px] font-bold text-[#1A1A1A] flex items-center gap-[4px]">
            Connaught Place <span className="text-[#F97316] text-[14px]">▼</span>
          </h1>
        </div>
        <div className="flex gap-[8px]">
          <div className="w-[48px] h-[48px] rounded-[16px] bg-[#FFF7ED] flex items-center justify-center text-[20px] shadow-md">
            🏷️
          </div>
          <div className="w-[48px] h-[48px] rounded-[16px] bg-[#DBEAFE] flex items-center justify-center text-[20px] shadow-md">
            💳
          </div>
        </div>
      </div>

      
      <div className="px-[6px] mb-[24px] mx-auto w-full max-w-[640px] border rounded-[16px] bg-[#EEF2BD]">
        <h1 className="text-[30px] font-bold text-[#1A1A1A]">Hello, Karan 👋</h1>
        <p className="text-[#6B7280] text-[20px]">Let's explore this evening</p>
      </div>
      

      
      <div className="px-[24px] mb-[24px] border-t ">
        <div className="flex justify-between items-center mb-[16px]">
          <h3 className="text-[24px] font-bold text-[#1A1A1A]">Your taste</h3>
          <span className="text-[18px] font-bold text-[#9CA3AF]">see all ›</span>
        </div>
        <div className="flex gap-[16px] overflow-x-auto no-scrollbar pb-[8px]">
          {restaurants.slice(0, 5).map((item) => (
            <div
              key={item.restaurant_id}
              className="min-w-[140px] cursor-pointer rounded-[16px] overflow-hidden shadow-md bg-[#FFFFFF]"
              onClick={() =>
                navigate(`/details/${item.restaurant_id}`, {
                  state: { item },
                })
              }
            >
              <img
                src={item.logo && item.logo !== 'null' ? item.logo : restaurantFallback}
                alt={item.restaurant_name}
                className="w-full h-[128px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = restaurantFallback;
                }}
              />
              <div className="p-[8px]">
                <h4 className="text-[14px] font-bold text-[#1A1A1A] line-clamp-1">
                  {item.restaurant_name}
                </h4>
                <p className="text-[12px] text-[#6B7280] truncate">
                  {item.address_complete !== "null"
                    ? item.address_complete.split(",")[0]
                    : "Location not available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex justify-center px-[24px] mb-[24px]">
        <div className="w-full rounded-3xl overflow-hidden shadow-lg relative">
          <img
            src="https://picsum.photos/600/200?food"
            alt="Banner"
            className="w-full h-[160px] object-cover"
          />
          <div className=" bottom-[16px] left-[16px] rounded-[12px] p-[12px] text-center " style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
            <p className="text-[12px] font-bold text-[#16A34A] uppercase">
              Veggie Friendly
            </p>
            <h3 className="text-[18px] font-bold text-[#1A1A1A]">Eateries</h3>
            <button className="mt-[8px] bg-[#16A34A] text-[#FFFFFF] text-[12px] font-bold px-[12px] py-[4px] rounded-full">
              Try Now
            </button>
          </div>
        </div>
      </div>

      
      <div className="px-[24px] border-t pt-[24px] pb-[48px] mb-[24px]">
        <h3 className="text-[24px] font-bold text-[#1A1A1A] mb-[16px]">Popular Ones</h3>
        <div className="space-y-[16px]">
          {restaurants.map((item) => (
            <div
              key={item.restaurant_id}
              className="flex border-t gap-[16px] bg-white rounded-[12px] p-[16px] shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                navigate(`/details/${item.restaurant_id}`, {
                  state: { item },
                })
              }
            >
              <div className="w-[112px] h-[112px] rounded-[12px] overflow-hidden flex-shrink-0">
                <img
                  src={item.logo && item.logo !== 'null' ? item.logo : restaurantFallback}
                  alt={item.restaurant_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = restaurantFallback;
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[18px] font-bold text-[#1A1A1A]">
                    {item.restaurant_name}
                  </h4>
                  <p className="text-[14px] text-[#6B7280] mt-[4px]">
                    {item.address_complete !== "null"
                      ? item.address_complete.split(",")[0]
                      : "Location not available"}
                  </p>
                  <p className="text-[14px] text-[#F97316] mt-[4px]">
                    4 Offers Trending
                  </p>
                </div>
                <div className="flex justify-between items-center mt-[8px] text-[#6B7280] text-[24px]">
                  <span>★ 4.5 Popularity</span>
                  <span>₹ 200 For two</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
