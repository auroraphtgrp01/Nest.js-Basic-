export interface UserType {
  _id: string
  name: string
  email: string
  role: {
    _id: string
    name: string
  }
  permissions: {
    _id: string
    name: string
    apiPath: string
    module: string
  }[]
}
export interface IMailSender {
  to: string
  name: string
  jobs: {
    name: string
    company: string
    salary: string
    skills: string[]
  }[]
}
