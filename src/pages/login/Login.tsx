import styles from "./Login.module.scss"
import { useState } from "react"

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password);
    }





    return (
        <>
            <div className={styles["login"]}>
                <form className={styles["login__form"]} onSubmit={handleSubmit}>
                    <h2>Login</h2>

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

                    <button className="form-btn">Login</button>
                </form>
            </div>
        </>

    )
}
