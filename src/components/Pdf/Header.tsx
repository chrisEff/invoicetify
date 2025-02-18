import React, { useEffect, useState } from 'react'

import { Image, View } from '@react-pdf/renderer'
// eslint-disable-next-line import/no-unresolved
import { Style } from '@react-pdf/types/style'

const Header = () => {
	const styles: { [key: string]: Style } = {
		letterhead: {
			display: 'flex',
			flexDirection: 'row',
			height: '3cm',
		},
		logoContainerLeft: {
			alignItems: 'flex-start',
		},
		logoContainerRight: {
			alignItems: 'flex-end',
			flexGrow: 1,
		},
		logo: {
			height: '3cm',
			objectFit: 'scale-down',
		},
	}

	const [leftImage, setLeftImage] = useState<string | null>(null)
	const [rightImage, setRightImage] = useState<string | null>(null)

	const loadImages = async () => {
		setLeftImage(await window.electronAPI.getLeftImage())
		setRightImage(await window.electronAPI.getRightImage())
	}

	useEffect(() => {
		loadImages()
	}, [])

	return (
		<View style={styles.letterhead}>
			{leftImage && (
				<View style={styles.logoContainerLeft}>
					<Image src={'data:image/png;base64,' + leftImage} style={styles.logo} />
				</View>
			)}
			{rightImage && (
				<View style={styles.logoContainerRight}>
					<Image src={'data:image/png;base64,' + rightImage} style={styles.logo} />
				</View>
			)}
		</View>
	)
}

export default Header
