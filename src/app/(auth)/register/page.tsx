"use client"
import { handleRegister } from "./action";



function Register() {
    return (
        <div>
            <form action={handleRegister}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="phone_number" placeholder="Phone Number" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register