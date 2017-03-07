export function findField(error) {
    const exp = /\[([A-Za-z]+)]/g;

    const match = exp.exec(error);
    if (match != null){
        return match[1];
    }
    return error
}

export function handleChange(event) {
    const {name, value} = event.target;

    this.setState({[name] : value});
}

export function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

export function indexRoute() {
    const role = localStorage.getItem('role');
    if (role){
        return ("/menu/".concat(role.toLowerCase()))
    }
    return "login"
}

export function areFieldsEmpty(notNullFields) {
    return (notNullFields.filter((field) => {return (field.length == 0)}).length > 0)
}