import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  emailFieldError: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setAuthError: Dispatch<SetStateAction<string>>;
  email: string;
  passwordFieldError: boolean;
  confirmPasswordFieldError: boolean;
  setPassword: Dispatch<SetStateAction<string>>;
  password: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  authError: string;
  loading: boolean;
};

export default function RegistrationForm({
  handleRegister,
  emailFieldError,
  setEmail,
  setAuthError,
  email,
  passwordFieldError,
  confirmPasswordFieldError,
  setPassword,
  password,
  setConfirmPassword,
  confirmPassword,
  authError,
  loading,
}: Props) {
  return (
    <Form className="w-[540px] mx-auto max-w-md gap-8" onSubmit={handleRegister}>
      <div className="flex flex-col gap-4 w-full">
        <Input
          classNames={{
            label: "text-xs font-light ",
            input: "placeholder:text-xs font-light text-default-400 dark:placeholder:text-default-300",
          }}
          isRequired
          isInvalid={emailFieldError}
          errorMessage={emailFieldError ? "Bitte gib eine gültige E-Mail-Adresse ein" : undefined}
          label="E-Mail"
          labelPlacement="outside"
          placeholder="Gib deine E-Mail-Adresse ein"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setAuthError("");
          }}
        />

        <Input
          classNames={{
            label: "text-xs font-light ",
            input: "placeholder:text-xs font-light text-default-400 dark:placeholder:text-default-300",
          }}
          isRequired
          isInvalid={passwordFieldError}
          errorMessage={passwordFieldError ? "Bitte gib ein Passwort ein" : undefined}
          label="Passwort"
          labelPlacement="outside"
          placeholder="Setze ein Passwort"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setAuthError("");
          }}
        />

        <Input
          classNames={{
            label: "text-xs font-light ",
            input: "placeholder:text-xs font-light text-default-400 dark:placeholder:text-default-300",
          }}
          isRequired
          isInvalid={confirmPasswordFieldError}
          errorMessage={confirmPasswordFieldError ? "Die Passwörter stimmen nicht überein" : undefined}
          label="Passwort bestätigen"
          labelPlacement="outside"
          placeholder="Passwort erneut eingeben"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setAuthError("");
          }}
        />

        {authError && <p className="text-danger text-sm">{authError}</p>}
      </div>

      <div className="flex">
        <Button
          type="submit"
          variant="solid"
          isLoading={loading}
          isDisabled={loading || !email || !password || !confirmPassword}
          className="mr-4 text-xs font-light"
          size="md"
        >
          Jetzt registrieren
        </Button>

        <Link href="/login" size="md" className="text-xs">
          Anmelden
        </Link>
      </div>
    </Form>
  );
}
