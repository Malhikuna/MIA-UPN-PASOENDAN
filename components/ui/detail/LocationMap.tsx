import React from 'react';

const LocationMap = () => {
  return (
    <iframe
      src={`https://www.google.com/maps?q=-6.864548192578693, 107.5933793366201&z=15&output=embed`}
      width="100%"
      height="300"
      style={{borderRadius: "1rem"}}
      className="mb-10 border-2 border-[#31725C]"
      allowFullScreen
      loading="lazy"
    >
    </iframe>
  );
};

export default LocationMap;