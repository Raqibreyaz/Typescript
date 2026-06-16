var age = 25;
var name = "aman";
function sendWelcomeEmail(user) {
    if (user.isActive)
        return "Welcome, ".concat(user.id);
}
