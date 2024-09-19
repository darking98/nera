const Button = {
  baseStyle: () => ({
    borderRadius: 'lg',
    transition: '150ms ease-in-out',
    _hover: {
      opacity: '0.8'
    }
  }),
  variants: {
    solid: {
      color: 'blackNera',
      background: 'white',
      _hover: {
        bg: 'normal'
      },
      _focus: {
        bg: 'normal'
      },
      _active: {
        bg: 'normal'
      }
    },
    transparent: {
      background: 'transparent'
    },
    navbar: {
      background: 'transparent',
      fontWeight: 'normal'
    },
    'navbar-current': {
      background: 'blackNera',
      fontWeight: '600',
      color: 'white'
    }
  }
}
export default Button
