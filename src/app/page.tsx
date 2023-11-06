import { IntroText } from "@/components/text/intro-text";
import { Header } from "./_layout/header";
import { Footer } from "./_layout/footer";
import { ExerciseTabs } from "@/components/tabs/exercise-tabs";

export default function Home() {
  return (
    <main className="min-h-screen p-4 w-full md:w-2/3 mx-auto">
      <Header />
      <div className="mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <IntroText />
      </div>
      <ExerciseTabs />
      <Footer />
    </main>
  );
}
