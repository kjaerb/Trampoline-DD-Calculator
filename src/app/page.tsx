import { CombinedDD } from "@/components/dd/combined-dd";
import { SelectGender } from "@/components/config/gender-selector";
import { IntroText } from "@/components/text/intro-text";
import { SelectCOP } from "@/components/config/cop-selector";
import { Header } from "./_layout/header";
import { Footer } from "./_layout/footer";
import { DDTable } from "@/components/dd/dd-table";

export default function Home() {
  return (
    <main className="min-h-screen p-4 w-full md:w-2/3 mx-auto">
      <Header />
      <div className="mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <IntroText />
        <div className="flex space-x-0 pt-4 sm:space-x-2 space-y-2 sm:space-y-0 flex-col sm:flex-row w-full">
          <SelectGender />
          <SelectCOP />
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <DDTable />
        <CombinedDD className="px-4" />
      </div>
      <Footer />
    </main>
  );
}
