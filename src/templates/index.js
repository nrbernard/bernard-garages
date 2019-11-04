import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { Layout, PostCard } from '../components/common';
import { MetaData } from '../components/common/meta';

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/

const Container = styled.div`
	margin: 0 auto;
	width: 90%;
	max-width: 1017px;
	@media (min-width: 600px) {
		width: 84%;
	}
`;

const Index = ({ data, location }) => {
	const posts = data.allGhostPost.edges;

	return (
		<>
			<MetaData location={ location } />
			<Layout isHome>
				<Container>
					<h2>Recent Posts</h2>

					<section>
						{posts.map(({ node }) => (
							// The tag below includes the markup for each post - components/common/PostCard.js
							<PostCard key={ node.id } post={ node } />
						))}
					</section>
				</Container>
			</Layout>
		</>
	);
};

Index.propTypes = {
	data: PropTypes.shape({
		allGhostPost: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	pageContext: PropTypes.shape({
		isCreatedByStatefulCreatePages: PropTypes.bool,
		pageNumber: PropTypes.number,
		humanPageNumber: PropTypes.number,
		skip: PropTypes.number,
		limit: PropTypes.number,
		numberOfPages: PropTypes.number,
		previousPagePath: PropTypes.string,
		nextPagePath: PropTypes.string,
	}),
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
	query GhostPostQuery($limit: Int!, $skip: Int!) {
		allGhostPost(
				sort: { order: DESC, fields: [published_at] },
				limit: $limit,
				skip: $skip
		) {
			edges {
				node {
					...GhostPostFields
				}
			}
		}
	}
`;
