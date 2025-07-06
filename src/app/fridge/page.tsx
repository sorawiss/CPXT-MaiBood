import AddToFridge from "./components/AddToFridge"
import { handleGetFridgeItems } from "./action"
import FridgeList from "./components/FridgeList"

async function Fridge() {
  const fridgeItems = await handleGetFridgeItems()


  // Render
  return (
    <div>
      <FridgeList fridgeItems={fridgeItems} />
      <AddToFridge />
    </div>
  )
}
export default Fridge