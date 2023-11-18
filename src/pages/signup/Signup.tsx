import { useState } from "react"
import styles from "./Signup.module.scss"
import { useSignup } from "../../hooks/useSignup"
// import { useNavigate } from "react-router-dom"

export default function Signup() {

    //state
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')
    //router
    // const navigate = useNavigate()
    //hooks
    const { signup, error, loading } = useSignup()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        signup(email, password, name)

        // if (!error) {
        //     navigate("/")
        // }

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
                    {loading ?
                        <button className="form-btn" disabled style={{ opacity: ".5" }}>Loading...</button>
                        :
                        <button className="form-btn">Signup</button>
                    }
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </>

    )
}
