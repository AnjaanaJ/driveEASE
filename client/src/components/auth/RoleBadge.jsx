function RoleBadge({ role }) {
  const roleStyles = {
    admin: "bg-gradient-to-r from-[var(--color-secondary)] to-purple-400 text-white shadow-[0_0_12px_rgba(163,75,241,0.5)]",
    instructor: "bg-gradient-to-r from-[var(--color-accent)] to-teal-300 text-[var(--color-background)] shadow-[0_0_12px_rgba(6,182,180,0.5)]",
    student: "bg-gradient-to-r from-[var(--color-primary)] to-sky-400 text-white shadow-[0_0_12px_rgba(30,117,254,0.5)]",
  };

  const style = roleStyles[role] || "bg-gray-500 text-white";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style}`}
    >
      {role}
    </span>
  );
}

export default RoleBadge;