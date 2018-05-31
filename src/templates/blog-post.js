import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

class BlogPostTemplate extends Component {
    render() {

        const { starredAgo } = this.props.pathContext;
        const data = this.props.pathContext.node;
        const readmeText = data.readme ? data.readme.text
            : (data.readmeLowercase ? data.readmeLowercase.text : null)

        return (
            <main key={data.id}>

                <base href={`https://raw.githubusercontent.com/${data.owner.login}/${data.name}/master/`} target="_blank" />
            
                <header>

                    <h1><a href={data.url} target="_blank">{data.name}</a> by {data.owner.login}</h1>
                    <ul>
                        <li>{data.description}</li>
                        <li>Starred {starredAgo}, added {data.createdAgo}</li>
                        <li>{data.repositoryTopics.edges.map((topic, key) => (
                            <span key={topic.node.url}>{ key != 0 && ', ' }<a href={topic.node.url} target="_blank">{topic.node.topic.name}</a></span>
                        ))}
                        </li>

                        <li>{bytesToSize(data.diskUsage)} (fix), {data.primaryLanguage && data.primaryLanguage.name + ' lang'}</li>
                    </ul>

                </header>

                {readmeText && (<ReactMarkdown transformImageUri={image => {
                    return image.charAt(0) == '/' ? image.substring(1, image.length) : image
                }} source={readmeText} escapeHtml={false} />)}

            </main>
        )
    }
}

export default BlogPostTemplate

const bytesToSize = bytes => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
