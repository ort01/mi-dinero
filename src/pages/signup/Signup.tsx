import { useState } from "react"
import styles from "./Signup.module.scss"

export default function Signup() {


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password);
    }



    return (
        <>
            <div className={styles["signup"]}>
                <form className={styles["signup__form"]} onSubmit={handleSubmit}>
                    <h2>Signup</h2>

                    <label>
                        <span>display name</span>
                        <input
                            type="text"
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                            placeholder="John Doe"
                        />
                    </label>

                    <label>
                        <span>email</span>
                        <input
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            placeholder="user123@gmail.com"
                        />
                    </label>

                    <label >
                        <span>password</span>
                        <input
                            type="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            placeholder="○○○○○○○○"
                        />
                    </label>
                    <button className="form-btn">Signup</button>
                </form>
            </div>
        </>

    )
}
