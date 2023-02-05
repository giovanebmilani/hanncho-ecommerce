export interface WhatsAppConfig {
	phoneNumber: string
	apiUrl: string
}

class WhatsApp {
	phoneNumber: string
	apiUrl: string

	constructor(config: WhatsAppConfig) {
		this.phoneNumber = config.phoneNumber
		this.apiUrl = config.apiUrl
	}

	private formatMessage(message: string) {
		return message.replace(' ', '+')
	}

	public getMessageUrl(message: string) {
		return `${this.apiUrl}?phone=${this.phoneNumber}&text=${this.formatMessage(
			message
		)}&type=phone_number&app_absent=0`
	}
}

const config: WhatsAppConfig = {
	phoneNumber: '555499545092',
	apiUrl: 'https://api.whatsapp.com/send/'
}

export const whatsapp = new WhatsApp(config)
