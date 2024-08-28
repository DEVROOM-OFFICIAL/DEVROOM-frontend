"use client";

import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import PasswordIcon from "/public/icons/Password.svg";
import UsernameIcon from "/public/icons/Username.svg";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signUp } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // 사용자 이름
  const [role, setRole] = useState(""); // 사용자 역할
  const [studentId, setStudentId] = useState(""); // 학생 ID

  const router = useRouter();

  const handleSignUp = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email || !password || !name || !role || !studentId) {
      alert("Please fill out all fields.");
      return;
    }
    signUp({
      email,
      password,
      name,
      role,
      studentId,
      onSuccess: (result) => {
        console.log("Registration successful:", result);
        // store email in local storage
        useUserStore.getState().setEmail(email);
        // router to verify email page
        router.push("/verify-email");
        alert(
          "Registration successful. Please check your email to confirm your account."
        );
      },
      onFailure: (err) => {
        console.error("Registration failed:", err);
        alert("Registration failed: " + err.message);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.background} />
      </div>
      <div className={styles.right}>
        <form onSubmit={handleSignUp} className={styles.rightContainer}>
          <div className={styles.logo}>
            <Link href="/onboarding">
              <LogoIcon />
            </Link>
            <div>DevLatte</div>
          </div>
          <div className={styles.grayText}>Create your Account</div>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.grayText2}>
              name
            </label>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="username"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <UsernameIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="role" className={styles.grayText2}>
              Group (Student or Professor)
            </label>
            <div className={styles.inputBox}>
              <select
                id="role"
                className={styles.inputSelect}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select your group
                </option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
              </select>
              <UsernameIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.grayText2}>
              Student or Professor ID
            </label>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="studentId"
                className={styles.input}
                placeholder="Enter your ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <UsernameIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.grayText2}>
              Email address
            </label>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.grayText2}>
              Password
            </label>
            <div className={styles.inputBox}>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordIcon className={styles.icon} />
            </div>
          </div>
          <button type="submit" className={styles.createAccountButton}>
            Create Account
          </button>
          <div className={styles.linkContainer}>
            <div className={styles.textAlready}>already have an account?</div>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
