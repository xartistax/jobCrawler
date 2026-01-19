import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import router from "next/router";

export type LoginArgs = {
  email: string;
  password: string;
  setSubmitted: (v: boolean) => void;
  setAuthError: (v: string) => void;
  setLoading: (v: boolean) => void;
  push: (path: string) => void; // router.push aus dem Component
};
export type RegisterArgs = {
  email: string;
  password: string;
  setSubmitted: (v: boolean) => void;
  setAuthError: (v: string) => void;
  setLoading: (v: boolean) => void;
  push: (path: string) => void; // router.push aus dem Component
  confirmPassword: string;
};

export async function handleLogin({ email, password, setSubmitted, setAuthError, setLoading, push }: LoginArgs) {
  setSubmitted(true);
  setAuthError("");

  if (!email || !password) return;

  setLoading(true);

  try {
    await signInWithEmailAndPassword(getAuth(), email, password);
    push("/dashboard");
  } catch {
    setAuthError("Ungültige E-Mail-Adresse oder Passwort");
  } finally {
    setLoading(false);
  }
}

export async function handleRegister({ setSubmitted, setAuthError, setLoading, email, password, confirmPassword }: RegisterArgs) {
  setSubmitted(true);
  setAuthError("");

  // Field-Validation
  if (!email || !password || password !== confirmPassword) return;

  setLoading(true);
  try {
    await createUserWithEmailAndPassword(getAuth(), email, password);
    router.push("/dashboard");
  } catch (err: any) {
    switch (err.code) {
      case "auth/email-already-in-use":
        setAuthError("Diese E-Mail ist bereits registriert");
        break;
      case "auth/weak-password":
        setAuthError("Das Passwort ist zu schwach (min. 6 Zeichen)");
        break;
      default:
        setAuthError("Ein Fehler ist aufgetreten. Bitte versuche es erneut");
    }
  } finally {
    setLoading(false);
  }
}

export async function handleGoogleLogin({ setAuthError, setLoading, push }: Pick<LoginArgs, "setAuthError" | "setLoading" | "push">) {
  setAuthError("");
  setLoading(true);

  try {
    await signInWithPopup(getAuth(), new GoogleAuthProvider());
    push("/dashboard");
  } catch {
    setAuthError("Fehler bei der Google-Anmeldung");
  } finally {
    setLoading(false);
  }
}
