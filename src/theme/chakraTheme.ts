import React from 'react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Red Hat Display', sans-serif`,
    body: `'Red Hat Display', sans-serif`,
  },
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '16px',
      },
      h1: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '60px',
        fontWeight: '800',
        lineHeight: '1.5',
      },
      h2: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '48px',
        fontWeight: '700',
        lineHeight: '1.2',
      },
      h3: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '30px',
        fontWeight: '700',
        lineHeight: '1.33',
      },
      h4: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '1.2',
      },
      p: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.5',
      },
      span: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.5',
      },
      label: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.5',
      },
      button: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.5',
      },
      input: {
        fontFamily: 'Red Hat Display, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.5',
      },
    },
  },
});

export default theme;