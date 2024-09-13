"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LeftArrowIcon from "/public/icons/LeftArrow.svg";
import HamburgerIcon from "/public/icons/Hamburger.svg";
import { useUserStore } from "@/store/userStore";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { name, role, studentId } = useUserStore((state) => state);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const navigation = usePathname();

  const isActive = (path: string) => {
    return navigation === path ? styles.active : "";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 실행 시 한 번 호출
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.layout}>
      {/* 사이드바 */}
      <div
        className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.closed}`}
      >
        <div className={styles.logo}>
          <div className={styles.school}>성균관대학교</div>
          <LeftArrowIcon
            onClick={toggleSidebar}
            className={styles.iconButton}
          />
        </div>

        <div className={styles.userContainer}>
          <Image
            src="/icons/MyProfile.svg"
            alt="myprofile"
            width={60}
            height={60}
          />
          <div>
            <div className={styles.userInfo}>
              <div>{name}</div>
              <div>{role === "Student" ? "- 학생" : " - 교수"}</div>
            </div>
            <div className={styles.studentsId}>{studentId}</div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Image
              src="/icons/Space.svg"
              alt="container"
              width={25}
              height={25}
            />
            <div className={styles.menuText}>스페이스</div>
            <Image
              src="/icons/Down.svg"
              alt="container"
              width={12}
              height={12}
              className={styles.down}
            />
          </div>
          <div className={styles.subMenu}>
            <Link href="/container/all">
              <div
                className={`${styles.menuItem} ${isActive("/container/all")}`}
              >
                <div>전체 학기 컨테이너</div>
              </div>
            </Link>
            {/* <Link href="/container/recent">
              <div
                className={`${styles.menuItem} ${isActive(
                  "/container/recent"
                )}`}
              >
                <div>최근 실행 컨테이너</div>
              </div>
            </Link> */}
            <Link href="/container/semester">
              <div
                className={`${styles.menuItem} ${isActive(
                  "/container/semester"
                )}`}
              >
                <div>이번 학기 컨테이너</div>
              </div>
            </Link>
          </div>
          {/* <Link href="/notice/all">
            <div
              className={`${styles.menuItem} ${
                isActive("/notice/all") || isActive("/notice/specific")
              }`}
            >
              <Image
                src="/icons/Notice.svg"
                alt="notice"
                width={25}
                height={25}
              />
              <div>공지</div>
            </div>
          </Link>
          <Link href="/message">
            <div className={`${styles.menuItem} ${isActive("/message")}`}>
              <Image
                src="/icons/Message.svg"
                alt="community"
                width={25}
                height={25}
              />
              <div>메세지</div>
            </div>
          </Link> */}
          <Link href="/help">
            <div className={`${styles.menuItem} ${isActive("/help")}`}>
              <Image src="/icons/Help.svg" alt="help" width={25} height={25} />
              <div>도움말</div>
            </div>
          </Link>
          <Link href="/mypage">
            <div className={`${styles.menuItem} ${isActive("/mypage")}`}>
              <Image
                src="/icons/Mypage.svg"
                alt="mypage"
                width={22}
                height={22}
              />
              <div>마이페이지</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={`${styles.left} ${!isSidebarOpen ? styles.shifted : ""}`}>
        <div
          className={`${styles.topName} ${
            !isSidebarOpen ? styles.shifted : ""
          }`}
        >
          {!isSidebarOpen && (
            <HamburgerIcon
              onClick={toggleSidebar}
              className={styles.iconButton}
            />
          )}
          <div className={styles.studentId}>{name}</div>
          <div className={styles.studentId}> / {studentId}</div>
        </div>
        <div
          className={`${styles.content} ${
            !isSidebarOpen ? styles.shifted : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
