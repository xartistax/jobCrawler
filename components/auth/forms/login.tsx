import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
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
      className="w-full mx-auto flex flex-col gap-12"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(e);
      }}
    >
      <div className="flex flex-col w-full gap-4">
        <Input
          isRequired
          classNames={{
            label: "text-xs font-bold",
            input: "text-default-500 placeholder:text-xs placeholder:font-light dark:placeholder:text-default-400",
          }}
          errorMessage={emailFieldError ? "Bitte gib eine gültige E-Mail-Adresse ein" : undefined}
          isInvalid={emailFieldError}
          label="E-Mail"
          labelPlacement="outside"
          name="email"
          placeholder="Gib deine E-Mail-Adresse ein"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setAuthError("");
          }}
        />

        <Input
          isRequired
          classNames={{
            label: "text-xs font-bold",
            input: "text-default-500 placeholder:text-xs placeholder:font-light dark:placeholder:text-default-400",
          }}
          errorMessage={passwordFieldError ? "Bitte gib dein Passwort ein" : undefined}
          isInvalid={passwordFieldError}
          label="Passwort"
          labelPlacement="outside"
          name="password"
          placeholder="Gib dein Passwort ein"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setAuthError("");
          }}
        />

        {authError && <p className="text-danger text-xs">{authError}</p>}
      </div>

      <div className="items-center gap-4 w-full">
        <Button
          className="text-xs font-light w-full"
          color="primary"
          isDisabled={loading || !email || !password}
          isLoading={loading}
          size="md"
          type="submit"
          variant="solid"
        >
          Anmelden
        </Button>
        <p className="mt-5 text-xs text-center w-full">
          Du hast noch keinen Account? Zur{" "}
          <Link className="text-xs" href="/register">
            Registrierung
          </Link>
        </p>
      </div>
    </Form>
  );
}
