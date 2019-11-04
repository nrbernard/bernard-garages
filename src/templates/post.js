import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
	const post = data.ghostPost;
	console.log(location);

	return (
		<>
			<MetaData
				data={ data }
				location={ location }
				type="article"
			/>
			<Helmet>
				<style type="text/css">{`${post.codeinjection_styles}`}</style>
			</Helmet>
			<Layout>
				<div className="container">
					<article className="content">
						{/* { post.feature_image ?
							<figure className="post-feature-image">
								<img src={ post.feature_image } alt={ post.title } />
							</figure> : null } */}
						<section className="post-full-content">
							<h1 className="content-title">{post.title}</h1>

							{/* The main post content */ }
							<section
								className="content-body load-external-scripts"
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={ { __html: post.html } }
							/>
						</section>
					</article>
				</div>
			</Layout>
		</>
	);
};

Post.propTypes = {
	data: PropTypes.shape({
		ghostPost: PropTypes.shape({
			codeinjection_styles: PropTypes.object,
			title: PropTypes.string.isRequired,
			html: PropTypes.string.isRequired,
			feature_image: PropTypes.string,
		}).isRequired,
	}).isRequired,
	location: PropTypes.shape({
		href: PropTypes.string,
		origin: PropTypes.string,
		protocol: PropTypes.string,
		host: PropTypes.string,
		hostname: PropTypes.string,
		port: PropTypes.string,
		pathname: PropTypes.string,
		search: PropTypes.string,
		hash: PropTypes.string,
		state: PropTypes.string,
		key: PropTypes.string,
	}),
};

export default Post;

export const postQuery = graphql`
		query($slug: String!) {
				ghostPost(slug: { eq: $slug }) {
						...GhostPostFields
				}
		}
`;
