const colors = {
  primary: '#F68E56',
  primaryLight: '#F9AD81',
  secondary: '#B2B2C0',
  backgroundPrimary: '#ECECEC',
  textColor: '#8E8EAA',
  cottonCandyPink: '#E7A4CA',
  cottonCandyBlue: '#84CCF1',
};

const transparentNavigationStyles = {
  headerStyle: {
    backgroundColor: '#FFF',
    borderBottomWidth: 0
  },
  headerTintColor: '#8E8EAA',
  headerTitleStyle: {
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    color: '#8E8EAA'
  },
  headerBackTitle: null
}

export default {
  colors,
  NavBar: {
    transparent: transparentNavigationStyles
  },
  fonts: {
    primary: 'Poppins'
  },
  borders: {
    radius: 15,
    color: colors.textColor,
    width: 2
  }
};
