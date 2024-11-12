// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import AppHeader from './AppHeader'

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AppHeader>

export const Primary: Story = {}
