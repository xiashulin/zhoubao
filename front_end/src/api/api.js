import request from '@/utils/request'
import { getCurrentWeek } from '@/utils/index'

/**
 * 登录
 * @param {Object} params 参数
 */
export function login (params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户信息
 * @param {Object} params 参数
 */
export function userInfo (params) {
  return request({
    url: '/user/userInfo',
    method: 'post',
    data: params
  })
}

/**
 * 添加用户邮箱信息
 * @param {Object} params 参数
 */
export function addUserEmail (params) {
  return request({
    url: '/useremail/add',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户邮箱信息
 * @param {Object} params 参数
 */
export function getUserEmail (params) {
  return request({
    url: '/useremail/get',
    method: 'post',
    data: params
  })
}

/**
 * 修改用户邮箱信息
 * @param {Object} params 参数
 */
export function updateUserEmail (params) {
  return request({
    url: '/useremail/update',
    method: 'post',
    data: params
  })
}

export function getCurrentWeekZhoubao (params = { title: getCurrentWeek() }) {
  return request({
    url: '/zhoubao/detail',
    method: 'post',
    data: params
  })
}

export function getAllZhoubao (params = { test: 'tt' }) {
  return request({
    url: '/zhoubao/list',
    method: 'post',
    data: params
  })
}

export function addZhoubao (params) {
  return request({
    url: '/zhoubao/add',
    method: 'post',
    data: params
  })
}

export function updateZhoubao (params) {
  return request({
    url: '/zhoubao/update',
    method: 'post',
    data: params
  })
}

export function sendEmail (params) {
  return request({
    url: '/useremail/send',
    method: 'post',
    data: params
  })
}
