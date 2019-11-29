import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import url from 'url';

import config from '../../../utils/siteConfig';
import ArticleMeta from './ArticleMeta';
import WebsiteMeta from './WebsiteMeta';
import AuthorMeta from './AuthorMeta';

/**
* MetaData will generate all relevant meta data information incl.
* JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
*
*/
const MetaData = ({
	data = {},
	settings,
	title,
	description,
	image,
	location,
}) => {
	const canonical = url.resolve(config.siteUrl, location.pathname);
	const {
		ghostPost,
		ghostTag,
		ghostAuthor,
		ghostPage,
	} = data;

	if (ghostPost) {
		return (
			<ArticleMeta
				data={ ghostPost }
				canonical={ canonical }
			/>
		);
	}

	if (ghostTag) {
		return (
			<WebsiteMeta
				data={ ghostTag }
				canonical={ canonical }
				type="Series"
			/>
		);
	}

	if (ghostAuthor) {
		return (
			<AuthorMeta
				data={ ghostAuthor }
				canonical={ canonical }
			/>
		);
	}

	if (ghostPage) {
		return (
			<WebsiteMeta
				data={ ghostPage }
				canonical={ canonical }
				type="WebSite"
			/>
		);
	}

	const ghostSettings = settings.allGhostSettings.edges[0].node;
	const siteTitle = title || ghostSettings.meta_title || ghostSettings.title;
	const siteDescription = description
		|| ghostSettings.meta_description
		|| ghostSettings.description;
	const siteImage = image || ghostSettings.cover_image || null;

	return (
		<WebsiteMeta
			data={ {} }
			canonical={ canonical }
			title={ siteTitle }
			description={ siteDescription }
			image={ siteImage ? url.resolve(config.siteUrl, siteImage) : null }
			type="WebSite"
		/>
	);
};

MetaData.propTypes = {
	data: PropTypes.shape({
		ghostPost: PropTypes.object,
		ghostTag: PropTypes.object,
		ghostAuthor: PropTypes.object,
		ghostPage: PropTypes.object,
	}),
	settings: PropTypes.shape({
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
};

const MetaDataQuery = props => (
	<StaticQuery
		query={ graphql`
						query GhostSettingsMetaData {
								allGhostSettings {
										edges {
												node {
														title
														description
														meta_title
														meta_description
												}
										}
								}
						}
				` }
		// eslint-disable-next-line react/jsx-props-no-spreading
		render={ data => <MetaData settings={ data } { ...props } /> }
	/>
);

export default MetaDataQuery;
