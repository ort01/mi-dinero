import styles from "./Navbar.module.scss"
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <ul>
                    <li className={styles.navbar__title}>
                        <Link to="/">
                            <span className={`material-symbols-outlined ${styles.navbar__icon}`}>
                                paid
                            </span>
                            <div>
                                miDinero
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
