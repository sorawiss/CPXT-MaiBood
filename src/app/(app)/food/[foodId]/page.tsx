import { getPost } from "@/utils/DALs";
import FoodPageContent from "./FoodPageContent";
import { getCurrentUser } from "@/utils/user";

// Add revalidation for page-level caching
export const revalidate = 3600; // Revalidate every 1 hour

export default async function Post({ params }: { params: Promise<{ foodId: string }> }) {
  const resolvedParams = await params; 
  const foodId = resolvedParams.foodId; 
  
  const currentUser = await getCurrentUser();
  const post = await getPost(foodId, currentUser?.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <FoodPageContent post={post} foodId={foodId} currentUser={currentUser} hasSentRequest={post.hasSentRequest} />;
  
}