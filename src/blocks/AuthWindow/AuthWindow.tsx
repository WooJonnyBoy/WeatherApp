import styles from "./AuthWindow.module.css";
import user from '../../state/userState'
import { useState } from "react";

interface IcloseAuth {
    closeAuth: () => void;
}

const AuthWindow: React.FC<IcloseAuth> = ({ closeAuth }) => {
    const [userName, setUserName] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [userValid, setUserValid] = useState<boolean>(false)

    const login = () => {
        if(!userName.length || !userPassword.length) return setUserValid(true)
        setUserValid(false)
        user.login(userName, userPassword)
        setUserName('')
        setUserPassword('')
        closeAuth()
    }

    return (
        <div className={styles.authWindow}>
            <div>
                <p>Log in</p>
                <input type="text" placeholder="User name" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} value={userName}/>
                <input type="text" placeholder="Password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} value={userPassword}/>
                {userValid && <div className={styles.error}>Enter some name and password!!!</div>}
                <button onClick={login}>Long In</button>
                <button onClick={() => closeAuth()}>Cancel</button>
            </div>
        </div>
    );
};

export default AuthWindow;
