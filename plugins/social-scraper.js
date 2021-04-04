/*
# Copyright (C) 2020 MuhammedKpln.
# edited by Vai838

# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

*/

const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')
const Tlang = Language.getString('tiktok')
const Lung - Language.getString('scrapers')

if (cn.WORKTYPE == 'private') {
    
    Asena.addCommand({ pattern: 'whois ?(.*)', fromMe: true, usage: Lung.LUP_USAGE, desc: Lung.LUP_DESC }, async (message, match) => {

        const inp = match[1]
        const url_img =  `https://i.ibb.co/rfg0m9J/og.png`

        if (!inp) return await message.sendMessage(errorMessage(Lung.LUP_NEED_WORD))

        await message.sendMessage(infoMessage(Lung.LUP_LOADING))

        await axios
          .get(`https://json.geoiplookup.io/${inp}`)
          .then(async (response) => {
            const {
            ip,
            isp,
            org,
            hostname,
            latitude,
            longitude,
            postal_code,
            city,
            country_code,
            country_name,
            continent_code,
            continent_name,
            region,
            district,
            timezone_name,
            connection_type,
            asn_number,
            asn_org,
            asn,
            currency_code,
            currency_name,
            } = response.data.result

            const lookupBuffer = await axios.get(url_img, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lung.IP}*: ${ip}
            *${Lung.ISP}*: ${isp}
            *${Lung.ORG}*: ${org}
            *${Lung.HOST_NAME}*: ${hostname}
            *${Lung.LATITUDE}*: ${latitude}
            *${Lung.LONGITUDE}*: ${longitude}
            *${Lung.POSTAL_CODE}*: ${postal_code}
            *${Lung.CITY}*: ${city}
            *${Lung.COUNTRY_CODE}*: ${country_code}
            *${Lung.COUNTRY_NAME}*: ${country_name}
            *${Lung.CONITENT_CODE}*: ${continent_code}
            *${Lung.CONITENT_NAME}*: ${continent_name}
            *${Lung.REGION}*: ${region}
            *${Lung.DISTRICT}*: ${district}
            *${Lung.TIMEZONE_NAME}*: ${timezone_name}
            *${Lung.CONNECTION_TYPE}*: ${connection_type}
            *${Lung.ASN_NUMBER}*: ${asn_number}
            *${Lung.ASN_ORG}*: ${asn_org}
            *${Lung.ASN}*: ${asn}
            *${Lung.CURRENCY_CODE}*: ${currency_code}
            *${Lung.CURRENCY_NAME}*: ${currency_name}
            `

            await message.sendMessage(Buffer.from(lookupBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lung.LUP_NOT_FOUND + inp)),
          )
      },
    )


    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, desc: Tlang.TİKTOK }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.client.sendMessage(message.jid, Tlang.NEED, MessageType.text)

        await message.client.sendMessage(message.jid, Tlang.DOWN, MessageType.text)

        await axios
          .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=ab9942f95c09ca89`)
          .then(async (response) => {
            const {
              uploaded_at,
              caption,
              url_nwm,
              created_at,
              user,
              stats,
              music,
            } = response.data.result

            const profileBuffer = await axios.get(url_nwm, {
              responseType: 'arraybuffer',
            })

            const msg = `*${Tlang.CAPTİON}* ${caption} \n*${Tlang.USERNAME}* ${user.username} \n*${Tlang.NAME}* ${user.name} \n*${Tlang.LİKE}* ${stats.likes} \n*${Tlang.COMM}* ${stats.comments} \n*${Tlang.VİEW}* ${stats.play} \n*${Tlang.SHARE}* ${stats.shares} \n*${Tlang.MUSİC}* ${music.title} \n*${Tlang.M_AUT}* ${music.author} `

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.client.sendMessage(message.jid, Tlang.NOT + userName, MessageType.text),
          )
      },
    )
}
else if (cn.WORKTYPE == 'public') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: false, desc: Tlang.TİKTOK }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.client.sendMessage(message.jid, Tlang.NEED, MessageType.text)

        await message.client.sendMessage(message.jid, Tlang.DOWN, MessageType.text)

        await axios
          .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=ab9942f95c09ca89`)
          .then(async (response) => {
            const {
              uploaded_at,
              caption,
              url_nwm,
              created_at,
              user,
              stats,
              music,
            } = response.data.result

            const profileBuffer = await axios.get(url_nwm, {
              responseType: 'arraybuffer',
            })

            const msg = `*${Tlang.CAPTİON}* ${caption} \n*${Tlang.USERNAME}* ${user.username} \n*${Tlang.NAME}* ${user.name} \n*${Tlang.LİKE}* ${stats.likes} \n*${Tlang.COMM}* ${stats.comments} \n*${Tlang.VİEW}* ${stats.play} \n*${Tlang.SHARE}* ${stats.shares} \n*${Tlang.MUSİC}* ${music.title} \n*${Tlang.M_AUT}* ${music.author} `

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.client.sendMessage(message.jid, Tlang.NOT + userName, MessageType.text),
          )
      },
    )
}
