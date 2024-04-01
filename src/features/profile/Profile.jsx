import "./Profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./profilSlice";
import UpdateUserForm from "../update/updateUserForm";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div>
      <main className="main bg-dark profile">
        <div className="header">
          {edit ? (
            <div>
              <h1>Welcome back</h1>
              <UpdateUserForm />
            </div>
          ) : (
            <div>
              <h1>
                Welcome back
                <br />
                {user.firstName}
              </h1>
              <button
                type="button"
                className="edit-button"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit Name
              </button>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
