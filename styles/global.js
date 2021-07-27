const global = `
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family:"Roboto",sans-serif;
  }

  .container {
    display: block;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .container {
      margin: 0 auto;
      width: 768px;
    }
  }

  @media screen and (min-width: 1200px) {
    .container {
      width: 1200px;
    }
  }
`

export default global
