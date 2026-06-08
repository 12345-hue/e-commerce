import { useContext, useEffect } from "react";
import styles from "./Wishlist.module.css";
import { WishlistContext } from "../../context/WishlistContext";
import WishlistItem from "./WishlistItem";
import Spinner from "../../ui/Spinner/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

function Wishlist() {
  const { getWishlist, loading, wishlist } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const isEmpty = !wishlist?.data?.data?.length;

  return (
    <section className="container">
      {loading && <Spinner />}
      <div className={styles.wishlist}>
        <h2 className="fw-semibold border-bottom pb-2 mb-4">❤️ My Wishlist</h2>

        {/* IMPROVEMENT: empty wishlist state */}
        {isEmpty && !loading ? (
          <div className="text-center py-5 d-flex flex-column align-items-center gap-3">
            <AiOutlineHeart style={{ fontSize: "5rem", color: "var(--light-gray)" }} />
            <h4 className="text-secondary">Your wishlist is empty</h4>
            <p className="text-secondary">Save items you love by clicking the heart icon on any product.</p>
            <Link to="/products" className="btn" style={{ backgroundColor: "var(--main-color)", color: "#fff" }}>
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            {/* IMPROVEMENT: item count */}
            <p className="text-secondary mb-3">
              {wishlist?.data?.data?.length} item{wishlist?.data?.data?.length !== 1 ? "s" : ""} saved
            </p>
            <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2">
              {wishlist?.data?.data?.map((product) => (
                <WishlistItem product={product} key={product._id} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Wishlist;
