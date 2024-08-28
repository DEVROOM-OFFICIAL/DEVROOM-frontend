import React from "react";
import styles from "./page.module.css";
import TopNavBar from "@/components/onboarding/TopNavBar";
import LogoBig from "/public/icons/LogoBig_2x.png";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className={styles.container}>
      <TopNavBar />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.headerText}>
            DevRoom으로
            <br />
            손쉽게 과제 하자!
            <br />A to Z까지
          </div>
          <div className={styles.bodyText}>
            별도의 설정없이
            <br /> 서버 접속부터 과제제출까지! <br />
            <br />
            컨테이너 서버에 바로 접근하여, <br />
            손쉽게 과제 환경에 접속해보세요!
          </div>
          <Link href="/login">
            <button className={styles.loginButton}>
              {"</>"} 로그인 후 시작하기
            </button>
          </Link>
        </div>
        <div className={styles.rightContainer}>
          <Image src={LogoBig} alt="logo" className={styles.logo} />
        </div>
      </div>
    </div>
  );
}
