import { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartContext";
import Spinner from "../../ui/Spinner/Spinner";
import Button from "../../ui/Button/Button";
import { FiTrash2 } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";

function Cart() {
  const { cart, getUserCart, clearCart, loading } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      await getUserCart();
    })();
  }, [getUserCart]);

  // IMPROVEMENT: empty cart state
  const isEmpty = !cart?.data?.data?.products?.length;

  return (
    <section className={`container ${styles.cart}`}>
      {loading && <Spinner />}
      <h2 className="fw-semibold">🛒 Shopping Cart</h2>

      {isEmpty && !loading ? (
        // IMPROVEMENT: nice empty cart UI
        <div className="text-center py-5 d-flex flex-column align-items-center gap-3">
          <BsCartX style={{ fontSize: "5rem", color: "var(--light-gray)" }} />
          <h4 className="text-secondary">Your cart is empty</h4>
          <p className="text-secondary">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn" style={{ backgroundColor: "var(--main-color)", color: "#fff" }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.price}>
            Total cart price: <span>{cart?.data?.data.totalCartPrice} EGP</span>
            {/* IMPROVEMENT: item count */}
            <small className="text-secondary ms-2 fw-normal fs-6">
              ({cart?.data?.numOfCartItems} item{cart?.data?.numOfCartItems !== 1 ? "s" : ""})
            </small>
          </p>
          <ul className="d-flex flex-column">
            {cart?.data?.data?.products.map((product) => (
              <CartItem cartItem={product} key={product._id} />
            ))}
          </ul>
          {cart?.data?.numOfCartItems > 0 && (
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-danger" onClick={clearCart}>
                <FiTrash2 /> Clear cart
              </button>
              <Button type="link" to="checkout">
                <IoBagCheckOutline /> Checkout
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Cart;
