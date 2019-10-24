import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Navigation } from '.'

// Styles
import '../../styles/app.css'
import { gray } from './PostCard'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

const Header = styled.header`
	height: 8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 1rem;
`

const Logo = styled.div`
	background-color: white;
	border: 0.2rem solid ${gray};
	height: 6rem;
	width: 6rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover > span {
		color: #ee4938;
	}
`

const Lettering = styled.span`
	color: ${gray};
	font-weight: 600;
	font-size: 2.2rem;
	transition: color 0.2s ease-out;
`

const Nav = styled.nav`
	display: flex;
	align-items: center;
`

const navItemClass = css`
	padding-right: 2rem;
	text-transform: uppercase;
`

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
	const site = data.allGhostSettings.edges[0].node
	const navItems = site.navigation

	return (
		<>
			<Helmet>
				<html lang={site.lang} />
				<style type="text/css">{`${site.codeinjection_styles}`}</style>
				<body className={bodyClass} />
			</Helmet>

			<div className="viewport">
				<Header>
					<Link to="/">
						<Logo><Lettering>BG</Lettering></Logo>
					</Link>
					<Nav>
						{
							navItems.map((navItem, i) => (
								<Link css={ navItemClass } to={navItem.url} key={i}>{navItem.label}</Link>
							))
						}
					</Nav>
				</Header>
				<div className="viewport-top">
					{/* The main header section on top of the screen */}
					<header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
						<div className="container">
							<div className="site-mast">
								{ !isHome &&
									<div className="site-mast-left">
										<Link to="/">{ site.title }</Link>
									</div>
								}
							</div>
							{ isHome &&
								<div className="site-banner">
									<h1 className="site-banner-title">{site.title}</h1>
									<p className="site-banner-desc">{site.description}</p>
								</div>
							}
						</div>
					</header>

					<main className="site-main">
						{/* All the main content gets inserted here, index.js, post.js */}
						{ children }
					</main>
				</div>

				<div className="viewport-bottom">
					{/* The footer at the very bottom of the screen */}
					<footer className="site-foot">
						<div className="site-foot-nav container">
							<div className="site-foot-nav-left">
								<Link to="/">{site.title}</Link> © 2019 &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
							</div>
							<div className="site-foot-nav-right">
								<Navigation data={site.navigation} navClass="site-foot-nav-item" />
							</div>
						</div>
					</footer>

				</div>
			</div>

		</>
	)
}

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	bodyClass: PropTypes.string,
	isHome: PropTypes.bool,
	data: PropTypes.shape({
		file: PropTypes.object,
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
	<StaticQuery
		query={graphql`
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
        `}
		render={data => <DefaultLayout data={data} {...props} />}
	/>
)

export default DefaultLayoutSettingsQuery
