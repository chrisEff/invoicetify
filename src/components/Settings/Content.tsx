import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { AddCircle, ArrowCircleLeft, ArrowCircleRight, RemoveCircle } from '@mui/icons-material'
import { Box, Button, Fab, FormLabel, TextField, Tooltip } from '@mui/material'

import { useTranslations } from '../../context/TranslationsContext'
import type { Settings } from '../../types'

interface ContentProps {
	settings: Settings
	setSettings: (callback: (settings: Settings) => Settings) => void
}

const Content = ({ settings, setSettings }: ContentProps) => {
	const footerRef = useRef(null)

	const { translations: i18n } = useTranslations()

	const [leftImage, setLeftImage] = useState<string | null>(null)
	const [rightImage, setRightImage] = useState<string | null>(null)

	const loadImages = async () => {
		setLeftImage(await window.electronAPI.getLeftImage())
		setRightImage(await window.electronAPI.getRightImage())
	}

	useEffect(() => {
		loadImages()
	}, [])

	const updateLeftImage = async () => {
		await window.electronAPI.uploadLeftImage()
		loadImages()
	}

	const updateRightImage = async () => {
		await window.electronAPI.uploadRightImage()
		loadImages()
	}

	const updateSenderAddress = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, senderAddress: e.target.value }))
	const updateContactDetails = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, contactDetails: e.target.value }))
	const updateIntroductoryText = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setSettings(existing => ({ ...existing, introductoryText: e.target.value }))
	const updateClosingText = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setSettings(existing => ({ ...existing, closingText: e.target.value }))

	const addFooterSection = () => {
		if (footerRef.current.value) {
			setSettings(existing => ({ ...existing, footer: [...existing.footer, footerRef.current.value] }))
			footerRef.current.value = ''
		}
	}
	const moveFooterSection = (from: number, to: number) => {
		setSettings(existing => {
			const footer = [...existing.footer]
			const item = footer[from]
			footer.splice(from, 1)
			footer.splice(to, 0, item)
			return { ...existing, footer }
		})
	}
	const removeFooterSection = (index: number) => {
		setSettings(existing => ({ ...existing, footer: existing.footer.filter((item, i) => i !== index) }))
	}

	return (
		<>
			<FormLabel>{i18n.settings.letterhead}:</FormLabel>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Button onClick={updateLeftImage}>{i18n.settings.chooseLeftImage}</Button>
					{leftImage && <img src={`data:image/png;base64,${leftImage}`} style={{ height: '150px' }} />}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Button onClick={updateRightImage}>{i18n.settings.chooseRightImage}</Button>
					{rightImage && <img src={`data:image/png;base64,${rightImage}`} style={{ height: '150px' }} />}
				</Box>
			</Box>
			<TextField
				label={i18n.settings.senderAddress}
				defaultValue={settings.senderAddress}
				onChange={updateSenderAddress}
				fullWidth
				margin="normal"
			/>
			<TextField
				label={i18n.settings.contactDetails}
				defaultValue={settings.contactDetails}
				onChange={updateContactDetails}
				fullWidth
				multiline
				rows={5}
				margin="normal"
			/>
			<TextField
				label={i18n.settings.introductoryText}
				defaultValue={settings.introductoryText}
				onChange={updateIntroductoryText}
				fullWidth
				multiline
				rows={5}
				margin="normal"
			/>
			<TextField
				label={i18n.settings.closingText}
				defaultValue={settings.closingText}
				onChange={updateClosingText}
				fullWidth
				multiline
				rows={5}
				margin="normal"
			/>
			<br />
			<FormLabel>Footer:</FormLabel>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: '20px',
				}}
			>
				{!settings.footer.length && (
					<>
						<Box sx={{ color: 'silver', padding: 5 }}>
							<pre>
								No footer
								<br />
								sections
								<br />
								added yet.
							</pre>
						</Box>
					</>
				)}
				{settings.footer.map((item, index) => (
					<Box key={index} sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
						<Box sx={{ flexGrow: 1, whiteSpace: 'pre' }}>{item}</Box>
						<Box key={index} sx={{ display: 'flex', gap: '5px' }}>
							{index > 0 && (
								<Tooltip title={i18n.settings.moveLeft}>
									<Fab size="small" onClick={() => moveFooterSection(index, index - 1)}>
										<ArrowCircleLeft />
									</Fab>
								</Tooltip>
							)}
							{index < settings.footer.length - 1 && (
								<Tooltip title={i18n.settings.moveRight}>
									<Fab size="small" onClick={() => moveFooterSection(index, index + 1)}>
										<ArrowCircleRight />
									</Fab>
								</Tooltip>
							)}
							<Tooltip title={i18n.settings.remove}>
								<Fab size="small" onClick={() => removeFooterSection(index)}>
									<RemoveCircle />
								</Fab>
							</Tooltip>
						</Box>
					</Box>
				))}
				<Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '300px' }}>
					<Tooltip title={settings.footer.length < 5 ? '' : i18n.settings.maxFooterSectionsReached}>
						<TextField inputRef={footerRef} multiline rows={4} fullWidth disabled={settings.footer.length >= 5} />
					</Tooltip>
					<Tooltip title={settings.footer.length < 5 ? i18n.settings.add : i18n.settings.maxFooterSectionsReached}>
						<Fab
							disabled={settings.footer.length >= 5}
							size="small"
							onClick={addFooterSection}
							sx={{ margin: '5px 0' }}
						>
							<AddCircle />
						</Fab>
					</Tooltip>
				</Box>
				<br />
				<br />
			</Box>
		</>
	)
}

export default Content
