"use client"
import { handleLogin } from "./action"

function Login() {

  async function handleSubmit(formData: FormData) {
    const result = await handleLogin(formData)
    console.log("login", result)
  }


  // Render
  return (
    <div>
      <form action={handleSubmit}>
        <input type="text" name="phone_number" placeholder="Phone Number" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login