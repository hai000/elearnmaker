export default function EditorBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-36 right-[-6rem] h-80 w-80 rounded-full bg-sky-200/70 blur-[120px]" />
      <div className="absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-amber-200/60 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_60%)]" />
    </div>
  );
}
