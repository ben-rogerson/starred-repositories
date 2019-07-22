const getUniqueTopics = topics =>
    Array.from(new Set(topics.reduce((acc, curr) => acc.concat(curr)).sort()))

const getUniqueTagsFromRepos = data => {
    const repoTopicsRaw = data
        .map(i => i.node.context.node.repositoryTopics.edges)
        .filter(i => i.length)
    const repoTopics = {
        ...repoTopicsRaw
            .map(i => i.map(p => p.node))
            .map(n => n.map(b => b.topic.name)),
    }
    return getUniqueTopics(Object.values(repoTopics))
}

const getRepos = data =>
    data.allSitePage.edges.filter(
        repo => repo.node.context && repo.node.context.node
    )

module.exports = { getUniqueTopics, getRepos, getUniqueTagsFromRepos }
