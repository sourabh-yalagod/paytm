export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={
        className + "w-full flex-1 min-w-[250px] max-w-[500px] rounded-lg p-5 shadow-[1px_1px_5px_1px_gray]"
      }
    >
      <h2>{title}</h2>
      <div className="w-full">{children}</div>
    </div>
  );
}
