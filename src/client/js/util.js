// @flow

type EventType = {
  name: string,
  value: string
}

type EntityType = {
  _links: {
    self: {
      href: string
    }
  }
}

export function findField (error: string): string {
  const exp = /\[([A-Za-z]+)]/g

  const match = exp.exec(error)
  if (match !== null) {
    return match[1]
  }
  return error
}

export function handleChange (event: EventType) {
  const { name, value } = event.target

  this.setState({ [name]: value })
}

export function indexRoute (): string {
  const role: ?string = localStorage.getItem('role')
  if (role) {
    return ('/menu/'.concat(role.toLowerCase()))
  }
  return 'login'
}

export function areFieldsEmpty (notNullFields: Array<string>): boolean {
  return notNullFields.filter((field: string): boolean => (field.length === 0)).length > 0
}

export function getId (entity: EntityType): string {
  return entity._links.self.href.match(/\/(\d+)/)[1]
}

export function extractEmbedded (data: {_embedded: mixed}): mixed {
  return data._embedded === undefined ? data : data._embedded
}

export function formattedDate (date: string): string {
  let data: Date = new Date(date)
  return (data.getDate() + 1) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
}
