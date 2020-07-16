import dotenv from 'dotenv';

dotenv.config();

export const prefix = process.env.PREFIX

export const secret = {
  token: process.env.TOKEN,
}

export const api = {
  apiKey: process.env.API_KEY,
  apiUrl: process.env.API_URL
}

export const channelId = {
  announcement: process.env.ANNOUCEMENT_CHANNEL_ID,
  status: process.env.STATUS_CHANNEL_ID,
  command: process.env.COMMAND_CHANNEL_ID,
  operation: process.env.OPERATION_CHANNEL_ID
}

export const roleId = {
  admin: process.env.ADMIN_ROLE_ID,
  mod: process.env.MOD_ROLE_ID,
  member: process.env.MEMBER_ROLE_ID
}
