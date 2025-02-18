import React, { PropsWithChildren } from 'react'

import { Text, View } from '@react-pdf/renderer'

interface TextViewProps {
	emptyLinesBefore?: number
	emitEmptyLinesAfter?: number
}

const TextView = ({ children, emptyLinesBefore = 0, emitEmptyLinesAfter = 0 }: PropsWithChildren<TextViewProps>) => {
	return (
		<View>
			{emptyLinesBefore > 0 && Array.from({ length: emptyLinesBefore }).map((_, index) => <Text key={index}> </Text>)}
			<Text>{children}</Text>
			{emitEmptyLinesAfter > 0 &&
				Array.from({ length: emitEmptyLinesAfter }).map((_, index) => <Text key={index}> </Text>)}
		</View>
	)
}

export default TextView
