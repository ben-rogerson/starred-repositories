// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// // You can delete this file if you're not using it
// // Lightweight GraphQL generic client
// const GraphQLClient = require('graphql-request').GraphQLClient;
// const crypto = require('crypto');
const path = require('path');
// const api = require('./api_constants');

// //GraphQL query string to get all inventory, filtering by a specific dealer
// const vehicles = `
// {
// 	allDealerships(filter:{ name:"Wheel Kinetics"}) {
//     inventory {
//       id
//       year
//       make
//       model
//       stockNo
//     }
//   }

// }
// `
// // sourceNodes is a Gatsby API
// module.exports.sourceNodes = async ({
//     boundActionCreators
// }) => {
//     const {
//         createNode
//     } = boundActionCreators
//     const client = new GraphQLClient(api.development.main)
//     const data = await client.request(vehicles)

//     // Passes inventory array of objects to createNodes function
//     // a node is created for each vehicle
//     createNodes(createNode, data.allDealerships[0].inventory)
// }

// // called after sourceNodes
// exports.createPages = ({
//     graphql,
//     boundActionCreators
// }) => {
//     const {
//         createPage
//     } = boundActionCreators
//     return new Promise((resolve, reject) => {
//         const template = path.resolve('src/templates/car.js');
//         resolve(
//             // query Gatbsy's GraphQL store for all vehiclePage nodes
//             graphql(`
//           {
//             allVehiclePage(limit: 500) {
//               edges {
//                 node {
//                   field
//                 }
//               }
//             }
//           }
//         `)
//             .then(result => {
//                 if (result.errors) {
//                     reject(result.errors);
//                 }
//                 result.data.allVehiclePage.edges.forEach(edge => {
//                     const fields = JSON.parse(edge.node.field);
//                     createPage({
//                         path: `${fields.make.split(' ').join('-')}-${fields.stockNo}`,
//                         component: template,
//                         context: {
//                             slug: `${fields.make.split(' ').join('-')}-${fields.stockNo}`,
//                             fields
//                         }
//                     })
//                 })
//             })
//         )
//     })
// }

// function createNodes(fn, nodes) {
//     nodes.forEach(node => {
//         const jsonNode = JSON.stringify(node);
//         fn({
//             id: node.id,
//             parent: null,
//             field: jsonNode, // pass queried data into node
//             children: [],
//             internal: {
//                 type: 'VehiclePage',
//                 content: jsonNode,
//                 contentDigest: crypto.createHash(`md5`).update(jsonNode).digest(`hex`)
//             }
//         })
//     })
// }

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({
    boundActionCreators,
    graphql
}) => {
    const {
        createPage
    } = boundActionCreators;

    return new Promise((resolve, reject) => {
        const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql(`
                {
                    allGithubViewer {
                        edges {
                          node {
                          starredRepositories {
                            totalCount
                            edges {
                              starredAgo: starredAt(fromNow:true)
                              starredAt
                              cursor
                              node {
                                id
                                name
                                nameWithOwner
                                owner {
                                    login
                                }
                                description
                                readme {
                                    text
                                }
                                readmeLowercase {
                                    text
                                }
                                url
                                repositoryTopics {
                                    edges {
                                        node {
                                            url
                                            topic {
                                                name
                                            }
                                        }
                                    }
                                }
                                primaryLanguage {
                                    name
                                    color
                                }
                                createdAt
                                createdAgo: createdAt(fromNow:true)
                                diskUsage
                              }
                            }
                          }
                        }
                    }
                }
            }
          `).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }
                // console.clear()
                // console.warn(result)
                // Create pages for each markdown file.
                result.data.allGithubViewer.edges.forEach(({
                    node
                }) => {
                    //console.warn()
                    // console.clear()
                    node.starredRepositories.edges.forEach(
                        repo => {
                            // console.warn(repo)

                            const path = repo.node.name;
                            const data = repo.node
                            createPage({
                                path,
                                component: blogPostTemplate,
                                // If you have a layout component at src/layouts/blog-layout.js
                                layout: `detail`,
                                // In your blog post template's graphql query, you can use path
                                // as a GraphQL variable to query for data from the markdown file.
                                context: repo,
                            });

                        })
                    //console.log(node.starredRepositories);



                });
            })
        );
    });
};