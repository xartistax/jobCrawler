"use client";

import { Card, CardBody } from "@heroui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { GoogleLogo } from "@/components/icons";
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
    <section className="min-h-screen flex items-center justify-center py-3">
      <Card className="w-md p-12 ">
        <CardBody className="px-3 py-0 text-small text-default-500 gap-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl"> Anmelden </h1>
            <p className="text-body"> Bei deinem Konto anmelden </p>
          </div>

          <AuthInput authHandler={onGoogleLogin} icon={<GoogleLogo />} text="Mit Google anmelden" />

          <span className="relative mt-3 block text-center text-xs">
            <span className="absolute left-0 top-1/2 block h-px w-full max-w-30 bg-gray-3" />
            <span className="absolute right-0 top-1/2 block h-px w-full max-w-30 bg-gray-3" />
            Oder per E-Mail Adresse
          </span>

          <LoginForm
            authError={authError}
            email={email}
            emailFieldError={emailFieldError}
            handleLogin={onSubmitLogin}
            loading={loading}
            password={password}
            passwordFieldError={passwordFieldError}
            setAuthError={setAuthError}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </CardBody>
      </Card>
    </section>
  );
}
