const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
    {
      allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              date(formatString: "DD:MM:YYYY hh:mm")

            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    const blogPost = posts.filter(item => item.node.frontmatter.templateKey === 'blog-post')
    blogPost.forEach((post, index) => {
      const previous = index === blogPost.length - 1 ? null : blogPost[index + 1].node
      const next = index === 0 ? null : blogPost[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/blog-post.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For work-sub-page
    const workPage = posts.filter(item => item.node.frontmatter.templateKey === 'work-sub-page')
    workPage.forEach((post, index) => {
      const previous = index === workPage.length - 1 ? null : workPage[index + 1].node
      const next = index === 0 ? null : workPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/work-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For exhibitions-sub-page
    const exhibitionsPage = posts.filter(item => item.node.frontmatter.templateKey === 'exhibitions-sub-page')
    exhibitionsPage.forEach((post, index) => {
      const previous = index === exhibitionsPage.length - 1 ? null : exhibitionsPage[index + 1].node
      const next = index === 0 ? null : exhibitionsPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/exhibitions-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    //   Template For exhibitions-sub-page
    const allPage = posts.filter(item =>
      item.node.frontmatter.templateKey !== 'blog-post' &&
      item.node.frontmatter.templateKey !== 'work-sub-page' &&
      item.node.frontmatter.templateKey !== 'exhibitions-sub-page')
    allPage.forEach((post, index) => {
      const previous = index === allPage.length - 1 ? null : allPage[index + 1].node
      const next = index === 0 ? null : allPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          slug: post.node.fields.slug,
          // previous,
          // next,
        },
      })
    })
    return null
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
