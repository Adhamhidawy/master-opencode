export function Stats() {
  return (
    <div className="mx-auto mt-12 grid max-w-[600px] grid-cols-3 gap-6">
      <div className="text-center">
        <div className="bg-gradient-to-br from-accent-2 to-pink bg-clip-text text-[1.8rem] font-extrabold text-transparent">8</div>
        <div className="mt-0.5 text-[.78rem] font-medium text-text-3">Lessons</div>
      </div>
      <div className="text-center">
        <div className="bg-gradient-to-br from-accent-2 to-pink bg-clip-text text-[1.8rem] font-extrabold text-transparent">40+</div>
        <div className="mt-0.5 text-[.78rem] font-medium text-text-3">Examples</div>
      </div>
      <div className="text-center">
        <div className="bg-gradient-to-br from-accent-2 to-pink bg-clip-text text-[1.8rem] font-extrabold text-transparent">16</div>
        <div className="mt-0.5 text-[.78rem] font-medium text-text-3">Quizzes</div>
      </div>
    </div>
  );
}
