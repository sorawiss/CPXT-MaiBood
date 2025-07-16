import { getPost } from "@/utils/DALs";
import FoodPageContent from "./FoodPageContent";
import { getCurrentUser } from "@/utils/user";

// Add revalidation for page-level caching
export const revalidate = 300; // Revalidate every 5 minutes

export default async function Post({ params }: { params: Promise<{ foodId: string }> }) {
  const resolvedParams = await params; 
  const foodId = resolvedParams.foodId; 
  
  const [post, currentUser] = await Promise.all([
    getPost(foodId),
    getCurrentUser()
  ]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <FoodPageContent post={post} foodId={foodId} currentUser={currentUser} />;
  
}