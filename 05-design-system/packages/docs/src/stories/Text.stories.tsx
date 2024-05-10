import type { StoryObj, Meta } from '@storybook/react'
import { Text, TextProps } from "@ignite-ui/react"

export default {
    title: 'Typography/Text',
    component: Text,
    args: {
        children: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel minus sunt tempore quod distinctio blanditiis deserunt unde error expedita magni molestias ducimus placeat itaque dignissimos doloribus quia nemo, ad fugiat.'
    },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
    args: {
        children: 'Strong Text',
        as: 'strong',
    }
}