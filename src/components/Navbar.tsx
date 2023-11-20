import styles from "./Navbar.module.scss"
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

export default function Navbar() {

    const { user } = useAuthContext()
    const { logout } = useLogout()



    return (
        <>
            <nav className={styles["navbar"]}>
                <ul>
                    <li className={styles["navbar__title"]}>
                        <Link to="/">
                            <span className={`material-symbols-outlined ${styles["navbar__icon"]}`}>
                                paid
                            </span>
                            <div>
                                miDinero
                            </div>
                        </Link>
                    </li>
                    {user ?
                        <>
                            <li className={styles["navbar__user-name"]}>Hello, {user.displayName}</li>
                            <li>
                                <Link to="/login" onClick={logout}>Logout</Link>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </>
    )
}
