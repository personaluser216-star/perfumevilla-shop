
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import stick from "../assets/stick.jpg";

const Collection = ({ category }) => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortOption, setSortOption] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const categories = ["Men's perfume", "women's perfume", "Unisex perfume"];
  const subCategories = ["Luxury", "Casual", "Daily use"];
  const priceRanges = [
    { label: "Rs200 - Rs300", min: 200, max: 300 },
    { label: "Rs300 - Rs400", min: 300, max: 400 },
    { label: "Rs400 - Rs500", min: 400, max: 500 },
    { label: "Rs700 - Rs1000", min: 700, max: 1000 },
  ];
  const sizes = ["50ml", "100ml", "200ml", "500ml"];

  // ✅ Apply Filters
  useEffect(() => {
    let updated = [...products];

    // search
    if (showsearch && search) {
      updated = updated.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (selectedCategory) {
      updated = updated.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }

    // sub-category filter
    if (selectedSubCategory) {
      updated = updated.filter(
        (product) =>
          product.subCategory?.toLowerCase() ===
          selectedSubCategory?.toLowerCase()
      );
    }

    // price filter
    if (selectedPrice) {
      const range = priceRanges.find((p) => p.label === selectedPrice);
      if (range) {
        updated = updated.filter(
          (product) => product.price >= range.min && product.price <= range.max
        );
      }
    }

    // A to Z
    if (sortOption === "atoz") {
      updated.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Z to A
    if (sortOption === "ztoa") {
      updated.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Bestseller filter
    if (sortOption === "bestseller") {
      updated = updated.filter((product) => product.bestSeller === true);
    }

    // size filter
    if (selectedSize) {
      updated = updated.filter((product) =>
        product.sizes?.some(
          (size) => size.toLowerCase() === selectedSize.toLowerCase()
        )
      );
    }

    // sorting
    if (sortOption === "lowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [
    products,
    search,
    showsearch,
    selectedCategory,
    selectedSubCategory,
    selectedPrice,
    selectedSize,
    sortOption,
  ]);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  // ✅ Filter Component (reusable for desktop + mobile drawer)
  const FilterContent = () => (
    <div className="space-y-6 p-4 ">
      {/* Category */}
      <div >
        <h3 className="font-semibold mb-2">Shop By Type</h3>
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 cursor-pointer text-md mb-1"
          >
            <input
              type="radio"
              name="category"
              value={cat.toLowerCase()}
              checked={selectedCategory === cat.toLowerCase()}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="accent-black"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Sub-Category */}
      <div>
        <h3 className="font-semibold mb-2">Shop By Use</h3>
        {subCategories.map((sub) => (
          <label
            key={sub}
            className="flex items-center gap-2 cursor-pointer text-md mb-1"
          >
            <input
              type="radio"
              name="subCategory"
              value={sub.toLowerCase()}
              checked={selectedSubCategory === sub.toLowerCase()}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="accent-black"
            />
            {sub}
          </label>
        ))}
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-2">Available Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border text-center px-3 py-2 text-md cursor-pointer ${
                selectedSize === size
                  ? "bg-[#f8f7f4] border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">Select Price Range</h3>
        {priceRanges.map((p) => (
          <label
            key={p.label}
            className="flex items-center gap-2 cursor-pointer text-md mb-1"
          >
            <input
              type="radio"
              name="price"
              value={p.label}
              checked={selectedPrice === p.label}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="accent-black"
            />
            {p.label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div
        className="relative md:h-64 h-48 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${stick})` }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center text-white ">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
            {category ? `${category} Collection` : "All Collections"}
          </h1>
          <p className="mt-3 text-base md:text-lg tracking-wide">
            <a href="/" className="hover:cursor-pointer">
              Home
            </a>{" "}
            /{" "}
            <span className="text-white">
              {category ? `${category} Collection` : "All Collections"}
            </span>
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col sm:flex-row gap-6 md:pt-10 pt-4 border-t pb-8 md:mr-6 md:ml-6">
        {/* ✅ Desktop Sidebar */}
        <div className="hidden md:block w-64 border-r">{<FilterContent />}</div>

        {/* ✅ Mobile Filter Button */}
        <div className="md:hidden px-4 text-end">
          <button
            onClick={() => setShowFilter(true)}
            className="border px-4 py-2 mb-4 bg-[#5b4f47] text-white"
          >
           Apply Filters
          </button>
        </div>

        {/* ✅ Mobile Drawer */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowFilter(false)}
            ></div>
            {/* Drawer */}
            <div className="relative bg-white w-64 p-4 h-full overflow-y-auto shadow-lg">
              <button
                className="absolute top-2 right-2 text-black"
                onClick={() => setShowFilter(false)}
              >
                ✕
              </button>
              <FilterContent />
            </div>
          </div>
        )}

        {/* ✅ Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center text-base sm:text-md mb-4 ">
            <h1 className="text-[#5b4f47] font-bold text-lg pl-2">
              {category ? `${category} Collection` : "All Collections"}
            </h1>
            <select
              className="border border-gray-300 text-md px-2 py-1 mr-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowToHigh">Sort by: Low to High</option>
              <option value="highToLow">Sort by: High to Low</option>
              <option value="atoz">Sort by: A - Z</option>
              <option value="ztoa">Sort by: Z - A</option>
              <option value="bestseller">Sort by: Bestseller</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mr-2 ml-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="border p-3 hover:shadow-lg transition cursor-pointer group"
                  onClick={() =>
                    navigate(`/product/${slugify(item.name)}/${item._id}`)
                  }
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-48 h-56 object-cover mb-3 mx-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-[#f8f7f4] p-2">
                    <h3 className="font-bold text-md text-center text-[#5b4f47]">
                      {item.name}
                    </h3>
                    <p className="text-md text-gray-500 text-center">
                      ₹{item.price}
                    </p>
                    <div className="text-center pb-3 pt-3">
                      <button className="bg-[#5b4f47] md:px-12 md:py-2 py-1 px-5 text-white">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;

