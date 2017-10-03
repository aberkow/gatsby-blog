module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `DevBlog`,
    author: `Adam Berkowitz`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `./src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`
            }
          }
        ]
      }
    }
  ],
}
