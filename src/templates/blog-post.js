import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import TimeAgo from 'react-timeago';

class BlogPostTemplate extends Component {
    render() {

        const { starredAt } = this.props.pageContext;
        const data = this.props.pageContext.node;
        const { createdAt } = data
        const readmeText = data.readme ? data.readme.text
            : (data.readmeLowercase ? data.readmeLowercase.text : null)
        const tags = data.repositoryTopics.edges.map((topic, key) => (
            <span key={topic.node.url}>{ key !== 0 && ', ' }<a href={topic.node.url} target="_blank" rel="noopener noreferrer">{topic.node.topic.name}</a></span>
        ))
        return (
            <div key={data.id}>
                <div class="header">
                    <a href="/">Ben's Starred Repositories</a>
                    <ul><li><a href="https://github.com/ben-rogerson/starred-repositories">Project code ⤴</a></li><li><a href="https://github.com/ben-rogerson?tab=stars">Github stars page ⤴</a></li></ul>
                    </div>
            <main >
            <div className="page detail">
                <header>
                    <h2><a href={data.url} target="_blank" rel="noopener noreferrer">{data.name}</a> by {data.owner.login}</h2>
                    <ul>
                        <li>{data.description}</li>
                        <li>Starred <TimeAgo date={starredAt} />, added <TimeAgo date={createdAt} /></li>
                        { tags && tags.length > 0 && <li>{tags}</li>}
                        <li>{bytesToSize(data.diskUsage)} (fix), {data.primaryLanguage && data.primaryLanguage.name + ' lang'}</li>
                    </ul>

                </header>

                {readmeText && (<ReactMarkdown transformImageUri={image => {
                    return image.charAt(0) === '/' ? image.substring(1, image.length) : image
                }} source={readmeText} escapeHtml={false} />)}
                <p><br /><br /><a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a> 👉</p>
                </div>
            </main>
            </div>
        )
    }
}

export default BlogPostTemplate

const bytesToSize = bytes => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
