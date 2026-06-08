import { useContext, useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { ProductsContext } from "../../context/ProductsContext";
import Spinner from "../../ui/Spinner/Spinner";
import Pagination from "../../ui/Pagination/Pagination";

function Products() {
  const { products, getProducts, loading, error, metaData } = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  // IMPROVEMENT: Sort products
  function getSortedFiltered() {
    if (!products) return [];
    let result = products.filter((el) =>
      el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    return result;
  }

  useEffect(() => {
    if (products?.length > 0) return;
    getProducts();
  }, [products?.length, getProducts]);

  const displayed = getSortedFiltered();

  return (
    <>
      {/* IMPROVEMENT: search + sort bar */}
      <div className="container mt-5 mb-4">
        <div className="d-flex gap-2 flex-wrap">
          <div className="form-group flex-grow-1">
            <label htmlFor="search" className="visually-hidden">Search for a product</label>
            <input
              type="search"
              className="form-control"
              id="search"
              placeholder="🔍  Search for a product..."
              onChange={handleChange}
            />
          </div>
          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        {/* IMPROVEMENT: result count */}
        {searchTerm && (
          <small className="text-secondary mt-2 d-block">
            {displayed.length} result{displayed.length !== 1 ? "s" : ""} for "{searchTerm}"
          </small>
        )}
      </div>
      <section className="container">
        {loading && <Spinner />}
        {error && <p className="text-danger mb-0">Couldn't get the products, please refresh the page.</p>}
        {/* IMPROVEMENT: empty state */}
        {!loading && displayed.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <p className="fs-4">😕 No products found for "<strong>{searchTerm}</strong>"</p>
            <p className="text-secondary">Try a different search term.</p>
          </div>
        )}
        <ProductsList products={displayed} />
        <Pagination
          metaData={metaData}
          handleNext={() => getProducts(metaData?.nextPage)}
          handlePrev={() => getProducts(metaData?.prevPage)}
          handleNavigate={getProducts}
        />
      </section>
    </>
  );
}

export default Products;
