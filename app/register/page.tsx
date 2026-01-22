"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";

import RegistrationForm from "@/components/auth/forms/registration";
import AuthInput from "@/components/auth/authInputs/authInputs";
import { GoogleLogo } from "@/components/icons";
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
      <Card className="w-md p-12 ">
        <CardBody className="px-3 py-0 text-small text-default-500 gap-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl"> Registrieren </h1>
            <p className="text-xs pt-3 font-light"> Neues Konto registrieren </p>
          </div>
          {/* Google Login */}

          <AuthInput
            authHandler={() => handleGoogleLogin({ setAuthError, setLoading, push: router.push })}
            icon={<GoogleLogo />}
            text="Mit Google registrieren"
          />

          <span className="relative mt-3 block text-center text-xs">
            <span className="absolute left-0 top-1/2 block h-px w-full max-w-30 bg-gray-3" />
            <span className="absolute text-xs font-light right-0 top-1/2 block h-px w-full max-w-30 bg-gray-3" />
            Oder per E-Mail Adresse und Passwort
          </span>

          {/* Login Form */}
          <RegistrationForm
            authError={authError}
            confirmPassword={confirmPassword}
            confirmPasswordFieldError={confirmPasswordFieldError}
            email={email}
            emailFieldError={emailFieldError}
            handleRegister={onSubmitRegister}
            loading={loading}
            password={password}
            passwordFieldError={passwordFieldError}
            setAuthError={setAuthError}
            setConfirmPassword={setConfirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </CardBody>
      </Card>
    </section>
  );
}
