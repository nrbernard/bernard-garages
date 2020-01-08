import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';

import 'normalize.css';
import '../../styles/app.css';
import '../../styles/custom.css';
import globalClass from '../../styles/global';
import { gray } from '../../styles/colors';

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5em;
	> a {
		color: ${gray};
	}
`;

const Logo = styled.div`
	background-color: white;
	border: 0.2rem solid ${gray};
	height: 4em;
	width: 4em;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover > span {
		color: #ee4938;
	}
`;

const Lettering = styled.span`
	color: ${gray};
	font-weight: 600;
	font-size: 1.5em;
	transition: color 0.2s ease-out;
`;

const DefaultLayout = ({
	bodyClass,
	data,
	children,
	isHome,
}) => {
	const site = data.allGhostSettings.edges[0].node;

	return (
		<>
			<Global styles={ globalClass } />
			<Helmet>
				<html lang={ site.lang } />
				<style type="text/css">{`${site.codeinjection_styles}`}</style>
				<body className={ bodyClass } />
			</Helmet>

			<div className="viewport">
				<Header>
					<Link to="/">
						<Logo><Lettering>BG</Lettering></Logo>
					</Link>
				</Header>

				<div className="viewport-top">
					{ isHome &&
						<header className="site-head" style={ { ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } } }>
							<div className="container">
								<div className="site-banner">
									<h1 className="site-banner-title">{site.title}</h1>
									<p className="site-banner-desc">{site.description}</p>
								</div>
							</div>
						</header>
					}

					<main className="site-main">
						{/* All the main content gets inserted here, index.js, post.js */}
						{ children }
					</main>
				</div>

				<div className="viewport-bottom">
					<footer className="site-foot">
						<div className="site-foot-nav container">
							<div className="site-foot-nav-left">
								<Link to="/">{site.title}</Link>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	bodyClass: PropTypes.string,
	isHome: PropTypes.bool,
	data: PropTypes.shape({
		file: PropTypes.object,
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
};

const DefaultLayoutSettingsQuery = props => (
	<StaticQuery
		query={ graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        ` }
		// eslint-disable-next-line react/jsx-props-no-spreading
		render={ data => <DefaultLayout data={ data } { ...props } /> }
	/>
);

export default DefaultLayoutSettingsQuery;
