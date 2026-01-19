"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/auth/forms/registration";
import AuthInput from "@/components/auth/authInputs/authInputs";
import { GoogleLogo } from "@/components/icons";
import { Card, CardBody } from "@heroui/card";
import { handleGoogleLogin, handleRegister } from "@/components/auth/auth-handlers";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const emailFieldError = submitted && !email;
  const passwordFieldError = submitted && !password;
  const confirmPasswordFieldError = submitted && password !== confirmPassword;

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleRegister({
      email,
      password,
      confirmPassword,
      setSubmitted,
      setAuthError,
      setLoading,
      push: router.push,
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center md:py-10">
      <Card className="max-w-full p-4 pb-6">
        <CardBody className="px-3 py-0 text-small text-default-400 gap-12">
          {/* Google Login */}

          <AuthInput authHandler={() => handleGoogleLogin({ setAuthError, setLoading, push: router.push })} text="Google Login" icon={<GoogleLogo />} />

          {/* Login Form */}
          <RegistrationForm
            handleRegister={onSubmitRegister}
            emailFieldError={emailFieldError}
            setEmail={setEmail}
            setAuthError={setAuthError}
            email={email}
            passwordFieldError={passwordFieldError}
            confirmPasswordFieldError={confirmPasswordFieldError}
            setPassword={setPassword}
            password={password}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
            authError={authError}
            loading={loading}
          />
        </CardBody>
      </Card>
    </section>
  );
}
