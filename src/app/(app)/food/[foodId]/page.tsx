import { getPost } from "@/utils/DALs";
import FoodPageContent from "./FoodPageContent";

// Add revalidation for page-level caching
export const revalidate = 300; // Revalidate every 5 minutes

export default async function Post({ params }: { params: Promise<{ foodId: string }> }) {
  const resolvedParams = await params; // Resolve the Promise
  const foodId = resolvedParams.foodId; // Access foodId
  

  console.log(`Starting data fetch for post ${foodId}`);

  const post = await getPost(foodId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <FoodPageContent post={post} foodId={foodId} />;
  
}