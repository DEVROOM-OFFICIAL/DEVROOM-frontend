import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface UserState {
  email: string;
  name: string;
  role: string;
  studentId: string;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  login: (user: {
    email: string;
    name: string;
    role: string;
    studentId: string;
    idToken: string;
  }) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      email: "",
      name: "",
      role: "",
      studentId: "",
      isLoggedIn: false, // 초기 로그인 상태는 false
      setEmail: (email) => set({ email }),

      login: ({ email, name, role, studentId, idToken }) => {
        Cookies.set("idToken", idToken, { expires: 1 }); //쿠키에 ID 토큰 저장유효기간 1일
        set({ email, name, role, studentId, isLoggedIn: true });
      },

      logout: () => {
        Cookies.remove("idToken");
        set({
          email: "",
          name: "",
          role: "",
          studentId: "",
          isLoggedIn: false,
        });

        localStorage.clear();
      },
    }),
    {
      name: "userData",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
