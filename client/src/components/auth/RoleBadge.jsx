function RoleBadge({ role }) {
  const roleStyles = {
    admin: "bg-[var(--color-secondary)] text-white",
    instructor: "bg-[var(--color-accent)] text-white",
    student: "bg-[var(--color-primary)] text-white",
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