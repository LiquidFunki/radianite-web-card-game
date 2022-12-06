import React from "react";

export const MyForm = ({
  action,
  form,
  changeHandler,
  loading,
  actionHandler,
}) => {
  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <div className="card deep-orange darken-3">
          <div className="card-content white-text">
            <span className="card-title">{action}</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Input name"
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="new-password"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">name</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="name">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect purple darken-3"
              onClick={actionHandler}
              disabled={loading}
            >
              {action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
