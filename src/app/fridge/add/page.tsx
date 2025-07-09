import { handleAddToFridge } from "./action";

export default function Add() {
  return (
    <div>
      <form action={handleAddToFridge}>
        <input type="text" name="item" placeholder="อาหาร" required />
        <input type="number" name="amount" placeholder="จำนวน" required />
        <input type="date" name="expiry_date" placeholder="วันหมดอายุ" required />
        <button type="submit">เพิ่ม</button>
      </form>
    </div>
  );
}