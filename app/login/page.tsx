"use client";

import { GoogleLogo } from "@/components/icons";
import { Card, CardBody } from "@heroui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "@/components/auth/forms/login";
import AuthInput from "@/components/auth/authInputs/authInputs";
import { handleGoogleLogin, handleLogin } from "@/components/auth/auth-handlers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailFieldError = submitted && !email;
  const passwordFieldError = submitted && !password;

  // ✅ Wrapper-Funktion, die LoginForm als onSubmit bekommt
  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleLogin({
      email,
      password,
      setSubmitted,
      setAuthError,
      setLoading,
      push: router.push,
    });
  };

  // ✅ Wrapper für Google Button
  const onGoogleLogin = async () => {
    await handleGoogleLogin({ setAuthError, setLoading, push: router.push });
  };

  return (
    <section className="min-h-screen flex items-center justify-center md:py-10">
      <Card className="max-w-full p-4 pb-6">
        <CardBody className="px-3 py-0 text-small text-default-400 gap-12">
          <AuthInput authHandler={onGoogleLogin} text="Google Login" icon={<GoogleLogo />} />

          <LoginForm
            handleLogin={onSubmitLogin}
            emailFieldError={emailFieldError}
            passwordFieldError={passwordFieldError}
            setEmail={setEmail}
            setAuthError={setAuthError}
            setPassword={setPassword}
            authError={authError}
            loading={loading}
            email={email}
            password={password}
          />
        </CardBody>
      </Card>
    </section>
  );
}
