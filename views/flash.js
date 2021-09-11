import layout from "./layout.js";

const flash = () => {
    if (success && success.length) {
        return layout({
            flash: `
                <div class="flash flash--success">
                    <p class="flash__msg">${success}</p>
                </div>
            `
        })
    } else if (error && error.length) {
        return layout({
            flash: `
            <div class="flash flash--error">
                <p class="flash__msg">${error}</p>
            </div>
            `
        })
    }
}

export default flash;