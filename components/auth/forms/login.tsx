import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  emailFieldError: boolean;
  passwordFieldError: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setAuthError: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  authError: string;
  loading: boolean;
  email: string;
  password: string;
};

export default function LoginForm({
  handleLogin,
  emailFieldError,
  passwordFieldError,
  setEmail,
  setAuthError,
  setPassword,
  authError,
  loading,
  email,
  password,
}: Props) {
  return (
    <Form
      className="w-[540px] mx-auto flex flex-col gap-12"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(e);
      }}
    >
      <div className="flex flex-col w-full gap-4">
        <Input
          isRequired
          type="email"
          name="email"
          label="E-Mail"
          labelPlacement="outside"
          placeholder="Gib deine E-Mail-Adresse ein"
          isInvalid={emailFieldError}
          errorMessage={emailFieldError ? "Bitte gib eine gültige E-Mail-Adresse ein" : undefined}
          classNames={{
            label: "text-xs font-light",
            input: "text-default-400 placeholder:text-xs placeholder:font-light dark:placeholder:text-default-300",
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setAuthError("");
          }}
        />

        <Input
          isRequired
          type="password"
          name="password"
          label="Passwort"
          labelPlacement="outside"
          placeholder="Gib dein Passwort ein"
          isInvalid={passwordFieldError}
          errorMessage={passwordFieldError ? "Bitte gib dein Passwort ein" : undefined}
          classNames={{
            label: "text-xs font-light",
            input: "text-default-400 placeholder:text-xs placeholder:font-light dark:placeholder:text-default-300",
          }}
          onChange={(e) => {
            setPassword(e.target.value);
            setAuthError("");
          }}
        />

        {authError && <p className="text-danger text-xs">{authError}</p>}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" size="md" variant="solid" isLoading={loading} isDisabled={loading || !email || !password} className="text-xs font-light">
          Anmelden
        </Button>

        <Link href="/register" className="text-xs">
          Registrierung
        </Link>
      </div>
    </Form>
  );
}
