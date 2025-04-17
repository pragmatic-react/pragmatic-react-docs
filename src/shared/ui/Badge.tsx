export type BadgeStatus = "default" | "error" | "warning" | "success" | "info";
export type BadgeStatusColor = {
  [key in BadgeStatus]: {
    background: string;
    text: string;
    border: string;
  };
};

const BadgeStatusColor: BadgeStatusColor = {
  default: {
    background: "bg-gray-50",
    text: "text-gray-600",
    border: "ring-gray-500/10",
  },
  error: {
    background: "bg-red-50",
    text: "text-red-700",
    border: "ring-red-600/10",
  },
  warning: {
    background: "bg-yellow-50",
    text: "text-yellow-800",
    border: "ring-yellow-600/20",
  },
  success: {
    background: "bg-green-50",
    text: "text-green-700",
    border: "ring-green-600/20",
  },
  info: {
    background: "bg-blue-50",
    text: "text-blue-700",
    border: "ring-blue-700/10",
  },
};

export default function Badge({
  label,
  status = "default",
}: {
  label: string;
  status: BadgeStatus;
}) {
  return (
    <>
      <span
        className={`inline-flex items-center rounded-md ${BadgeStatusColor[status].background} px-2 py-1 text-xs font-medium ${BadgeStatusColor[status].text} ring-1 ${BadgeStatusColor[status].border} ring-inset`}
      >
        {label}
      </span>
    </>
  );
}
