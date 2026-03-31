import { challenges } from "@/data/challenges";
import { ChallengeCard } from "@/components/interactive/challenge-card";

export const metadata = {
  title: "Challenges — Master OpenCode",
};

export default function ChallengesPage() {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-20 pt-28">
      <section className="mb-12">
        <p className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
          Test Your Skills
        </p>
        <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em] text-text">
          Challenges
        </h1>
        <p className="mt-3 text-text-2">
          Real-world scenarios to test your OpenCode knowledge. Choose the best approach.
        </p>
      </section>
      <section>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </section>
    </div>
  );
}
