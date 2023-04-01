import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { navigate } from 'gatsby-link'

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
const ContactPage = ({ data }, location) => {

  const [state, setState] = React.useState({})
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  return (
    <Layout title={siteTitle} social={social}>
      <Seo title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description} 
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}
        />
     
      <article className="contact-form page-template ">
      {data.markdownRemark.frontmatter.thumbnail && (
        <div className="post-content-image">
          <GatsbyImage
            image={getImage(data.markdownRemark.frontmatter.thumbnail)}
            className="kg-image"
            alt={data.markdownRemark.frontmatter.title} />
        </div>
      )}
        <div className="post-content-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque. Nullam non nisi est sit amet facilisis. Quisque id diam vel quam. Morbi tincidunt augue interdum velit. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Mi tempus imperdiet nulla malesuada pellentesque. Maecenas ultricies mi eget mauris pharetra et ultrices. Cursus risus at ultrices mi tempus imperdiet nulla. Sit amet nisl suscipit adipiscing bibendum est ultricies. At volutpat diam ut venenatis tellus in. Cursus eget nunc scelerisque viverra mauris in. Ut aliquam purus sit amet luctus venenatis lectus.</p>

          <h3 id="forms">Form</h3>
          <form name="contact" method="POST" data-netlify="true" action="thanks" onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  onChange={handleChange}
                  placeholder="First Name"
                  required={true}
                />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={handleChange}
                  placeholder="Last Name"
                  required={true}
                />
              </div>

              <div className="col-6 col-12-xsmall">
                <input
                  type="email"
                  name="email"
                  id="demo-email"
                  onChange={handleChange}
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="location"
                  id="location"
                  onChange={handleChange}
                  placeholder="Location"
                  required={true}
                />
              </div>
              {/* Break */}
              {/* General, Purchase, Commissions, Exhibitions, Gallery Feature, Other */}
              <div className="col-12">
                <select name="category" id="category" onChange={handleChange} required={true}>
                  <option value>-Nature of Enquiry-</option>
                  <option value={"General"}>General</option>
                  <option value={"Purchase"}>Purchase</option>
                  <option value={"Commissions"}>Commissions</option>
                  <option value={"Exhibitions"}>Exhibitions</option>
                  <option value={"Gallery Feature"}>Gallery Feature</option>
                  <option value={"Other"}>Other</option>
                </select>
              </div>

              {/* Break */}
              {/* <div className="col-6 col-12-small">
                <input type="checkbox"
                  id="send-a-copy"
                  name="send-a-copy"
                  defaultValue='false'
                  onChange={handleChange} />
                <label htmlFor="demo-copy">Email me a copy</label>
              </div>
              <div className="col-6 col-12-small">
                <input
                  type="checkbox"
                  id="iam-human"
                  name="iam-human"
                  defaultValue='false'
                  onChange={handleChange}
                />
                <label htmlFor="demo-human">I am a human</label>
              </div> */}
              {/* Break */}
              <div className="col-12">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  rows={6}
                  defaultValue={""}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              
              <div data-netlify-recaptcha="true"></div>
  
              {/* Break */}
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <input
                      type="submit"
                      defaultValue="Send Message"
                      className="primary"
                    />
                  </li>

                </ul>
              </div>
            </div>
          </form>
        </div>


      </article>



    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social{
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "contact-page"}}) {
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
                    }
        }
      }
      
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ContactPage location={props.location} data={data} {...props} />
    )}
  />
)


// import React from 'react'
// import { navigate } from 'gatsby-link'
// // import Layout from '../layout'

// function encode(data) {
//   return Object.keys(data)
//     .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
//     .join('&')
// }

// export default function Contact() {
//   const [state, setState] = React.useState({})

//   const handleChange = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const form = e.target
//     fetch('/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: encode({
//         'form-name': form.getAttribute('name'),
//         ...state,
//       }),
//     })
//       .then(() => navigate(form.getAttribute('action')))
//       .catch((error) => alert(error))
//   }

//   return (
//     <div>
//       <h1>Contact</h1>
//       <form
//         name="contact"
//         method="post"
//         action="/thanks/"
//         data-netlify="true"
//         data-netlify-honeypot="bot-field"
//         onSubmit={handleSubmit}
//       >
//         {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        // <input type="hidden" name="form-name" value="contact" />
        // <p hidden>
        //   <label>
        //     Don’t fill this out: <input name="bot-field" onChange={handleChange} />
        //   </label>
        // </p>
//         <p>
//           <label>
//             Your name:
//             <br />
//             <input type="text" name="name" onChange={handleChange} />
//           </label>
//         </p>
//         <p>
//           <label>
//             Your email:
//             <br />
//             <input type="email" name="email" onChange={handleChange} />
//           </label>
//         </p>
//         <p>
//           <label>
//             Message:
//             <br />
//             <textarea name="message" onChange={handleChange} />
//           </label>
//         </p>
//         <p>
//           <button type="submit">Send</button>
//         </p>
//       </form>
//     </div>
//   )
// }
