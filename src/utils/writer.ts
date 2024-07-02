export function isWriter(roles: Role[]) {
    if (roles.length) {
        for (var i of roles) {
            if (i.name == 'Writer') return true;
        }
    }
    return false;
}