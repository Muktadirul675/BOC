export function isModerator(roles: Role[]) {
    if (roles.length) {
        for (var i of roles) {
            if (i.name == 'Moderator') return true;
        }
    }
    return false;
}