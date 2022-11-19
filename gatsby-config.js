module.exports = {
    siteMetadata: {
        title: `hacked.codes`,
        description: `Articles on hacking, reverse engineering, and software development.`,
        author: {
            name: `Josh Terrill`,
            avatar: `/images/profile-pic.jpeg`,
        },
        siteUrl: `https://hacked.codes/`,
        social: {
            twitter: `joshterrill`,
            github: `joshterrill`,
        },
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/content/blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    {
                        resolve: `gatsby-transformer-remark`,
                        options: {
                            plugins: [
                                {
                                    resolve: `gatsby-remark-prismjs`,
                                    options: {
                                        // Class prefix for <pre> tags containing syntax highlighting;
                                        // defaults to 'language-' (e.g. <pre class="language-js">).
                                        // If your site loads Prism into the browser at runtime,
                                        // (e.g. for use with libraries like react-live),
                                        // you may use this to prevent Prism from re-processing syntax.
                                        // This is an uncommon use-case though;
                                        // If you're unsure, it's best to use the default value.
                                        classPrefix: "language-",
                                        // This is used to allow setting a language for inline code
                                        // (i.e. single backticks) by creating a separator.
                                        // This separator is a string and will do no white-space
                                        // stripping.
                                        // A suggested value for English speakers is the non-ascii
                                        // character '›'.
                                        inlineCodeMarker: null,
                                        // This lets you set up language aliases.  For example,
                                        // setting this to '{ sh: "bash" }' will let you use
                                        // the language "sh" which will highlight using the
                                        // bash highlighter.
                                        aliases: {},
                                        // This toggles the display of line numbers globally alongside the code.
                                        // To use it, add the following line in gatsby-browser.js
                                        // right after importing the prism color scheme:
                                        //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                                        // Defaults to false.
                                        // If you wish to only show line numbers on certain code blocks,
                                        // leave false and use the {numberLines: true} syntax below
                                        showLineNumbers: false,
                                        // If setting this to true, the parser won't handle and highlight inline
                                        // code used in markdown i.e. single backtick code like `this`.
                                        noInlineHighlight: false,
                                        // This adds a new language definition to Prism or extend an already
                                        // existing language definition. More details on this option can be
                                        // found under the header "Add new language definition or extend an
                                        // existing language" below.
                                        languageExtensions: [
                                            {
                                                language: "superscript",
                                                extend: "javascript",
                                                definition: {
                                                    superscript_types: /(SuperType)/,
                                                },
                                                insertBefore: {
                                                    function: {
                                                        superscript_keywords: /(superif|superelse)/,
                                                    },
                                                },
                                            },
                                        ],
                                        // Customize the prompt used in shell output
                                        // Values below are default
                                        prompt: {
                                            user: "root",
                                            host: "localhost",
                                            global: false,
                                        },
                                        // By default the HTML entities <>&'" are escaped.
                                        // Add additional HTML escapes by providing a mapping
                                        // of HTML entities and their escape value IE: { '}': '&#123;' }
                                        escapeEntities: {},
                                    },
                                },
                                {
                                    resolve: `gatsby-remark-footnotes`,
                                    options: {
                                        footnoteBackRefPreviousElementDisplay: "inline",
                                        footnoteBackRefDisplay: "inline",
                                        footnoteBackRefInnerText: "^", // Defaults to: "↩"
                                        //use if you want the Wikipedia style ^ link without an underline beneath it
                                        footnoteBackRefAnchorStyle: `text-decoration: none;`,
                                        //use "front" for Wikipedia style ^ links
                                        footnoteBackRefInnerTextStartPosition: "front",
                                        useFootnoteMarkerText: false, // Defaults to false
                                        useCustomDivider: "<hr/><strong>References:</strong>", // Defaults to <hr/>
                                    },
                                },
                            ],
                        },
                    },

                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.nodes.map(node => {
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                                    custom_elements: [{ "content:encoded": node.html }],
                                });
                            });
                        },
                        query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
                        output: "/rss.xml",
                        title: "hacked.codes RSS Feed",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `hacked.codes Blog`,
                short_name: `hacked.codes`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#1d1e26`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`,
            },
        },
    ],
};
