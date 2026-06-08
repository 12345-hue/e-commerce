import styles from "./Cart.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import Button from "../../ui/Button/Button";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../../ui/Spinner/Spinner";

function Checkout() {
  const { checkout, cashPayment, loading, cart } = useContext(CartContext);
  const [payWithCash, setPayWithCash] = useState(false);

  async function handleSubmit(values) {
    if (payWithCash) {
      await cashPayment(values);
      return;
    }
    await checkout(values);
  }

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9+\s-]{7,15}$/, "Enter a valid phone number")
      .required("Your phone is required"),
    city: Yup.string().min(2, "City must be at least 2 characters").required("Your city is required"),
    details: Yup.string().min(5, "Please provide a more detailed address").required("Your address is required"),
  });

  const formik = useFormik({
    initialValues: { phone: "", city: "", details: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className={`container ${styles.form}`} onSubmit={formik.handleSubmit}>
      {loading && <Spinner />}
      <h3 className="fw-semibold mb-0">Shipping Details</h3>

      {/* IMPROVEMENT: order summary at top of checkout */}
      {cart?.data?.data && (
        <div className="alert alert-success py-2 mb-0">
          <strong>Order Total: {cart.data.data.totalCartPrice} EGP</strong>
          <span className="text-secondary ms-2">({cart.data.numOfCartItems} items)</span>
        </div>
      )}

      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <label htmlFor="phone"><BsFillTelephoneFill /></label>
          <input
            name="phone"
            type="tel"
            id="phone"
            placeholder="Phone number"
            aria-label="Phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <small className="text-danger">{formik.errors.phone}</small>
        )}
      </div>

      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <label htmlFor="city"><BiSolidCity /></label>
          <input
            name="city"
            id="city"
            placeholder="City"
            aria-label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.city && formik.touched.city && (
          <small className="text-danger">{formik.errors.city}</small>
        )}
      </div>

      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <label htmlFor="details" style={{ height: "auto", paddingTop: "0.75rem" }}>
            <MdLocationOn />
          </label>
          <textarea
            name="details"
            id="details"
            placeholder="Please provide your full address"
            aria-label="Address"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        {formik.errors.details && formik.touched.details && (
          <small className="text-danger">{formik.errors.details}</small>
        )}
      </div>

      <div className="paymentMethod">
        <p className="fw-semibold mb-2">Payment Method:</p>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="payOnline"
              checked={!payWithCash}
              onChange={() => setPayWithCash(false)}
            />
            <label className="form-check-label" htmlFor="payOnline">
              💳 Pay Online (Card)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="payWithCash"
              checked={payWithCash}
              onChange={() => setPayWithCash(true)}
            />
            <label className="form-check-label" htmlFor="payWithCash">
              💵 Pay with Cash
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={!formik.isValid || !formik.dirty || loading}>
        {payWithCash ? "💵 Place Order (Cash)" : "💳 Proceed to Payment"}
      </Button>
    </form>
  );
}

export default Checkout;
