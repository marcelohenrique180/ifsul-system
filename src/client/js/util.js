export function findField(error) {
    const exp = /\[([A-Za-z]+)]/g;

    const match = exp.exec(error);
    if (match !== null){
        return match[1];
    }
    return error
}

export function handleChange(event) {
    const {name, value} = event.target;

    this.setState({[name] : value});
}

export function indexRoute() {
    const role = localStorage.getItem('role');
    if (role){
        return ("/menu/".concat(role.toLowerCase()))
    }
    return "login"
}

export function areFieldsEmpty(notNullFields) {
    return (notNullFields.filter((field) => {return (field.length === 0)}).length > 0)
}

export function getId(entity) {
    return entity._links.self.href.match(/\/(\d+)/)[1]
}

export function extractEmbedded(data) {
    return data._embedded === undefined ? data : data._embedded
}

export function formattedDate(date) {
    let data = new Date(date);
    return (data.getDate()+1)+"/"+(data.getMonth()+1)+"/"+data.getFullYear();
}