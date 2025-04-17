import { PropsWithChildren } from "react";
import Badge from "./Badge";

/**
 * 카드 형태의 item
 * @returns
 */
type CardItem = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;
export default function CardItem({ children, className, onClick }: CardItem) {
  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
}

type CardThumbnail = { className?: string; src: string; alt: string };
export function CardThumbnail({ className, src, alt }: CardThumbnail) {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
    </div>
  );
}
type CardIconType = { className?: string; src: string; alt: string };
export function CardIcon({ className, src, alt }: CardIconType) {
  return (
    <div className={className}>
      <img src={src} alt={alt} className="category-icon" />
    </div>
  );
}

export function CardContent({ children, className, title, description }) {
  return <div className={className}>{children}</div>;
}

CardItem.Icon = CardIcon;
CardItem.Content = CardContent;
CardItem.Thumbnail = CardThumbnail;
