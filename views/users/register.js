import layout from '../layout.js';

const registerScreen = () => {
    return layout(`
        <h2>Register</h2>
        <form action="" method="POST">
        <input type="text" placeholder="Username" name="username" id="username"></input>
        <input type="text" placeholder="Email" name="email" id="email">
        <input type="text" placeholder="Password" name="password" id="password">
        <input type="text" placeholder="Confirm Password" name="confirmPassword" id="confirm-password">
        <input type="submit" value="Register">
        </form>
        `)
}
export default registerScreen;

