import { Code, Container, Heading, Text } from '@chakra-ui/react';
import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { CodeBlock } from '../components/CodeBlock';

const snippet1 = `npm install react-hook-headroom --save
yarn add react-hook-headroom`;

const snippet2 = `<!-- initially -->
<header class="headroom">

<!-- scrolling down -->
<header class="headroom headroom--unpinned">

<!-- scrolling up -->
<header class="headroom headroom--pinned">`;

const snippet3 = `// if you're using a bundler, first import:
import Headroom from "headroom.js";
// grab an element
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
`;

const snippet4 = `var options = {
  // vertical offset in px before element is first unpinned
  offset : 0,
  // or you can specify offset individually for up/down scroll
  offset: {
      up: 100,
      down: 50
  },
  // scroll tolerance in px before state changes
  tolerance : 0,
  // or you can specify tolerance individually for up/down scroll
  tolerance : {
      up : 5,
      down : 0
  },
  // css classes to apply
  classes : {
      // when element is initialised
      initial : "headroom",
      // when scrolling up
      pinned : "headroom--pinned",
      // when scrolling down
      unpinned : "headroom--unpinned",
      // when above offset
      top : "headroom--top",
      // when below offset
      notTop : "headroom--not-top",
      // when at bottom of scroll area
      bottom : "headroom--bottom",
      // when not at bottom of scroll area
      notBottom : "headroom--not-bottom",
      // when frozen method has been called
      frozen: "headroom--frozen",
      // multiple classes are also supported with a space-separated list
      pinned: "headroom--pinned foo bar"
  },
  // element to listen to scroll events on, defaults to \`window\`
  scroller : someElement,
  // callback when pinned, \`this\` is headroom object
  onPin : function() {},
  // callback when unpinned, \`this\` is headroom object
  onUnpin : function() {},
  // callback when above offset, \`this\` is headroom object
  onTop : function() {},
  // callback when below offset, \`this\` is headroom object
  onNotTop : function() {},
  // callback when at bottom of page, \`this\` is headroom object
  onBottom : function() {},
  // callback when moving away from bottom of page, \`this\` is headroom object
  onNotBottom : function() {}
};
// pass options as the second argument to the constructor
// supplied options are merged with defaults
var headroom = new Headroom(element, options);`;

export default function IndexPage() {
	return (
		<>
			<Header />
			<Banner />
			<Container>
				<Heading size="md" mb="2" mt="8">
					Installation
				</Heading>
				<Text>install via npm/yarn:</Text>
				<CodeBlock language="bash">{snippet1}</CodeBlock>

				<Heading size="md" mb="2" mt="8">
					What's it all about?
				</Heading>
				<Text>
					Headroom.js is a lightweight, high-performance JS widget (with no dependencies!) that allows you to react to
					the user's scroll. The header on this site is a living example, it slides out of view when scrolling down and
					slides back in when scrolling up.
				</Text>

				<Heading as="h3" size="sm" mb="2" mt="4">
					Why use it?
				</Heading>
				<Text>
					Fixed headers are a popular approach for keeping the primary navigation in close proximity to the user. This
					can reduce the effort required for a user to quickly navigate a site, but they are not without problems… Large
					screens are usually landscape-oriented, meaning less vertical than horizontal space. A fixed header can
					therefore occupy a significant portion of the content area. Small screens are typically used in a portrait
					orientation. Whilst this results in more vertical space, because of the overall height of the screen, a
					meaningfully-sized header can still be quite imposing. Headroom.js allows you to bring elements into view when
					appropriate, and give focus to your content the rest of the time.
				</Text>

				<Heading size="md" mb="2" mt="8">
					How does it work?
				</Heading>
				<Text>In response to scroll events, headroom.js adds and removes CSS classes to an element:</Text>
				<CodeBlock language="html">{snippet2}</CodeBlock>

				<Text>
					Relying on CSS classes affords headroom.js great flexibility. The choice of what to do when scrolling up or
					down is now entirely yours - anything you can do with CSS you can do in response to the user's scroll.
				</Text>

				<Heading size="md" mb="2" mt="8">
					Usage
				</Heading>
				<Text>Headroom.js has a pure JS API, plus an optional jQuery plugin and AngularJS directive.</Text>
				<Text>
					Include the <Code>headroom.js</Code> script in your page, and then:
				</Text>

				<CodeBlock language="js">{snippet3}</CodeBlock>

				<Heading size="sm" mb="2" mt="4">
					Options
				</Heading>
				<Text>
					Headroom.js can also accept an options object to alter the way it behaves. You can see the default options by
					inspecting <Code>Headroom.options</Code>. The full structure of an options object is as follows:
				</Text>
				<CodeBlock language="js">{snippet4}</CodeBlock>
			</Container>
		</>
	);
}
