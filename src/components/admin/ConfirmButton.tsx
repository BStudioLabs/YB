"use client";

/** Submit button that asks for confirmation — wrap in a <form action={...}>. */
export default function ConfirmButton({
  label,
  message,
}: {
  label: string;
  message: string;
}) {
  return (
    <button
      className="fbtn danger"
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}
