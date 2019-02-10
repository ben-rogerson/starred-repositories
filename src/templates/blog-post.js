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
            <main key={data.id}>

                <header>

                    <h1><a href={data.url} target="_blank" rel="noopener noreferrer">{data.name}</a> by {data.owner.login}</h1>
                    <ul>
                        <li>{data.description}</li>
                        <li>Starred <TimeAgo date={starredAt} />, added <TimeAgo date={createdAt} /></li>
                        { tags && <li>{tags}</li>}

                        <li>{bytesToSize(data.diskUsage)} (fix), {data.primaryLanguage && data.primaryLanguage.name + ' lang'}</li>
                    </ul>

                </header>

                {readmeText && (<ReactMarkdown transformImageUri={image => {
                    return image.charAt(0) === '/' ? image.substring(1, image.length) : image
                }} source={readmeText} escapeHtml={false} />)}

            </main>
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
