/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('Userpage component', () => {
  test('should render a header', () => {
    const { container } = render(<App />)
    const header = container.querySelector('.header-wrapper')

    expect(header).toBeInTheDocument()
  })
})
