import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import { AiFillStar } from "react-icons/ai";
import { FaHeartCircleCheck, FaHeartCirclePlus, FaCartPlus } from "react-icons/fa6";

function ProductItem({ product, handleAddToCart, handleAddToWish, handleRemoveFromWishlist, wishlist }) {
  const inWishlist = wishlist?.data?.data?.find((el) => el._id === product._id) ? true : false;

  // IMPROVEMENT: show discount badge if price is discounted
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <li className={`${styles.product} col`}>
      <Link to={`/products/${product._id}`}>
        {/* IMPROVEMENT: discount badge */}
        {hasDiscount && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}
        <div className={`${styles.productImg}`}>
          <img src={product.imageCover} alt={product.title} className="objectFit-cover" />
        </div>
        <div className={styles.text}>
          <small className="main-color">{product.subcategory[0]?.name}</small>
          <h4 className="h6 mb-3">
            {product.title.split(" ").length > 4
              ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
              : product.title}
          </h4>
          <div className={`d-flex justify-content-between align-items-center ${styles.footer}`}>
            <div>
              {hasDiscount ? (
                <>
                  <p className="mb-0 fw-semibold text-danger">{product.priceAfterDiscount} EGP</p>
                  <small className="text-decoration-line-through text-secondary">{product.price} EGP</small>
                </>
              ) : (
                <p className="mb-0 fw-semibold">{product.price} EGP</p>
              )}
            </div>
            <span style={{ whiteSpace: "nowrap" }}>
              <AiFillStar /> {product.ratingsAverage}
            </span>
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.addToCart} onClick={(e) => handleAddToCart(e, product._id)}>
            <button aria-label="Add to cart">
              <FaCartPlus />
            </button>{" "}
            <small>Add to cart</small>
          </div>
          <div
            className={inWishlist ? styles.addedToWish : styles.addToWish}
            onClick={(e) => (inWishlist ? handleRemoveFromWishlist(e, product._id) : handleAddToWish(e, product._id))}
          >
            <button aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}>
              {inWishlist ? <FaHeartCircleCheck /> : <FaHeartCirclePlus />}
            </button>{" "}
            <small>{inWishlist ? "Added to wishlist" : "Add to wishlist"}</small>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
