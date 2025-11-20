import { create } from "zustand";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "Ten adres e-mail jest już zajęty.",
  "auth/invalid-email": "Niepoprawny adres e-mail.",
  "auth/weak-password": "Hasło musi mieć co najmniej 6 znaków.",
  "auth/missing-password": "Podaj hasło.",
  "auth/user-not-found": "Nie znaleziono użytkownika o tym adresie e-mail.",
  "auth/wrong-password": "Nieprawidłowe hasło.",
  "auth/too-many-requests":
    "Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.",
  "auth/network-request-failed":
    "Błąd połączenia z siecią. Sprawdź swoje połączenie internetowe.",
};

interface AuthState {
  user: User | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  register: async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
    } catch (error) {
      const message = getFirebaseErrorMessage(error);
      throw new Error(message);
    }
  },

  login: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const message = getFirebaseErrorMessage(error);
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const message = getFirebaseErrorMessage(error);
      throw new Error(message);
    }
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

onAuthStateChanged(auth, (user) => {
  const store = useAuthStore.getState();
  store.setUser(user);
  store.setLoading(false);
});

function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return firebaseErrorMessages[error.code] || "Unexpected firebase error.";
  }
  return "Unknown error";
}
