import styles from "./AuthWindow.module.css";

interface IcloseAuth {
    closeAuth: () => void
}

const AuthWindow: React.FC<IcloseAuth> = ({closeAuth}) => {
    return (
        <div className={styles.authWindow}>
            <div>
                <p>Log in</p>
                <input type="text" placeholder="Login"/>
                <input type="text" placeholder="Password" />
                <button>Long In</button>
                <button>Log in with google</button>
                <button onClick={() => closeAuth()}>Cancel</button>
            </div>
        </div>
    );
};

export default AuthWindow;
