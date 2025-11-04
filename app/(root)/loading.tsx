import React from "react";

export default function Loading({page = 'home'}: {page?: string}) {
  return (
    <>
      {
        page === 'detail' ? (
          <div className="flex-center h-screen text-gray-600 text-lg">
            Memuat data UMKM...
          </div>
        ) : (
          <div className="absolute inset-0 z-50 h-[100%] flex justify-center items-center bg-white">
            Loading...
          </div>
        )
      }
    </>
  )

  
}
