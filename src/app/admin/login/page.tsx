"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLogin() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div className="admin-login">
      <form action={action}>
        <h1>
          Admin<span className="dot">.</span>
        </h1>
        <div className="row">
          <label htmlFor="pw">Password</label>
          <input
            id="pw"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
          />
        </div>
        {state?.error && (
          <p className="form-fail" role="alert">
            {state.error}
          </p>
        )}
        <button className="btn solid" type="submit" disabled={pending}>
          {pending ? "Checking…" : "Enter →"}
        </button>
      </form>
    </div>
  );
}
