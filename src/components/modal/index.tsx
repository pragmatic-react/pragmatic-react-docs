import { useRef, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Root, Title, Description, ButtonContainer } from "./pieces";

// tab focus 가능한 요소
const TABBABLE_TAGS =
  'a, input, select, button, textarea, details, [href], [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<ModalProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    // 모달 뒤 컨텐츠가 스크롤되지 않도록 설정
    document.body.style.overflow = "hidden";

    // 모달이 열릴 때 모델에 포커스 되도록 설정
    ref.current.focus();

    // 모달 뒤 컨텐츠가 스크린리더에서 읽히지 않도록 설정
    document.body.setAttribute("aria-hidden", "true");

    // Tab 키로 포커스 순환
    function handleKeyDownTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const tabbableElements =
        ref.current!.querySelectorAll<HTMLElement>(TABBABLE_TAGS);
      const firstElement = tabbableElements[0]; // 첫번 째 요소
      const lastElement = tabbableElements[tabbableElements.length - 1]; // 마지막 요소

      if (e.shiftKey) {
        // Shift + Tab
        // 첫번 째 요소에서 마지막 포커스 요소로 이동
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab
      // 마지막 요소에서 첫 번째 포커스 요소로 이동
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDownTab);

    // ESC 키로 닫기
    function handleKeyDownEscape(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDownEscape);

    return () => {
      document.body.style.overflow = "initial";
      document.body.setAttribute("aria-hidden", "false");
      document.removeEventListener("keydown", handleKeyDownEscape);
      document.removeEventListener("keydown", handleKeyDownTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div aria-modal={isOpen} role="dialog" ref={ref} tabIndex={-1}>
      {children}
    </div>,
    document.body
  );
}

Modal.Root = Root;
Modal.Title = Title;
Modal.Description = Description;
Modal.ButtonContainer = ButtonContainer;
