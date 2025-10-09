"use client";
import React, { useEffect, useState } from "react";
import FileUploadPreview from "./FileUploadPreview";

const DTFDetail = () => {
  // 🧾 List of available sheet sizes with corresponding prices
  const sizes = [
    { size: `22" x 12"`, price: 7.99 },
    { size: `22" x 18"`, price: 11.99 },
    { size: `22" x 24"`, price: 14.99 },
    { size: `22" x 36"`, price: 22.99 },
    { size: `22" x 48"`, price: 29.99 },
    { size: `22" x 60"`, price: 36.99 },
    { size: `22" x 72"`, price: 43.99 },
    { size: `22" x 84"`, price: 50.99 },
    { size: `22" x 96"`, price: 56.97 },
    { size: `22" x 108"`, price: 62.99 },
    { size: `22" x 120"`, price: 68.99 },
    { size: `22" x 180"`, price: 101.99 },
    { size: `22" x 240"`, price: 103.99 },
  ];

  // 🧩 State for selected size, options, quantity, and calculated prices
  const [selected, setSelected] = useState(sizes[0]);
  const [options, setOptions] = useState([
    { id: 1, name: "Rush Production Same Day", price: 10.0, checked: false },
    { id: 2, name: "Remove Image Background", price: 10.0, checked: false },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [finalTotal, setFinalTotal] = useState(selected.price);

  // 🧮 Toggle checkbox state for each extra service
  const handleOptionChange = id => {
    setOptions(prev => prev.map(opt => (opt.id === id ? { ...opt, checked: !opt.checked } : opt)));
  };

  // 💰 Calculate total price of selected add-ons
  const optionsTotal = options.filter(opt => opt.checked).reduce((sum, opt) => sum + opt.price, 0);

  // 🔄 Update final total whenever size, quantity, or options change
  useEffect(() => {
    const total = (selected.price * quantity) + optionsTotal;
    setFinalTotal(total);
  }, [selected, optionsTotal, quantity]);

  return (
    <div className="space-y-8">
      {/* 🏷️ Header and Description */}
      <div>
        <h1 className="text-5xl font-bold">DTF Gang Sheets</h1>
        <p className="text-2xl font-bold py-5">$7.99 – $133.99</p>
        <p className="text-slate-950 leading-relaxed">
          Upload your pre-built (ready to print) high-resolution (300dpi) gang sheet as a transparent PNG (Please do not mirror the images). All gang sheets will now be printed with our new hot peel
          film — just press and peel.
        </p>
        <ul className="list-disc py-5 text-slate-950 space-y-1">
          <li>Select your gang sheet size.</li>
          <li>Select your quantity.</li>
          <li>Upload your artwork.</li>
          <li>Then add to cart.</li>
        </ul>
      </div>

      {/* 📏 Size Selection */}
      <div className="w-full max-w-3xl mx-auto">
        <label className="block font-semibold mb-2 text-lg">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map(item => (
            <button
              key={item.size}
              onClick={() => setSelected(item)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all
                ${selected.size === item.size ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}
            >
              {item.size}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-950">
          Selected:{" "}
          <span className="font-semibold">
            {selected.size} — ${selected.price.toFixed(2)}
          </span>
        </p>
      </div>

      {/* 🖼️ File Upload Section */}
      <FileUploadPreview />

      {/* 💡 Extra Services Section */}
      <div className=" mt-10 p-6  rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Extra Services:</h2>

        {/* Checkboxes for optional services */}
        <div className="space-y-3">
          {options.map(opt => (
            <label
              key={opt.id}
              className="flex justify-between items-center text-slate-950"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={opt.checked}
                  value={opt.price}
                  className="w-4 h-4 accent-blue-600"
                  onChange={() => handleOptionChange(opt.id)}
                />
                <span>{opt.name}</span>
              </div>
              <span className="font-medium">${opt.price}</span>
            </label>
          ))}
        </div>

        {/* 💵 Price Summary */}
        <div className="mt-10 text-slate-950">
          <div className="flex justify-between">
            <span>Options Amount</span>
            <span className="font-bold">${optionsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Final Total</span>
            <span className="font-bold text-lg">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* 🧮 Quantity & Add to Cart */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border border-gray-300 rounded-md py-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-slate-950 font-semibold px-5 py-2 rounded-md transition-all">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default DTFDetail;
