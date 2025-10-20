const ProductListCard = () => {
  return (
    <div className="card bg-white text-black h-auto w-70 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"/>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">Nasi Goreng</h2>
        <p>Rp1.000,00</p>
      </div>
    </div>
  );
};

export default ProductListCard;