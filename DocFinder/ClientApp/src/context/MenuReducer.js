export default function MenuReducer(menu,action) {
    switch (action.type) {
        case "doctor":
            return { menutype: "doctor" };
        case "user":
            return { menutype: "user" };
        case "admin":
            return { menutype: "admin" };
        default:
            return "user";
    }
}
