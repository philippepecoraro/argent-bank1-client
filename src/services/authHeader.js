export default function authHeader() {
    if (localStorage.getItem("jwtToken")) {
        const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
        return { Authorization: "Bearer" + jwtToken };
    }
    if (sessionStorage.getItem("jwtToken")) {
        const jwtToken = JSON.parse(sessionStorage.getItem("jwtToken"));
        return { Authorization: "Bearer" + jwtToken };
    }
}
