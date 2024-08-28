import React from "react";
import styles from "./SSHModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string[];
}

const Modal = ({ isOpen, onClose, content }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.button} onClick={onClose}>
          X
        </button>
        <div className={styles.header}>
          아래 명령어를 터미널에 입력하세요
        </div>
        
        <div className={styles.content}>
          {content.map((cmd, index) => (
            <p key={index}>{cmd}</p>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
