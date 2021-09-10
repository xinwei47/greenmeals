import layout from '../layout.js';

const loginScreen = () => {
    return layout(`
        <h2>Login</h2>
        <form action="" method="POST">
            <input type="text" placeholder="Username" name="username" id="username">
            <input type="text" placeholder="Password" name="password" id="password">
            <input type="submit" value="Login">
        </form>
    `)
}

export default loginScreen;