import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

export const gray = '#3a3a3a';

const PostWrapper = styled.li`
	display: grid;
	grid-template-columns: 33% 1fr;
	grid-gap: 2rem;
	border-bottom: 1px solid #e2e2e2;
	padding: 2rem 0;
`;

const Image = styled.img`
	max-width: 100%;
	height: auto;
	border-radius: 3px;
	opacity: 1;
	transition: opacity 0.3s ease-out;
	&:hover {
		opacity: 0.9;
	}
`;

const ExerptWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Paragraph = styled.p`
	color: ${gray};
	font-size: 1.5rem;
	font-weight: 400;
	line-height: 1.65;
`;

const Header = styled.h2`
	margin-top: 0;
`;

const PostCard = ({ post }) => {
	const url = `/${post.slug}/`;

	return (
		<PostWrapper>
			<Link to={ url }>
				<Image src={ post.feature_image } />
			</Link>
			<ExerptWrapper>
				<Header>{ post.title }</Header>
				<Paragraph>{ post.excerpt }</Paragraph>
				<Link to={ url } css={ css`align-self: flex-end;` }>Read more...</Link>
			</ExerptWrapper>
		</PostWrapper>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		feature_image: PropTypes.string,
		featured: PropTypes.bool,
		tags: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
			})
		),
		excerpt: PropTypes.string.isRequired,
		primary_author: PropTypes.shape({
			name: PropTypes.string.isRequired,
			profile_image: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default PostCard;
