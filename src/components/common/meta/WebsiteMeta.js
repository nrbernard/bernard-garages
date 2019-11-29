import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StaticQuery, graphql } from 'gatsby';
import url from 'url';

import ImageMeta from './ImageMeta';
import config from '../../../utils/siteConfig';

const WebsiteMeta = ({
	data,
	settings,
	canonical,
	title,
	description,
	image,
	type,
}) => {
	const ghostSettings = settings.allGhostSettings.edges[0].node;

	const publisherLogo = url.resolve(config.siteUrl, (ghostSettings.logo || config.siteIcon));
	let shareImage = image || data.feature_image || _.get(ghostSettings, 'cover_image', null);

	shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null;

	const siteDescription = description
		|| data.meta_description
		|| data.description
		|| config.siteDescriptionMeta
		|| ghostSettings.description;
	const siteTitle = `${title || data.meta_title || data.name || data.title} - ${ghostSettings.title}`;

	return (
		<>
			<Helmet>
				<title>{siteTitle}</title>
				<meta name="description" content={ siteDescription } />
				<link rel="canonical" href={ canonical } />
				<meta property="og:site_name" content={ ghostSettings.title } />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={ siteTitle } />
				<meta property="og:description" content={ siteDescription } />
				<meta property="og:url" content={ canonical } />
				<meta name="twitter:title" content={ siteTitle } />
				<meta name="twitter:description" content={ siteDescription } />
				<meta name="twitter:url" content={ canonical } />
				<meta name="google-site-verification" content="q7m0nJFxkawlTqobCMhJet2XIEPVG-WgFcJq_wcYhDU" />
				{ghostSettings.twitter && <meta name="twitter:site" content={ `https://twitter.com/${ghostSettings.twitter.replace(/^@/, '')}/` } />}
				{ghostSettings.twitter && <meta name="twitter:creator" content={ ghostSettings.twitter } />}
				<script type="application/ld+json">
					{`
						{
												"@context": "https://schema.org/",
												"@type": "${type}",
												"url": "${canonical}",
												${shareImage ? `"image": {
																"@type": "ImageObject",
																"url": "${shareImage}",
																"width": "${config.shareImageWidth}",
																"height": "${config.shareImageHeight}"
														},` : ''}
												"publisher": {
														"@type": "Organization",
														"name": "${ghostSettings.title}",
														"logo": {
																"@type": "ImageObject",
																"url": "${publisherLogo}",
																"width": 60,
																"height": 60
														}
												},
												"mainEntityOfPage": {
														"@type": "WebPage",
														"@id": "${config.siteUrl}"
												},
												"description": "${siteDescription}"
										}
								`}
				</script>
			</Helmet>
			<ImageMeta image={ shareImage } />
		</>
	);
};

WebsiteMeta.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		meta_title: PropTypes.string,
		meta_description: PropTypes.string,
		name: PropTypes.string,
		feature_image: PropTypes.string,
		description: PropTypes.string,
		bio: PropTypes.string,
		profile_image: PropTypes.string,
	}).isRequired,
	settings: PropTypes.shape({
		logo: PropTypes.object,
		description: PropTypes.string,
		title: PropTypes.string,
		twitter: PropTypes.string,
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
	canonical: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	type: PropTypes.oneOf(['WebSite', 'Series']).isRequired,
};

const WebsiteMetaQuery = props => (
	<StaticQuery
		query={ graphql`
						query GhostSettingsWebsiteMeta {
								allGhostSettings {
										edges {
												node {
														...GhostSettingsFields
												}
										}
								}
						}
				` }
		// eslint-disable-next-line react/jsx-props-no-spreading
		render={ data => <WebsiteMeta settings={ data } { ...props } /> }
	/>
);

export default WebsiteMetaQuery;
