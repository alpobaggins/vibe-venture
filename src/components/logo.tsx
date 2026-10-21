// Типографический знак V/V: две буквы V и оранжевая косая черта между ними
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`display inline-flex items-baseline leading-none ${className}`}>
      V<span className="mx-[0.04em] text-orange">/</span>V
    </span>
  );
}
