"use client"
import { useState } from "react"
import { handleRegister } from "./action"


export default function Register() {
    const [form, setForm] = useState({ name: "", phone_number: "", password: "" })
    const [error, setError] = useState<string | null>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const result = await handleRegister(new FormData(e.target as HTMLFormElement))

        if (result?.error) {
            setError(result.error)
        } else {
            setForm({ name: "", phone_number: "", password: "" })
        }
    }


    // Render
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChange}
                />
                <button type="submit">Register</button>
            </form>

            {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
    )
}