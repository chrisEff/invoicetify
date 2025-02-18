import React from 'react'

import { Text, View } from '@react-pdf/renderer'
// eslint-disable-next-line import/no-unresolved
import { Style } from '@react-pdf/types/style'

import type { Settings } from '../../types'

interface FooterProps {
	settings: Settings
}

const Footer = ({ settings }: FooterProps) => {
	const styles: { [key: string]: Style } = {
		footer: {
			borderTop: '1px solid black',
			display: 'flex',
			flexDirection: 'row',
			fontSize: '9pt',
			position: 'absolute',
			bottom: '1.5cm',
			width: '17cm',
		},
		footerSection: {
			minWidth: '3cm',
			paddingRight: '2mm',
		},
	}

	return (
		<View style={styles.footer} fixed>
			{settings.footer.map((item, index) => (
				<View key={index} style={styles.footerSection}>
					<Text>{item}</Text>
				</View>
			))}
		</View>
	)
}

export default Footer
