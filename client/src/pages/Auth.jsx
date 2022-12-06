import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Auth.css";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row Animation">
      <div className="col s6 offset-s3">
        {/* <div style={{width: 500}}> */}
        <b>
          {" "}
          <h1
            style={{
              textAlign: "center",
              color: "#d81b60",
              fontWeight: "bold",
            }}
          >
            Radianite
          </h1>
        </b>
        <div className="card pink darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Input login"
                  id="login"
                  type="text"
                  name="login"
                  className="yellow-input"
                  value={form.login}
                  onChange={changeHandler}
                />
                <label htmlFor="login">login</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="login">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect purple darken-3"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="btn waves-effect amber darken-3"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
