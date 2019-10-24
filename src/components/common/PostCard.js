import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

export const gray = `#3a3a3a`

const PostWrapper = styled.li`
	display: flex;
	border-top: 1px solid #e2e2e2;
	padding: 2% 0;
	margin-bottom: 0;
`

const Paragraph = styled.p`
	color: ${gray};
	font-size: 1.5rem;
	font-weight: 400;
	line-height: 1.65;
`
const ExcerptWrapper = styled.div`
	width: 60%;
	padding: 5%;
`

const Image = styled.img`
	width: auto;
	max-width: 100%;
	height: auto;
	display: block;
`

const Header = styled.h2`
	font-size: 2.5rem;
	margin-bottom: 1.5rem;
`

const PostCard = ({ post }) => {
	const url = `/${post.slug}/`

	return (
		<Link to={url}>
			<PostWrapper>
				<span css={ css`width: 40%;` }>
					<Image src={ post.feature_image } />
				</span>
				<ExcerptWrapper>
					<Header>{ post.title }</Header>
					<Paragraph>{ post.excerpt }</Paragraph>
					<Link to={url}>Read more...</Link>
				</ExcerptWrapper>
			</PostWrapper>
		</Link>
	)
}

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
}

export default PostCard
