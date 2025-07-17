import { getSellingFridgeItems } from "@/utils/DALs";
import { makroData } from "../../../public/makro-data";
import HomePageContent from "./HomePageContent";

export default async function Home() {
  const postList = await getSellingFridgeItems();

  return (
    <HomePageContent initialPosts={postList} makroData={makroData} />
  );
}
