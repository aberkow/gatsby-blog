import Typography from 'typography';

// add more typography types via - npm install --save typography-theme-bootstrap typography-theme-lawton

const typography = new Typography({
  baseFontSize: `18px`,
  googleFonts: [
    {
      name: 'Raleway',
      styles: [
        '700'
      ]
    },
    {
      name: 'Ubuntu',
      styles: [
        '400',
        '400i',
        '600',
        '600i'
      ]
    }
  ],
  headerFontFamily: ['Raleway'],
  bodyFontFamily: ['Ubuntu', 'sans-serif']
});

export default typography;