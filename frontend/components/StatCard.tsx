"use client";

export default function StatCard({
  title,
  value,
  status,
  color = "blue",
}: any) {
  const styles: any = {
    blue: {
      border: "border-blue-500/40",
      icon: "bg-blue-500/15 text-blue-500",
      status: "text-blue-500",
    },

    green: {
      border: "border-emerald-500/40",
      icon: "bg-emerald-500/15 text-emerald-500",
      status: "text-emerald-500",
    },

    orange: {
      border: "border-orange-500/40",
      icon: "bg-orange-500/15 text-orange-500",
      status: "text-orange-500",
    },

    purple: {
      border: "border-purple-500/40",
      icon: "bg-purple-500/15 text-purple-500",
      status: "text-purple-500",
    },
  };

  const currentStyle = styles[color] || styles.blue;

  return (
    <div
      className={`
        theme-panel
        border
        ${currentStyle.border}
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm theme-muted">
            {title}
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold theme-text">
            {value}
          </h2>

          <p
            className={`
              mt-2
              text-sm
              ${currentStyle.status}
            `}
          >
            {status}
          </p>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${currentStyle.icon}
          `}
        >
          <div className="h-3 w-3 rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
}