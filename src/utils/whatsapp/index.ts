import { isMobile } from 'react-device-detect'

export interface WhatsAppConfig {
	phoneNumber: string
	webUrl: string
	apiUrl: string
}

class WhatsApp {
	phoneNumber: string
	webUrl: string
	apiUrl: string

	constructor(config: WhatsAppConfig) {
		this.phoneNumber = config.phoneNumber
		this.apiUrl = config.apiUrl
		this.webUrl = config.webUrl
	}

	private formatMessage(message: string) {
		return message.replace(' ', '+')
	}

	public getMessageUrl(message: string) {
		const url = isMobile ? this.apiUrl : this.webUrl
		return `${url}?phone=${this.phoneNumber}&text=${this.formatMessage(
			message
		)}&type=phone_number&app_absent=0`
	}
}

const config: WhatsAppConfig = {
	phoneNumber: '555499545092',
	webUrl: 'https://web.whatsapp.com/send/',
	apiUrl: 'https://api.whatsapp.com/send/'
}

export const whatsapp = new WhatsApp(config)
