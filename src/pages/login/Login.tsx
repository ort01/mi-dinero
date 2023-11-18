import styles from "./Login.module.scss"
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
// import { useAuthContext } from "../../hooks/useAuthContext"
// import { useNavigate } from "react-router-dom"

export default function Login() {
    //state
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')

    //hooks
    const { login, error, loading } = useLogin()
    // const { user } = useAuthContext()

    //route
    // const navigate = useNavigate()

    //functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login(email, password);
        // if (user) {
        //     navigate("/")
        // }
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
                    {loading ?
                        <button className="form-btn" disabled style={{ opacity: ".5" }}>Loading...</button>
                        :
                        <button className="form-btn">Login</button>
                    }
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </>

    )
}
