import { passwordConfirm, email, password } from './regex-rule'

class Errors {
  constructor () {
    this.errors = {}
  }

  get (field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  any () {
    return Object.keys(this.errors).length > 0
  }

  record (errors) {
    this.errors = errors
  }

  clear (field) {
    if (field) {
      delete this.errors[field]
    }
    // this.errors = {}
  }
}

class Form {
  constructor (data) {
    this.orginlaData = data
    this.errors = new Errors()
    this.state = ''
  }

  push (name, item) {
    this.orginlaData[name].push(JSON.parse(JSON.stringify(item)))
  }

  setType ({ name, type }) {
    this.orginlaData[name].type = type
  }

  getValue ({ name }) {
    return this.orginlaData[name].value ? this.orginlaData[name].value : ''
  }

  clearValue ({ name }) {
    const oldValue = this.getValue({ name })
    const newValue = typeof oldValue === 'object' ? null : ''
    this.setValue({ name, data: newValue })
  }

  setRule ({ name, rule }) {
    this.orginlaData[name].rule = rule
  }

  reset () {
    for (const field in this.orginlaData) {
      this[field] = ''
    }
    this.errors.clear()
  }

  setValue ({ name, data }) {
    this.orginlaData[name].value = data
  }

  data () {
    const data = {}
    for (const field in this.orginlaData) {
      data[this.orginlaData[field].key] = this.orginlaData[field].value
    }
    return data
  }

  validate ({ fields = null }) {
    const errors = {}
    const data = this.orginlaData
    for (const resolveKey in data) {
      const rule = data[resolveKey].rule || []
      const value = data[resolveKey].value
      const name = data[resolveKey].name
      for (let i = 0; i < rule.length; i++) {
        const item = rule[i]
        if (item === 'require') {
          if (!value || value === '') {
            if (!errors[name]) {
              errors[name] = []
              errors[name].push('require')
            } else {
              errors[name].push('require')
            }
          }
        }
        if (item === 'email') {
          if (!email.test(String(value).toLowerCase())) {
            if (!errors[name]) {
              errors[name] = []
              errors[name].push(item)
            } else {
              errors[name].push(item)
            }
          }
        }
        if (item === 'password') {
          if (!password.test(value)) {
            if (!errors[name]) {
              errors[name] = []
              errors[name].push(item)
            } else {
              errors[name].push(item)
            }
          }
        }
        if (item === 'passwordConfirm') {
          if (!passwordConfirm(data.password.value, value)) {
            if (!errors[name]) {
              errors[name] = []
              errors[name].push(item)
            } else {
              errors[name].push(item)
            }
          }
        }
        if (fields) {
          if (!fields.includes(name)) {
            delete errors[name]
          }
        }
      }
    }
    this.errors.record(errors)
    if (!this.errors.any()) {
      return {isValid:true}
    } else {
      return {isValid:false,errors}
    }
  }

  setState ({state}) {
    this.state = state
  }

  formState ({ state }) {
    return this.state === state
  }
}

export default Form
