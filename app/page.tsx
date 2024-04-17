import MainContent from "@/components/content";
import LandingPage from "@/components/landingPage";
import { auth } from "@/utils/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchItem = searchParams.search;
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  } else {
    return (
      <div>
        <MainContent searchItem={searchItem} />
      </div>
    );
  }
}
