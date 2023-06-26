import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/UserContext";
import "./SignUp.css";

const SignUp = () => {
  const [error, setError] = useState(null);

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    console.log(email, password, confirm);

    if (password.length < 6) {
      setError("Password should be minimum 6 Character");
      return;
    }

    if (password !== confirm) {
      setError("Your Password did not match.");
      return;
    }
    setError(null);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        form.reset();
        Swal.fire("User Created Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
    setError(null);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" required />
        </div>
        <input className="btn-submit" type="submit" value="Sign up" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p className="text-err">{error}</p>
    </div>
  );
};

export default SignUp;
