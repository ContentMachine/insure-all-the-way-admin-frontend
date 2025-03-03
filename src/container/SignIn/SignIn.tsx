"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Logo from "@/components/Logo/Logo";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { requestType } from "@/utilities/types";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./SignIn.module.css";

const SignIn = () => {
  // States
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Router
  const router = useRouter();

  //   Context
  const { user, setUser } = useContext(AuthContext);

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  const login = () => {
    requestHandler({
      url: "/admin/sign-in",
      method: "POST",
      data: { email: loginData?.email, password: loginData?.password },
      state: requestState,
      setState: setRequestState,
      id: "sign-in",
      requestCleanup: true,
      successFunction(res) {
        if (localStorage && typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res?.data?.token);
        }
        setUser(res?.data?.user);

        router.push(routes.DASHBOARD);
      },
      errorFunction(err) {
        if (err?.status === 403) {
          showToast((err?.response?.data as any)?.message, "success");
          setLoginData((prevState) => {
            return { ...prevState, password: "", confirmPassword: "" };
          });
        } else {
          errorFlowFunction(err);
        }
      },
    });
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <Logo />
        <h4>Welcome back, Admin</h4>
        <p>Securely Sign In to Manage Your Users, Claims and Policies</p>
        <Input
          label="Email"
          isRequired
          name="email"
          value={loginData?.email}
          onChange={(e) => inputChangeHandler(e, setLoginData)}
        />
        <Input
          label="Password"
          type="password"
          isRequired
          name="password"
          value={loginData?.password}
          onChange={(e) => inputChangeHandler(e, setLoginData)}
          tip="Your password should be at least 8 characters"
        />

        <Button
          loading={requestState?.isLoading}
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          disabled={!loginData?.email || !loginData?.password}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
