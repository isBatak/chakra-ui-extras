import { FC } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

export interface ICodeBlockProps {
	children: string;
	language?: Language;
}

export const CodeBlock: FC<ICodeBlockProps> = ({ children, language = 'jsx' }) => {
	return (
		<Highlight {...defaultProps} code={children} language={language}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className} style={style}>
					{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
};
