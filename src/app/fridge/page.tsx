"use client"
import { handleAddToFridge } from "./action"

function Fridge() {

  async function handleSubmit(formData: FormData) {
    const result = await handleAddToFridge(formData)
    console.log(result)
  }


  // Render
  return (
    <div>
      <form action={handleSubmit}>
        <input type="text" name="item" placeholder="Item" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
export default Fridge