function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1900px',
      },
      fontFamily: {
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        light: withOpacity('--color-light'),
        dark: withOpacity('--color-dark'),
        accent: withOpacity('--color-accent'),
        'accent-hover': withOpacity('--color-accent-hover'),
        'accent-300': withOpacity('--color-accent-300'),
        'accent-400': withOpacity('--color-accent-400'),
        'accent-500': withOpacity('--color-accent-500'),
        'accent-600': withOpacity('--color-accent-600'),
        'accent-700': withOpacity('--color-accent-700'),
        'border-50': withOpacity('--color-border-50'),
        'border-100': withOpacity('--color-border-100'),
        'border-200': withOpacity('--color-border-200'),
        'border-base': withOpacity('--color-border-base'),
        'border-400': withOpacity('--color-border-400'),
        'gray-50': withOpacity('--color-gray-50'),
        'gray-100': withOpacity('--color-gray-100'),
        'gray-200': withOpacity('--color-gray-200'),
        'gray-300': withOpacity('--color-gray-300'),
        'gray-400': withOpacity('--color-gray-400'),
        'gray-500': withOpacity('--color-gray-500'),
        'gray-600': withOpacity('--color-gray-600'),
        'gray-700': withOpacity('--color-gray-700'),
        'gray-800': withOpacity('--color-gray-800'),
        'gray-900': withOpacity('--color-gray-900'),
        social: {
          facebook: '#3b5998',
          'facebook-hover': '#35508a',
          twitter: '#1da1f2',
          instagram: '#e1306c',
          youtube: '#ff0000',
          google: '#4285f4',
          'google-hover': '#3574de',
        },
      },

      textColor: {
        body: withOpacity('--text-base'),
        'body-dark': withOpacity('--text-base-dark'),
        muted: withOpacity('--text-muted'),
        'muted-light': withOpacity('--text-muted-light'),
        heading: withOpacity('--text-heading'),
        'sub-heading': withOpacity('--text-sub-heading'),
        bolder: withOpacity('--text-text-bolder'),
      },

      height: {
        13: '3.125rem',
        double: '200%',
      },
      maxWidth: {
        5: '1.25rem',
      },
      maxHeight: {
        5: '1.25rem',
      },
      spacing: {
        22: '5.5rem',
      },

      borderRadius: {
        DEFAULT: '5px',
      },

      boxShadow: {
        base: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',
        translatePanel: '0px 15px 50px rgba(71, 92, 111, 0.15)',
        chatBox:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        cardAction:
          '0 0 0 1px #8898aa1a, 0 15px 35px #31315d1a, 0 5px 15px #00000014',
        chat: '0px 1px 2px rgba(0, 0, 0, 0.08)',
      },

      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
