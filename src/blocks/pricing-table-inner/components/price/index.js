/**
 * BLOCK: Pricing Table - Price Component
 */
//wordpress dependencies 
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { RichText,getFontSizeClass,FontSizePicker,withFontSizes,getColorClassName } from '@wordpress/block-editor';
//internal dependencie
import Edit from './edit';
//external dependencie
import classnames from 'classnames';

// Register the block
registerBlockType( 'blockly/pricing-table-price', {
	title: __( 'Product Price', 'blockly' ),
	description: __( 'Adds a product price component with schema markup.','blockly'),
	icon: 'cart',
	category: 'blockly',
	parent: [ 'blockly/pricing-table' ],
	keywords: [
		__( 'pricing table', 'blockly' ),
		__( 'price', 'blockly' ),
		__( 'shop', 'blockly' ),
	],
	attributes: {
		price: {
			type: 'string',
		},
		currency: {
			type: 'string',
		},
		fontSize: {
			type: 'string',
		},
		customFontSize: {
			type: 'number',
			default: 60,
		},
		textColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},
		term: {
			type: 'string',
		},
		showTerm: {
			type: 'boolean',
			default: true,
		},
		showCurrency: {
			type: 'boolean',
			default: true,
		},
		paddingTop: {
			type: 'number',
			default: 10,
		},
		paddingRight: {
			type: 'number',
			default: 20,
		},
		paddingBottom: {
			type: 'number',
			default: 10,
		},
		paddingLeft: {
			type: 'number',
			default: 20,
		},
	},

	edit: Edit,

	save: ( props ) => {

		const {
			price,
			currency,
			fontSize,
			customFontSize,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
			term,
			showTerm,
			showCurrency,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
		} = props.attributes;

		//retrive the class name
		const fontSizeClass = getFontSizeClass( fontSize );
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName('background-color',backgroundColor);

		// Setup wrapper class names
		const wrapperClassName = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'bly-pricing-table-price-wrap': true,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
			'bly-pricing-has-currency': showCurrency && currency,
		} );

		// Setup class names
		const className = classnames( {
			'bly-pricing-table-price': true,
			[ fontSizeClass ]: fontSizeClass,
		} );

		// Setup styles
		const wrapperStyles = {
			backgroundColor: backgroundClass
				? undefined
				: customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined,
		};

		// Setup styles
		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		// Setup currency styles
		const computedFontSize = fontSizeClass ? undefined : customFontSize;
		const currencySize = Math.floor( computedFontSize / 2.5 );
		const currencyStyles = {
			fontSize: computedFontSize ? currencySize + 'px' : undefined,
		};

		// Setup term styles
		const termSize = Math.floor( computedFontSize / 2.5 );
		const termStyles = {
			fontSize: computedFontSize ? termSize + 'px' : undefined,
		};

		return (
			<div
				className={ wrapperClassName ? wrapperClassName : undefined }
				style={ wrapperStyles }
			>
				<div
					itemProp="offers"
					itemScope
					itemType="http://schema.org/Offer"
				>
					{ currency && showCurrency && (
						<RichText.Content
							tagName="span"
							itemProp="priceCurrency"
							value={ currency }
							className="bly-pricing-table-currency"
							style={ currencyStyles }
						/>
					) }
					<RichText.Content
						tagName="div"
						itemProp="price"
						value={ price }
						className={ className ? className : undefined }
						style={ styles }
					/>
					{ term && showTerm && (
						<RichText.Content
							tagName="span"
							value={ term }
							className="bly-pricing-table-term"
							style={ termStyles }
						/>
					) }
				</div>
			</div>
		);
	},

} );
