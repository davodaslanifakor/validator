/* eslint-disable */
export const email = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export const password = new RegExp('^(?=.*[0-9])(?=.{8,})')
export const passwordConfirm = (password,re_password)=> password === re_password
